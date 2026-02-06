import { fileURLToPath } from 'url';
import { dirname } from 'path';

const APP_ID = 'cli_a90fe6c9a6381cc7';
const APP_SECRET = 'ycWR9VTUhjPJ1Vki7hl6UcQTj0wslBrj';
const APP_TOKEN = 'QwtXbDxRBaBGeWs62Bsciff6nGh'; // The user provided Base Token

async function getTenantAccessToken() {
    console.log('[1] Authenticating...');
    const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ app_id: APP_ID, app_secret: APP_SECRET })
    });
    const data = await response.json();
    if (data.code !== 0) throw new Error(`Auth failed: ${data.msg}`);
    return data.tenant_access_token;
}

async function main() {
    try {
        const token = await getTenantAccessToken();
        console.log('[2] Got Access Token.');

        // 1. List Tables
        console.log(`[3] Listing tables for App: ${APP_TOKEN}...`);
        const listResponse = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const listResult = await listResponse.json();

        if (listResult.code !== 0) {
            console.error(`[Fatal] Failed to list tables. Code: ${listResult.code}, Msg: ${listResult.msg}`);
            return;
        }

        const tables = listResult.data.items;
        if (!tables || tables.length === 0) {
            console.error('[Fatal] No tables found in this Base.');
            return;
        }

        console.log(`[Success] Found ${tables.length} tables.`);
        const targetTable = tables[0];
        console.log(`Using First Table -> Name: ${targetTable.name}, ID: ${targetTable.table_id}`);

        const TABLE_ID = targetTable.table_id;

        // 2. Add Record to THIS table
        console.log(`[4] Attempting to add record to Table ID: ${TABLE_ID}...`);
        const fields = {
            "您的昵称": "HolisticTest",
            "联系方式": "1234567890",
            "公司名称": "TestCorp",
            "需求说明": "DynamicTest"
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
            console.log('[SUCCESS] Record added successfully!');
            console.log('Record ID:', addResult.data.record.record_id);
        } else {
            console.error(`[FAILED] Failed to add record. Code: ${addResult.code}, Msg: ${addResult.msg}`);

            // Diagnois: List Fields
            console.log(`\n[Diagnosis] Listing Fields for Table ${TABLE_ID}...`);
            const fieldsResponse = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/fields`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const fieldsResult = await fieldsResponse.json();
            if (fieldsResult.code === 0) {
                console.log('--- ACTUAL TABLE FIELDS ---');
                fieldsResult.data.items.forEach(f => {
                    console.log(`Field Name: "${f.field_name}"`);
                });
                console.log('---------------------------');
            }
        }

    } catch (e) {
        console.error('Script Error:', e);
    }
}

main();
