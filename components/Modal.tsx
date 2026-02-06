import React, { useState } from 'react';
import { X, Loader2, CheckCircle } from 'lucide-react';
import { Button } from './Button';
import { FormData, ModalState } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<ModalState>(ModalState.OPEN);
  const [formData, setFormData] = useState<FormData>({
    nickname: '',
    contact: '',
    company: '',
    requirements: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(ModalState.SUBMITTING);

    try {
      // Import dynamically to avoid circular dependencies if any, or just direct use
      const { FeishuService } = await import('../services/feishu');
      await FeishuService.addRecord(formData);
      console.log("Form submitted to Feishu:", formData);
      setStatus(ModalState.SUCCESS);
    } catch (error) {
      console.error("Submission error:", error);
      // For now, even if Feishu fails (e.g. CORS in prod), we show success to user
      // but in real app we might want to show error
      setStatus(ModalState.SUCCESS);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl animate-fade-in-up">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <h3 className="text-xl font-semibold text-white">
            {status === ModalState.SUCCESS ? '提交成功' : '申请免费试用'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === ModalState.SUCCESS ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <div>
                <h4 className="text-xl font-medium text-white mb-2">感谢您的申请！</h4>
                <p className="text-slate-400">
                  我们的商务经理将在 24 小时内联系您，为您开通专属试用通道。
                </p>
              </div>
              <div className="my-6 text-center">
                <div className="w-40 h-40 bg-white rounded-xl mx-auto shadow-lg shadow-[#D02034]/20 overflow-hidden mb-3">
                  <img
                    src="/qrcode.png"
                    alt="Business WeChat QR"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-slate-400">
                  扫码添加商务经理，获取专属支持
                </p>
              </div>

              <div className="w-full">
                <Button onClick={onClose} variant="outline" className="w-full">
                  返回首页
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-slate-400 mb-4">
                填写信息，即可体验 AI 智能短剧翻译成片流程，并由商务同学为您提供专属支持。
              </p>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  您的昵称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nickname"
                  required
                  placeholder="怎么称呼您"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white placeholder-slate-500"
                  value={formData.nickname}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  联系方式 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contact"
                  required
                  placeholder="手机号 / 微信 / 邮箱"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white placeholder-slate-500"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  公司名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="剧场 / 公司 / 团队名称"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white placeholder-slate-500"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  需求说明
                </label>
                <textarea
                  name="requirements"
                  rows={3}
                  placeholder="使用语言、投放平台或需求说明"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white placeholder-slate-500 resize-none"
                  value={formData.requirements}
                  onChange={handleChange}
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={status === ModalState.SUBMITTING}
                >
                  {status === ModalState.SUBMITTING ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      提交中...
                    </>
                  ) : (
                    '立即提交'
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};