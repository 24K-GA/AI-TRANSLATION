"""
应用配置管理
使用 Pydantic Settings 管理环境变量
"""
from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """应用配置"""
    
    # 数据库配置 - 优先使用构建的 URL
    POSTGRES_USER: str = "translator"
    POSTGRES_PASSWORD: str = "password"
    POSTGRES_DB: str = "translator_db"
    POSTGRES_HOST: str = "db"
    POSTGRES_PORT: int = 5432
    
    # 允许直接覆盖，否则自动构建
    DATABASE_URL: str | None = None

    @property
    def sync_database_url(self) -> str:
        """获取数据库连接 URL"""
        if self.DATABASE_URL:
            return self.DATABASE_URL
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
    # DeepSeek API 配置
    DEEPSEEK_API_KEY: str = ""
    DEEPSEEK_API_BASE: str = "https://api.deepseek.com/v1"
    DEEPSEEK_MODEL: str = "deepseek-chat"
    
    # CORS 配置
    CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000", "http://localhost"]
    
    # 应用配置
    DEBUG: bool = False
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"  # 忽略多余的环境变量


@lru_cache()
def get_settings() -> Settings:
    """获取配置单例"""
    return Settings()
