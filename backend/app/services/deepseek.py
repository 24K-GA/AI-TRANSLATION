"""
DeepSeek AI 服务封装
"""
import json
import asyncio
import httpx
from typing import Optional

from ..config import get_settings
from ..schemas.translation import KeywordItem

settings = get_settings()


class DeepSeekService:
    """DeepSeek AI 翻译服务"""
    
    SYSTEM_PROMPT = """You are a professional AI translation assistant. 
Translate the given Chinese text to English. 
Also, extract 3-5 key vocabulary words/phrases from the text with their English meanings.

Respond ONLY in the following JSON format (no additional text):
{
    "translation": "The English translation here",
    "keywords": [
        {"zh": "词语", "en": "word", "pinyin": "cí yǔ"},
        ...
    ]
}"""

    def __init__(self):
        self.api_key = settings.DEEPSEEK_API_KEY
        self.api_base = settings.DEEPSEEK_API_BASE
        self.model = settings.DEEPSEEK_MODEL
        
    async def translate(self, text: str, max_retries: int = 3) -> dict:
        """
        调用 DeepSeek API 进行翻译
        
        Args:
            text: 待翻译的中文文本
            max_retries: 最大重试次数
            
        Returns:
            包含 translation 和 keywords 的字典
        """
        if not self.api_key:
            raise ValueError("DEEPSEEK_API_KEY 未配置")
            
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": self.SYSTEM_PROMPT},
                {"role": "user", "content": f"请翻译以下中文：{text}"}
            ],
            "temperature": 0.3,
            "response_format": {"type": "json_object"}
        }
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        delay = 1.0
        last_error: Optional[Exception] = None
        
        for attempt in range(max_retries):
            try:
                async with httpx.AsyncClient(timeout=30.0) as client:
                    response = await client.post(
                        f"{self.api_base}/chat/completions",
                        json=payload,
                        headers=headers
                    )
                    response.raise_for_status()
                    
                    data = response.json()
                    content = data["choices"][0]["message"]["content"]
                    result = json.loads(content)
                    
                    # 验证响应格式
                    if "translation" not in result:
                        raise ValueError("API 响应缺少 translation 字段")
                    
                    # 确保 keywords 格式正确
                    keywords = result.get("keywords", [])
                    validated_keywords = []
                    for kw in keywords:
                        if all(k in kw for k in ["zh", "en", "pinyin"]):
                            validated_keywords.append(KeywordItem(**kw).model_dump())
                    
                    return {
                        "translation": result["translation"],
                        "keywords": validated_keywords
                    }
                    
            except httpx.HTTPStatusError as e:
                last_error = e
                if e.response.status_code == 429:  # Rate limit
                    await asyncio.sleep(delay)
                    delay *= 2
                    continue
                raise
            except (json.JSONDecodeError, KeyError, ValueError) as e:
                last_error = e
                await asyncio.sleep(delay)
                delay *= 2
                continue
            except Exception as e:
                last_error = e
                await asyncio.sleep(delay)
                delay *= 2
                continue
        
        raise Exception(f"翻译失败，已重试 {max_retries} 次: {last_error}")


# 单例服务
deepseek_service = DeepSeekService()
