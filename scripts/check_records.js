const APP_ID = 'cli_a90fe6c9a6381cc7';
const APP_SECRET = 'ycWR9VTUhjPJ1Vki7hl6UcQTj0wslBrj';
const APP_TOKEN = 'QwtXbDxRBaBGeWs62Bsciff6nGh';
const TABLE_ID = 'tbl7KBlUtUOs738I';

async function getTenantAccessToken() {
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
        console.log('Checking for recent records...');

        const response = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records?page_size=10`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const result = await response.json();
        if (result.code === 0) {
            const records = result.data.items;
            console.log(`Found ${result.data.total} records total.`);
            if (records.length > 0) {
                console.log('--- LATEST RECORD ---');
                const latest = records[records.length - 1]; // Just taking the last one in the page for checking
                console.log(JSON.stringify(latest.fields, null, 2));
                console.log('---------------------');
            } else {
                console.log('Table is empty.');
            }
        } else {
            console.error(`Failed to list records: ${result.msg}`);
        }

    } catch (e) {
        console.error(e);
    }
}

main();
