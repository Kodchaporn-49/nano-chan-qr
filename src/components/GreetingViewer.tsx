import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Sparkles, 
  Gift, 
  Share2, 
  Check, 
  X, 
  ExternalLink,
  MessageSquareHeart,
  Calendar,
  Clock,
  MapPin,
  Shirt
} from 'lucide-react';
import { GreetingData, PhotoCardData, WeddingInviteData, WeddingWishesData, QRType } from '../types';
import { WeddingSmartCardModal } from './WeddingSmartCardModal';

interface GreetingViewerProps {
  isOpen: boolean;
  onClose: () => void;
  type: QRType;
  greetingData?: GreetingData;
  photoCardData?: PhotoCardData;
  weddingInviteData?: WeddingInviteData;
  weddingWishesData?: WeddingWishesData;
}

export function GreetingViewer({
  isOpen,
  onClose,
  type,
  greetingData,
  photoCardData,
  weddingInviteData,
  weddingWishesData,
}: GreetingViewerProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsOpened(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // If this is a Wedding Invite, render the dedicated Full Screen Wedding Smart Card
  if (type === 'wedding_invite' && weddingInviteData) {
    return (
      <WeddingSmartCardModal
        isOpen={isOpen}
        onClose={onClose}
        data={weddingInviteData}
      />
    );
  }

  const isWedding = type === 'wedding_wishes';

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    // Fire festive confetti matching theme
    if (isWedding) {
      confetti({
        particleCount: 90,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#B76E79', '#D4AF37', '#FFD1DC', '#FFF0F5', '#E5C158', '#FFFFFF'],
      });
    } else {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FF85A1', '#FFC0CB', '#E6E6FA', '#FFFACD', '#B388FF', '#FF69B4'],
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fadeIn overflow-y-auto">
      {/* Background Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {isWedding ? (
          <>
            <div className="absolute top-10 left-10 text-3xl animate-bounce" style={{ animationDuration: '3.5s' }}>💍</div>
            <div className="absolute top-20 right-12 text-3xl animate-pulse">🥂</div>
            <div className="absolute bottom-16 left-16 text-3xl animate-float-slow">🌹</div>
            <div className="absolute bottom-20 right-20 text-3xl animate-bounce" style={{ animationDuration: '4s' }}>✨</div>
          </>
        ) : (
          <>
            <div className="absolute top-10 left-10 text-3xl animate-bounce" style={{ animationDuration: '3s' }}>✨</div>
            <div className="absolute top-20 right-12 text-3xl animate-pulse">💖</div>
            <div className="absolute bottom-16 left-16 text-3xl animate-float-slow">🌸</div>
            <div className="absolute bottom-20 right-20 text-3xl animate-bounce" style={{ animationDuration: '4s' }}>⭐</div>
          </>
        )}
      </div>

      <div className={`relative w-full max-w-lg rounded-[40px] shadow-2xl border-4 overflow-hidden flex flex-col items-center p-6 sm:p-8 z-10 my-auto ${
        isWedding 
          ? 'bg-gradient-to-b from-[#FFFDFD] via-[#FFF9F6] to-[#FFF5F2] border-[#E8D3C4]' 
          : 'bg-white border-[#FFE4E1]'
      }`}>
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors cursor-pointer ${
            isWedding 
              ? 'bg-[#FDF2EC] hover:bg-[#FCE5D9] text-[#A66C78]' 
              : 'bg-[#FFF0F5] hover:bg-[#FFE4EE] text-[#FF85A1]'
          }`}
          title="ปิด"
        >
          <X className="w-5 h-5" />
        </button>

        {!isOpened ? (
          /* Sealed Envelope View */
          <div className="flex flex-col items-center text-center py-6">
            <div className="relative mb-6">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-inner animate-pulse ${
                isWedding
                  ? 'bg-gradient-to-tr from-[#B76E79]/20 via-[#FDF2EC] to-[#FCE8D5] border-2 border-[#E8D3C4]'
                  : 'bg-gradient-to-tr from-[#FF85A1]/20 via-[#E6E6FA] to-[#FFFACD]'
              }`}>
                {isWedding ? (
                  <span className="text-6xl select-none animate-bounce" style={{ animationDuration: '2s' }}>🥂</span>
                ) : (
                  <Gift className="w-16 h-16 text-[#FF85A1] animate-bounce" style={{ animationDuration: '2s' }} />
                )}
              </div>
              <span className="absolute -bottom-2 -right-2 text-2xl">{isWedding ? '💍' : '💌'}</span>
              <span className="absolute -top-1 -left-2 text-xl">{isWedding ? '✨' : '✨'}</span>
            </div>

            {isWedding ? (
              <>
                <p className="text-xs font-bold text-[#A66C78] bg-[#FDF2EC] px-3.5 py-1 rounded-full border border-[#E8D3C4] mb-2 tracking-wider">
                  🥂 WEDDING WISHES 💍
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#5C3A42] mb-1 font-serif">
                  Special Wedding Wishes
                </h3>
                <p className="text-xs sm:text-sm text-[#7D5A63] max-w-xs mb-6">
                  {`From ${weddingWishesData?.senderName || 'Well-wisher'} to the lovely couple`}
                </p>
                <button
                  type="button"
                  onClick={handleOpenEnvelope}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#B76E79] via-[#C98A94] to-[#D4AF37] text-white font-extrabold text-base shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-[#F5E6D3]"
                >
                  <span>🥂 Tap to Open Wishes ✨</span>
                </button>
              </>
            ) : (
              <>
                {greetingData?.toName && (
                  <p className="text-xs font-bold text-[#FF85A1] bg-[#FFF0F5] px-3 py-1 rounded-full border border-[#FFD5DE] mb-2">
                    To: {greetingData.toName} 💕
                  </p>
                )}
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#4F3352] mb-2">
                  You Have a Special Message!
                </h3>
                <p className="text-xs sm:text-sm text-[#6D5D6E] max-w-xs mb-6">
                  {greetingData?.fromName ? `From ${greetingData.fromName}` : 'Someone made a special card for you!'}
                </p>
                <button
                  type="button"
                  onClick={handleOpenEnvelope}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF85A1] via-[#FF94B4] to-[#B388FF] text-white font-extrabold text-base shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>💌 Tap to Open Message ✨</span>
                </button>
              </>
            )}
          </div>
        ) : (
          /* Revealed Card Content */
          <div className="w-full flex flex-col items-center text-center animate-fadeIn">
            
            {/* Wedding Wishes View */}
            {type === 'wedding_wishes' && weddingWishesData && (
              <div className="w-full flex flex-col items-center">
                <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FDF2EC] border border-[#E8D3C4] text-xs font-bold text-[#A66C78] mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Wedding Wishes Card 🥂💍</span>
                </div>

                <h3 className="text-lg font-bold text-[#5C3A42] mb-1 font-serif">
                  To: {weddingWishesData.groomAndBride || 'Bride & Groom'} 💕
                </h3>

                {weddingWishesData.photoUrl && (
                  <div className="w-full max-w-xs aspect-4/3 rounded-3xl overflow-hidden border-4 border-white shadow-md mb-4 bg-[#FDF2EC] relative flex items-center justify-center">
                    <img
                      src={weddingWishesData.photoUrl}
                      alt="Wishes Photo"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                        if (placeholder) {
                          placeholder.style.display = 'flex';
                        }
                      }}
                    />
                    <div 
                      className="w-full h-full flex-col items-center justify-center p-4 text-center bg-[#FDF2EC] select-none"
                      style={{ display: 'none' }}
                    >
                      <div className="text-3xl mb-1">🥂💍</div>
                      <span className="text-xs font-bold text-[#A66C78]">Sweet Wedding Moments ✨</span>
                    </div>
                  </div>
                )}

                <div className="w-full p-5 rounded-[25px] bg-white border-2 border-dashed border-[#E8D3C4] mb-4 shadow-inner">
                  <p className="text-base font-medium text-[#5C3A42] leading-relaxed whitespace-pre-wrap">
                    "{weddingWishesData.wishMessage || 'Wishing both of you a lifetime of endless love, joy, and wonderful happiness! 🌸✨'}"
                  </p>
                  {weddingWishesData.senderName && (
                    <div className="mt-3 pt-2 border-t border-[#FDF2EC] text-right text-xs font-bold text-[#A66C78]">
                      With love from: {weddingWishesData.senderName} 🥂
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Normal Greeting View */}
            {type === 'greeting' && greetingData && (
              <div className="w-full flex flex-col items-center">
                <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FFF0F5] border border-[#FFC0CB] text-xs font-bold text-[#FF85A1] mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{greetingData.title || 'Special Message 💖'}</span>
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </div>

                {greetingData.toName && (
                  <p className="text-xs font-semibold text-[#8C6D85] mb-1">
                    To: <span className="font-bold text-[#FF85A1] text-sm">{greetingData.toName}</span> 🌸
                  </p>
                )}

                <div className="w-full p-5 rounded-[28px] bg-gradient-to-br from-[#FFF9FB] via-[#FFF0F5] to-[#F7F0FF] border-2 border-dashed border-[#FFC0CB] mb-5 shadow-inner">
                  <p className="text-base sm:text-lg font-medium text-[#4F3950] whitespace-pre-wrap leading-relaxed">
                    {greetingData.message || 'Wishing you a day filled with sunshine, happiness, and sweet smiles! ✨💖'}
                  </p>
                  {greetingData.fromName && (
                    <div className="mt-4 pt-2 border-t border-[#FFD9E8]/60 flex items-center justify-end gap-1 text-xs font-bold text-[#FF85A1]">
                      <span>With love from:</span>
                      <span>{greetingData.fromName} 🧸💕</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Normal Photo Card View */}
            {type === 'photo_card' && photoCardData && (() => {
              const displayImage = photoCardData.imageUrl || 
                (photoCardData.localPhotoKey ? (typeof window !== 'undefined' ? localStorage.getItem(`vibrant_local_photo_${photoCardData.localPhotoKey}`) : '') : '');

              return (
                <div className="w-full flex flex-col items-center">
                  <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FFF0F5] border border-[#FFC0CB] text-xs font-bold text-[#FF85A1] mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{photoCardData.title || 'Special Photo Card 🌸'}</span>
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>

                  {photoCardData.toName && (
                    <p className="text-xs font-semibold text-[#8C6D85] mb-1.5">
                      To: <span className="font-bold text-[#FF85A1] text-sm">{photoCardData.toName}</span> 🌸
                    </p>
                  )}

                  {/* Photo Card Frame with Guaranteed No-Broken-Image Fallback */}
                  <div className="w-full max-w-xs aspect-4/3 rounded-3xl overflow-hidden border-4 border-white shadow-md mb-4 bg-gradient-to-br from-[#FFF0F5] via-[#FFF9FB] to-[#F7F0FF] relative group flex items-center justify-center">
                    {displayImage ? (
                      <>
                        <img
                          src={displayImage}
                          alt="Card Photo"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                            if (placeholder) {
                              placeholder.style.display = 'flex';
                            }
                          }}
                        />
                        {/* Fallback Cute Pastel Placeholder if image fails */}
                        <div 
                          className="w-full h-full flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#FFF0F5] via-[#FFF9FB] to-[#F3E5F5] select-none"
                          style={{ display: 'none' }}
                        >
                          <div className="w-14 h-14 rounded-2xl bg-white/90 shadow-xs flex items-center justify-center text-3xl mb-2 border border-[#FFD5DE] animate-pulse">
                            🖼️
                          </div>
                          <span className="text-xs font-bold text-[#FF85A1]">Sweet Photo Memory 💖</span>
                          <span className="text-[10px] text-[#8C6D85] mt-0.5">Special moments captured with love ✨</span>
                        </div>
                      </>
                    ) : (
                      /* Default Cute Pastel Illustration when no photo is provided */
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#FFF0F5] via-[#FFF9FB] to-[#F3E5F5] select-none">
                        <div className="w-14 h-14 rounded-2xl bg-white/90 shadow-xs flex items-center justify-center text-3xl mb-2 border border-[#FFD5DE] animate-bounce" style={{ animationDuration: '3s' }}>
                          🌸
                        </div>
                        <span className="text-xs font-bold text-[#FF85A1]">Sweet Memory Card 💖</span>
                        <span className="text-[10px] text-[#8C6D85] mt-0.5">Warmest wishes & happy moments ✨</span>
                      </div>
                    )}
                  </div>

                  <div className="w-full p-4 rounded-[25px] bg-gradient-to-br from-[#FFF9FB] to-[#F7F0FF] border-2 border-dashed border-[#FFC0CB] mb-4 shadow-inner">
                    <p className="text-base font-medium text-[#4F3950] whitespace-pre-wrap leading-relaxed">
                      {photoCardData.message || 'Wishing you happiness and success always! ✨'}
                    </p>
                    {photoCardData.fromName && (
                      <div className="mt-3 pt-2 border-t border-[#FFD9E8]/60 flex items-center justify-end gap-1 text-xs font-bold text-[#FF85A1]">
                        <span>From: {photoCardData.fromName} 🌸</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Action Buttons Footer */}
            <div className="w-full flex flex-col sm:flex-row gap-2 mt-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className={`flex-1 py-3 px-4 rounded-full text-xs font-bold border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isWedding 
                    ? 'bg-[#FAF6F4] hover:bg-[#F8EFEA] text-[#7D5A63] border-[#E8D3C4]' 
                    : 'bg-[#FAF9F6] hover:bg-[#FFF0F5] text-[#6D5D6E] border-[#FFE4E1]'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Link copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className={`w-4 h-4 ${isWedding ? 'text-[#B76E79]' : 'text-[#FF85A1]'}`} />
                    <span>Share This Card</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className={`flex-1 py-3 px-4 rounded-full text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isWedding 
                    ? 'bg-gradient-to-r from-[#B76E79] to-[#D4AF37] hover:opacity-95' 
                    : 'bg-[#FF85A1] hover:bg-[#FF6E90]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#FFFACD]" />
                <span>Create a QR Code Like This</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
