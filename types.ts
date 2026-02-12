
export type WindowsVersion = 'win10' | 'win11';

export interface DebloatItem {
  id: string;
  title: string;
  description: string;
  category: 'system' | 'apps' | 'privacy' | 'performance';
  impact: 'low' | 'medium' | 'high';
  command?: string;
  version: WindowsVersion | 'both';
}

export interface EssentialApp {
  name: string;
  category: string;
  description: string;
  url: string;
  winget: string;
  icon: string;
}

export interface FixItem {
  title: string;
  description: string;
  solution: string;
  code?: string;
}
