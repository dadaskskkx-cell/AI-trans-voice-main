import React, { useState } from 'react';
import { PRODUCT_MODULES } from '../constants';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const ProductModules: React.FC = () => {
  const [activeModule, setActiveModule] = useState(PRODUCT_MODULES[0]);

  return (
    <section id="modules" className="py-24 bg-[#1F0201] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">全链路功能模块</h2>
          <p className="text-slate-400">
            从素材上传到收益结算，北斗智影提供端到端的短剧出海基础设施。
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Navigation (Left) */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            {PRODUCT_MODULES.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module)}
                className={`text-left p-6 rounded-xl transition-all duration-300 border group ${activeModule.id === module.id
                  ? 'bg-gradient-to-r from-[#D02034]/20 to-black/40 border-[#D02034] shadow-lg shadow-[#D02034]/10'
                  : 'bg-black/20 border-transparent hover:bg-black/40 hover:border-[#D02034]/30'
                  }`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className={`p-2 rounded-lg ${activeModule.id === module.id ? 'bg-[#D02034] text-white' : 'bg-white/5 text-slate-400 group-hover:bg-[#D02034]/10 group-hover:text-white'
                    }`}>
                    {React.cloneElement(module.icon as React.ReactElement, { size: 20 })}
                  </div>
                  <h3 className={`font-semibold text-lg ${activeModule.id === module.id ? 'text-white' : 'text-slate-300 group-hover:text-white'
                    }`}>
                    {module.title}
                  </h3>
                </div>
                <p className={`text-sm pl-[52px] ${activeModule.id === module.id ? 'text-[#00F0FF]' : 'text-slate-500'
                  }`}>
                  {module.subtitle}
                </p>
              </button>
            ))}
          </div>

          {/* Visualization (Right) */}
          <div className="lg:w-2/3">
            <div className="relative h-full min-h-[500px] bg-black/40 rounded-2xl border border-[#D02034]/20 p-8 flex flex-col justify-center overflow-hidden shadow-2xl">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D02034]/10 rounded-full blur-[80px] -z-0 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-[#00F0FF]/10 rounded-xl text-[#00F0FF]">
                    {React.cloneElement(activeModule.icon as React.ReactElement, { size: 40 })}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1">{activeModule.title}</h3>
                    <p className="text-[#00F0FF] text-lg">{activeModule.subtitle}</p>
                  </div>
                </div>

                <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                  {activeModule.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeModule.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-5 rounded-lg bg-black/40 border border-[#D02034]/20 hover:border-[#D02034]/50 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-[#00F0FF] flex-shrink-0" />
                      <span className="text-slate-200 text-lg font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};