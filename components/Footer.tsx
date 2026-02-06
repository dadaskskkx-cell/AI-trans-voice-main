import React from 'react';
import { Button } from './Button';

interface FooterProps {
  onCtaClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onCtaClick }) => {
  return (
    <footer className="bg-[#140101] py-8 md:py-12 border-t border-[#D02034]/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D02034] via-[#9917B4] to-[#00F0FF]">
              北斗智影
            </div>
            <p className="text-slate-500 text-sm mt-2">
              赋能短剧出海，连接全球观众
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <span className="text-slate-400 text-sm">准备好开启全球化了吗？</span>
            <Button size="sm" onClick={onCtaClick}>免费申请试用</Button>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center md:text-left text-sm text-slate-600">
          <p>&copy; {new Date().getFullYear()} InBeidou (北斗智影). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};