#!/bin/bash
set -euo pipefail

# ============================================================================
# bootstrap.sh — Create Azure resources for a CB Advisory prototype
#
# Usage:
#   ./bootstrap.sh \
#     --subscription "CB-Advisory-Prototypes" \
#     --resource-group "rg-cb-prototypes" \
#     --app-name "cb-prototype-demo" \
#     --location "centralus"
#
# What it creates:
#   1. Resource group (if it doesn't exist)
#   2. Azure Static Web App (Free tier)
#
# What it outputs:
#   - Deployment token (add as AZURE_STATIC_WEB_APPS_API_TOKEN repo secret)
#   - Static Web App URL
# ============================================================================

# --- Parse arguments --------------------------------------------------------
SUBSCRIPTION=""
RESOURCE_GROUP=""
APP_NAME=""
LOCATION="centralus"

while [[ $# -gt 0 ]]; do
  case $1 in
    --subscription)  SUBSCRIPTION="$2";    shift 2 ;;
    --resource-group) RESOURCE_GROUP="$2"; shift 2 ;;
    --app-name)      APP_NAME="$2";        shift 2 ;;
    --location)      LOCATION="$2";        shift 2 ;;
    -h|--help)
      echo "Usage: ./bootstrap.sh --subscription <name> --resource-group <name> --app-name <name> [--location <region>]"
      exit 0 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

# --- Validate required params -----------------------------------------------
if [[ -z "$SUBSCRIPTION" || -z "$RESOURCE_GROUP" || -z "$APP_NAME" ]]; then
  echo "Error: --subscription, --resource-group, and --app-name are required."
  echo "Run ./bootstrap.sh --help for usage."
  exit 1
fi

echo "============================================"
echo "CB Advisory Prototype — Azure Bootstrap"
echo "============================================"
echo ""
echo "Subscription:   $SUBSCRIPTION"
echo "Resource Group:  $RESOURCE_GROUP"
echo "App Name:        $APP_NAME"
echo "Location:        $LOCATION"
echo ""

# --- Set subscription -------------------------------------------------------
echo "→ Setting subscription..."
az account set --subscription "$SUBSCRIPTION"

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

# --- Output results ----------------------------------------------------------
echo ""
echo "============================================"
echo "  Setup Complete"
echo "============================================"
echo ""
echo "Static Web App URL:"
echo "  https://$APP_URL"
echo ""
echo "Deployment Token (add as GitHub repo secret: AZURE_STATIC_WEB_APPS_API_TOKEN):"
echo "  $DEPLOYMENT_TOKEN"
echo ""
echo "Next steps:"
echo "  1. Go to your GitHub repo → Settings → Secrets and variables → Actions"
echo "  2. Create a new secret named: AZURE_STATIC_WEB_APPS_API_TOKEN"
echo "  3. Paste the deployment token above as the value"
echo "  4. Push code to main — the GitHub Action will deploy automatically"
echo ""
