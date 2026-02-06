import { fileURLToPath } from 'url';
import { dirname } from 'path';

const APP_ID = 'cli_a90fe6c9a6381cc7';
const APP_SECRET = 'ycWR9VTUhjPJ1Vki7hl6UcQTj0wslBrj';
const WIKI_TOKEN = 'Z3SJwOHkDikuqQkkk6jcPrDRnQd';

async function getTenantAccessToken() {
    console.log('Authenticating with Feishu...');
    try {
        const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ app_id: APP_ID, app_secret: APP_SECRET })
        });

        const data = await response.json();
        if (data.code !== 0) throw new Error(`Auth failed: ${data.msg}`);
        return data.tenant_access_token;
    } catch (e) {
        console.error('Fetch Error in getTenantAccessToken:', e);
        throw e;
    }
}

async function resolveWikiNode(wikiToken, accessToken) {
    console.log(`Attempting to resolve Wiki Token: ${wikiToken}...`);
    try {
        const response = await fetch(`https://open.feishu.cn/open-apis/wiki/v2/spaces/get_node?token=${wikiToken}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        const data = await response.json();
        if (data.code !== 0) {
            console.log(`Wiki Resolution Failed: ${data.msg} (Code: ${data.code})`);
            // Code 131008 = No permission (Robot needs Wiki Read permission)
            return null;
        }

        console.log('Wiki Resolution Response:', JSON.stringify(data.data, null, 2));

        const node = data.data.node;
        if (node && node.obj_type === 'bitable') {
            console.log(`[SUCCESS] Resolved to Bitable Token: ${node.obj_token}`);
            return node.obj_token;
        } else {
            console.log(`Resolved node is not a Bitable. Type: ${node?.obj_type}`);
            return null;
        }
    } catch (e) {
        console.error('Error resolving wiki node:', e);
        return null;
    }
}

async function listTables(appToken, accessToken) {
    console.log(`Listing tables for App Token: ${appToken}...`);
    try {
        const response = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        const data = await response.json();
        if (data.code !== 0) {
            console.error(`List Tables Failed: ${data.msg}`);
            return null;
        }
        return data.data.items;
    } catch (e) {
        return null;
    }
}

async function main() {
    try {
        const token = await getTenantAccessToken();
        console.log('Authentication successful.');

        // The user's provided App Token from the URL
        // https://inbeidou.feishu.cn/base/QwtXbDxRBaBGeWs62Bsciff6nGh
        const targetAppToken = 'QwtXbDxRBaBGeWs62Bsciff6nGh';

        console.log(`\nListing tables for App: ${targetAppToken}`);
        const tables = await listTables(targetAppToken, token);

        if (tables) {
            console.log('\n--- FOUND TABLES ---');
            tables.forEach(table => {
                console.log(`NAME: [${table.name}]`);
                console.log(`ID:   [${table.table_id}]`); // Brackets to catch whitespace
                console.log('-------------------');
            });
        } else {
            console.log('No tables found.');
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
