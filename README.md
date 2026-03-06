# Webflow Astro Sync

Automated sync from Webflow CMS to Astro Cloud.

## Setup

1. Add GitHub Secrets:
   - `WEBFLOW_API_TOKEN` - Your Webflow API token
   - `CLOUDFLARE_API_TOKEN` - Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID` - Cloudflare account ID
   - `GH_TOKEN` - GitHub token with repo access

2. Import `n8n-workflow.json` to n8n

3. Configure n8n environment variables:
   - `WEBFLOW_API_TOKEN`
   - `GH_TOKEN`

4. Set webhook URL in Webflow CMS to:
   ```
   https://n8n.srv1091615.hstgr.cloud/webhook/webflow-astro-sync
   ```
