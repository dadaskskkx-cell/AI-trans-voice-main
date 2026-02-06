import React from 'react';
import { FEATURES } from '../constants';

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 relative bg-[#1F0201]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">为什么选择我们？</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            专为短剧出海打造的 AI 工业化生产流，解决传统译制成本高、周期长、质量不稳定的痛点。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="glass-card p-8 rounded-2xl hover:bg-[#D02034]/5 transition-all duration-300 group hover:-translate-y-1 border border-[#D02034]/20"
            >
              <div className="mb-6 p-4 rounded-xl bg-black/40 w-fit group-hover:bg-[#D02034]/20 transition-colors border border-[#D02034]/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};