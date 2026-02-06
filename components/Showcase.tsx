import React, { useState, useRef, useEffect } from 'react';
import { DEMO_VIDEOS } from '../constants';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

export const Showcase: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'Original' | 'JP' | 'FR'>('Original');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLangChange = (lang: 'Original' | 'JP' | 'FR') => {
    setActiveLang(lang);
    if (videoRef.current) {
      setTimeout(() => {
        if (isPlaying) videoRef.current?.play();
      }, 50);
    }
  };

  return (
    <section id="showcase" className="py-20 bg-[#1F0201] border-t border-[#D02034]/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">真实成片示例</h2>
          <p className="text-slate-400">
            同一部短剧，不同语言版本，音色一致、情绪同步、声画对齐。
          </p>
        </div>

        {/* Language Switcher */}
        <div className="flex justify-center mb-10">
          <div className="flex p-1 bg-black/40 rounded-xl border border-[#D02034]/30 backdrop-blur-sm">
            {[
              { id: 'Original', label: '原始视频 (英文)' },
              { id: 'JP', label: '日语' },
              { id: 'FR', label: '法语' }
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => handleLangChange(lang.id as any)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeLang === lang.id
                  ? 'bg-gradient-to-r from-[#D02034] to-[#9917B4] text-white shadow-lg shadow-[#D02034]/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Video Player */}
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(208,32,52,0.15)] border border-[#D02034]/30 bg-black relative group">
          <video
            ref={videoRef}
            src={DEMO_VIDEOS[activeLang]}
            className="w-full aspect-video object-contain bg-black"
            controls
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-mono pointer-events-none">
            NorthStar AI Engine
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          * 建议佩戴耳机体验最佳音质。支持点击全屏播放。
        </div>
      </div>
    </section>
  );
};