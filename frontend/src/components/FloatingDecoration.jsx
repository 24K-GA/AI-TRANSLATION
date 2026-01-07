import React from 'react';

/**
 * 浮动装饰组件 - 移动端优化版本
 * 在移动端隐藏部分装饰，减少视觉干扰
 */
const FloatingDecoration = ({
    emoji,
    className = '',
    delay = '0s',
    animation = 'animate-float',
    hideOnMobile = false
}) => (
    <div
        className={`absolute pointer-events-none select-none ${animation} ${className} ${hideOnMobile ? 'hidden md:block' : ''}`}
        style={{ animationDelay: delay }}
    >
        <span className="text-2xl md:text-4xl lg:text-6xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] md:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            {emoji}
        </span>
    </div>
);

export default FloatingDecoration;
