/**
 * API 服务封装
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

/**
 * 翻译文本
 * @param {string} text - 待翻译的中文文本
 * @returns {Promise<{id: number, translation: string, keywords: Array, created_at: string}>}
 */
export const translateText = async (text) => {
    const response = await fetch(`${API_BASE}/translate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: '翻译服务暂时不可用' }));
        throw new Error(error.detail || '翻译失败');
    }

    return response.json();
};

/**
 * 获取翻译历史
 * @param {number} skip - 跳过记录数
 * @param {number} limit - 返回记录数
 * @returns {Promise<{total: number, items: Array}>}
 */
export const getTranslationHistory = async (skip = 0, limit = 10) => {
    const response = await fetch(`${API_BASE}/translate?skip=${skip}&limit=${limit}`);

    if (!response.ok) {
        throw new Error('获取历史记录失败');
    }

    return response.json();
};

/**
 * 获取单条翻译记录
 * @param {number} id - 记录ID
 * @returns {Promise<Object>}
 */
export const getTranslation = async (id) => {
    const response = await fetch(`${API_BASE}/translate/${id}`);

    if (!response.ok) {
        throw new Error('获取记录失败');
    }

    return response.json();
};
