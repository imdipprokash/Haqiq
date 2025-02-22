export interface LoginPayload {
  phone_number?: string;
  email?: string;
  password?: string;
  device_id: string;
  country_code: string;
  language_code: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface Translations {
  tagline: string;
  taglineHighlight: string;
  getStarted: string;
  termsText: string;
}

export interface TranslationContextType {
  translations: Translations;
  direction: "ltr" | "rtl";
}

export interface Country {
  name: string;
  code: string;
  image: string;
  enabled: boolean;
  timezones: string[];
  id: string;
  languages: Language[];
}

export interface Language {
  code: string;
  name: string;
  image: string;
  is_rtl: boolean;
  status: string;
  enabled: boolean;
  id: string;
}

export interface ApiResponse<T> {
  data: T[];
  total_count: number;
  page_size: number;
  current_result_count: number;
  total_pages: number;
  current_page: number;
}

export interface CategoryType {
  name: string;
  description: string;
  enabled: boolean;
  id: string;
}

export interface Language {
  code: string;
  name: string;
  image: string;
  is_rtl: boolean;
  status: string;
  enabled: boolean;
  id: string;
}

export interface Country {
  name: string;
  code: string;
  image: string;
  enabled: boolean;
  timezones: string[];
  id: string;
}

export interface Category {
  title: string;
  description: string;
  image: string;
  enabled: boolean;
  category_type_id: string;
  country_code: string;
  language_code: string;
  id: string;
  category_type: CategoryType;
  language: Language;
  country: Country;
}

export interface ApiResponseCategory {
  data: Category[];
  total_count: number;
  page_size: number;
  current_result_count: number;
  total_pages: number;
  current_page: number;
}

export interface NewsItem {
  language_code: string;
  country_code: string;
  category_id: string;
  title: string;
  content: string;
  source_url: string;
  image: string;
  source_id: string;
  id: string;
  status: string;
  created_at: string;
  modified_at: string;
  published_at: string;
  last_published_at: string;
  language: {
    code: string;
    name: string;
    image: string;
    is_rtl: boolean;
    status: string;
    enabled: boolean;
    id: string;
  };
  country: {
    name: string;
    code: string;
    image: string;
    enabled: boolean;
    timezones: string[];
    id: string;
  };
  category: {
    title: string;
    description: string;
    image: string;
    enabled: boolean;
    category_type_id: string;
    country_code: string;
    language_code: string;
    id: string;
  };
  source: {
    name: string;
    description: string;
    url: string;
    enabled: boolean;
    id: string;
  };
  author_id: string;
  author: {
    first_name: string;
    last_name: string;
    phone_number: string;
    is_registered: boolean;
    country_code: string;
    language_code: string;
    email: string;
    device_id: string;
  };
}

export interface ApiResponse<T> {
  data: T[];
  total_count: number;
  page_size: number;
  current_result_count: number;
  total_pages: number;
  current_page: number;
}

export interface AdTheme {
  name: string;
  background_color: string;
  background_text_color: string;
  accent_color: string;
  accent_text_color: string;
  is_default: boolean;
  is_dark_mode: boolean;
  enabled: boolean;
  applicable_for: string;
  id: string;
}

export interface AdItem {
  title: string;
  description: string;
  image: string;
  enabled: boolean;
  ad_url: string;
  language_code: string;
  country_code: string;
  start_time: string; // ISO 8601 format
  end_time: string; // ISO 8601 format
  ad_timezone: string;
  theme_id: string;
  id: string;
  theme: AdTheme;
}

export interface AdResponse {
  data: AdItem[];
  total_count: number;
  page_size: number;
  current_result_count: number;
  total_pages: number;
  current_page: number;
}
