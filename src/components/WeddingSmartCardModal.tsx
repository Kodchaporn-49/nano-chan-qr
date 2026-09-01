import { useState, useEffect, type FormEvent } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Sparkles, 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  Shirt, 
  Navigation, 
  Share2, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Gift, 
  Copy, 
  Smile, 
  Download,
  CalendarPlus,
  ExternalLink,
  MessageSquareHeart,
  Image as ImageIcon
} from 'lucide-react';
import { WeddingInviteData, WeddingWishItem } from '../types';
import { getGoogleCalendarUrl, downloadIcsCalendar, getGoogleMapsNavigationUrl } from '../utils/calendar';

interface WeddingSmartCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingInviteData;
}

const DEFAULT_SCHEDULE = [
  { id: '1', time: '07:09 AM', title: 'Monk Blessing Ceremony', description: 'Morning monk blessing and food offering for good fortune', icon: '🕯️' },
  { id: '2', time: '09:09 AM', title: 'Khan Mak & Procession', description: 'Groom procession and passing through floral gates', icon: '🎺' },
  { id: '3', time: '09:39 AM', title: 'Ring Exchange Ceremony', description: 'Bride & Groom exchange wedding rings before family and witnesses', icon: '💍' },
  { id: '4', time: '10:39 AM', title: 'Sacred Water Blessing', description: 'Guests pour sacred water and give warm blessings to the couple', icon: '🌸' },
  { id: '5', time: '06:00 PM', title: 'Wedding Reception & Banquet', description: 'Dinner, memorable photos, toasts, and grand celebrations', icon: '🥂' },
];

const INITIAL_WISHES: WeddingWishItem[] = [
  {
    id: 'w1',
    senderName: 'Mom & Dad',
    message: 'Wishing both of you endless happiness, everlasting love, and deep understanding throughout your beautiful journey together! 💖💍',
    createdAt: Date.now() - 1000 * 60 * 60 * 3,
    emojiBadge: '💍',
  },
  {
    id: 'w2',
    senderName: 'College Best Friends',
    message: 'Huge congratulations to our favorite couple! You look so gorgeous and perfect together. Wishing you sweet eternal bliss! 🥂🎉',
    createdAt: Date.now() - 1000 * 60 * 30,
    emojiBadge: '🥂',
  },
  {
    id: 'w3',
    senderName: 'The Pop Family',
    message: 'Happy Wedding Day! May your new chapter be filled with sunshine, bright smiles, and wonderful joy every single day! 🌸✨',
    createdAt: Date.now() - 1000 * 60 * 5,
    emojiBadge: '🌸',
  },
];

const QUICK_WISH_SUGGESTIONS = [
  'Wishing you both endless love and happiness every day! 💍💕',
  'Happy Wedding Day! A truly gorgeous and lovely couple 🥂✨',
  'May you build a warm, loving family together forever! 🌸💒',
  'Heartfelt congratulations! Always hold hands with bright smiles 💖',
];

export function WeddingSmartCardModal({ isOpen, onClose, data }: WeddingSmartCardModalProps) {
  // Active photo in gallery lightbox
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  
  // Guestbook wish state
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('💖');
  const [wishesList, setWishesList] = useState<WeddingWishItem[]>(INITIAL_WISHES);
  const [isSendingWish, setIsSendingWish] = useState(false);
  const [wishSuccess, setWishSuccess] = useState(false);

  // Copy states
  const [copiedPromptPay, setCopiedPromptPay] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Active section tab: 'details' | 'schedule' | 'gallery' | 'wishes'
  const [activeTab, setActiveTab] = useState<'details' | 'schedule' | 'gallery' | 'wishes'>('details');

  // Load custom wishes from local storage
  const storageKey = `wedding_wishes_${data.groomName}_${data.brideName}`.replace(/\s+/g, '_');
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishesList([...parsed, ...INITIAL_WISHES]);
        }
      }
    } catch (e) {
      console.warn('Could not load wishes', e);
    }
  }, [storageKey]);

  // Combined photo list (cover + gallery)
  const allPhotos = [
    data.photoUrl,
    ...(data.galleryPhotos || [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
    ])
  ].filter(Boolean);

  const scheduleItems = (data.schedule && data.schedule.length > 0) ? data.schedule : DEFAULT_SCHEDULE;

  const handleSendWish = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!guestMessage.trim()) return;

    setIsSendingWish(true);
    const newWish: WeddingWishItem = {
      id: `wish-${Date.now()}`,
      senderName: guestName.trim() || 'Honored Guest',
      message: guestMessage.trim(),
      createdAt: Date.now(),
      emojiBadge: selectedEmoji,
    };

    const updated = [newWish, ...wishesList];
    setWishesList(updated);

    try {
      const onlyUserWishes = updated.filter(w => !INITIAL_WISHES.some(iw => iw.id === w.id));
      localStorage.setItem(storageKey, JSON.stringify(onlyUserWishes));
    } catch (err) {
      console.warn('Failed to save wish to localStorage', err);
    }

    // Confetti effect
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#B76E79', '#D4AF37', '#FFD1DC', '#FFFFFF', '#E8D3C4'],
    });

    setGuestMessage('');
    setIsSendingWish(false);
    setWishSuccess(true);
    setTimeout(() => setWishSuccess(false), 3000);
  };

  const handleCopyPromptPay = (account: string) => {
    navigator.clipboard.writeText(account);
    setCopiedPromptPay(true);
    setTimeout(() => setCopiedPromptPay(false), 2000);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!isOpen) return null;

  const navUrl = getGoogleMapsNavigationUrl(data.venueName, data.locationUrl);
  const gCalUrl = getGoogleCalendarUrl(data);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      
      {/* Background Floating Luxury Petals & Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-8 left-8 text-3xl animate-bounce" style={{ animationDuration: '3.5s' }}>💍</div>
        <div className="absolute top-20 right-10 text-3xl animate-pulse">🥂</div>
        <div className="absolute bottom-16 left-12 text-3xl animate-float-slow">🌸</div>
        <div className="absolute bottom-24 right-16 text-3xl animate-bounce" style={{ animationDuration: '4s' }}>✨</div>
      </div>

      {/* Main Card Container: Rose Gold & Luxury White theme */}
      <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl bg-gradient-to-b from-[#FFFDFD] via-[#FFF9F6] to-[#FFF5F2] rounded-[36px] sm:rounded-[44px] shadow-2xl border-4 border-[#E8D3C4] overflow-hidden flex flex-col my-auto max-h-[92vh] z-10">
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-5 py-3 border-b border-[#E8D3C4]/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">💒</span>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#B76E79] uppercase block">
                Wedding Smart Card • Ad-Free
              </span>
              <h2 className="text-xs sm:text-sm font-bold text-[#5C3A42] font-serif">
                {data.groomName} & {data.brideName}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="p-2 rounded-full bg-[#FDF2EC] hover:bg-[#FCE5D9] text-[#A66C78] transition-colors cursor-pointer"
              title="Share Wedding Card"
            >
              {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-[#FDF2EC] hover:bg-[#FCE5D9] text-[#A66C78] transition-colors cursor-pointer"
              title="Close Card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto px-4 sm:px-6 py-5 flex flex-col gap-5">
          
          {/* 1. Hero & Couple Banner */}
          <div className="flex flex-col items-center text-center">
            
            {/* Elegant Save The Date badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FDF2EC] border border-[#E8D3C4] text-[11px] font-extrabold text-[#B76E79] mb-2 tracking-widest shadow-xs">
              <span>🌸</span>
              <span>SAVE THE DATE</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>

            {/* Couple Names */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#5C3A42] tracking-wide mb-1 font-serif">
              {data.groomName} & {data.brideName}
            </h1>

            <p className="text-xs sm:text-sm text-[#8C5D67] italic max-w-sm mb-3">
              "{data.sweetQuote || 'Together is a beautiful place to be 💕✨'}"
            </p>

            {/* Hero Main Photo */}
            <div className="relative w-full max-w-xl min-h-[260px] sm:min-h-[340px] rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-[#FFFDFD] via-[#FDF2EC] to-[#FAF0E6] group flex items-center justify-center p-2">
              <img
                src={data.photoUrl || (data.localPhotoKey ? (typeof window !== 'undefined' ? localStorage.getItem(`vibrant_local_photo_${data.localPhotoKey}`) : '') : '') || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80'}
                alt="Wedding Couple"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[520px] object-contain rounded-2xl group-hover:scale-[1.02] transition-transform duration-500 shadow-xs"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
              <div 
                className="w-full h-full min-h-[220px] flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FFFDFD] via-[#FDF2EC] to-[#FAF0E6] select-none"
                style={{ display: 'none' }}
              >
                <div className="text-4xl mb-2 animate-bounce" style={{ animationDuration: '3s' }}>💍🥂</div>
                <h4 className="text-base font-bold text-[#5C3A42] font-serif">{data.groomName} & {data.brideName}</h4>
                <p className="text-xs text-[#8C5D67] mt-1">Together Forever In Love ✨</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none rounded-3xl" />
              
              {/* Floating Date Tag */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                <div className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-bold text-[#5C3A42] shadow-md border border-[#E8D3C4] flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#B76E79]" />
                  <span>{data.eventDate || 'December 24, 2026'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPhotoIndex(0)}
                  className="px-2.5 py-1 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Photo Album ({allPhotos.length})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Navigation / Tab Buttons */}
          <div className="flex items-center justify-center gap-1 bg-white p-1 rounded-full border border-[#E8D3C4] shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`flex-1 py-1.5 px-2 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'details'
                  ? 'bg-gradient-to-r from-[#B76E79] to-[#C98A94] text-white shadow-xs'
                  : 'text-[#7D5A63] hover:bg-[#FDF2EC]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Venue & Map</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('schedule')}
              className={`flex-1 py-1.5 px-2 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'schedule'
                  ? 'bg-gradient-to-r from-[#B76E79] to-[#C98A94] text-white shadow-xs'
                  : 'text-[#7D5A63] hover:bg-[#FDF2EC]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Schedule</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className={`flex-1 py-1.5 px-2 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-[#B76E79] to-[#C98A94] text-white shadow-xs'
                  : 'text-[#7D5A63] hover:bg-[#FDF2EC]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photos</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('wishes')}
              className={`flex-1 py-1.5 px-2 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'wishes'
                  ? 'bg-gradient-to-r from-[#B76E79] to-[#C98A94] text-white shadow-xs'
                  : 'text-[#7D5A63] hover:bg-[#FDF2EC]'
              }`}
            >
              <MessageSquareHeart className="w-3.5 h-3.5" />
              <span>Wishes</span>
            </button>
          </div>

          {/* TAB 1: DETAILS & GOOGLE MAPS NAVIGATION */}
          {activeTab === 'details' && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              
              {/* PRIMARY REQUIREMENT: LARGE GOOGLE MAPS NAVIGATION BUTTON */}
              <div className="w-full bg-gradient-to-r from-[#FFF5F2] via-white to-[#FDF2EC] p-4 sm:p-5 rounded-3xl border-2 border-[#E8D3C4] shadow-md flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#B76E79] to-[#D4AF37] text-white flex items-center justify-center shadow-sm shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A66C78] block">Wedding Ceremony Venue</span>
                    <h3 className="text-sm sm:text-base font-bold text-[#5C3A42] leading-tight">
                      {data.venueName || 'The Grand Plaza Hotel & Ballroom'}
                    </h3>
                    {data.venueRoom && (
                      <p className="text-xs text-[#8C5D67] mt-0.5">{data.venueRoom}</p>
                    )}
                  </div>
                </div>

                {/* Big Direct Navigation Button */}
                <a
                  href={navUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#B76E79] via-[#C98A94] to-[#D4AF37] text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#FFF0F3]"
                >
                  <Navigation className="w-5 h-5 animate-pulse" />
                  <span>Navigate to Venue (Google Maps) 📍</span>
                </a>
              </div>

              {/* SAVE TO CALENDAR SECTION */}
              <div className="w-full bg-white p-4 rounded-3xl border border-[#E8D3C4] shadow-xs flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarPlus className="w-4 h-4 text-[#B76E79]" />
                    <span className="text-xs font-bold text-[#5C3A42]">Save to Calendar</span>
                  </div>
                  <span className="text-[10px] text-[#A66C78] font-semibold">{data.eventDate}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Google Calendar */}
                  <a
                    href={gCalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#FAF9F6] hover:bg-[#FDF2EC] border border-[#E8D3C4] text-xs font-bold text-[#5C3A42] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>📅</span>
                    <span>Google Calendar</span>
                    <ExternalLink className="w-3 h-3 text-[#A66C78]" />
                  </a>

                  {/* Apple / Outlook .ics */}
                  <button
                    type="button"
                    onClick={() => downloadIcsCalendar(data)}
                    className="py-2.5 px-3 rounded-xl bg-[#FAF9F6] hover:bg-[#FDF2EC] border border-[#E8D3C4] text-xs font-bold text-[#5C3A42] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>🍏</span>
                    <span>Apple / Outlook (.ics)</span>
                    <Download className="w-3 h-3 text-[#A66C78]" />
                  </button>
                </div>
              </div>

              {/* Dress Code & PromptPay Gift */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Dress code */}
                {data.dressCode && (
                  <div className="bg-white p-3.5 rounded-2xl border border-[#E8D3C4] shadow-xs flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#FDF2EC] flex items-center justify-center text-[#B76E79] shrink-0 border border-[#E8D3C4]">
                      <Shirt className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#A66C78] block uppercase">Dress Code</span>
                      <span className="text-xs font-semibold text-[#5C3A42] leading-tight block">{data.dressCode}</span>
                    </div>
                  </div>
                )}

                {/* PromptPay gift */}
                {data.giftPromptPay && (
                  <div className="bg-white p-3.5 rounded-2xl border border-[#E8D3C4] shadow-xs flex items-center justify-between">
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#FDF2EC] flex items-center justify-center text-[#B76E79] shrink-0 border border-[#E8D3C4]">
                        <Gift className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#A66C78] block uppercase">Gift / PromptPay</span>
                        <span className="text-xs font-bold text-[#5C3A42] block">{data.giftPromptPay}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyPromptPay(data.giftPromptPay || '')}
                      className="px-2.5 py-1 bg-[#FDF2EC] hover:bg-[#FCE5D9] text-[#A66C78] text-[10px] font-bold rounded-lg border border-[#E8D3C4] transition-colors cursor-pointer"
                    >
                      {copiedPromptPay ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: WEDDING CEREMONY SCHEDULE / TIMELINE */}
          {activeTab === 'schedule' && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs sm:text-sm font-bold text-[#5C3A42] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#B76E79]" />
                  <span>Wedding Schedule & Timeline</span>
                </h3>
                <span className="text-[10px] text-[#8C5D67] font-semibold">{data.eventDate}</span>
              </div>

              {/* Visual Timeline Cards */}
              <div className="relative pl-6 sm:pl-8 flex flex-col gap-3 my-1">
                {/* Vertical Timeline Track */}
                <div className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#B76E79] via-[#D4AF37] to-[#E8D3C4]" />

                {scheduleItems.map((item, idx) => (
                  <div key={item.id || idx} className="relative flex items-start gap-3 group">
                    {/* Circle Node */}
                    <div className="absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#B76E79] flex items-center justify-center text-xs shadow-xs z-10">
                      <span>{item.icon || '🌸'}</span>
                    </div>

                    {/* Timeline Box */}
                    <div className="w-full bg-white p-3.5 rounded-2xl border border-[#E8D3C4] shadow-xs hover:border-[#B76E79] transition-all">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="px-2 py-0.5 rounded-full bg-[#FDF2EC] text-[#B76E79] text-[10px] font-extrabold border border-[#E8D3C4]">
                          {item.time}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#5C3A42]">{item.title}</h4>
                      {item.description && (
                        <p className="text-[11px] text-[#7D5A63] mt-0.5 leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COUPLE PHOTO GALLERY */}
          {activeTab === 'gallery' && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs sm:text-sm font-bold text-[#5C3A42] flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#B76E79]" />
                  <span>Couple Photo Gallery</span>
                </h3>
                <span className="text-[10px] text-[#8C5D67]">Tap photo to expand</span>
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {allPhotos.map((photoUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className="relative aspect-4/3 rounded-2xl overflow-hidden border-2 border-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all group bg-[#FDF2EC] cursor-pointer"
                  >
                    <img
                      src={photoUrl}
                      alt={`Couple photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                      <span>✨ View Photo</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WISHES GUESTBOOK */}
          {activeTab === 'wishes' && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              {/* Form to submit a wish */}
              <div className="bg-white p-4 rounded-3xl border-2 border-[#E8D3C4] shadow-xs flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-[#5C3A42] flex items-center gap-1.5">
                    <MessageSquareHeart className="w-4 h-4 text-[#B76E79]" />
                    <span>Leave a Wish for Bride & Groom 💖</span>
                  </h3>
                  {wishSuccess && (
                    <span className="text-[10px] font-bold text-green-600 animate-fadeIn">
                      ✨ Wish sent successfully!
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Your Name (e.g. Dr. Alex, University Friends)"
                    className="w-full px-3 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#E8D3C4] focus:border-[#B76E79] text-xs text-[#5C3A42] focus:outline-hidden"
                  />

                  <textarea
                    rows={2}
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Write your heartfelt congratulations and wishes for the lovely couple..."
                    className="w-full p-2.5 rounded-xl bg-[#FAF9F6] border border-[#E8D3C4] focus:border-[#B76E79] text-xs text-[#5C3A42] focus:outline-hidden resize-none"
                  />

                  {/* Quick wish chip presets */}
                  <div className="flex flex-wrap gap-1">
                    {QUICK_WISH_SUGGESTIONS.map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setGuestMessage(preset)}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[#FDF2EC] hover:bg-[#FCE5D9] text-[#8C4F5A] border border-[#E8D3C4] cursor-pointer"
                      >
                        {preset.slice(0, 24)}...
                      </button>
                    ))}
                  </div>

                  {/* Emoji selector & Submit Button */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1">
                      {['💖', '💍', '🥂', '🌸', '🧸', '⭐'].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setSelectedEmoji(emoji)}
                          className={`w-7 h-7 rounded-full text-xs flex items-center justify-center transition-all cursor-pointer ${
                            selectedEmoji === emoji 
                              ? 'bg-[#FDF2EC] scale-110 border border-[#B76E79]' 
                              : 'hover:bg-[#FAF9F6]'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleSendWish}
                      disabled={!guestMessage.trim() || isSendingWish}
                      className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#B76E79] to-[#D4AF37] text-white text-xs font-bold shadow-sm hover:opacity-95 disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send Wish ✨</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Wishes Stream Feed */}
              <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto pr-1">
                <span className="text-[11px] font-bold text-[#8C5D67] px-1">
                  Wishes from Guests ({wishesList.length})
                </span>
                
                {wishesList.map((wish) => (
                  <div key={wish.id} className="p-3 bg-white rounded-2xl border border-[#E8D3C4] shadow-xs flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#FDF2EC] border border-[#E8D3C4] flex items-center justify-center text-sm shrink-0">
                      {wish.emojiBadge || '💖'}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#5C3A42]">{wish.senderName}</span>
                        <span className="text-[9px] text-[#A66C78]">
                          {new Date(wish.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-[#6D5D6E] mt-0.5 leading-relaxed whitespace-pre-wrap">
                        {wish.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md p-3 sm:p-4 border-t border-[#E8D3C4] flex items-center gap-2">
          <a
            href={navUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 rounded-full bg-gradient-to-r from-[#B76E79] to-[#D4AF37] text-white text-xs font-bold shadow-md hover:opacity-95 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Navigate Google Maps 📍</span>
          </a>

          <button
            type="button"
            onClick={handleCopyShareLink}
            className="py-2.5 px-4 rounded-full bg-[#FDF2EC] hover:bg-[#FCE5D9] text-[#7D5A63] border border-[#E8D3C4] text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5 text-[#B76E79]" />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Lightbox for Gallery Photos */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/40 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => setSelectedPhotoIndex((prev) => (prev! > 0 ? prev! - 1 : allPhotos.length - 1))}
            className="absolute left-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-3xl max-h-[80vh] flex flex-col items-center">
            <img
              src={allPhotos[selectedPhotoIndex]}
              alt={`Gallery ${selectedPhotoIndex}`}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border-2 border-white/40"
            />
            <div className="mt-3 text-white text-xs font-bold bg-black/40 px-3 py-1 rounded-full border border-white/20">
              Photo {selectedPhotoIndex + 1} of {allPhotos.length}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedPhotoIndex((prev) => (prev! < allPhotos.length - 1 ? prev! + 1 : 0))}
            className="absolute right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
