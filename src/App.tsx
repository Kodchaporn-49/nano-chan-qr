import { useState, useEffect, useMemo, ChangeEvent } from 'react';
import { 
  Sparkles, 
  Palette, 
  Smile, 
  ClipboardPaste, 
  Globe, 
  MessageSquareHeart, 
  Image as ImageIcon,
  Frame,
  Upload,
  Calendar,
  Clock,
  MapPin,
  Gift,
  Camera,
  Trash2,
  Eye,
  RefreshCw,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { InstructionCards } from './components/InstructionCards';
import { QRCodePreview } from './components/QRCodePreview';
import { HistoryList } from './components/HistoryList';
import { CuteDecorations } from './components/CuteDecorations';
import { GreetingViewer } from './components/GreetingViewer';
import { LanguageSelector } from './components/LanguageSelector';
import { Language, TRANSLATIONS } from './translations';
import { 
  QRHistoryItem, 
  CenterBadgeType, 
  ColorPreset, 
  QRType, 
  GreetingData, 
  PhotoCardData, 
  WeddingInviteData, 
  WeddingWishesData, 
  AppThemeMode 
} from './types';

// Color Presets for Kawaii Theme
const KAWAII_COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'strawberry',
    name: 'Strawberry Latte',
    nameTh: 'Strawberry Latte',
    fg: '#FF85A1',
    bg: '#FFFFFF',
    previewBg: '#FFF0F5',
    previewFg: '#FF85A1',
  },
  {
    id: 'lavender',
    name: 'Lavender Dream',
    nameTh: 'Lavender Dream',
    fg: '#9575CD',
    bg: '#FFFFFF',
    previewBg: '#F3E5F5',
    previewFg: '#9575CD',
  },
  {
    id: 'sweet-pink',
    name: 'Princess Pink',
    nameTh: 'Princess Pink',
    fg: '#E91E63',
    bg: '#FFFFFF',
    previewBg: '#FCE4EC',
    previewFg: '#E91E63',
  },
  {
    id: 'honey-peach',
    name: 'Honey Peach',
    nameTh: 'Honey Peach',
    fg: '#E65100',
    bg: '#FFFBF2',
    previewBg: '#FFFACD',
    previewFg: '#F57C00',
  },
  {
    id: 'sky-blue',
    name: 'Sky Blue',
    nameTh: 'Sky Blue',
    fg: '#0288D1',
    bg: '#F5FAFF',
    previewBg: '#E1F5FE',
    previewFg: '#03A9F4',
  },
  {
    id: 'classic-dark',
    name: 'Classic Charcoal',
    nameTh: 'Classic Dark',
    fg: '#4A3E4D',
    bg: '#FFFFFF',
    previewBg: '#F3F4F6',
    previewFg: '#374151',
  },
];

// Color Presets for Wedding Magic Theme
const WEDDING_COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'rose-gold',
    name: 'Rose Gold Romance',
    nameTh: 'Rose Gold',
    fg: '#B76E79',
    bg: '#FFF8F6',
    previewBg: '#FFF0F3',
    previewFg: '#B76E79',
  },
  {
    id: 'champagne-gold',
    name: 'Champagne Gold',
    nameTh: 'Champagne Gold',
    fg: '#C5A059',
    bg: '#FFFCF5',
    previewBg: '#FDF6E2',
    previewFg: '#C5A059',
  },
  {
    id: 'blush-pearl',
    name: 'Blush & Pearl',
    nameTh: 'Blush Pearl',
    fg: '#D87A8E',
    bg: '#FFF5F8',
    previewBg: '#FCEBF0',
    previewFg: '#D87A8E',
  },
  {
    id: 'burgundy-luxury',
    name: 'Burgundy & Wine',
    nameTh: 'Burgundy Wine',
    fg: '#800020',
    bg: '#FFF5F5',
    previewBg: '#FCE4E4',
    previewFg: '#800020',
  },
  {
    id: 'emerald-luxury',
    name: 'Emerald Ivory',
    nameTh: 'Emerald Ivory',
    fg: '#2E7D32',
    bg: '#F7FCF7',
    previewBg: '#E8F5E9',
    previewFg: '#2E7D32',
  },
  {
    id: 'royal-navy',
    name: 'Midnight Navy',
    nameTh: 'Midnight Navy',
    fg: '#1A237E',
    bg: '#F4F6FF',
    previewBg: '#E8EAF6',
    previewFg: '#1A237E',
  },
];

// Stickers for Kawaii
const KAWAII_BADGES: { id: CenterBadgeType; label: string; icon: string }[] = [
  { id: 'none', label: 'None', icon: '⚪' },
  { id: 'paw', label: 'Cat Paw', icon: '🐾' },
  { id: 'heart', label: 'Heart', icon: '💖' },
  { id: 'star', label: 'Star', icon: '⭐' },
  { id: 'cloud', label: 'Cloud', icon: '☁️' },
  { id: 'cat', label: 'Kitty', icon: '🐱' },
  { id: 'ribbon', label: 'Ribbon', icon: '🎀' },
  { id: 'blossom', label: 'Sakura', icon: '🌸' },
  { id: 'bear', label: 'Teddy Bear', icon: '🧸' },
  { id: 'sparkle', label: 'Sparkle', icon: '✨' },
];

// Stickers for Wedding Magic
const WEDDING_BADGES: { id: CenterBadgeType; label: string; icon: string }[] = [
  { id: 'none', label: 'None', icon: '⚪' },
  { id: 'ring', label: 'Wedding Ring', icon: '💍' },
  { id: 'twin_hearts', label: 'Twin Hearts', icon: '💕' },
  { id: 'bouquet', label: 'Bouquet', icon: '💐' },
  { id: 'champagne', label: 'Champagne', icon: '🥂' },
  { id: 'church', label: 'Chapel', icon: '💒' },
  { id: 'wedding_cake', label: 'Wedding Cake', icon: '🎂' },
  { id: 'dove', label: 'Love Dove', icon: '🕊️' },
  { id: 'wedding_ribbon', label: 'Gold Ribbon', icon: '🎀' },
  { id: 'blossom', label: 'Blossom', icon: '🌸' },
  { id: 'sparkle', label: 'Gold Sparkle', icon: '✨' },
];

// Wedding Photo Presets
const WEDDING_PHOTO_PRESETS = [
  { label: '🌸 Garden Couple', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80' },
  { label: '💍 Rings & Bouquet', url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80' },
  { label: '💒 Romantic Moments', url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&auto=format&fit=crop&q=80' },
  { label: '🥂 Toast & Cheers', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80' },
];

const KAWAII_PHOTO_PRESETS = [
  { label: '🎂 Sweet Cake', icon: '🎂', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80' },
  { label: '🌸 Fresh Flowers', icon: '🌸', url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&auto=format&fit=crop&q=80' },
  { label: '🐱 Cute Kitty', icon: '🐱', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80' },
  { label: '🧸 Teddy Bear', icon: '🧸', url: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=800&auto=format&fit=crop&q=80' },
  { label: '🍓 Sweet Berry', icon: '🍓', url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop&q=80' },
  { label: '☕ Cozy Cafe', icon: '☕', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80' },
];

const GREETING_QUICK_MESSAGES = [
  'Wishing you a wonderful day filled with happiness! ✨💖',
  'You are doing great, keep shining! 🌸🧸',
  'Thinking of you! Hope to see you very soon 💌✨',
  'Happy Birthday! May your smile brighten every day 🎂🎉',
];

const WEDDING_WISHES_QUICK = [
  'Congratulations to the lovely couple! Wishing you endless love and happiness! 🥂💍',
  'Happy Wedding Day! May your love story continue to blossom beautifully 🌸✨',
  'Wishing you a lifetime of joy, laughter, and sweet cherished moments together! 💒💕',
];

// Helper function to compress and scale down image for direct embedding inside QR Code (max 120-140px, under 1.5KB)
const compressImageForQR = (img: HTMLImageElement, maxDimension = 120, quality = 0.55): string => {
  let width = img.width;
  let height = img.height;

  if (width > height && width > maxDimension) {
    height = Math.round((height * maxDimension) / width);
    width = maxDimension;
  } else if (height > maxDimension) {
    width = Math.round((width * maxDimension) / height);
    height = maxDimension;
  }

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, width);
  canvas.height = Math.max(1, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, width, height);

  let compressed = canvas.toDataURL('image/jpeg', quality);

  // If payload is still larger than 2000 characters, perform a second aggressive pass (max 90px, 0.45 quality)
  if (compressed.length > 2000) {
    const smallerDim = 90;
    let sWidth = img.width;
    let sHeight = img.height;
    if (sWidth > sHeight && sWidth > smallerDim) {
      sHeight = Math.round((sHeight * smallerDim) / sWidth);
      sWidth = smallerDim;
    } else if (sHeight > smallerDim) {
      sWidth = Math.round((sWidth * smallerDim) / sHeight);
      sHeight = smallerDim;
    }
    canvas.width = Math.max(1, sWidth);
    canvas.height = Math.max(1, sHeight);
    ctx.clearRect(0, 0, sWidth, sHeight);
    ctx.drawImage(img, 0, 0, sWidth, sHeight);
    compressed = canvas.toDataURL('image/jpeg', 0.45);
  }
  return compressed;
};

export default function App() {
  // Multi-language State: 'en' | 'th' | 'ko' | 'ja'
  const [lang, setLang] = useState<Language>('en');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Global App Theme: 'kawaii' | 'wedding'
  const [appTheme, setAppTheme] = useState<AppThemeMode>('wedding');

  // QR Code Type Mode: url | greeting | photo_card | wedding_invite | wedding_wishes
  const [qrType, setQrType] = useState<QRType>('wedding_invite');

  // Input states for URL
  const [urlInput, setUrlInput] = useState('https://www.google.com');

  // Input states for Kawaii Greeting
  const [greetingData, setGreetingData] = useState<GreetingData>({
    title: 'A Special Message Just for You 💖',
    message: 'Wishing you lots of happiness, warmth, and reasons to smile every single day! ✨💖',
    toName: 'Sweet Friend',
    fromName: 'Nano-chan',
  });

  // Input states for Kawaii Photo Card
  const [photoCardData, setPhotoCardData] = useState<PhotoCardData>({
    title: 'Photo & Greeting Card 📸',
    message: 'Congratulations! Wishing you happiness, good health, and success in everything! 🌸🎉',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
    toName: 'Best Friend',
    fromName: 'Nano-chan',
  });

  // Input states for Wedding Invitation
  const [weddingInviteData, setWeddingInviteData] = useState<WeddingInviteData>({
    groomName: 'Lucas',
    brideName: 'Emily',
    eventDate: 'December 24, 2026',
    eventTime: '6:00 PM onwards',
    venueName: 'The Grand Ballroom, Crystal Palace Hotel',
    locationUrl: 'https://maps.google.com',
    photoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
    sweetQuote: 'Together is a beautiful place to be 💕✨',
    dressCode: 'Rose Gold, Pastel Pink & Champagne White 👗',
    giftPromptPay: 'Gift Registry / PromptPay: #WED-2026-LUCAS-EMILY',
  });

  // Input states for Wedding Wishes
  const [weddingWishesData, setWeddingWishesData] = useState<WeddingWishesData>({
    groomAndBride: 'Lucas & Emily 💍',
    senderName: 'Best Friends & Family',
    wishMessage: 'Wishing both of you endless joy, unconditional love, and a wonderful marriage! 🥂✨',
    photoUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
  });

  // Styling and Badge states
  const [activePreset, setActivePreset] = useState<string>('rose-gold');
  const [fgColor, setFgColor] = useState('#B76E79');
  const [bgColor, setBgColor] = useState('#FFF8F6');
  const [centerBadge, setCenterBadge] = useState<CenterBadgeType>('ring');
  const [customLogoUrl, setCustomLogoUrl] = useState<string>('');
  const [includeFrame, setIncludeFrame] = useState(true);
  const [frameText, setFrameText] = useState('💍 SAVE THE DATE 💒');
  const [isRealtime, setIsRealtime] = useState(true);
  const [manualTrigger, setManualTrigger] = useState(0);
  const [pastedStatus, setPastedStatus] = useState(false);

  // Recipient Modal Viewer state
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerType, setViewerType] = useState<QRType>('wedding_invite');
  const [viewerGreetingData, setViewerGreetingData] = useState<GreetingData | undefined>();
  const [viewerPhotoCardData, setViewerPhotoCardData] = useState<PhotoCardData | undefined>();
  const [viewerWeddingInviteData, setViewerWeddingInviteData] = useState<WeddingInviteData | undefined>();
  const [viewerWeddingWishesData, setViewerWeddingWishesData] = useState<WeddingWishesData | undefined>();

  // Switch Theme Function
  const handleSwitchTheme = (newTheme: AppThemeMode) => {
    setAppTheme(newTheme);
    if (newTheme === 'wedding') {
      setQrType('wedding_invite');
      setActivePreset('rose-gold');
      setFgColor('#B76E79');
      setBgColor('#FFF8F6');
      setCenterBadge('ring');
      setFrameText('💍 SAVE THE DATE 💒');
    } else {
      setQrType('greeting');
      setActivePreset('strawberry');
      setFgColor('#FF85A1');
      setBgColor('#FFFFFF');
      setCenterBadge('paw');
      setFrameText('✨ SCAN ME 💕');
    }
  };

  // Check URL query parameters for scanned cards
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view');
      const d = params.get('d');
      if (view && d) {
        const decoded = decodeURIComponent(atob(d));
        const parsed = JSON.parse(decoded);
        if (view === 'wedding_invite') {
          // Check if photo was saved in local storage with key
          if (parsed.localPhotoKey && !parsed.photoUrl) {
            try {
              const localSaved = localStorage.getItem(`vibrant_local_photo_${parsed.localPhotoKey}`);
              if (localSaved) parsed.photoUrl = localSaved;
            } catch {}
          }
          setAppTheme('wedding');
          setViewerType('wedding_invite');
          setViewerWeddingInviteData(parsed);
          setIsViewerOpen(true);
        } else if (view === 'wedding_wishes') {
          if (parsed.localPhotoKey && !parsed.photoUrl) {
            try {
              const localSaved = localStorage.getItem(`vibrant_local_photo_${parsed.localPhotoKey}`);
              if (localSaved) parsed.photoUrl = localSaved;
            } catch {}
          }
          setAppTheme('wedding');
          setViewerType('wedding_wishes');
          setViewerWeddingWishesData(parsed);
          setIsViewerOpen(true);
        } else if (view === 'greeting') {
          setAppTheme('kawaii');
          setViewerType('greeting');
          setViewerGreetingData(parsed);
          setIsViewerOpen(true);
        } else if (view === 'photo_card') {
          if (parsed.localPhotoKey && !parsed.imageUrl) {
            try {
              const localSaved = localStorage.getItem(`vibrant_local_photo_${parsed.localPhotoKey}`);
              if (localSaved) parsed.imageUrl = localSaved;
            } catch {}
          }
          setAppTheme('kawaii');
          setViewerType('photo_card');
          setViewerPhotoCardData(parsed);
          setIsViewerOpen(true);
        }
      }
    } catch (e) {
      console.warn('No card payload in URL query', e);
    }
  }, []);

  // Compute final payload string for QR Code (embeds compressed photo data directly into QR payload)
  const qrPayload = useMemo(() => {
    const baseUrl = window.location.origin + window.location.pathname;
    if (qrType === 'url') {
      return urlInput.trim() || 'https://www.google.com';
    }
    if (qrType === 'wedding_invite') {
      try {
        const cleanData = { ...weddingInviteData };
        // If image is a local Base64 Data URL, keep in QR if compact, and save backup to localStorage
        if (cleanData.photoUrl && cleanData.photoUrl.startsWith('data:')) {
          const photoKey = cleanData.localPhotoKey || `wphoto_${Date.now()}`;
          cleanData.localPhotoKey = photoKey;
          try {
            localStorage.setItem(`vibrant_local_photo_${photoKey}`, cleanData.photoUrl);
          } catch {}
          // Only if photo payload exceeds 3500 chars, strip to prevent QR overflow
          if (cleanData.photoUrl.length > 3500) {
            cleanData.photoUrl = '';
          }
        }
        const b64 = btoa(encodeURIComponent(JSON.stringify(cleanData)));
        return `${baseUrl}?view=wedding_invite&d=${b64}`;
      } catch {
        return `Wedding: ${weddingInviteData.groomName} & ${weddingInviteData.brideName}`;
      }
    }
    if (qrType === 'wedding_wishes') {
      try {
        const cleanData = { ...weddingWishesData };
        if (cleanData.photoUrl && cleanData.photoUrl.startsWith('data:')) {
          const photoKey = cleanData.localPhotoKey || `wishphoto_${Date.now()}`;
          cleanData.localPhotoKey = photoKey;
          try {
            localStorage.setItem(`vibrant_local_photo_${photoKey}`, cleanData.photoUrl);
          } catch {}
          if (cleanData.photoUrl.length > 3500) {
            cleanData.photoUrl = '';
          }
        }
        const b64 = btoa(encodeURIComponent(JSON.stringify(cleanData)));
        return `${baseUrl}?view=wedding_wishes&d=${b64}`;
      } catch {
        return weddingWishesData.wishMessage;
      }
    }
    if (qrType === 'greeting') {
      try {
        const b64 = btoa(encodeURIComponent(JSON.stringify(greetingData)));
        return `${baseUrl}?view=greeting&d=${b64}`;
      } catch {
        return greetingData.message;
      }
    }
    if (qrType === 'photo_card') {
      try {
        const cleanData = { ...photoCardData };
        // Directly embed compressed Base64 photo into QR Code payload for 100% mobile scanning support
        if (cleanData.imageUrl && cleanData.imageUrl.startsWith('data:')) {
          const photoKey = cleanData.localPhotoKey || `photo_${Date.now()}`;
          cleanData.localPhotoKey = photoKey;
          try {
            localStorage.setItem(`vibrant_local_photo_${photoKey}`, cleanData.imageUrl);
          } catch {}
          // Only if photo payload exceeds 3500 chars, strip to prevent QR overflow
          if (cleanData.imageUrl.length > 3500) {
            cleanData.imageUrl = '';
          }
        }
        const b64 = btoa(encodeURIComponent(JSON.stringify(cleanData)));
        return `${baseUrl}?view=photo_card&d=${b64}`;
      } catch {
        return photoCardData.message;
      }
    }
    return 'https://www.google.com';
  }, [qrType, urlInput, weddingInviteData, weddingWishesData, greetingData, photoCardData]);

  // History state: stored max 3 items
  const [history, setHistory] = useState<QRHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('vibrant_qr_history_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.slice(0, 3) : [];
      }
    } catch (e) {
      console.warn('Failed to load history', e);
    }
    return [
      {
        id: 'hist-1',
        type: 'wedding_invite',
        displayText: '💒 Wedding Card: Lucas & Emily (Dec 24, 2026)',
        rawPayload: 'https://example.com',
        timestamp: Date.now() - 1000 * 60 * 10,
        fgColor: '#B76E79',
        bgColor: '#FFF8F6',
        centerBadge: 'ring',
        includeFrame: true,
      },
      {
        id: 'hist-2',
        type: 'wedding_wishes',
        displayText: '🥂 Wedding Wish: Lucas & Emily from Friends',
        rawPayload: 'https://example.com',
        timestamp: Date.now() - 1000 * 60 * 60,
        fgColor: '#C5A059',
        bgColor: '#FFFCF5',
        centerBadge: 'champagne',
        includeFrame: true,
      },
      {
        id: 'hist-3',
        type: 'greeting',
        displayText: '💌 Sweet Message: Special Message for Sweet Friend',
        rawPayload: 'https://example.com',
        timestamp: Date.now() - 1000 * 60 * 120,
        fgColor: '#FF85A1',
        bgColor: '#FFFFFF',
        centerBadge: 'paw',
        includeFrame: true,
      },
    ];
  });

  // Save to history helper
  const saveToHistory = (payload: string) => {
    let snippet = '';
    if (qrType === 'url') snippet = urlInput.slice(0, 35) || 'Web Link';
    else if (qrType === 'wedding_invite') snippet = `💒 ${weddingInviteData.groomName} & ${weddingInviteData.brideName}`;
    else if (qrType === 'wedding_wishes') snippet = `🥂 Wish: ${weddingWishesData.groomAndBride}`;
    else if (qrType === 'greeting') snippet = `💌 ${greetingData.title || greetingData.toName || 'Greeting'}`;
    else if (qrType === 'photo_card') snippet = `📸 Photo: ${photoCardData.title || photoCardData.toName || 'Photo Card'}`;

    const newItem: QRHistoryItem = {
      id: `hist-${Date.now()}`,
      type: qrType,
      displayText: snippet,
      rawPayload: payload,
      timestamp: Date.now(),
      fgColor,
      bgColor,
      centerBadge,
      includeFrame,
    };

    setHistory((prev) => {
      const filtered = prev.filter((item) => item.rawPayload !== payload && item.displayText !== snippet);
      const updated = [newItem, ...filtered].slice(0, 3);
      try {
        localStorage.setItem('vibrant_qr_history_v3', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save history', e);
      }
      return updated;
    });
  };

  // Restore history item
  const handleSelectHistoryItem = (item: QRHistoryItem) => {
    setQrType(item.type);
    if (item.type === 'wedding_invite' || item.type === 'wedding_wishes') {
      setAppTheme('wedding');
    } else {
      setAppTheme('kawaii');
    }
    if (item.fgColor) setFgColor(item.fgColor);
    if (item.bgColor) setBgColor(item.bgColor);
    if (item.centerBadge) setCenterBadge(item.centerBadge);
    if (item.includeFrame !== undefined) setIncludeFrame(item.includeFrame);

    if (item.type === 'url') {
      setUrlInput(item.rawPayload || item.displayText);
    }
  };

  // Manual generation trigger with cute confetti
  const handleGenerateManual = () => {
    setManualTrigger((prev) => prev + 1);
    saveToHistory(qrPayload);

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: appTheme === 'wedding' ? ['#B76E79', '#D4AF37', '#E8D3C4', '#FDF2EC'] : ['#FF85A1', '#FFC0CB', '#E6E6FA', '#FFFACD', '#9575CD'],
    });
  };

  // Paste clipboard
  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        if (qrType === 'url') setUrlInput(text);
        else if (qrType === 'greeting') setGreetingData((prev) => ({ ...prev, message: text }));
        else if (qrType === 'wedding_wishes') setWeddingWishesData((prev) => ({ ...prev, wishMessage: text }));
        else if (qrType === 'photo_card') setPhotoCardData((prev) => ({ ...prev, imageUrl: text }));
        setPastedStatus(true);
        setTimeout(() => setPastedStatus(false), 1500);
      }
    } catch (err) {
      console.warn('Clipboard paste failed', err);
    }
  };

  // Apply color preset
  const handleApplyPreset = (preset: ColorPreset) => {
    setActivePreset(preset.id);
    setFgColor(preset.fg);
    setBgColor(preset.bg);
  };

  // Upload Custom Logo
  const handleCustomLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCustomLogoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload Local Photo for Kawaii Photo Card
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const handlePhotoFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (.jpg, .png, .webp)');
      return;
    }

    setIsPhotoUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      if (!rawDataUrl) {
        setIsPhotoUploading(false);
        return;
      }

      // Automatically downscale and compress via canvas (max 120-140px, < 1.5KB) so it embeds directly into the QR Code
      const img = new Image();
      img.onload = () => {
        const optimizedDataUrl = compressImageForQR(img, 120, 0.55);
        setPhotoCardData((prev) => ({ 
          ...prev, 
          imageUrl: optimizedDataUrl || rawDataUrl,
          localPhotoKey: undefined
        }));
        setIsPhotoUploading(false);

        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#BA68C8', '#FF85A1', '#FFD5DE', '#FFFACD'],
        });
      };
      img.onerror = () => {
        setPhotoCardData((prev) => ({ ...prev, imageUrl: rawDataUrl, localPhotoKey: undefined }));
        setIsPhotoUploading(false);
      };
      img.src = rawDataUrl;
    };
    reader.onerror = () => {
      setIsPhotoUploading(false);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Upload Local Photo for Wedding Invitation Card
  const [isWeddingPhotoUploading, setIsWeddingPhotoUploading] = useState(false);
  const handleWeddingPhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (.jpg, .png, .webp)');
      return;
    }

    setIsWeddingPhotoUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      if (!rawDataUrl) {
        setIsWeddingPhotoUploading(false);
        return;
      }

      const img = new Image();
      img.onload = () => {
        const optimizedDataUrl = compressImageForQR(img, 120, 0.55);
        setWeddingInviteData((prev) => ({ 
          ...prev, 
          photoUrl: optimizedDataUrl || rawDataUrl,
          localPhotoKey: undefined
        }));
        setIsWeddingPhotoUploading(false);

        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#B76E79', '#D4AF37', '#FAF0E6', '#FFF0F5'],
        });
      };
      img.onerror = () => {
        setWeddingInviteData((prev) => ({ ...prev, photoUrl: rawDataUrl, localPhotoKey: undefined }));
        setIsWeddingPhotoUploading(false);
      };
      img.src = rawDataUrl;
    };
    reader.onerror = () => {
      setIsWeddingPhotoUploading(false);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Open Preview Modal
  const handleOpenCurrentPreview = () => {
    setViewerType(qrType);
    if (qrType === 'wedding_invite') {
      setViewerWeddingInviteData(weddingInviteData);
    } else if (qrType === 'wedding_wishes') {
      setViewerWeddingWishesData(weddingWishesData);
    } else if (qrType === 'greeting') {
      setViewerGreetingData(greetingData);
    } else if (qrType === 'photo_card') {
      setViewerPhotoCardData(photoCardData);
    }
    setIsViewerOpen(true);
  };

  const isWedding = appTheme === 'wedding';
  const colorPresets = isWedding ? WEDDING_COLOR_PRESETS : KAWAII_COLOR_PRESETS;
  const stickerBadges = isWedding ? WEDDING_BADGES : KAWAII_BADGES;

  return (
    <div className={`relative min-h-screen pb-10 pt-4 px-4 sm:px-6 lg:px-10 flex flex-col items-center transition-all duration-500 ${
      isWedding ? 'bg-wedding-pattern' : 'bg-kawaii-pattern'
    }`}>
      {/* Floating Decorative Elements */}
      <CuteDecorations themeMode={appTheme} />

      {/* Recipient Full-Screen Modal */}
      <GreetingViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        type={viewerType}
        greetingData={viewerGreetingData}
        photoCardData={viewerPhotoCardData}
        weddingInviteData={viewerWeddingInviteData}
        weddingWishesData={viewerWeddingWishesData}
      />

      <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Top Navigation Bar: Clean separation of Theme Switcher (Left) and Language Selector (Right) */}
        <nav 
          id="top-navbar"
          className={`w-full max-w-5xl mx-auto flex items-center justify-between gap-3 sm:gap-4 px-3.5 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8 rounded-full shadow-xs backdrop-blur-md border-2 transition-all relative z-30 ${
            isWedding 
              ? 'bg-white/85 border-[#E8D3C4]' 
              : 'bg-white/85 border-[#FFDDF0]'
          }`}
        >
          {/* Left: Theme Switcher Pills */}
          <div className="flex items-center gap-1.5">
            <div className={`p-1 rounded-full border flex gap-1 items-center ${
              isWedding ? 'bg-[#FAF9F6] border-[#E8D3C4]' : 'bg-[#FFF0F5] border-[#FFD5DE]'
            }`}>
              <button
                type="button"
                id="theme-btn-wedding"
                onClick={() => handleSwitchTheme('wedding')}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                  isWedding
                    ? 'bg-gradient-to-r from-[#B76E79] to-[#D4AF37] text-white shadow-sm scale-102 font-serif'
                    : 'text-[#8C5D67] hover:bg-[#FFF0F3]'
                }`}
              >
                <span>💒</span>
                <span className="hidden xs:inline">{t.weddingModeTab}</span>
                <span className="xs:hidden">Wedding</span>
              </button>

              <button
                type="button"
                id="theme-btn-kawaii"
                onClick={() => handleSwitchTheme('kawaii')}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                  !isWedding
                    ? 'bg-gradient-to-r from-[#FF85A1] to-[#FFA3B8] text-white shadow-sm scale-102'
                    : 'text-[#6D5D6E] hover:bg-[#FFF0F5]'
                }`}
              >
                <span>🌸</span>
                <span className="hidden xs:inline">{t.kawaiiModeTab}</span>
                <span className="xs:hidden">Kawaii</span>
              </button>
            </div>
          </div>

          {/* Right: Multi-Language Selector Dropdown with high z-index and clear margin */}
          <div className="shrink-0 relative z-40">
            <LanguageSelector
              currentLang={lang}
              onSelectLang={setLang}
              themeMode={appTheme}
            />
          </div>
        </nav>

        {/* Header Section: Perfectly spaced title, badge, and description */}
        <header className="pt-0 pb-6 sm:pb-8 text-center max-w-2xl mx-auto px-2">
          {isWedding ? (
            <>
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8D3C4] shadow-xs text-xs font-bold text-[#A66C78] mb-3 tracking-wider">
                <span>💍</span>
                <span>{t.weddingBadgeSubtitle}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#5C3A42] flex items-center justify-center gap-2.5 font-serif leading-tight">
                <span>{lang === 'en' ? "Nano-chan's Wedding Magic" : t.appTitle}</span>
                <span className="inline-block">💒</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#7D5A63] opacity-90 mt-2 font-medium max-w-lg mx-auto leading-relaxed">
                {t.appSubtitle}
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 border border-[#FFD5DE] shadow-xs text-xs font-bold text-[#FF85A1] mb-3">
                <span>🌸</span>
                <span>{t.kawaiiBadgeSubtitle}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#FFB300]" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#FF85A1] flex items-center justify-center gap-2.5 leading-tight">
                <span>{t.appTitle}</span>
                <span className="inline-block">✨</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#6D5D6E] opacity-80 mt-2 font-medium max-w-lg mx-auto leading-relaxed">
                {t.appSubtitle}
              </p>
            </>
          )}
        </header>

        {/* Steps Bar */}
        <InstructionCards themeMode={appTheme} t={t} />

        {/* QR Code Type Switcher Tabs */}
        <div className="w-full max-w-3xl mx-auto mb-6 flex justify-center">
          <div className="bg-white p-1.5 rounded-full shadow-md border-2 border-[#E8D3C4] flex gap-1 sm:gap-2 flex-wrap justify-center">
            {isWedding ? (
              <>
                {/* Wedding Tab 1: Wedding Invite */}
                <button
                  type="button"
                  onClick={() => setQrType('wedding_invite')}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    qrType === 'wedding_invite'
                      ? 'bg-gradient-to-r from-[#B76E79] to-[#C98A94] text-white shadow-md scale-102'
                      : 'text-[#7D5A63] hover:bg-[#FDF2EC] hover:text-[#B76E79]'
                  }`}
                >
                  <span>💒</span>
                  <span>{t.types.weddingSmartCard}</span>
                </button>

                {/* Wedding Tab 2: Wedding Wishes */}
                <button
                  type="button"
                  onClick={() => setQrType('wedding_wishes')}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    qrType === 'wedding_wishes'
                      ? 'bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-white shadow-md scale-102'
                      : 'text-[#7D5A63] hover:bg-[#FFF9EE] hover:text-[#C5A059]'
                  }`}
                >
                  <span>🥂</span>
                  <span>{t.types.weddingWishes}</span>
                </button>

                {/* Wedding Tab 3: URL / Photos */}
                <button
                  type="button"
                  onClick={() => setQrType('url')}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    qrType === 'url'
                      ? 'bg-gradient-to-r from-[#5C3A42] to-[#7D5A63] text-white shadow-md scale-102'
                      : 'text-[#7D5A63] hover:bg-[#FDF2EC]'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>{t.types.websiteUrl} 🌐</span>
                </button>
              </>
            ) : (
              <>
                {/* Kawaii Tab 1: Greeting */}
                <button
                  type="button"
                  onClick={() => setQrType('greeting')}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    qrType === 'greeting'
                      ? 'bg-gradient-to-r from-[#FF85A1] to-[#FFA3B8] text-white shadow-md scale-102'
                      : 'text-[#6D5D6E] hover:bg-[#FFF0F5] hover:text-[#FF85A1]'
                  }`}
                >
                  <MessageSquareHeart className="w-4 h-4" />
                  <span>{t.types.greetingCard} 💌</span>
                </button>

                {/* Kawaii Tab 2: Photo Card */}
                <button
                  type="button"
                  onClick={() => setQrType('photo_card')}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    qrType === 'photo_card'
                      ? 'bg-gradient-to-r from-[#9575CD] to-[#B388FF] text-white shadow-md scale-102'
                      : 'text-[#6D5D6E] hover:bg-[#F3E5F5] hover:text-[#9575CD]'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>{t.types.photoCard} 📸</span>
                </button>

                {/* Kawaii Tab 3: URL */}
                <button
                  type="button"
                  onClick={() => setQrType('url')}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    qrType === 'url'
                      ? 'bg-gradient-to-r from-[#03A9F4] to-[#4FC3F7] text-white shadow-md scale-102'
                      : 'text-[#6D5D6E] hover:bg-[#E1F5FE] hover:text-[#0288D1]'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>{t.types.websiteUrl} 🌐</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main Content 12-Column Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Input & Customization Column (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Input Card */}
            <div className={`bg-white p-5 sm:p-7 rounded-[40px] shadow-xl border-4 flex flex-col justify-center ${
              isWedding ? 'border-[#E8D3C4]' : 'border-[#FFF5EE]'
            }`}>
              
              {/* Type-Specific Forms */}

              {/* 1. Wedding Invitation Form */}
              {qrType === 'wedding_invite' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs sm:text-sm font-bold text-[#5C3A42] flex items-center gap-1.5">
                      <span>💒</span>
                      <span>{t.types.weddingSmartCard}</span>
                    </label>
                  </div>

                  {/* Groom & Bride Names */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#8C5D67] ml-1">{t.form.groomName}:</span>
                      <input
                        type="text"
                        value={weddingInviteData.groomName}
                        onChange={(e) => setWeddingInviteData({ ...weddingInviteData, groomName: e.target.value })}
                        placeholder="e.g. Lucas"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#E8D3C4] focus:border-[#B76E79] text-xs text-[#5C3A42] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#8C5D67] ml-1">{t.form.brideName}:</span>
                      <input
                        type="text"
                        value={weddingInviteData.brideName}
                        onChange={(e) => setWeddingInviteData({ ...weddingInviteData, brideName: e.target.value })}
                        placeholder="e.g. Emily"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#E8D3C4] focus:border-[#B76E79] text-xs text-[#5C3A42] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#8C5D67] ml-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#B76E79]" />
                        <span>{t.form.weddingDate}:</span>
                      </span>
                      <input
                        type="text"
                        value={weddingInviteData.eventDate}
                        onChange={(e) => setWeddingInviteData({ ...weddingInviteData, eventDate: e.target.value })}
                        placeholder="e.g. December 24, 2026"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#E8D3C4] focus:border-[#B76E79] text-xs text-[#5C3A42] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#8C5D67] ml-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#B76E79]" />
                        <span>{t.form.weddingTime}:</span>
                      </span>
                      <input
                        type="text"
                        value={weddingInviteData.eventTime}
                        onChange={(e) => setWeddingInviteData({ ...weddingInviteData, eventTime: e.target.value })}
                        placeholder="e.g. 6:00 PM onwards"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#E8D3C4] focus:border-[#B76E79] text-xs text-[#5C3A42] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Romantic Quote */}
                  <div>
                    <span className="text-[10px] font-bold text-[#8C5D67] ml-1">{t.form.loveQuote}:</span>
                    <input
                      type="text"
                      value={weddingInviteData.sweetQuote}
                      onChange={(e) => setWeddingInviteData({ ...weddingInviteData, sweetQuote: e.target.value })}
                      placeholder="e.g. Together is a beautiful place to be 💕✨"
                      className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#E8D3C4] focus:border-[#B76E79] text-xs text-[#5C3A42] focus:outline-hidden"
                    />
                  </div>

                  {/* Venue, Hall & Maps */}
                  <div>
                    <span className="text-[10px] font-bold text-[#8C5D67] ml-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#B76E79]" />
                      <span>{t.form.venueName} & {t.form.locationMapsUrl}:</span>
                    </span>
                    <input
                      type="text"
                      value={weddingInviteData.venueName}
                      onChange={(e) => setWeddingInviteData({ ...weddingInviteData, venueName: e.target.value })}
                      placeholder="Venue name, e.g. Crystal Palace Grand Ballroom"
                      className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#E8D3C4] focus:border-[#B76E79] text-xs text-[#5C3A42] focus:outline-hidden mb-1.5"
                    />
                    <input
                      type="text"
                      value={weddingInviteData.locationUrl}
                      onChange={(e) => setWeddingInviteData({ ...weddingInviteData, locationUrl: e.target.value })}
                      placeholder="Google Maps link for navigation (optional)"
                      className="w-full px-3 py-1 rounded-lg bg-[#FAF9F6] border border-[#E8D3C4] focus:border-[#B76E79] text-[11px] text-[#7D5A63] focus:outline-hidden"
                    />
                  </div>

                  {/* Couple Photo Upload & Presets */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#FFFDFD] to-[#FDF2EC] border-2 border-dashed border-[#E8D3C4] flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#8C5D67] flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5 text-[#B76E79]" />
                        <span>{t.form.coverPhotoUrl}:</span>
                      </span>

                      {/* Upload Photo Button */}
                      <label 
                        htmlFor="wedding-photo-file-input"
                        className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#B76E79] to-[#D4AF37] hover:opacity-90 text-white text-[11px] font-bold shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-1 select-none active:scale-95"
                      >
                        <Upload className="w-3 h-3" />
                        <span>{isWeddingPhotoUploading ? 'Processing...' : t.form.uploadPhotoBtn}</span>
                        <input
                          id="wedding-photo-file-input"
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          onChange={handleWeddingPhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={weddingInviteData.photoUrl}
                        onChange={(e) => setWeddingInviteData({ ...weddingInviteData, photoUrl: e.target.value })}
                        placeholder="Paste image URL (https://...) or upload photo"
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-[#E8D3C4] focus:border-[#B76E79] text-xs text-[#5C3A42] focus:outline-hidden"
                      />
                      {weddingInviteData.photoUrl && (
                        <button
                          type="button"
                          onClick={() => setWeddingInviteData((prev) => ({ ...prev, photoUrl: '' }))}
                          className="px-2 py-1 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-rose-500 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                          title={t.form.removePhoto}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Wedding Photo Preview Thumbnail */}
                    {weddingInviteData.photoUrl && (
                      <div className="w-full p-2 rounded-xl bg-white/95 border border-[#E8D3C4] shadow-xs flex items-center justify-between gap-2.5 animate-fadeIn">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-[#E8D3C4] bg-[#FDF2EC] relative shadow-xs flex items-center justify-center">
                            <img
                              src={weddingInviteData.photoUrl}
                              alt="Wedding Cover Preview"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                                if (placeholder) placeholder.style.display = 'flex';
                              }}
                            />
                            <div 
                              className="w-full h-full flex-col items-center justify-center bg-[#FDF2EC] text-xs text-[#B76E79] select-none"
                              style={{ display: 'none' }}
                            >
                              <span className="text-base">💍</span>
                            </div>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-bold text-[#5C3A42] truncate">
                                {t.form.photoPreview}
                              </span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#FDF2EC] text-[#B76E79] font-bold">
                                {weddingInviteData.photoUrl.startsWith('data:') ? '📁 Device Photo' : '🌐 Web URL'}
                              </span>
                            </div>
                            <label 
                              htmlFor="wedding-photo-file-input" 
                              className="text-[10px] font-bold text-[#B76E79] hover:underline cursor-pointer flex items-center gap-0.5 mt-0.5"
                            >
                              <RefreshCw className="w-2.5 h-2.5" />
                              <span>{t.form.changePhoto}</span>
                            </label>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setWeddingInviteData((prev) => ({ ...prev, photoUrl: '' }))}
                          className="p-1 rounded-md text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                          title={t.form.removePhoto}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {WEDDING_PHOTO_PRESETS.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setWeddingInviteData((prev) => ({ ...prev, photoUrl: preset.url }))}
                          className={`text-[10px] px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                            weddingInviteData.photoUrl === preset.url
                              ? 'bg-[#B76E79] text-white border-[#B76E79] font-bold'
                              : 'bg-[#FDF2EC] hover:bg-[#FCE5D9] text-[#8C4F5A] border-[#E8D3C4]'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dress Code & PromptPay */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#8C5D67] ml-1">{t.form.dressCode}:</span>
                      <input
                        type="text"
                        value={weddingInviteData.dressCode}
                        onChange={(e) => setWeddingInviteData({ ...weddingInviteData, dressCode: e.target.value })}
                        placeholder="e.g. Rose Gold & Pastel Pink"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#E8D3C4] focus:border-[#B76E79] text-xs text-[#5C3A42] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#8C5D67] ml-1 flex items-center gap-1">
                        <Gift className="w-3 h-3 text-[#B76E79]" />
                        <span>{t.form.giftPromptPay}:</span>
                      </span>
                      <input
                        type="text"
                        value={weddingInviteData.giftPromptPay}
                        onChange={(e) => setWeddingInviteData({ ...weddingInviteData, giftPromptPay: e.target.value })}
                        placeholder="e.g. #WED-2026-REGISTRY"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#E8D3C4] focus:border-[#B76E79] text-xs text-[#5C3A42] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Action Button: Test Full Screen Wedding Smart Card */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleOpenCurrentPreview}
                      className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#B76E79] via-[#C98A94] to-[#D4AF37] text-white font-extrabold text-xs shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#FFF0F3]"
                    >
                      <span>👀</span>
                      <span>{t.form.previewCardBtn} 💖</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Wedding Wishes Form */}
              {qrType === 'wedding_wishes' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs sm:text-sm font-bold text-[#5C3A42] flex items-center gap-1.5">
                      <span>🥂</span>
                      <span>{t.types.weddingWishes}</span>
                    </label>
                    <button
                      type="button"
                      onClick={handlePasteClipboard}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF9F6] text-[#B76E79] border border-[#E8D3C4] hover:bg-[#FDF2EC] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <ClipboardPaste className="w-3 h-3 text-[#B76E79]" />
                      <span>{pastedStatus ? 'Pasted!' : t.form.pasteBtn}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#8C5D67] ml-1">{t.form.coupleName}:</span>
                      <input
                        type="text"
                        value={weddingWishesData.groomAndBride}
                        onChange={(e) => setWeddingWishesData({ ...weddingWishesData, groomAndBride: e.target.value })}
                        placeholder="e.g. Lucas & Emily"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#E8D3C4] focus:border-[#B76E79] text-xs text-[#5C3A42] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#8C5D67] ml-1">{t.form.yourName}:</span>
                      <input
                        type="text"
                        value={weddingWishesData.senderName}
                        onChange={(e) => setWeddingWishesData({ ...weddingWishesData, senderName: e.target.value })}
                        placeholder="e.g. Best Friends & Family"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#E8D3C4] focus:border-[#B76E79] text-xs text-[#5C3A42] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    value={weddingWishesData.wishMessage}
                    onChange={(e) => setWeddingWishesData({ ...weddingWishesData, wishMessage: e.target.value })}
                    placeholder="Write your heartfelt wishes and blessings for the newly married couple..."
                    className="w-full p-3.5 rounded-[22px] bg-[#FAF9F6] border-2 border-dashed border-[#E8D3C4] focus:outline-hidden focus:border-[#B76E79] resize-none text-xs sm:text-sm leading-relaxed text-[#5C3A42] transition-all"
                  />

                  {/* Quick message suggestions */}
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] text-[#8C5D67] flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                      <span>{t.form.quickPresets}:</span>
                    </span>
                    {WEDDING_WISHES_QUICK.map((msg, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setWeddingWishesData((prev) => ({ ...prev, wishMessage: msg }))}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[#FDF2EC] hover:bg-[#FCE5D9] text-[#8C4F5A] border border-[#E8D3C4] cursor-pointer"
                      >
                        {msg.slice(0, 22)}...
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Kawaii Greeting Form */}
              {qrType === 'greeting' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs sm:text-sm font-bold text-[#6D5D6E] flex items-center gap-1.5">
                      <span>💌</span>
                      <span>{t.types.greetingCard}</span>
                    </label>
                    <button
                      type="button"
                      onClick={handlePasteClipboard}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF9F6] text-[#FF85A1] border border-[#FFC0CB] hover:bg-[#FFF0F5] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <ClipboardPaste className="w-3 h-3 text-[#FF85A1]" />
                      <span>{pastedStatus ? 'Pasted!' : t.form.pasteBtn}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#8C6D85] ml-1">{t.form.recipientName}:</span>
                      <input
                        type="text"
                        value={greetingData.toName}
                        onChange={(e) => setGreetingData({ ...greetingData, toName: e.target.value })}
                        placeholder="e.g. Sweet Friend"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#FFC0CB] focus:border-[#FF85A1] text-xs text-[#6D5D6E] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#8C6D85] ml-1">{t.form.senderName}:</span>
                      <input
                        type="text"
                        value={greetingData.fromName}
                        onChange={(e) => setGreetingData({ ...greetingData, fromName: e.target.value })}
                        placeholder="e.g. Nano-chan"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#FFC0CB] focus:border-[#FF85A1] text-xs text-[#6D5D6E] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    value={greetingData.message}
                    onChange={(e) => setGreetingData({ ...greetingData, message: e.target.value })}
                    placeholder="Type your sweet birthday wish, encouragement, or heartfelt note..."
                    className="w-full p-3.5 rounded-[22px] bg-[#FAF9F6] border-2 border-dashed border-[#FFC0CB] focus:outline-hidden focus:border-[#FF85A1] resize-none text-xs sm:text-sm leading-relaxed text-[#6D5D6E] transition-all"
                  />

                  {/* Quick message suggestions */}
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] text-[#8C6D85] flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5 text-[#FF85A1]" />
                      <span>{t.form.quickPresets}:</span>
                    </span>
                    {GREETING_QUICK_MESSAGES.map((msg, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setGreetingData((prev) => ({ ...prev, message: msg }))}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFF0F5] hover:bg-[#FFE4EE] text-[#D81B60] border border-[#FFE4E1] cursor-pointer"
                      >
                        {msg.slice(0, 20)}...
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Kawaii Photo Card Form */}
              {qrType === 'photo_card' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs sm:text-sm font-bold text-[#6D5D6E] flex items-center gap-1.5">
                      <span>📸</span>
                      <span>{t.types.photoCard}</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleOpenCurrentPreview}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F3E5F5] hover:bg-[#E1BEE7] text-[#6B21A8] border border-[#D1C4E9] transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#7B1FA2]" />
                      <span>{t.form.previewCardBtn}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#8C6D85] ml-1">{t.form.recipientName}:</span>
                      <input
                        type="text"
                        value={photoCardData.toName}
                        onChange={(e) => setPhotoCardData({ ...photoCardData, toName: e.target.value })}
                        placeholder="e.g. Bestie"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#E1BEE7] focus:border-[#9575CD] text-xs text-[#6D5D6E] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#8C6D85] ml-1">{t.form.senderName}:</span>
                      <input
                        type="text"
                        value={photoCardData.fromName}
                        onChange={(e) => setPhotoCardData({ ...photoCardData, fromName: e.target.value })}
                        placeholder="e.g. Nano-chan"
                        className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#E1BEE7] focus:border-[#9575CD] text-xs text-[#6D5D6E] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Photo Upload & URL Input Container */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#FAF5FF] via-[#FFF9FC] to-[#FFF0F5] border-2 border-dashed border-[#D1C4E9] flex flex-col gap-3 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-[#9575CD]" />
                        <span className="text-xs font-bold text-[#6B21A8]">{t.form.photoUrlLabel}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EDE7F6] text-[#7E57C2] font-semibold">
                          QR Compatible 📱
                        </span>
                      </div>

                      {/* Upload Photo Button from Device / Camera */}
                      <label 
                        htmlFor="photo-card-file-input"
                        className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#9575CD] to-[#BA68C8] hover:from-[#7E57C2] hover:to-[#AB47BC] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 select-none active:scale-95 shrink-0"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isPhotoUploading ? 'Processing...' : t.form.uploadPhotoBtn}</span>
                        <input
                          id="photo-card-file-input"
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          onChange={handlePhotoFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* URL Input & Quick Clear */}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={photoCardData.imageUrl}
                          onChange={(e) => setPhotoCardData({ ...photoCardData, imageUrl: e.target.value, localPhotoKey: undefined })}
                          placeholder="Paste image URL (https://...) or choose a preset below"
                          className="w-full pl-3 pr-8 py-2 rounded-xl bg-white border border-[#E1BEE7] focus:border-[#9575CD] focus:ring-2 focus:ring-[#E1BEE7]/50 text-xs text-[#6D5D6E] focus:outline-hidden placeholder:text-gray-400 font-mono transition-all"
                        />
                        {photoCardData.imageUrl && (
                          <button
                            type="button"
                            onClick={() => setPhotoCardData((prev) => ({ ...prev, imageUrl: '', localPhotoKey: undefined }))}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-500 transition-colors p-1"
                            title={t.form.removePhoto}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Quick Preset Links with Cute Badges & Live Preview Images */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold text-[#6B21A8] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#BA68C8]" />
                          <span>{t.form.photoPresets} (Quick Presets):</span>
                        </span>
                        <span className="text-[10px] text-[#8C6D85]">
                          Tap to apply instantly ✨
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {KAWAII_PHOTO_PRESETS.map((preset) => {
                          const isSelected = photoCardData.imageUrl === preset.url;
                          return (
                            <button
                              key={preset.label}
                              type="button"
                              onClick={() => setPhotoCardData((prev) => ({ ...prev, imageUrl: preset.url, localPhotoKey: undefined }))}
                              className={`p-1.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer text-left select-none ${
                                isSelected
                                  ? 'bg-[#F3E5F5] border-[#AB47BC] shadow-xs ring-2 ring-[#BA68C8]/40 scale-[1.02]'
                                  : 'bg-white hover:bg-[#FAF5FF] border-[#E1BEE7] hover:border-[#BA68C8]'
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-[#E1BEE7] bg-[#F3E5F5]">
                                <img
                                  src={preset.url}
                                  alt={preset.label}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className={`text-[11px] font-bold block truncate ${isSelected ? 'text-[#6B21A8]' : 'text-[#4F3950]'}`}>
                                  {preset.label}
                                </span>
                                <span className="text-[9px] text-gray-500 block truncate">100% Mobile Ready</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Photo Preview Thumbnail & Details Card */}
                    {photoCardData.imageUrl && (
                      <div className="w-full p-2.5 rounded-xl bg-white/95 border border-[#D1C4E9] shadow-xs flex items-center justify-between gap-3 animate-fadeIn">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden border-2 border-[#E1BEE7] bg-[#F3E5F5] relative shadow-xs flex items-center justify-center">
                            <img
                              src={photoCardData.imageUrl}
                              alt="Selected Photo Preview"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                                if (placeholder) placeholder.style.display = 'flex';
                              }}
                            />
                            <div 
                              className="w-full h-full flex-col items-center justify-center bg-[#F3E5F5] text-xs text-[#9575CD] select-none"
                              style={{ display: 'none' }}
                            >
                              <span className="text-lg">🖼️</span>
                            </div>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-[#5C3A42] truncate">
                                {t.form.photoPreview}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#EDE7F6] text-[#673AB7] font-bold">
                                {photoCardData.imageUrl.startsWith('data:') ? '📁 Compressed Photo (Embedded in QR 📱)' : '🌐 Web URL (Embedded in QR 📱)'}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-500 truncate max-w-[180px] sm:max-w-xs mt-0.5">
                              {photoCardData.imageUrl.startsWith('data:') ? 'Canvas optimized (~120px) & ready for mobile scan ✨' : photoCardData.imageUrl}
                            </p>
                            <div className="flex items-center gap-2.5 mt-1">
                              <label 
                                htmlFor="photo-card-file-input" 
                                className="text-[10px] font-bold text-[#7E57C2] hover:underline cursor-pointer flex items-center gap-0.5"
                              >
                                <RefreshCw className="w-2.5 h-2.5" />
                                <span>{t.form.changePhoto}</span>
                              </label>
                              <button
                                type="button"
                                onClick={handleOpenCurrentPreview}
                                className="text-[10px] font-bold text-[#D81B60] hover:underline cursor-pointer flex items-center gap-0.5"
                              >
                                <Eye className="w-2.5 h-2.5" />
                                <span>{t.form.previewCardBtn}</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setPhotoCardData((prev) => ({ ...prev, imageUrl: '', localPhotoKey: undefined }))}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                          title={t.form.removePhoto}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <textarea
                    rows={2}
                    value={photoCardData.message}
                    onChange={(e) => setPhotoCardData({ ...photoCardData, message: e.target.value })}
                    placeholder="Type your message attached with this photo card..."
                    className="w-full p-3 rounded-[20px] bg-[#FAF9F6] border-2 border-dashed border-[#E1BEE7] focus:outline-hidden focus:border-[#9575CD] resize-none text-xs text-[#6D5D6E] transition-all"
                  />
                </div>
              )}

              {/* 5. General URL Form */}
              {qrType === 'url' && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-1">
                    <label 
                      htmlFor="qr-input" 
                      className={`block text-xs sm:text-sm font-bold flex items-center gap-1.5 ${isWedding ? 'text-[#5C3A42]' : 'text-[#6D5D6E]'}`}
                    >
                      <span>🌐</span>
                      <span>{isWedding ? t.form.enterUrlTitle : 'Type your message or URL here...'}</span>
                    </label>

                    <button
                      type="button"
                      onClick={handlePasteClipboard}
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border transition-colors cursor-pointer flex items-center gap-1 ${
                        isWedding 
                          ? 'bg-[#FAF9F6] text-[#B76E79] border-[#E8D3C4] hover:bg-[#FDF2EC]' 
                          : 'bg-[#FAF9F6] text-[#0288D1] border-[#B3E5FC] hover:bg-[#E1F5FE]'
                      }`}
                    >
                      <ClipboardPaste className="w-3 h-3" />
                      <span>{pastedStatus ? 'Pasted!' : t.form.pasteBtn}</span>
                    </button>
                  </div>

                  <textarea
                    id="qr-input"
                    rows={3}
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder={isWedding ? 'e.g. https://drive.google.com/wedding-album' : 'Type your message or URL here...'}
                    className={`w-full p-3.5 rounded-[22px] bg-[#FAF9F6] border-2 border-dashed focus:outline-hidden resize-none text-xs sm:text-sm leading-relaxed transition-all ${
                      isWedding 
                        ? 'border-[#E8D3C4] focus:border-[#B76E79] text-[#5C3A42]' 
                        : 'border-[#B3E5FC] focus:border-[#0288D1] text-[#6D5D6E]'
                    }`}
                  />
                </div>
              )}

              {/* Big CTA Button */}
              <button
                id="generate-btn"
                type="button"
                onClick={handleGenerateManual}
                className={`w-full mt-4 py-3.5 sm:py-4 rounded-full text-white font-extrabold text-base sm:text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isWedding
                    ? 'bg-gradient-to-r from-[#B76E79] via-[#C98A94] to-[#D4AF37]'
                    : 'bg-[#FF85A1] hover:bg-[#FF6E90]'
                }`}
              >
                <span>{isWedding ? '💍' : '✨'}</span>
                <span>Generate QR Code ✨</span>
              </button>

              {/* Realtime switch */}
              <div className="mt-2.5 flex items-center justify-between text-xs opacity-80 px-1 text-[#6D5D6E]">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isRealtime}
                    onChange={(e) => setIsRealtime(e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#B76E79] rounded cursor-pointer"
                  />
                  <span>Generate QR Code in Real-time</span>
                </label>
              </div>
            </div>

            {/* Customization Options Card */}
            <div className={`bg-white p-5 sm:p-6 rounded-[35px] shadow-md border-4 flex flex-col gap-3.5 ${
              isWedding ? 'border-[#E8D3C4]' : 'border-[#FFF5EE]'
            }`}>
              
              {/* Center Stickers / Logos Customization */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Smile className={`w-4 h-4 ${isWedding ? 'text-[#B76E79]' : 'text-[#9575CD]'}`} />
                    <h3 className={`text-xs font-bold ${isWedding ? 'text-[#5C3A42]' : 'text-[#6D5D6E]'}`}>
                      {isWedding ? 'Center Sticker / Wedding Badge' : t.form.centerSticker}
                    </h3>
                  </div>

                  {customLogoUrl && (
                    <button
                      type="button"
                      onClick={() => setCustomLogoUrl('')}
                      className="text-[10px] text-red-500 hover:underline cursor-pointer"
                    >
                      Remove Logo
                    </button>
                  )}
                </div>

                {/* Sticker Badges Grid */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {stickerBadges.map((badge) => {
                    const isSelected = !customLogoUrl && centerBadge === badge.id;
                    return (
                      <button
                        key={badge.id}
                        type="button"
                        onClick={() => {
                          setCustomLogoUrl('');
                          setCenterBadge(badge.id);
                        }}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                          isSelected
                            ? isWedding
                              ? 'bg-gradient-to-r from-[#B76E79] to-[#D4AF37] text-white shadow-xs scale-103'
                              : 'bg-gradient-to-r from-[#FF85A1] to-[#FFA3B8] text-white shadow-xs scale-103'
                            : isWedding
                              ? 'bg-[#FAF9F6] text-[#7D5A63] hover:bg-[#FDF2EC] border border-[#E8D3C4]'
                              : 'bg-[#FAF9F6] text-[#6D5D6E] hover:bg-[#FFF0F5] border border-[#FFE4E1]'
                        }`}
                      >
                        <span>{badge.icon}</span>
                        <span>{badge.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Upload Custom Logo Button */}
                <label className={`w-full py-1.5 px-3 rounded-xl bg-[#FAF9F6] border border-dashed text-[11px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  isWedding 
                    ? 'border-[#E8D3C4] hover:bg-[#FDF2EC] text-[#7D5A63]' 
                    : 'border-[#FFC0CB] hover:bg-[#FFF0F5] text-[#6D5D6E]'
                }`}>
                  <Upload className={`w-3.5 h-3.5 ${isWedding ? 'text-[#B76E79]' : 'text-[#FF85A1]'}`} />
                  <span>{customLogoUrl ? '✓ Change Custom Logo' : '+ Upload Center Photo / Custom Logo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomLogoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Color Palettes */}
              <div className={`pt-3 border-t ${isWedding ? 'border-[#FDF2EC]' : 'border-[#FFF0F5]'}`}>
                <div className="flex items-center gap-1.5 mb-2">
                  <Palette className={`w-3.5 h-3.5 ${isWedding ? 'text-[#B76E79]' : 'text-[#FF85A1]'}`} />
                  <h3 className={`text-xs font-bold ${isWedding ? 'text-[#5C3A42]' : 'text-[#6D5D6E]'}`}>
                    {isWedding ? 'Luxury Wedding Palettes' : t.form.presetThemes}
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {colorPresets.map((preset) => {
                    const isSelected = activePreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleApplyPreset(preset)}
                        className={`p-2 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? isWedding
                              ? 'border-[#B76E79] bg-[#FDF2EC] shadow-xs ring-2 ring-[#E8D3C4]'
                              : 'border-[#FF85A1] bg-[#FFF0F5] shadow-xs ring-2 ring-[#FFC0CB]'
                            : isWedding
                              ? 'border-[#E8D3C4] bg-white hover:bg-[#FFFDFB]'
                              : 'border-[#FFE4E1] bg-white hover:bg-[#FFF9FB]'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full border border-black/10 flex items-center justify-center shadow-xs shrink-0"
                          style={{ backgroundColor: preset.previewBg }}
                        >
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: preset.previewFg }}
                          />
                        </div>
                        <span className={`text-[11px] font-bold truncate ${isWedding ? 'text-[#5C3A42]' : 'text-[#6D5D6E]'}`}>
                          {preset.nameTh}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Frame & Caption */}
              <div className={`pt-3 border-t ${isWedding ? 'border-[#FDF2EC]' : 'border-[#FFF0F5]'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Frame className={`w-3.5 h-3.5 ${isWedding ? 'text-[#B76E79]' : 'text-[#E65100]'}`} />
                    <h3 className={`text-xs font-bold ${isWedding ? 'text-[#5C3A42]' : 'text-[#6D5D6E]'}`}>
                      {isWedding ? 'Wedding Card Frame' : t.form.qrFrameOptions}
                    </h3>
                  </div>

                  <label className="flex items-center gap-1.5 cursor-pointer text-xs text-[#6D5D6E]">
                    <input
                      type="checkbox"
                      checked={includeFrame}
                      onChange={(e) => setIncludeFrame(e.target.checked)}
                      className="w-3.5 h-3.5 accent-[#B76E79] rounded cursor-pointer"
                    />
                    <span>{t.form.includeCuteFrame}</span>
                  </label>
                </div>

                {includeFrame && (
                  <input
                    type="text"
                    value={frameText}
                    onChange={(e) => setFrameText(e.target.value)}
                    placeholder={isWedding ? 'e.g. 💍 SAVE THE DATE 💒' : t.form.frameLabelPlaceholder}
                    maxLength={25}
                    className={`w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border text-xs focus:outline-hidden ${
                      isWedding 
                        ? 'border-[#E8D3C4] focus:border-[#B76E79] text-[#5C3A42]' 
                        : 'border-[#FFE4E1] focus:border-[#FF85A1] text-[#6D5D6E]'
                    }`}
                  />
                )}
              </div>

            </div>
          </div>

          {/* Preview Column (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <QRCodePreview
              text={qrPayload}
              fgColor={fgColor}
              bgColor={bgColor}
              centerBadge={centerBadge}
              customLogoUrl={customLogoUrl}
              includeFrame={includeFrame}
              frameText={frameText}
              onSaveToHistory={saveToHistory}
              isRealtime={isRealtime}
              manualTrigger={manualTrigger}
              qrType={qrType}
              themeMode={appTheme}
              onOpenViewer={handleOpenCurrentPreview}
              t={t}
            />
          </div>

          {/* History Column (3 cols on lg) */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full">
            <HistoryList
              history={history}
              onSelectHistory={handleSelectHistoryItem}
              onClearHistory={() => {
                setHistory([]);
                localStorage.removeItem('vibrant_qr_history_v3');
              }}
              onDeleteItem={(id) => setHistory((prev) => prev.filter((item) => item.id !== id))}
              t={t}
            />
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-8 pb-4 text-center text-xs font-semibold text-[#5C3A42]/70">
          {t.footer.byNanoChan}
        </footer>
      </main>
    </div>
  );
}
