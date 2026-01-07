import React, { useState, useEffect } from 'react';
import { Zap, RefreshCw } from 'lucide-react';
import {
    Background,
    FloatingDecoration,
    Header,
    TranslateInput,
    TranslationResult
} from './components';
import { translateText } from './services/api';

function App() {
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    // 检测移动端
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleTranslate = async () => {
        if (!inputText.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const response = await translateText(inputText);
            setResult(response);
        } catch (err) {
            setError(err.message || '翻译失败');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-dark text-white font-sans overflow-x-hidden relative flex flex-col">
            <Background />

            {/* 桌面端装饰保持不变 */}
            {!isMobile && (
                <>
                    <FloatingDecoration emoji="✨" className="top-[10%] left-[5%]" delay="0s" />
                    <FloatingDecoration emoji="🚀" className="top-[15%] right-[10%]" animation="animate-bounce-subtle" delay="1s" />
                    <FloatingDecoration emoji="💫" className="bottom-[20%] left-[8%]" delay="2s" />
                    <FloatingDecoration emoji="🔥" className="top-[40%] left-[2%]" animation="animate-pulse" delay="1.5s" />
                </>
            )}

            {/* 主内容区域 */}
            <main className={`relative z-10 w-full max-w-4xl mx-auto ${isMobile ? 'px-5 pt-4 pb-32 flex-1' : 'px-6 py-16'}`}>
                <Header />

                {/* 输入区 */}
                <TranslateInput
                    value={inputText}
                    onChange={setInputText}
                    onSubmit={handleTranslate}
                    loading={loading}
                    disabled={loading || !inputText.trim()}
                    isMobile={isMobile}
                />

                {/* 错误提示 */}
                {error && (
                    <div className="my-4 p-4 bg-red-600/90 border-2 border-white/50 rounded-xl animate-wiggle">
                        <p className="text-sm font-bold text-center">{error}</p>
                    </div>
                )}

                {/* 翻译结果 */}
                <TranslationResult result={result} isMobile={isMobile} />
            </main>

            {/* 移动端底部固定操作栏 */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-bg-dark/90 backdrop-blur-xl border-t border-white/10 z-50">
                    <button
                        onClick={handleTranslate}
                        disabled={loading || !inputText.trim()}
                        className={`
              w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-lg uppercase tracking-widest transition-all active:scale-95
              ${loading
                                ? 'bg-gray-700 text-white/50'
                                : 'bg-gradient-to-r from-accent-magenta to-accent-cyan shadow-[0_0_20px_rgba(255,58,242,0.4)]'
                            }
            `}
                    >
                        {loading ? <RefreshCw className="animate-spin" /> : <Zap className="animate-pulse" />}
                        {loading ? '翻译中...' : '立即翻译'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
