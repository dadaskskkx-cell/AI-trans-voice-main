import { fileURLToPath } from 'url';
import { dirname } from 'path';

const APP_ID = 'cli_a90fe6c9a6381cc7';
const APP_SECRET = 'ycWR9VTUhjPJ1Vki7hl6UcQTj0wslBrj';
const APP_TOKEN = 'QwtXbDxRBaBGeWs62Bsciff6nGh';
const TABLE_ID = 'tbl39i3J4161474z';

async function getTenantAccessToken() {
    console.log('Authenticating...');
    const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ app_id: APP_ID, app_secret: APP_SECRET })
    });
    const data = await response.json();
    if (data.code !== 0) throw new Error(`Auth failed: ${data.msg}`);
    return data.tenant_access_token;
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    try {
        const token = await getTenantAccessToken();
        console.log('Got Access Token.');

        // 1. Try to LIST records first (read test)
        console.log(`\n[Test 1] Listing records for Table: ${TABLE_ID}...`);
        const listResponse = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const listResult = await listResponse.json();

        if (listResult.code === 0) {
            console.log(`[Success] Can read table. Found ${listResult.data.total} records.`);
        } else {
            console.error(`[Failed] Cannot read table. Code: ${listResult.code}, Msg: ${listResult.msg}`);
            // If read fails, write will definitely fail
            return;
        }

        // 2. Try to ADD record (write test)
        console.log(`\n[Test 2] Adding record...`);
        const fields = {
            "您的昵称": "Debug用户",
            "联系方式": "13900000000",
            "公司名称": "Debug公司",
            "需求说明": "测试"
        };
        const addResponse = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ fields: fields })
        });
        const addResult = await addResponse.json();

        if (addResult.code === 0) {
            console.log('[Success] Record added!');
        } else {
            console.error(`[Failed] Add record error. Code: ${addResult.code}, Msg: ${addResult.msg}`);
        }

    } catch (e) {
        console.error('Script Error:', e);
    }
}

main();
