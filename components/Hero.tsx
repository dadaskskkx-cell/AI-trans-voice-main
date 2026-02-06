import React from 'react';
import { Button } from './Button';
import { Play } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Abstract Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#D02034]/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-[#00F0FF]/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 md:mb-8 leading-tight">
          原角色音色复刻<br />
          <span className="gradient-text">一体化 AI 配音成片</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          一站式完成短剧翻译、配音与成片输出，让海外版本和原片一样好看、好听。
          <span className="block mt-2 text-slate-500 text-base">
            ✓ 情绪同步 · ✓ 一体化完成 · ✓ 拿到即投放
          </span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button size="lg" onClick={onCtaClick} variant="primary" className="group min-w-[200px]">
            <span className="mr-2">免费试用</span>
            <span className="text-xs opacity-90 block sm:inline font-normal">· 生成你的海外配音短剧</span>
          </Button>
          <Button variant="secondary" size="lg" onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}>
            <Play className="w-4 h-4 mr-2 fill-current" />
            观看样片
          </Button>
        </div>
      </div>
    </section>
  );
};