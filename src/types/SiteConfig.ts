export interface SocialMedia {
    name: string;
    url: string;
    active: boolean;
}

export interface ContactInfo {
    email: string;
    phone: string;
}

export interface SiteConfig {
    id: string;
    title: Record<string, string>; // Farklı diller için başlık desteği
    description: Record<string, string>; // Farklı diller için açıklama desteği
    social_media: Record<string, SocialMedia>; // Sosyal medya platformlarını obje olarak saklama
    contact_info: ContactInfo;
    maintenance_mode: boolean;
    maintenance_msg: string | null;
    meta_tags?: string | null;
    supported_langs: string[]; // Desteklenen diller
    default_lang: string; // Varsayılan dil
    analytics_code?: string; // Google Analytics veya benzeri kodlar için
    logo_url?: string;
    favicon_url?: string;
    updated_at: string;
    updated_by: string;
}
