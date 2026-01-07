import React from 'react';
import { Key } from 'lucide-react';

/**
 * 关键词卡片组件 - 移动端优化版本
 */
const KeywordCard = ({ keyword, index }) => {
    // 根据索引选择不同的样式变体
    const variants = [
        'bg-bg-card border-accent-magenta shadow-[4px_4px_0_#FFE600] md:shadow-[8px_8px_0_#FFE600] rotate-1',
        'bg-bg-card-alt border-accent-cyan shadow-[4px_4px_0_#7B2FFF] md:shadow-[8px_8px_0_#7B2FFF] -rotate-1',
        'bg-bg-card border-accent-yellow shadow-[4px_4px_0_#FF3AF2] md:shadow-[8px_8px_0_#FF3AF2] rotate-2',
    ];

    const variant = variants[index % 3];

    return (
        <div
            className={`
        p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 md:border-4 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2
        ${variant}
      `}
        >
            <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                <Key size={16} className="text-accent-yellow md:hidden" />
                <Key size={20} className="text-accent-yellow hidden md:block" />
                <span className="text-[10px] md:text-xs font-bold text-white/50 tracking-widest uppercase">
                    {keyword.pinyin}
                </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-0.5 md:mb-1">
                {keyword.zh}
            </h3>
            <p className="text-base md:text-xl font-bold text-accent-cyan uppercase italic">
                {keyword.en}
            </p>
        </div>
    );
};

export default KeywordCard;
