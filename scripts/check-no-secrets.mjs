import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();

const ignoredDirs = new Set([
  ".git",
  ".next",
  ".cursor",
  "node_modules",
  "out",
  "build",
  "coverage",
]);

const ignoredFiles = [
  ".env.example",
  "package-lock.json",
];

const secretRules = [
  { name: "AWS access key", regex: /AKIA[0-9A-Z]{16}/g },
  { name: "GitHub token", regex: /ghp_[A-Za-z0-9]{36}/g },
  { name: "OpenAI-style key", regex: /sk-[A-Za-z0-9]{20,}/g },
  { name: "Private key block", regex: /-----BEGIN (RSA|EC|OPENSSH|DSA|PRIVATE) KEY-----/g },
  { name: "Password assignment", regex: /\bpassword\s*[:=]\s*["']?[^\s"'`]+/gi },
  { name: "API key assignment", regex: /\bapi[_-]?key\s*[:=]\s*["']?[^\s"'`]+/gi },
  { name: "Secret assignment", regex: /\bsecret\s*[:=]\s*["']?[^\s"'`]+/gi },
  { name: "Token assignment", regex: /\btoken\s*[:=]\s*["']?[^\s"'`]+/gi },
];

function shouldIgnoreFile(filePath) {
  const normalized = filePath.replaceAll("\\", "/");
  return ignoredFiles.some((f) => normalized.endsWith(f));
}

function isTextBuffer(buffer) {
  const sample = buffer.subarray(0, Math.min(buffer.length, 8000));
  return !sample.includes(0);
}

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    const relativePath = path.relative(rootDir, absolutePath);

    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) continue;
      yield* walk(absolutePath);
      continue;
    }

    if (shouldIgnoreFile(relativePath)) continue;
    yield absolutePath;
  }
}

async function run() {
  const findings = [];

  for await (const filePath of walk(rootDir)) {
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) continue;
    if (fileStats.size > 1024 * 1024) continue;

    const buffer = await readFile(filePath);
    if (!isTextBuffer(buffer)) continue;
    const content = buffer.toString("utf8");
    const relativePath = path.relative(rootDir, filePath);

    for (const rule of secretRules) {
      const matches = [...content.matchAll(rule.regex)];
      if (matches.length === 0) continue;

      findings.push({
        file: relativePath.replaceAll("\\", "/"),
        rule: rule.name,
        match: matches[0][0],
      });
    }
  }

  if (findings.length === 0) {
    console.log("Security scan passed: no obvious secrets found.");
    return;
  }

  console.error("Potential secret leaks detected:");
  for (const finding of findings) {
    console.error(`- ${finding.file}: ${finding.rule} -> ${finding.match}`);
  }

  process.exitCode = 1;
}

run().catch((error) => {
  console.error("Security scan failed unexpectedly.");
  console.error(error);
  process.exitCode = 1;
});
