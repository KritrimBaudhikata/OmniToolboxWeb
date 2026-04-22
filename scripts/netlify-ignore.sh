#!/usr/bin/env bash
set -euo pipefail

# Netlify ignore command contract:
# - exit 0 => skip build
# - exit 1 => proceed with build
if [[ "${MANUAL_DEPLOY_APPROVED:-false}" == "true" ]]; then
  echo "Manual deploy approved. Proceeding with build."
  exit 1
fi

echo "Skipping build to protect deploy credits (MANUAL_DEPLOY_APPROVED is not true)."
exit 0
