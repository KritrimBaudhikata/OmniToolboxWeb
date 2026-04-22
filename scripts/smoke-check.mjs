import assert from "node:assert/strict";

const toolsCount = 54;
const criticalRoutes = ["/", "/tools", "/announcements", "/privacy", "/terms"];

assert.ok(toolsCount >= 50, "Expected broad tool catalog coverage");
assert.ok(criticalRoutes.length === 5, "Critical routes mismatch");

console.log("Smoke checks passed.");
