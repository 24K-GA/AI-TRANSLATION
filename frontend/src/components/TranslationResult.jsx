import React from 'react';
import { Quote } from 'lucide-react';
import KeywordCard from './KeywordCard';

const TranslationResult = ({ result, isMobile }) => {
    if (!result) return null;

    // 移动端视图：简洁卡片流
    if (isMobile) {
        return (
            <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* 分割线 */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                {/* 译文 */}
                <div className="space-y-2">
                    <h3 className="text-xs font-bold text-accent-cyan uppercase tracking-widest opacity-70">Translation</h3>
                    <p className="text-2xl font-bold leading-relaxed text-white">
                        {result.translation}
                    </p>
                </div>

                {/* 关键词 */}
                {result.keywords && result.keywords.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold text-accent-yellow uppercase tracking-widest opacity-70">Keywords</h3>
                        <div className="flex flex-col gap-3">
                            {result.keywords.map((kw, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
                                    <div>
                                        <span className="text-lg font-bold text-white">{kw.zh}</span>
                                        <span className="text-xs text-white/40 ml-2">{kw.pinyin}</span>
                                    </div>
                                    <span className="text-sm font-medium text-accent-cyan">{kw.en}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // 桌面端视图：卡片
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="relative">
                <div className="absolute -top-6 -left-4 z-20 bg-accent-yellow text-bg-dark px-6 py-2 rounded-full border-4 border-bg-dark font-black uppercase -rotate-6 shadow-[4px_4px_0_#FF3AF2]">
                    TRANSLATION
                </div>
                <div className="bg-white text-bg-dark p-10 rounded-[3rem] border-8 border-accent-cyan shadow-[16px_16px_0_#FF3AF2,32px_32px_0_#7B2FFF] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Quote size={80} fill="currentColor" />
                    </div>
                    <p className="text-3xl md:text-4xl font-black leading-tight">
                        {result.translation}
                    </p>
                </div>
            </div>

            {result.keywords && result.keywords.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {result.keywords.map((kw, idx) => (
                        <KeywordCard key={idx} keyword={kw} index={idx} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TranslationResult;
