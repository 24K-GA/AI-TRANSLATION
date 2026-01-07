"""
翻译相关的 Pydantic 模式
"""
from datetime import datetime
from pydantic import BaseModel, Field


class KeywordItem(BaseModel):
    """关键词项"""
    zh: str = Field(..., description="中文词语")
    en: str = Field(..., description="英文翻译")
    pinyin: str = Field(..., description="拼音")


class TranslationRequest(BaseModel):
    """翻译请求"""
    text: str = Field(..., min_length=1, max_length=5000, description="待翻译的中文文本")


class TranslationResponse(BaseModel):
    """翻译响应"""
    id: int = Field(..., description="记录ID")
    translation: str = Field(..., description="英文翻译结果")
    keywords: list[KeywordItem] = Field(default=[], description="关键词列表")
    created_at: datetime = Field(..., description="创建时间")


class TranslationHistory(BaseModel):
    """翻译历史记录"""
    id: int
    source_text: str
    translated_text: str
    keywords: list[KeywordItem] = []
    created_at: datetime
    
    class Config:
        from_attributes = True


class TranslationListResponse(BaseModel):
    """翻译历史列表响应"""
    total: int = Field(..., description="总数")
    items: list[TranslationHistory] = Field(default=[], description="历史记录列表")
