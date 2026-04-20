# Setup Guide: CB Advisory Prototype Infrastructure

This guide walks you through everything from creating a GitHub account to having a working template repo that Supreet can use to spin up prototypes. No GitHub experience assumed.

---

## Part 1: One-Time GitHub Setup

### Step 1: Create a GitHub Organization

You could use a personal GitHub account, but an organization gives you a shared space where you, Scott, and Supreet can all collaborate. It also keeps this work separate from any personal repos.

1. Go to https://github.com and sign in (or create an account if you don't have one)
2. Click your profile picture (top right) → **Your organizations**
3. Click **New organization**
4. Choose the **Free** plan (this is all we need)
5. Name it something like `archerpoint-cb` or `cb-advisory-prototypes`
6. Enter your email
7. Choose **My personal account** for the owner
8. Click **Create organization**
9. Skip the "Add members" step for now — we'll do that later

### Step 2: Add Team Members to the Organization

1. Go to your organization page (https://github.com/YOUR-ORG-NAME)
2. Click the **People** tab
3. Click **Invite member**
4. Enter Supreet's GitHub username or email
5. Set role to **Member**
6. Click **Send invitation**
7. Repeat for Scott if needed

---

## Part 2: Create the Template Repository

This is the starter repo that every new prototype will be cloned from.

### Step 3: Create a New Repository

1. Go to your organization page
2. Click the green **New** button (or go to https://github.com/organizations/YOUR-ORG-NAME/repositories/new)
3. Fill in:
   - **Repository name:** `prototype-template`
   - **Description:** `Template repo for CB Advisory AI diagnostic prototypes`
   - **Visibility:** Private (or Public — your call, there's no sensitive code here)
   - **DO NOT** check "Add a README file" (we have our own)
4. Click **Create repository**

### Step 4: Upload the Template Files

You have two options here. Pick whichever feels more comfortable.

#### Option A: Upload via the GitHub Website (easiest)

1. On your new empty repo page, you'll see a "Quick setup" section
2. Click **uploading an existing file** (it's a link in the instructions)
3. Extract the `cb-prototype-infra.tar.gz` file you downloaded to a folder on your computer
4. Drag ALL the files and folders from inside the `cb-prototype-infra` folder into the upload area
   - **Important:** Drag the *contents* of the folder, not the folder itself
   - **Note:** GitHub's web uploader may not show hidden folders like `.devcontainer` and `.github`. If that happens, use Option B instead
5. Type a commit message like "Initial template setup"
6. Click **Commit changes**

#### Option B: Upload via Command Line (more reliable for hidden folders)

If you have Git installed on your machine (or want to install it from https://git-scm.com), this handles hidden folders properly:

```bash
# 1. Extract the tar.gz
tar -xzf cb-prototype-infra.tar.gz

# 2. Go into the folder
cd cb-prototype-infra

# 3. Initialize a git repo
git init

# 4. Add the GitHub repo as the remote (replace YOUR-ORG-NAME)
git remote add origin https://github.com/YOUR-ORG-NAME/prototype-template.git

# 5. Add all files (including hidden folders like .devcontainer and .github)
git add -A

# 6. Commit
git commit -m "Initial template setup"

# 7. Push to GitHub
git branch -M main
git push -u origin main
```

You'll be prompted for your GitHub username and password. For the password, you'll need a **Personal Access Token** (GitHub doesn't accept regular passwords anymore):
1. Go to https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Give it a name like "command line access"
4. Check the **repo** scope
5. Click **Generate token**
6. Copy the token and use it as your password

### Step 5: Mark It as a Template Repository

This is what lets Supreet click "Use this template" to create new repos from it.

1. Go to your repo page (https://github.com/YOUR-ORG-NAME/prototype-template)
2. Click **Settings** (the gear icon tab, NOT the gear in the top right)
3. In the **General** section, check the box that says **Template repository**
4. That's it — no save button needed, it takes effect immediately

### Step 6: Verify the Files

Go back to the repo's main page (click **Code** tab) and confirm you see:

```
.devcontainer/
  devcontainer.json
.github/
  workflows/
    deploy.yml
src/
  components/
  hooks/
  lib/
    utils.ts
  App.tsx
  index.css
  main.tsx
  vite-env.d.ts
bootstrap.sh
components.json
eslint.config.js
index.html
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

If you don't see `.devcontainer` or `.github`, they didn't upload. Use Option B from Step 4 to re-upload.

---

## Part 3: Set Up the First Prototype

Now let's create an actual prototype repo and wire it up to Azure.

### Step 7: Create a Prototype Repo from the Template

1. Go to your template repo (https://github.com/YOUR-ORG-NAME/prototype-template)
2. Click the green **Use this template** button (top right, next to the Code button)
3. Click **Create a new repository**
4. Fill in:
   - **Owner:** Your organization
   - **Repository name:** Something descriptive, like `ia-rfq-estimate` or whatever the prototype is
   - **Visibility:** Private (or Public — Supreet said link-only access is fine)
5. Click **Create repository**

This creates a brand new repo with all the template files already in it.

### Step 8: Run the Azure Bootstrap Script

On your local machine (or any machine with Azure CLI installed):

```bash
# Login to Azure (opens a browser window)
az login

# Run the bootstrap script
./bootstrap.sh \
  --subscription "CB-Advisory-Prototypes" \
  --resource-group "rg-cb-prototypes" \
  --app-name "ia-rfq-estimate" \
  --location "centralus"
```

The script will output two things:
- A **URL** where the app will be hosted
- A **deployment token** (a long string of characters)

Copy the deployment token. You'll need it in the next step.

**Note:** If the subscription doesn't exist yet, create it first in the Azure portal (https://portal.azure.com → Subscriptions → Add).

### Step 9: Add the Deployment Token to the Repo

1. Go to your new prototype repo on GitHub
2. Click **Settings** (the gear icon tab)
3. In the left sidebar, expand **Secrets and variables**
4. Click **Actions**
5. Click **New repository secret**
6. Fill in:
   - **Name:** `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - **Secret:** Paste the deployment token from the bootstrap script
7. Click **Add secret**

### Step 10: Trigger the First Deploy

The GitHub Action triggers on push to main. Since we haven't pushed anything new yet, let's trigger it manually:

1. Go to the **Actions** tab in your prototype repo
2. You should see the "Deploy to Azure Static Web Apps" workflow on the left
3. If no runs have happened yet, make any small edit to trigger one:
   - Click on `README.md` in the Code tab
   - Click the pencil icon to edit
   - Add a blank line or change the title
   - Click **Commit changes**
4. Go back to the **Actions** tab — you should see a workflow running
5. Wait for it to complete (green checkmark = success, red X = something's wrong)

### Step 11: Verify It's Live

1. Go to the Azure portal (https://portal.azure.com)
2. Search for "Static Web Apps"
3. Click on your app (e.g., `ia-rfq-estimate`)
4. The **URL** is shown on the overview page
5. Click it — you should see the "CB Advisory Prototype" placeholder page

---

## Part 4: Supreet's Day-to-Day Workflow

Once the above is set up, here's what Supreet does for each new prototype:

### Starting a New Prototype

1. Go to https://github.com/YOUR-ORG-NAME/prototype-template
2. Click **Use this template** → **Create a new repository**
3. Name it, create it
4. Ask Matt/Scott to run `bootstrap.sh` and add the deployment token (Steps 8-9)

### Opening the Dev Environment

1. Go to the prototype repo on GitHub
2. Click the green **Code** button
3. Click the **Codespaces** tab
4. Click **Create codespace on main**
5. Wait about 2 minutes for it to spin up — VS Code opens in your browser
6. Start coding. The terminal has Node.js, npm, and everything else already installed.

### Adding UI Components

In the Codespaces terminal:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# etc.
```

### Running Locally in Codespaces

```bash
npm run dev
```

Codespaces will show a popup: "Your application running on port 5173 is available." Click **Open in Browser** to preview.

### Deploying

```bash
git add -A
git commit -m "describe what you changed"
git push
```

That's it. The GitHub Action runs automatically and the live site updates in a couple minutes.

---

## Part 5: GitHub Copilot (Optional)

Greg mentioned adding Supreet to the GitHub Copilot subscription. This is separate from everything above.

1. Go to https://github.com/organizations/YOUR-ORG-NAME/settings/copilot
   (or: Organization Settings → Copilot)
2. If Copilot isn't enabled for the org yet, you'll need to set it up
3. Under **Access**, add Supreet's GitHub account
4. The Copilot extension is already included in the Codespaces dev environment (we added it to devcontainer.json), so it'll be available automatically when he opens a codespace

---

## Troubleshooting

### "I don't see .devcontainer or .github folders"

These are hidden folders (they start with a dot). GitHub shows them in the web UI, but your operating system's file browser might hide them. When extracting the tar.gz, make sure you're using a tool that preserves hidden files, or use the command line (Option B in Step 4).

### "The GitHub Action failed"

1. Go to the **Actions** tab in the repo
2. Click on the failed run
3. Click on the failed job to see the logs
4. Most common issue: the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret is missing or incorrect. Double-check Step 9.

### "The site shows a 'waiting for content' page"

The first deploy hasn't completed yet. Check the Actions tab for a running workflow. If there are no workflows, make a commit to trigger one (Step 10).

### "Codespaces says I've used my free hours"

GitHub's free tier includes 120 core-hours/month (60 hours on a 2-core machine). If Supreet exceeds this, Codespaces billing kicks in at ~$0.18/hour for a 2-core machine. The organization owner can set spending limits under Organization Settings → Billing → Codespaces.

### "bootstrap.sh says the subscription doesn't exist"

The Azure subscription needs to be created first. Go to https://portal.azure.com → Subscriptions → Add. Subscriptions are free; you only pay for resources inside them.
