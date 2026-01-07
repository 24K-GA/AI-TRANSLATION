"""
AI 翻译助手 - FastAPI 后端入口
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .database import init_db
from .routers import translate_router

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期管理"""
    # 启动时初始化数据库
    await init_db()
    yield
    # 关闭时清理资源


app = FastAPI(
    title="AI 翻译助手 API",
    description="基于 DeepSeek 的中英文翻译服务",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(translate_router, prefix="/api/v1")


@app.get("/health", tags=["健康检查"])
async def health_check():
    """健康检查端点"""
    return {"status": "healthy", "service": "ai-translator"}


@app.get("/", tags=["根路径"])
async def root():
    """API 根路径"""
    return {
        "message": "欢迎使用 AI 翻译助手 API",
        "docs": "/docs",
        "version": "1.0.0"
    }
