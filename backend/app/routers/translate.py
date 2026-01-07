"""
翻译相关 API 路由
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from ..database import get_db
from ..models.translation import Translation
from ..schemas.translation import (
    TranslationRequest,
    TranslationResponse,
    TranslationHistory,
    TranslationListResponse
)
from ..services.deepseek import deepseek_service

router = APIRouter(prefix="/translate", tags=["翻译"])


@router.post("", response_model=TranslationResponse, summary="翻译中文到英文")
async def translate_text(
    request: TranslationRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    翻译中文文本到英文
    
    - **text**: 待翻译的中文文本 (1-5000字符)
    
    返回翻译结果和关键词列表
    """
    try:
        # 调用 DeepSeek API 进行翻译
        result = await deepseek_service.translate(request.text)
        
        # 保存到数据库
        translation = Translation(
            source_text=request.text,
            translated_text=result["translation"],
            keywords=result["keywords"]
        )
        db.add(translation)
        await db.flush()
        await db.refresh(translation)
        
        return TranslationResponse(
            id=translation.id,
            translation=result["translation"],
            keywords=result["keywords"],
            created_at=translation.created_at
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # 生产环境应使用 logging 模块
        print(f"[ERROR] 翻译服务异常: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="系统内部错误，请稍后重试"
        )


@router.get("", response_model=TranslationListResponse, summary="获取翻译历史")
async def get_translations(
    skip: int = Query(0, ge=0, description="跳过记录数"),
    limit: int = Query(10, ge=1, le=100, description="返回记录数"),
    db: AsyncSession = Depends(get_db)
):
    """
    获取翻译历史记录列表
    
    支持分页查询
    """
    # 查询总数
    count_query = select(func.count(Translation.id))
    total_result = await db.execute(count_query)
    total = total_result.scalar()
    
    # 查询记录
    query = (
        select(Translation)
        .order_by(Translation.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    result = await db.execute(query)
    translations = result.scalars().all()
    
    items = [
        TranslationHistory(
            id=t.id,
            source_text=t.source_text,
            translated_text=t.translated_text,
            keywords=t.keywords or [],
            created_at=t.created_at
        )
        for t in translations
    ]
    
    return TranslationListResponse(total=total, items=items)


@router.get("/{translation_id}", response_model=TranslationHistory, summary="获取单条翻译记录")
async def get_translation(
    translation_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    根据 ID 获取单条翻译记录
    """
    query = select(Translation).where(Translation.id == translation_id)
    result = await db.execute(query)
    translation = result.scalar_one_or_none()
    
    if not translation:
        raise HTTPException(status_code=404, detail="翻译记录不存在")
    
    return TranslationHistory(
        id=translation.id,
        source_text=translation.source_text,
        translated_text=translation.translated_text,
        keywords=translation.keywords or [],
        created_at=translation.created_at
    )
