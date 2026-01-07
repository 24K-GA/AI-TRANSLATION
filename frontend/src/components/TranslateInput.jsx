import React from 'react';
import { Zap, RefreshCw, ArrowRight } from 'lucide-react';

/**
 * 翻译输入组件 - App 级体验重构
 * 移动端：移除内部按钮，变为纯输入区
 * 桌面端：保持原有卡片样式
 */
const TranslateInput = ({ value, onChange, onSubmit, loading, disabled, isMobile }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!disabled && value.trim()) {
            onSubmit();
        }
    };

    // 移动端视图
    if (isMobile) {
        return (
            <section className="relative px-0 mb-4">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="请输入要翻译的内容..."
                    className="w-full bg-transparent border-none text-2xl font-medium placeholder:text-white/20 focus:ring-0 resize-none min-h-[20vh] outline-none p-0 leading-relaxed"
                    disabled={loading}
                />
                {/* 语言指示器 */}
                <div className="flex items-center gap-2 mt-2 opacity-60">
                    <span className="text-xs font-bold text-accent-magenta border border-accent-magenta px-2 py-0.5 rounded">CN</span>
                    <ArrowRight size={12} />
                    <span className="text-xs font-bold text-accent-cyan border border-accent-cyan px-2 py-0.5 rounded">EN</span>
                </div>
            </section>
        );
    }

    // 桌面端视图 (保持原有 Maximalism 风格)
    return (
        <section className="relative mb-12 group">
            <div className="glow-effect"></div>
            <form onSubmit={handleSubmit} className="card-primary relative">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="输入你想翻译的内容..."
                    className="input-primary"
                    disabled={loading}
                />

                <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                        <span className="tag-magenta">CHINESE</span>
                        <span className="tag-cyan">TO ENGLISH</span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !value.trim()}
                        className={`
                group relative flex items-center gap-3 px-8 py-4 rounded-full font-black uppercase tracking-widest transition-all duration-300
                ${loading
                                ? 'bg-gray-600 opacity-50 cursor-wait'
                                : 'bg-gradient-to-r from-accent-magenta via-accent-purple to-accent-cyan hover:scale-110 active:scale-95'
                            }
                border-4 border-accent-yellow shadow-[4px_4px_0_#FFFFFF]
                disabled:hover:scale-100
              `}
                    >
                        {loading ? <RefreshCw className="animate-spin" size={20} /> : <Zap className="group-hover:animate-pulse" size={20} />}
                        {loading ? '正在充能...' : '立即翻译'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default TranslateInput;
