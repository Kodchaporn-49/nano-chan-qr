export type AppThemeMode = 'kawaii' | 'wedding';

export type QRType = 'url' | 'greeting' | 'photo_card' | 'wedding_invite' | 'wedding_wishes';

export type CenterBadgeType = 
  | 'none' 
  | 'heart' 
  | 'star' 
  | 'sparkle' 
  | 'cloud' 
  | 'cat' 
  | 'paw' 
  | 'ribbon' 
  | 'blossom' 
  | 'bear'
  | 'ring'
  | 'twin_hearts'
  | 'wedding_cake'
  | 'church'
  | 'wedding_ribbon'
  | 'bouquet'
  | 'champagne'
  | 'dove';

export interface ColorPreset {
  id: string;
  name: string;
  nameTh: string;
  fg: string;
  bg: string;
  previewBg: string;
  previewFg: string;
  theme?: AppThemeMode;
}

export interface GreetingData {
  title: string;
  message: string;
  fromName: string;
  toName: string;
  bgTheme?: string;
  musicMood?: string;
}

export interface PhotoCardData {
  title: string;
  message: string;
  imageUrl: string;
  fromName: string;
  toName: string;
  themeColor?: string;
  localPhotoKey?: string;
}

export interface WeddingScheduleItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface WeddingWishItem {
  id: string;
  senderName: string;
  message: string;
  createdAt: number;
  emojiBadge?: string;
}

export interface WeddingInviteData {
  id?: string;
  groomName: string;
  brideName: string;
  eventDate: string; // e.g. "24 ธันวาคม 2026"
  eventDateRaw?: string; // YYYY-MM-DD e.g. "2026-12-24"
  eventTime: string; // e.g. "18:00 น."
  eventEndTime?: string; // e.g. "22:00 น."
  venueName: string;
  venueRoom?: string;
  locationUrl?: string; // custom Google Maps URL
  photoUrl: string; // Cover couple photo
  localPhotoKey?: string;
  galleryPhotos?: string[]; // Extra romantic photos
  sweetQuote: string;
  dressCode?: string;
  dressCodeColors?: string[];
  rsvpContact?: string;
  giftPromptPay?: string;
  giftBankName?: string;
  giftAccountName?: string;
  schedule?: WeddingScheduleItem[];
  customWishes?: WeddingWishItem[];
}

export interface WeddingWishesData {
  groomAndBride: string;
  senderName: string;
  wishMessage: string;
  photoUrl?: string;
  localPhotoKey?: string;
  emojiBadge?: string;
}

export interface QRHistoryItem {
  id: string;
  type: QRType;
  displayText: string;
  rawPayload: string;
  timestamp: number;
  fgColor: string;
  bgColor: string;
  centerBadge: CenterBadgeType;
  customLogoUrl?: string;
  includeFrame: boolean;
  frameText?: string;
  themeMode?: AppThemeMode;
  greetingData?: GreetingData;
  photoCardData?: PhotoCardData;
  weddingInviteData?: WeddingInviteData;
  weddingWishesData?: WeddingWishesData;
}
