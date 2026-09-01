import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { Copy, Check, Sparkles, RefreshCw, Smile, Eye, Heart, Image as ImageIcon, QrCode } from 'lucide-react';
import { CenterBadgeType, QRType, AppThemeMode, GreetingData, PhotoCardData, WeddingInviteData, WeddingWishesData } from '../types';
import { Translations } from '../translations';

interface QRCodePreviewProps {
  text: string;
  fgColor: string;
  bgColor: string;
  centerBadge: CenterBadgeType;
  customLogoUrl?: string;
  includeFrame: boolean;
  frameText: string;
  onSaveToHistory: (text: string) => void;
  isRealtime: boolean;
  manualTrigger: number;
  qrType: QRType;
  themeMode?: AppThemeMode;
  onOpenViewer?: () => void;
  t?: Translations;
  greetingData?: GreetingData;
  photoCardData?: PhotoCardData;
  weddingInviteData?: WeddingInviteData;
  weddingWishesData?: WeddingWishesData;
}

export function QRCodePreview({
  text,
  fgColor,
  bgColor,
  centerBadge,
  customLogoUrl,
  includeFrame,
  frameText,
  onSaveToHistory,
  manualTrigger,
  qrType,
  themeMode = 'kawaii',
  onOpenViewer,
  t,
  greetingData,
  photoCardData,
  weddingInviteData,
  weddingWishesData,
}: QRCodePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewTab, setPreviewTab] = useState<'qr' | 'card'>('qr');

  const isWeddingTheme = themeMode === 'wedding' || qrType === 'wedding_invite' || qrType === 'wedding_wishes';
  const isCardType = qrType === 'greeting' || qrType === 'photo_card' || qrType === 'wedding_invite' || qrType === 'wedding_wishes';

  // Automatically sync or reset tab if type changes
  useEffect(() => {
    if (!isCardType && previewTab === 'card') {
      setPreviewTab('qr');
    }
  }, [qrType, isCardType, previewTab]);

  // Generate QR Code with canvas drawing
  useEffect(() => {
    if (!text.trim()) {
      setDataUrl('');
      return;
    }

    const generate = async () => {
      setIsGenerating(true);
      try {
        const qrSize = 400;
        const margin = includeFrame ? 28 : 16;

        // Temporary canvas for raw QR
        const rawCanvas = document.createElement('canvas');
        const defaultEcc = (centerBadge !== 'none' || customLogoUrl) ? 'H' : 'M';
        
        try {
          await QRCode.toCanvas(rawCanvas, text, {
            width: qrSize,
            margin: 2,
            color: {
              dark: fgColor || (isWeddingTheme ? '#B76E79' : '#FF85A1'),
              light: bgColor || '#FFFFFF',
            },
            errorCorrectionLevel: defaultEcc,
          });
        } catch (eccErr) {
          // If H failed, try lower error correction M then L
          try {
            await QRCode.toCanvas(rawCanvas, text, {
              width: qrSize,
              margin: 2,
              color: {
                dark: fgColor || (isWeddingTheme ? '#B76E79' : '#FF85A1'),
                light: bgColor || '#FFFFFF',
              },
              errorCorrectionLevel: 'L',
            });
          } catch (retryErr) {
            // If still too large, fallback to a truncated safe URL or placeholder
            const fallbackText = text.length > 500 ? text.slice(0, 300) : text;
            await QRCode.toCanvas(rawCanvas, fallbackText, {
              width: qrSize,
              margin: 2,
              color: {
                dark: fgColor || (isWeddingTheme ? '#B76E79' : '#FF85A1'),
                light: bgColor || '#FFFFFF',
              },
              errorCorrectionLevel: 'L',
            });
          }
        }

        // Target canvas
        const finalCanvas = canvasRef.current || document.createElement('canvas');
        const extraBottom = includeFrame && frameText.trim() ? 50 : 0;
        finalCanvas.width = qrSize + margin * 2;
        finalCanvas.height = qrSize + margin * 2 + extraBottom;
        const ctx = finalCanvas.getContext('2d');

        if (!ctx) return;

        // Background fill
        ctx.fillStyle = bgColor || '#FFFFFF';
        ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

        // Cute Frame / Border
        if (includeFrame) {
          ctx.strokeStyle = fgColor || (isWeddingTheme ? '#B76E79' : '#FF85A1');
          ctx.lineWidth = 6;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          const radius = 24;
          const x = 10;
          const y = 10;
          const w = finalCanvas.width - 20;
          const h = finalCanvas.height - 20;

          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + w - radius, y);
          ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
          ctx.lineTo(x + w, y + h - radius);
          ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
          ctx.lineTo(x + radius, y + h);
          ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
          ctx.stroke();

          // Frame text
          if (frameText.trim()) {
            ctx.fillStyle = fgColor || (isWeddingTheme ? '#B76E79' : '#FF85A1');
            ctx.font = `bold 22px 'Mali', 'Itim', sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(frameText.trim(), finalCanvas.width / 2, finalCanvas.height - 35);
          }
        }

        // Draw main QR code
        ctx.drawImage(rawCanvas, margin, margin, qrSize, qrSize);

        // Center Cute Badge or Custom Logo
        const centerBadgeSize = Math.floor(qrSize * 0.22);
        const centerX = margin + qrSize / 2;
        const centerY = margin + qrSize / 2;

        if (customLogoUrl) {
          try {
            const logoImg = new Image();
            logoImg.crossOrigin = 'anonymous';
            await new Promise((resolve, reject) => {
              logoImg.onload = resolve;
              logoImg.onerror = reject;
              logoImg.src = customLogoUrl;
            });

            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, centerBadgeSize / 2 + 5, 0, Math.PI * 2);
            ctx.fillStyle = bgColor || '#FFFFFF';
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = fgColor || (isWeddingTheme ? '#B76E79' : '#FF85A1');
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(centerX, centerY, centerBadgeSize / 2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(
              logoImg,
              centerX - centerBadgeSize / 2,
              centerY - centerBadgeSize / 2,
              centerBadgeSize,
              centerBadgeSize
            );
            ctx.restore();
          } catch (e) {
            console.warn('Could not load custom logo image on canvas', e);
          }
        } else if (centerBadge !== 'none') {
          // Draw sticker circle background
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, centerBadgeSize / 2 + 4, 0, Math.PI * 2);
          ctx.fillStyle = bgColor || '#FFFFFF';
          ctx.fill();
          ctx.lineWidth = 3;
          ctx.strokeStyle = fgColor || (isWeddingTheme ? '#B76E79' : '#FF85A1');
          ctx.stroke();
          ctx.restore();

          // Draw cute emoji or icon in center
          const badgeMap: Record<CenterBadgeType, string> = {
            none: '',
            heart: '💖',
            star: '⭐',
            sparkle: '✨',
            cloud: '☁️',
            cat: '🐱',
            paw: '🐾',
            ribbon: '🎀',
            blossom: '🌸',
            bear: '🧸',
            ring: '💍',
            twin_hearts: '💕',
            wedding_cake: '🎂',
            church: '💒',
            wedding_ribbon: '🎀',
            bouquet: '💐',
            champagne: '🥂',
            dove: '🕊️',
          };

          const emojiChar = badgeMap[centerBadge] || '✨';
          ctx.font = `${Math.floor(centerBadgeSize * 0.65)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(emojiChar, centerX, centerY + 2);
        }

        const generatedDataUrl = finalCanvas.toDataURL('image/png');
        setDataUrl(generatedDataUrl);
      } catch (err) {
        console.error('Error generating QR Canvas', err);
      } finally {
        setIsGenerating(false);
      }
    };

    generate();
  }, [text, fgColor, bgColor, centerBadge, customLogoUrl, includeFrame, frameText, manualTrigger, isWeddingTheme]);

  // Handle Download
  const handleDownload = () => {
    if (!dataUrl) return;

    onSaveToHistory(text);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: isWeddingTheme ? ['#B76E79', '#D4AF37', '#E8D3C4', '#FDF2EC'] : ['#FF85A1', '#FFC0CB', '#E6E6FA', '#FFFACD'],
    });

    const link = document.createElement('a');
    link.download = `${isWeddingTheme ? 'wedding-smart-card' : 'kawaii-qr'}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  // Copy Image to clipboard
  const handleCopy = async () => {
    if (!dataUrl) return;
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      onSaveToHistory(text);
    } catch (e) {
      console.error('Copy QR image failed', e);
    }
  };

  return (
    <div id="qr-preview-container" className="w-full flex flex-col items-center">
      {/* Hidden working canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Preview Card */}
      <div className={`w-full max-w-sm lg:max-w-md rounded-[36px] p-5 sm:p-6 shadow-xl border-4 flex flex-col items-center gap-4 transition-all duration-300 ${
        isWeddingTheme 
          ? 'bg-white/95 border-[#E8D3C4] shadow-[0_12px_32px_rgba(212,175,55,0.15)]' 
          : 'bg-white/95 border-[#FFE4E1] shadow-[0_12px_32px_rgba(255,133,161,0.2)]'
      }`}>
        {/* Card Header & Tabs */}
        <div className="w-full flex flex-col gap-2.5">
          <div className="w-full flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="text-base">{isWeddingTheme ? '💍' : '🎀'}</span>
              <span className={`text-xs sm:text-sm font-bold ${isWeddingTheme ? 'text-[#5C3A42] font-serif' : 'text-[#6D5D6E]'}`}>
                {isWeddingTheme ? 'Wedding Smart Card' : 'Kawaii Creator Preview'}
              </span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isWeddingTheme ? 'bg-[#FDF2EC] text-[#B76E79] border border-[#E8D3C4]' : 'bg-[#FFF0F5] text-[#FF85A1]'
            }`}>
              {isWeddingTheme ? 'Wedding 💒' : 'Live ✨'}
            </span>
          </div>

          {/* Tab Switcher for Card Types (QR Code vs Live Card View) */}
          {isCardType && (
            <div className="w-full flex items-center p-1 rounded-2xl bg-[#FAF9F6] border border-[#E8D3C4]/60">
              <button
                type="button"
                onClick={() => setPreviewTab('qr')}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  previewTab === 'qr'
                    ? isWeddingTheme
                      ? 'bg-white text-[#B76E79] shadow-xs border border-[#E8D3C4]'
                      : 'bg-white text-[#FF85A1] shadow-xs border border-[#FFC0CB]'
                    : 'text-[#6D5D6E] hover:text-[#B76E79]'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QR Code</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab('card')}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  previewTab === 'card'
                    ? isWeddingTheme
                      ? 'bg-gradient-to-r from-[#B76E79] to-[#D4AF37] text-white shadow-xs'
                      : 'bg-gradient-to-r from-[#FF85A1] to-[#FFA3B8] text-white shadow-xs'
                    : 'text-[#6D5D6E] hover:text-[#FF85A1]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Card Preview 💌</span>
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: QR Code Canvas Display Box */}
        {previewTab === 'qr' && (
          <>
            <div className={`w-full aspect-square max-w-[320px] rounded-[28px] p-3 flex items-center justify-center border-2 transition-all relative overflow-hidden ${
              isWeddingTheme ? 'bg-[#FFFDFB] border-[#E8D3C4]' : 'bg-[#FFFDFD] border-[#FFE4E1]'
            }`}>
              {/* Subtle frame corner sparkles */}
              <div className="absolute top-2 left-2 text-[10px] text-[#B76E79] opacity-60">✨</div>
              <div className="absolute top-2 right-2 text-[10px] text-[#D4AF37] opacity-60">✨</div>
              <div className="absolute bottom-2 left-2 text-[10px] text-[#D4AF37] opacity-60">✨</div>
              <div className="absolute bottom-2 right-2 text-[10px] text-[#B76E79] opacity-60">✨</div>

              <div className="w-full h-full flex items-center justify-center">
                {text.trim() ? (
                  dataUrl && !isGenerating ? (
                    <img
                      src={dataUrl}
                      alt="Generated QR Code"
                      className="max-w-full max-h-full object-contain rounded-xl transition-transform duration-300 hover:scale-102"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[#6D5D6E]/60">
                      <RefreshCw className={`w-6 h-6 animate-spin ${isWeddingTheme ? 'text-[#B76E79]' : 'text-[#FF85A1]'}`} />
                      <span className="text-xs font-semibold">Generating QR Code...</span>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center p-3 text-center text-[#6D5D6E]/70">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1.5 animate-bounce ${
                      isWeddingTheme ? 'bg-[#FDF2EC]' : 'bg-[#FFEBF2]'
                    }`} style={{ animationDuration: '2s' }}>
                      {isWeddingTheme ? (
                        <span className="text-2xl">💍</span>
                      ) : (
                        <Smile className="w-7 h-7 text-[#FF85A1]" />
                      )}
                    </div>
                    <p className="text-xs font-bold text-[#6D5D6E]">
                      Enter info to preview
                    </p>
                    <p className="text-[10px] text-[#6D5D6E]/60 mt-0.5">
                      {isWeddingTheme ? 'Wedding QR Code will appear here ✨' : 'Kawaii QR Code will appear here ✨'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {text.trim() && dataUrl ? (
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2">
                  {/* Download Button */}
                  <button
                    id="download-qr-btn"
                    type="button"
                    onClick={handleDownload}
                    className={`flex-1 py-3 px-5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all active:translate-y-1 cursor-pointer flex items-center justify-center gap-1.5 ${
                      isWeddingTheme
                        ? 'bg-gradient-to-r from-[#B76E79] to-[#D4AF37] text-white border-b-4 border-[#8C4F5A] active:border-b-0 hover:opacity-95'
                        : 'bg-[#E6E6FA] text-[#6D5D6E] border-b-4 border-[#D1D1F5] active:border-b-0 hover:bg-[#DCDCFE]'
                    }`}
                  >
                    <span>{isWeddingTheme ? '💍' : '💾'}</span>
                    <span>{t?.form.downloadPngBtn || 'Download PNG 💾'}</span>
                  </button>

                  {/* Quick Copy Button */}
                  <button
                    id="copy-qr-btn"
                    type="button"
                    onClick={handleCopy}
                    className={`py-3 px-4 rounded-full font-bold text-xs border transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                      isWeddingTheme
                        ? 'bg-[#FDF2EC] hover:bg-[#FCE5D9] text-[#A66C78] border-[#E8D3C4]'
                        : 'bg-[#FFF0F5] hover:bg-[#FFE4EE] text-[#FF85A1] border-[#FFD9E8]'
                    }`}
                    title="Copy QR Code Image"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-600 font-bold">{t?.form.qrCopied || 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t?.form.copyQrBtn || 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Test View Button */}
                {isCardType && onOpenViewer && (
                  <button
                    type="button"
                    onClick={onOpenViewer}
                    className={`w-full py-2.5 px-4 rounded-full border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isWeddingTheme
                        ? 'bg-gradient-to-r from-[#B76E79]/15 via-[#FDF2EC] to-[#D4AF37]/15 hover:from-[#B76E79]/25 hover:to-[#D4AF37]/25 border-[#E8D3C4] text-[#8C4F5A]'
                        : 'bg-gradient-to-r from-[#FF85A1]/15 to-[#B388FF]/15 hover:from-[#FF85A1]/25 hover:to-[#B388FF]/25 border-[#FFC0CB] text-[#D81B60]'
                    }`}
                  >
                    <Eye className={`w-3.5 h-3.5 ${isWeddingTheme ? 'text-[#B76E79]' : 'text-[#FF85A1]'}`} />
                    <span>👀 {t?.form.previewCardBtn || 'Open Recipient Preview Card'}</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="text-xs text-[#6D5D6E]/60 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB300]" />
                <span>Ready to generate high-quality QR code</span>
              </div>
            )}
          </>
        )}

        {/* Tab 2: Live Card Preview Display Box (Desktop & Mobile Visible) */}
        {previewTab === 'card' && isCardType && (
          <div className="w-full flex flex-col items-center gap-3 animate-fadeIn">
            {/* 1. Photo Card Preview */}
            {qrType === 'photo_card' && photoCardData && (
              <div className="w-full flex flex-col items-center text-center p-3 sm:p-4 rounded-3xl bg-gradient-to-br from-[#FFF9FB] via-[#FFF0F5] to-[#F7F0FF] border-2 border-dashed border-[#FFC0CB]">
                <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white text-[10px] font-bold text-[#FF85A1] border border-[#FFD5DE] mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>{photoCardData.title || 'Photo Card 🌸'}</span>
                </div>

                {photoCardData.toName && (
                  <p className="text-xs font-bold text-[#4F3950] mb-1.5">
                    To: <span className="text-[#FF85A1]">{photoCardData.toName}</span> 💕
                  </p>
                )}

                {/* Uncropped Responsive Photo Container */}
                <div className="w-full min-h-[180px] max-h-[320px] rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white flex items-center justify-center p-1.5 mb-2.5">
                  {photoCardData.imageUrl ? (
                    <img
                      src={photoCardData.imageUrl}
                      alt="Photo Card"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[300px] object-contain rounded-xl"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="w-full h-full min-h-[160px] flex-col items-center justify-center p-4 text-center bg-[#FFF0F5] select-none"
                    style={{ display: photoCardData.imageUrl ? 'none' : 'flex' }}
                  >
                    <span className="text-3xl mb-1">🖼️</span>
                    <span className="text-[11px] font-bold text-[#FF85A1]">Upload a photo to preview</span>
                  </div>
                </div>

                <p className="text-xs text-[#4F3950] font-medium leading-relaxed mb-2 px-1">
                  "{photoCardData.message || 'Wishing you happiness and success always! ✨'}"
                </p>

                {photoCardData.fromName && (
                  <div className="text-[11px] font-bold text-[#FF85A1] self-end pr-1">
                    With love: {photoCardData.fromName} 🌸
                  </div>
                )}
              </div>
            )}

            {/* 2. Wedding Invite Preview */}
            {qrType === 'wedding_invite' && weddingInviteData && (
              <div className="w-full flex flex-col items-center text-center p-3 sm:p-4 rounded-3xl bg-gradient-to-br from-[#FFFDFD] via-[#FDF2EC] to-[#FAF0E6] border-2 border-dashed border-[#E8D3C4]">
                <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white text-[10px] font-bold text-[#B76E79] border border-[#E8D3C4] mb-2 font-serif">
                  <span>💍</span>
                  <span>WEDDING INVITATION</span>
                </div>

                <h4 className="text-base sm:text-lg font-extrabold text-[#5C3A42] font-serif mb-1">
                  {weddingInviteData.groomName} & {weddingInviteData.brideName}
                </h4>

                {/* Uncropped Responsive Wedding Photo */}
                <div className="w-full min-h-[180px] max-h-[320px] rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white flex items-center justify-center p-1.5 mb-2.5">
                  <img
                    src={weddingInviteData.photoUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80'}
                    alt="Wedding Couple"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[300px] object-contain rounded-xl"
                  />
                </div>

                <p className="text-xs text-[#8C5D67] italic mb-2">
                  "{weddingInviteData.sweetQuote || 'Together is a beautiful place to be 💕'}"
                </p>

                <div className="w-full grid grid-cols-2 gap-1.5 text-left text-[10px] bg-white/90 p-2.5 rounded-xl border border-[#E8D3C4]">
                  <div>
                    <span className="font-bold text-[#5C3A42] block">📅 Date:</span>
                    <span className="text-[#7D5A63] truncate block">{weddingInviteData.eventDate}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#5C3A42] block">📍 Venue:</span>
                    <span className="text-[#7D5A63] truncate block">{weddingInviteData.venueName}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Wedding Wishes Preview */}
            {qrType === 'wedding_wishes' && weddingWishesData && (
              <div className="w-full flex flex-col items-center text-center p-3 sm:p-4 rounded-3xl bg-gradient-to-br from-[#FFFDFD] via-[#FDF2EC] to-[#FAF0E6] border-2 border-dashed border-[#E8D3C4]">
                <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white text-[10px] font-bold text-[#A66C78] border border-[#E8D3C4] mb-2 font-serif">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>Wedding Wishes Card 🥂</span>
                </div>

                <h4 className="text-sm font-bold text-[#5C3A42] mb-2 font-serif">
                  To: {weddingWishesData.groomAndBride || 'Bride & Groom'} 💕
                </h4>

                {weddingWishesData.photoUrl && (
                  <div className="w-full min-h-[160px] max-h-[280px] rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white flex items-center justify-center p-1.5 mb-2.5">
                    <img
                      src={weddingWishesData.photoUrl}
                      alt="Wishes Photo"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[260px] object-contain rounded-xl"
                    />
                  </div>
                )}

                <p className="text-xs text-[#5C3A42] font-medium leading-relaxed mb-2">
                  "{weddingWishesData.wishMessage || 'Wishing you both a lifetime of happiness!'}"
                </p>

                {weddingWishesData.senderName && (
                  <div className="text-[11px] font-bold text-[#A66C78] self-end pr-1">
                    With love: {weddingWishesData.senderName} 🥂
                  </div>
                )}
              </div>
            )}

            {/* 4. Normal Greeting Preview */}
            {qrType === 'greeting' && greetingData && (
              <div className="w-full flex flex-col items-center text-center p-3 sm:p-4 rounded-3xl bg-gradient-to-br from-[#FFF9FB] via-[#FFF0F5] to-[#F7F0FF] border-2 border-dashed border-[#FFC0CB]">
                <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white text-[10px] font-bold text-[#FF85A1] border border-[#FFD5DE] mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>{greetingData.title || 'Special Message 💖'}</span>
                </div>

                {greetingData.toName && (
                  <p className="text-xs font-bold text-[#4F3950] mb-2">
                    To: <span className="text-[#FF85A1]">{greetingData.toName}</span> 🌸
                  </p>
                )}

                <p className="text-xs sm:text-sm text-[#4F3950] font-medium leading-relaxed mb-3 px-1">
                  "{greetingData.message || 'Wishing you a day filled with sunshine, happiness, and sweet smiles! ✨💖'}"
                </p>

                {greetingData.fromName && (
                  <div className="text-[11px] font-bold text-[#FF85A1] self-end pr-1">
                    With love: {greetingData.fromName} 🧸💕
                  </div>
                )}
              </div>
            )}

            {/* Full Screen View Button */}
            {onOpenViewer && (
              <button
                type="button"
                onClick={onOpenViewer}
                className={`w-full py-2.5 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                  isWeddingTheme
                    ? 'bg-gradient-to-r from-[#B76E79] to-[#D4AF37] text-white hover:opacity-95'
                    : 'bg-[#FF85A1] hover:bg-[#FF6E90] text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open Full Recipient Screen 👀</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
