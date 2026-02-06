import {
  Globe2,
  Mic2,
  Layers,
  Zap,
  Play,
  CheckCircle2,
  Database,
  Wand2,
  Share2,
  BarChart3
} from 'lucide-react';
import React from 'react';

export const NAV_LINKS = [
  { name: '核心优势', href: '#features' },
  { name: '功能模块', href: '#modules' },
  { name: '声纹库', href: '#voices' },
  { name: '样片展示', href: '#showcase' },
  { name: '商务合作', href: '#contact' },
];

export const FEATURES = [
  {
    id: '1',
    title: '一站式 AI 成片闭环',
    description: '从短剧源片到目标语言成片，全流程由 AI + QA 完成，无需对接多个团队，降低沟通与时间成本。',
    icon: <Layers className="w-8 h-8 text-pink-400" />
  },
  {
    id: '2',
    title: '语境化 AI 翻译',
    description: '基于画面场景+角色人设进行翻译，自动规避文化禁忌，优化俚语表达，严格匹配时间轴。',
    icon: <Globe2 className="w-8 h-8 text-cyan-400" />
  },
  {
    id: '3',
    title: '原角色音色复刻',
    description: '通过音色复刻技术，还原角色声线、语气与情绪，做到“语言变了，但角色没变”。',
    icon: <Mic2 className="w-8 h-8 text-red-400" />
  },
  {
    id: '4',
    title: '成片级交付',
    description: '输出 MP4 成片，适配 TikTok / YouTube / Netflix 等主流平台，拿到即可投放。',
    icon: <Zap className="w-8 h-8 text-blue-400" />
  }
];

export const VIDEO_SAMPLES = [
  {
    id: 'v1',
    title: '霸道总裁系列 (CEO Drama)',
    cover: 'https://picsum.photos/400/700?random=1',
  },
  {
    id: 'v2',
    title: '古装穿越系列 (Historical)',
    cover: 'https://picsum.photos/400/700?random=2',
  },
  {
    id: 'v3',
    title: '现代悬疑系列 (Suspense)',
    cover: 'https://picsum.photos/400/700?random=3',
  }
];

export const PRODUCT_MODULES = [
  {
    id: 'asset',
    title: '素材管理中台',
    subtitle: 'Asset Management',
    description: '支持海量短剧素材极速上传与版权管理，自动解析剧集结构。',
    features: ['批量上传/断点续传', '剧集自动拆条', '版权水印保护', '云端媒资库'],
    icon: <Database />
  },
  {
    id: 'studio',
    title: 'AI 智影工坊',
    subtitle: 'AI Dubbing Studio',
    description: '可视化 AI 译制工作台，支持人声分离、台词修改与唇形矫正。',
    features: ['多角色声纹克隆', '字幕/配音在线编辑器', 'AI 唇形同步(Lip-Sync)', '保留背景音效(BGM)'],
    icon: <Wand2 />
  },
  {
    id: 'dist',
    title: '全球一键分发',
    subtitle: 'Global Distribution',
    description: '打通海外主流短视频平台，支持定时发布与多账号矩阵管理。',
    features: ['TikTok/Reels/Shorts 接口', '多账号授权管理', '定时发布任务', '分发状态监控'],
    icon: <Share2 />
  },
  {
    id: 'data',
    title: '收益数据看板',
    subtitle: 'Analytics Dashboard',
    description: '全链路数据追踪，实时监控各剧集在不同地区的播放与收益表现。',
    features: ['ROI 投产比分析', '地区/语言热度图', '完播率漏斗', '收益自动结算'],
    icon: <BarChart3 />
  }
];

export const VOICE_CHARACTERS = [
  {
    id: 'c1',
    name: '顾总 / CEO David',
    archetype: '霸道总裁',
    tags: ['沉稳', '磁性', '压迫感'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200'
  },
  {
    id: 'c2',
    name: '林浅 / Sweet Sarah',
    archetype: '甜美女主',
    tags: ['活泼', '清脆', '治愈系'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=200&h=200'
  },
  {
    id: 'c3',
    name: '王爷 / Lord Chen',
    archetype: '古装权谋',
    tags: ['威严', '古韵', '戏剧感'],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=200&h=200'
  },
  {
    id: 'c4',
    name: '恶毒女配 / Ms. Viper',
    archetype: '反派御姐',
    tags: ['尖锐', '冷艳', '情绪化'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=200&h=200'
  }
];

export const DEMO_VIDEOS = {
  Original: "https://beidou-guishoufuke.oss-cn-beijing.aliyuncs.com/%E5%8E%9F%E8%A7%86%E9%A2%91.mp4",
  JP: "https://beidou-guishoufuke.oss-cn-beijing.aliyuncs.com/%E6%97%A5%E8%AF%AD.mp4",
  FR: "https://beidou-guishoufuke.oss-cn-beijing.aliyuncs.com/%E6%B3%95%E8%AF%AD.mp4"
};