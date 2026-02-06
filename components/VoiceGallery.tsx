import React, { useState } from 'react';
import { VOICE_CHARACTERS } from '../constants';
import { Play, Pause, Disc } from 'lucide-react';

export const VoiceGallery: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      // Simulate audio play duration
      setTimeout(() => setPlayingId(null), 3000);
    }
  };

  return (
    <section id="voices" className="py-24 relative bg-[#1F0201]">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">AI 角色声纹库</h2>
            <p className="text-slate-400">
              专为短剧定制的声纹模型，覆盖霸总、甜宠、古装等主流题材。支持情感强度调节，让 AI 配音通过图灵测试。
            </p>
          </div>
          <button className="text-[#00F0FF] font-medium hover:text-white flex items-center transition-colors">
            查看全部 100+ 声纹 <ArrowRight size={16} className="ml-2" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VOICE_CHARACTERS.map((char) => (
            <div
              key={char.id}
              className="group relative bg-black/40 border border-[#D02034]/20 rounded-2xl p-6 hover:border-[#D02034] transition-all duration-300 hover:shadow-xl hover:shadow-[#D02034]/20 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={char.avatar}
                    alt={char.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#D02034]/30 group-hover:border-[#00F0FF] transition-colors"
                  />
                  {playingId === char.id && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00F0FF] rounded-full flex items-center justify-center animate-pulse">
                      <Disc size={12} className="text-black animate-spin" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{char.name}</h3>
                  <p className="text-sm text-[#00F0FF]">{char.archetype}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {char.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 text-slate-400 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium bg-white/5 text-slate-500 cursor-not-allowed"
              >
                <Play size={18} fill="currentColor" /> 试听声线
              </div>

              {/* Audio visualizer bar simulation */}
              <div className="flex items-end justify-center gap-1 h-6 mt-4 opacity-50">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 bg-[#00F0FF] rounded-t-sm transition-all duration-200 ${playingId === char.id ? 'animate-pulse' : 'h-1'
                      }`}
                    style={{
                      height: playingId === char.id ? `${Math.random() * 100}%` : '4px',
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper for 'View All' button
const ArrowRight = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);