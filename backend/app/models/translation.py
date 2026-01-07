"""
翻译记录数据模型
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from ..database import Base


class Translation(Base):
    """翻译记录表"""
    
    __tablename__ = "translations"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    source_text = Column(Text, nullable=False, comment="原文")
    translated_text = Column(Text, nullable=False, comment="译文")
    keywords = Column(JSON, nullable=True, comment="关键词列表")
    created_at = Column(
        DateTime, 
        default=datetime.utcnow, 
        nullable=False, 
        comment="创建时间"
    )
    
    def __repr__(self):
        return f"<Translation(id={self.id}, source_text={self.source_text[:20]}...)>"
