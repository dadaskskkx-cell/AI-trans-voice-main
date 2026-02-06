import { FormData } from '../types';

const APP_ID = 'cli_a90fe6c9a6381cc7';
const APP_SECRET = 'ycWR9VTUhjPJ1Vki7hl6UcQTj0wslBrj';

// TODO: Replace these with the actual values once the user provides the correct Bitable link
// Look for a link starting with: https://inbeidou.feishu.cn/base/bascn...
const APP_TOKEN = 'QwtXbDxRBaBGeWs62Bsciff6nGh'; // App Token from URL
const TABLE_ID = 'tbl7KBlUtUOs738I'; // Verified Table ID from automatic discovery

interface FeishuTokenResponse {
    code: number;
    msg: string;
    tenant_access_token: string;
}

interface FeishuRecordResponse {
    code: number;
    data: {
        record: {
            record_id: string;
        }
    };
    msg: string;
}

export const FeishuService = {
    /**
     * Get Tenant Access Token
     * Note: In a real production app, this should be done on the backend to keep APP_SECRET safe.
     * For this demo/local version, we do it here. We likely need to set up a proxy to avoid CORS.
     */
    async getTenantAccessToken(): Promise<string> {
        try {
            // Using a local proxy path if configured, otherwise direct (may fail CORS)
            const response = await fetch('/api/auth/v3/tenant_access_token/internal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    app_id: APP_ID,
                    app_secret: APP_SECRET,
                }),
            });

            const data: FeishuTokenResponse = await response.json();
            if (data.code !== 0) {
                throw new Error(`Feishu Auth failed: ${data.msg}`);
            }
            return data.tenant_access_token;
        } catch (error) {
            console.error('Error getting Feishu token:', error);
            throw error;
        }
    },

    /**
     * Add a record to Bitable
     */
    async addRecord(formData: FormData) {
        if (!APP_TOKEN || !TABLE_ID) {
            console.warn('Feishu App Token or Table ID is missing. Please configure them in services/feishu.ts');
            return;
        }

        try {
            const token = await this.getTenantAccessToken();

            const fields = {
                "您的昵称": formData.nickname,
                "联系方式": formData.contact,
                "公司名称": formData.company,
                "需求说明": formData.requirements || "无"
            };

            const response = await fetch(`/api/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    fields: fields
                })
            });

            const result = await response.json();
            if (result.code !== 0) {
                throw new Error(`Submission failed: ${result.msg}`);
            }
            return result;
        } catch (error) {
            console.error('Error submitting to Feishu:', error);
            throw error;
        }
    }
};
