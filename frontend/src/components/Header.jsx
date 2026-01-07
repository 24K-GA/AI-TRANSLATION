import React from 'react';
import { Languages } from 'lucide-react';
import { ACCENTS } from '../utils/constants';

const Header = () => (
    <header className="mb-4 md:mb-16 text-center">
        {/* 桌面端大标题 */}
        <div className="hidden md:block space-y-4">
            <div className="inline-block animate-bounce-subtle">
                <div className="p-4 bg-bg-card border-4 border-accent-cyan rounded-2xl shadow-[8px_8px_0_#FF3AF2]">
                    <Languages size={48} className="text-accent-cyan" />
                </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">
                <span className="block text-white" style={{ textShadow: `4px 4px 0px ${ACCENTS.purple}, 8px 8px 0px ${ACCENTS.magenta}, 12px 12px 0px ${ACCENTS.cyan}` }}>
                    AI 翻译
                </span>
                <span className="block gradient-text">助手</span>
            </h1>
        </div>

        {/* 移动端极简标题 - 类似 App 顶栏 */}
        <div className="md:hidden flex items-center justify-center gap-2 py-2">
            <div className="p-1.5 bg-bg-card border border-accent-cyan rounded-lg">
                <Languages size={18} className="text-accent-cyan" />
            </div>
            <h1 className="text-xl font-black italic tracking-tighter text-white">
                AI <span className="text-accent-cyan">Translator</span>
            </h1>
        </div>
    </header>
);

export default Header;
