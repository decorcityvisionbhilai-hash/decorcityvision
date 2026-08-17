#!/usr/bin/env bash
# Bootstraps and runs the Sanity Studio locally for this project.
#
# Usage:
#   npm run sanity:setup   # only checks/creates .env.local, prints next steps
#   npm run sanity:dev     # checks .env.local, then starts `next dev`
#                          # (Studio lives at http://localhost:3000/studio)
#
# The Studio is embedded in the Next.js app (app/studio/[[...tool]]/page.tsx),
# so `next dev` is the normal way to run it locally. This script exists
# because the Studio needs a real Sanity project connected first — without
# that, /studio loads but can't talk to any dataset.

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

ENV_FILE=".env.local"
ENV_EXAMPLE=".env.local.example"
SETUP_ONLY=false
[[ "${1:-}" == "--setup-only" ]] && SETUP_ONLY=true

need_setup=false

if [[ ! -f "$ENV_FILE" ]]; then
  echo "==> No $ENV_FILE found — creating one from $ENV_EXAMPLE"
  cp "$ENV_EXAMPLE" "$ENV_FILE"
  need_setup=true
else
  # Pull the two required values out of .env.local without sourcing the
  # whole file (avoids choking on anything else that might be in there).
  project_id=$(grep -E '^NEXT_PUBLIC_SANITY_PROJECT_ID=' "$ENV_FILE" | cut -d= -f2- || true)
  dataset=$(grep -E '^NEXT_PUBLIC_SANITY_DATASET=' "$ENV_FILE" | cut -d= -f2- || true)
  if [[ -z "$project_id" || -z "$dataset" ]]; then
    echo "==> $ENV_FILE exists but NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET is empty"
    need_setup=true
  fi
fi

if [[ "$need_setup" == true ]]; then
  cat <<'EOF'

This project isn't connected to a Sanity project yet. To connect it:

  1. Log in (opens a browser):
       npx sanity login

  2. Link this folder to a project — creates a new one if you don't have
     one yet, or lets you pick an existing one. This also fills in
     NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in
     .env.local for you:
       npx sanity init --env

  3. Then run this again:
       npm run sanity:dev

(Or skip the CLI and fill .env.local in by hand — get the project ID and
dataset name from https://www.sanity.io/manage.)

EOF
  exit 1
fi

echo "==> Sanity project connected (dataset: ${dataset:-<from .env.local>})"

if [[ "$SETUP_ONLY" == true ]]; then
  echo "==> Setup looks good. Run 'npm run sanity:dev' to start the Studio."
  exit 0
fi

echo "==> Starting Next.js — Studio will be at http://localhost:3000/studio"
exec npm run dev
