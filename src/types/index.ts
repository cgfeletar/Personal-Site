export interface BadgeData {
  label: string;
  variant?: 'default' | 'terracotta' | 'warm' | 'ivory';
}

export interface FlowNode {
  id: string;
  nodeNum: number;
  position: 'left' | 'center' | 'right';
  title: string;
  desc: string;
  badges?: BadgeData[];
  loopBadge?: string;
  shipIcon?: boolean;
  backEyebrow: string;
  backText: string; // may contain HTML like <strong>
  isSpecial?: boolean; // for node 10 (ship it)
}

export type MediaType = 'podcast' | 'youtube';
export type ThumbGradient = 'sage' | 'dark' | 'tc' | 'rose';

export interface MediaItem {
  id: string;
  type: MediaType;
  gradient: ThumbGradient;
  thumb?: string;
  showName: string;
  title: string;
  desc: string;
  date: string;
  href: string;
}
