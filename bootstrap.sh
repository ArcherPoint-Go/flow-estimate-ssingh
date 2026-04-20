#!/bin/bash
set -euo pipefail

# ============================================================================
# bootstrap.sh — Create Azure resources for a CB Advisory prototype
#
# This script uses a service principal for authentication. The credentials
# are stored as GitHub organization secrets and available in Codespaces
# as environment variables:
#
#   CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_CLIENT_ID       - Service principal app/client ID
#   CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_CLIENT_SECRET   - Service principal secret
#   CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_TENANT_ID       - Azure tenant ID
#   CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_SUBSCRIPTION_ID - Target subscription ID
#
# Usage:
#   ./bootstrap.sh --app-name "my-prototype"
#
# Optional overrides:
#   --resource-group "rg-cb-prototypes"   (default: rg-cb-prototypes)
#   --location "centralus"                (default: centralus)
#
# What it creates:
#   1. Resource group (if it doesn't exist)
#   2. Azure Static Web App (Free tier)
#   3. Sets the deployment token as a GitHub repo secret automatically
# ============================================================================

# --- Parse arguments --------------------------------------------------------
APP_NAME=""
RESOURCE_GROUP="rg-cb-prototypes"
LOCATION="centralus"

while [[ $# -gt 0 ]]; do
  case $1 in
    --app-name)        APP_NAME="$2";        shift 2 ;;
    --resource-group)  RESOURCE_GROUP="$2";   shift 2 ;;
    --location)        LOCATION="$2";        shift 2 ;;
    -h|--help)
      echo "Usage: ./bootstrap.sh --app-name <n> [--resource-group <n>] [--location <region>]"
      echo ""
      echo "Requires these environment variables (set via GitHub org secrets in Codespaces):"
      echo "  CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_CLIENT_ID, CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_CLIENT_SECRET, CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_TENANT_ID, CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_SUBSCRIPTION_ID"
      exit 0 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

# --- Validate required params -----------------------------------------------
if [[ -z "$APP_NAME" ]]; then
  echo "Error: --app-name is required."
  echo "Run ./bootstrap.sh --help for usage."
  exit 1
fi

# --- Validate environment variables -----------------------------------------
MISSING_VARS=""
[[ -z "${CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_CLIENT_ID:-}" ]]       && MISSING_VARS="$MISSING_VARS CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_CLIENT_ID"
[[ -z "${CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_CLIENT_SECRET:-}" ]]   && MISSING_VARS="$MISSING_VARS CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_CLIENT_SECRET"
[[ -z "${CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_TENANT_ID:-}" ]]       && MISSING_VARS="$MISSING_VARS CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_TENANT_ID"
[[ -z "${CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_SUBSCRIPTION_ID:-}" ]] && MISSING_VARS="$MISSING_VARS CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_SUBSCRIPTION_ID"

if [[ -n "$MISSING_VARS" ]]; then
  echo "Error: Missing required environment variables:$MISSING_VARS"
  echo ""
  echo "These should be set as GitHub organization secrets and made available"
  echo "to Codespaces. See the setup guide for instructions."
  exit 1
fi

echo "============================================"
echo "CB Advisory Prototype — Azure Bootstrap"
echo "============================================"
echo ""
echo "App Name:        $APP_NAME"
echo "Resource Group:  $RESOURCE_GROUP"
echo "Location:        $LOCATION"
echo ""

# --- Login with service principal -------------------------------------------
echo "→ Logging in with service principal..."
az login --service-principal \
  --username "$CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_CLIENT_ID" \
  --password "$CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_CLIENT_SECRET" \
  --tenant "$CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_TENANT_ID" \
  --output none

# --- Set subscription -------------------------------------------------------
echo "→ Setting subscription..."
az account set --subscription "$CB_AI_DIAGNOSTIC_PROTOTYPE_AZURE_SUBSCRIPTION_ID"

# --- Create resource group if needed ----------------------------------------
echo "→ Checking resource group..."
if az group show --name "$RESOURCE_GROUP" &>/dev/null; then
  echo "  Resource group '$RESOURCE_GROUP' already exists."
else
  echo "  Creating resource group '$RESOURCE_GROUP' in '$LOCATION'..."
  az group create \
    --name "$RESOURCE_GROUP" \
    --location "$LOCATION" \
    --output none
  echo "  Created."
fi

# --- Create Static Web App --------------------------------------------------
echo "→ Checking Static Web App..."
if az staticwebapp show --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" &>/dev/null; then
  echo "  Static Web App '$APP_NAME' already exists."
else
  echo "  Creating Static Web App '$APP_NAME' (Free tier)..."
  az staticwebapp create \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --location "$LOCATION" \
    --sku Free \
    --output none
  echo "  Created."
fi

# --- Retrieve deployment token ----------------------------------------------
echo "→ Retrieving deployment token..."
DEPLOYMENT_TOKEN=$(az staticwebapp secrets list \
  --name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --query "properties.apiKey" \
  --output tsv)

# --- Retrieve default hostname -----------------------------------------------
echo "→ Retrieving app URL..."
APP_URL=$(az staticwebapp show \
  --name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --query "defaultHostname" \
  --output tsv)

# --- Set the deployment token as a repo secret automatically -----------------
echo "→ Setting deployment token as repo secret..."
echo "$DEPLOYMENT_TOKEN" | gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN
echo "  ✓ Secret AZURE_STATIC_WEB_APPS_API_TOKEN set."

# --- Output results ----------------------------------------------------------
echo ""
echo "============================================"
echo "  Setup Complete"
echo "============================================"
echo ""
echo "Static Web App URL:"
echo "  https://$APP_URL"
echo ""
echo "Next steps:"
echo "  1. Build your prototype"
echo "  2. Push to main — the GitHub Action will deploy automatically"
echo ""