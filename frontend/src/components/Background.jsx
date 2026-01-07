import React from 'react';
import { ACCENTS } from '../utils/constants';

/**
 * 背景装饰组件 - 移动端优化版本
 */
const Background = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
        {/* 点阵网格 - 移动端更小的间距 */}
        <div
            className="absolute inset-0 opacity-10 md:opacity-20"
            style={{
                backgroundImage: `radial-gradient(circle, ${ACCENTS.magenta} 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
            }}
        />

        {/* 对角条纹 - 移动端隐藏 */}
        <div
            className="absolute inset-0 opacity-0 md:opacity-10"
            style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, ${ACCENTS.yellow} 20px, ${ACCENTS.yellow} 21px)`,
            }}
        />

        {/* 渐变光晕 */}
        <div
            className="absolute inset-0 opacity-20 md:opacity-30"
            style={{
                background: `
          radial-gradient(circle at 20% 30%, ${ACCENTS.purple}33 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, ${ACCENTS.cyan}33 0%, transparent 50%)
        `
            }}
        />

        {/* 大背景文字 - 移动端缩小 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 opacity-[0.03] md:opacity-5 select-none text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[20rem] font-black tracking-tighter whitespace-nowrap">
            TRANSLATE
        </div>
    </div>
);

export default Background;
