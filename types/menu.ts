export interface MenuItem {
  title: string;
  href: string;
  icon: any;
  description: string;
  badge: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface BadgeTranslations {
  Principal: string;
  Pro: string;
  Premium: string;
  Enterprise: string;
  AI: string;
  Nuevo: string;
  NASA: string;
  Admin: string;
} 