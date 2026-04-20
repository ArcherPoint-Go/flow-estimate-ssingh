# CB Advisory Prototype Infrastructure

## Overview

This is the template repository for Cherry Bekaert Advisory's AI diagnostic assessment prototypes. It provides a standardized starting point for Vite/React/TypeScript/Tailwind/shadcn-ui web apps, a GitHub Actions workflow that auto-deploys to Azure Static Web Apps, and a Codespaces dev environment so developers can work without installing anything locally.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Developer Workflow                                      │
│                                                          │
│  1. Create new repo from this template                   │
│  2. Open in GitHub Codespaces (browser-based, no setup)  │
│  3. Build prototype                                      │
│  4. Push to main → auto-deploys to Azure Static Web App  │
│  5. Share URL with client                                │
└─────────────────────────────────────────────────────────┘

GitHub Codespaces          GitHub Actions            Azure Static Web Apps
┌──────────────┐     ┌───────────────────┐     ┌────────────────────┐
│ Browser-based │     │ On push to main:  │     │ Free tier hosting   │
│ VS Code       │────▶│ npm install       │────▶│ Auto-SSL            │
│ Node 20       │     │ npm run build     │     │ Global CDN          │
│ All tools     │     │ Deploy to Azure   │     │ URL per prototype   │
│ preinstalled  │     │                   │     │                     │
└──────────────┘     └───────────────────┘     └────────────────────┘
```

## What's Included

| File | Purpose |
|------|---------|
| `bootstrap.sh` | One-time Azure resource setup script |
| `.devcontainer/devcontainer.json` | Codespaces / VS Code dev environment config |
| `.github/workflows/deploy.yml` | GitHub Actions workflow for auto-deploy |
| `package.json` | Node dependencies (Vite, React, TypeScript, Tailwind, shadcn) |
| `vite.config.ts` | Vite build config with path aliases |
| `tsconfig.json` / `tsconfig.app.json` | TypeScript config |
| `components.json` | shadcn-ui config |
| `src/` | Starter app source |
| `index.html` | Entry point |

## Getting Started

### One-Time Azure Setup (run by Matt or Scott)

Before any prototypes are created, run the bootstrap script to create the shared Azure resources:

```bash
# Install Azure CLI if not already installed
# https://learn.microsoft.com/en-us/cli/azure/install-azure-cli

# Login to Azure
az login

# Run the bootstrap script
# This creates: Resource Group + Static Web App resource
./bootstrap.sh \
  --subscription "CB-Advisory-Prototypes" \
  --resource-group "rg-cb-prototypes" \
  --app-name "cb-prototype-demo" \
  --location "centralus"
```

The script outputs a **deployment token**. Add this as a repository secret named `AZURE_STATIC_WEB_APPS_API_TOKEN` in the GitHub repo settings.

### Per-Prototype Workflow (Supreet's workflow)

1. **Create a new repo** from this template (click "Use this template" on GitHub)
2. **Run bootstrap.sh** for the new prototype (or ask Matt/Scott to do it)
3. **Add the deployment token** as a repo secret
4. **Open in Codespaces** — click "Code" → "Codespaces" → "Create codespace on main"
5. **Start building** — the dev environment has everything preinstalled
6. **Push to main** — GitHub Actions builds and deploys automatically
7. **Share the URL** — find it in the Azure portal or the Actions output

### Local Development (if not using Codespaces)

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Adding shadcn Components

```bash
# Add individual components as needed
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog

# Browse all available components: https://ui.shadcn.com/docs/components
```

## Cost

- **Azure Static Web Apps (Free tier):** $0/month — includes 100GB bandwidth, 2 custom domains, free SSL
- **GitHub Codespaces:** Free tier includes 120 core-hours/month for personal accounts. Beyond that, billed per hour of use (~$0.18/hr for a 2-core machine)
- **Azure Subscription:** $0 (subscriptions themselves are free)

## Notes

- These are non-production prototypes. No client data is hosted.
- Prototypes are publicly accessible via URL. No authentication is configured by default.
- Each prototype gets its own repo (created from this template) and its own Static Web App resource.
