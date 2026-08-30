import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Trash2, ArrowUpRight, Copy, Check, Sparkles, Download } from 'lucide-react';
import { QRHistoryItem } from '../types';
import { Translations } from '../translations';

interface HistoryListProps {
  history: QRHistoryItem[];
  onSelectHistory: (item: QRHistoryItem) => void;
  onClearHistory: () => void;
  onDeleteItem: (id: string) => void;
  t?: Translations;
}

export function HistoryList({
  history,
  onSelectHistory,
  onClearHistory,
  t,
}: HistoryListProps) {
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Colors for items in the Vibrant Palette theme
  const itemColorStyles = [
    { bg: 'bg-[#FFEBEE]', text: 'text-[#FF85A1]', border: 'border-[#FFD5DE]' },
    { bg: 'bg-[#F3E5F5]', text: 'text-[#9575CD]', border: 'border-[#E1BEE7]' },
    { bg: 'bg-[#E1F5FE]', text: 'text-[#03A9F4]', border: 'border-[#B3E5FC]' },
  ];

  // Generate mini thumbnails
  useEffect(() => {
    history.forEach(async (item) => {
      if (!thumbnails[item.id]) {
        try {
          let payload = item.rawPayload || item.displayText;
          if (payload.length > 600) {
            payload = item.displayText || 'QR';
          }
          const url = await QRCode.toDataURL(payload, {
            width: 80,
            margin: 1,
            color: {
              dark: item.fgColor || '#FF85A1',
              light: item.bgColor || '#FFFFFF',
            },
            errorCorrectionLevel: 'L',
          });
          setThumbnails((prev) => ({ ...prev, [item.id]: url }));
        } catch (e) {
          try {
            const fallbackUrl = await QRCode.toDataURL(item.displayText || 'QR', {
              width: 80,
              margin: 1,
              color: {
                dark: item.fgColor || '#FF85A1',
                light: item.bgColor || '#FFFFFF',
              },
              errorCorrectionLevel: 'L',
            });
            setThumbnails((prev) => ({ ...prev, [item.id]: fallbackUrl }));
          } catch (err2) {
            console.warn('Failed to generate history thumb fallback', err2);
          }
        }
      }
    });
  }, [history]);

  const handleCopyText = (item: QRHistoryItem) => {
    const textToCopy = item.rawPayload || item.displayText;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDirectDownload = async (item: QRHistoryItem) => {
    try {
      let payload = item.rawPayload || item.displayText;
      if (payload.length > 800) {
        payload = item.displayText || 'QR';
      }
      const url = await QRCode.toDataURL(payload, {
        width: 600,
        margin: 2,
        color: {
          dark: item.fgColor || '#FF85A1',
          light: item.bgColor || '#FFFFFF',
        },
        errorCorrectionLevel: 'M',
      });
      const link = document.createElement('a');
      link.download = `kawaii-qr-history-${Date.now()}.png`;
      link.href = url;
      link.click();
    } catch (e) {
      console.warn('Download history item fallback', e);
    }
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div id="history-section" className="w-full flex flex-col gap-4 h-full justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between px-2 mb-3">
          <div className="text-sm font-bold flex items-center gap-2 text-[#6D5D6E]">
            <span>🕰️</span>
            <span>{t?.history.title || 'Recent History'}</span>
          </div>

          {history.length > 0 && (
            <button
              id="clear-all-history-btn"
              type="button"
              onClick={onClearHistory}
              className="text-[11px] text-[#A690A3] hover:text-[#FF85A1] flex items-center gap-1 transition-colors px-2 py-0.5 rounded-full hover:bg-white cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>{t?.history.clearAll || 'Clear'}</span>
            </button>
          )}
        </div>

        {/* 3 History Items */}
        <div className="flex flex-col gap-3">
          {history.length === 0 ? (
            <div className="bg-white p-4 rounded-[20px] shadow-sm border-2 border-white text-center">
              <Sparkles className="w-5 h-5 mx-auto mb-1 text-[#FF85A1]/60" />
              <p className="text-xs text-[#6D5D6E]/80 font-medium">{t?.history.emptyText || 'No history yet'}</p>
              <p className="text-[10px] text-[#6D5D6E]/50">{t?.history.emptySubtext || 'Saved automatically when creating QR'}</p>
            </div>
          ) : (
            history.map((item, index) => {
              const style = itemColorStyles[index % itemColorStyles.length];
              const isGreeting = item.type === 'greeting';
              const isPhotoCard = item.type === 'photo_card';
              const isWeddingInvite = item.type === 'wedding_invite';
              const isWeddingWishes = item.type === 'wedding_wishes';

              return (
                <div
                  key={item.id}
                  id={`history-item-${index}`}
                  className="bg-white p-3 rounded-[20px] shadow-sm border-2 border-white hover:border-[#FFE4E1] transition-all flex items-center gap-3 group"
                >
                  {/* Thumbnail container */}
                  <div className={`w-12 h-12 ${style.bg} rounded-xl shrink-0 overflow-hidden flex items-center justify-center p-1 border ${style.border}`}>
                    {thumbnails[item.id] ? (
                      <img
                        src={thumbnails[item.id]}
                        alt="Thumbnail"
                        className="w-full h-full object-contain rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#FF85A1]/20 rounded-sm" />
                    )}
                  </div>

                  {/* Text snippet */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold ${style.text}`}>
                        {formatTime(item.timestamp)}
                      </span>
                      {isWeddingInvite && <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#FDF2EC] text-[#B76E79] font-bold border border-[#E8D3C4]">Wedding 💒</span>}
                      {isWeddingWishes && <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#FDF2EC] text-[#D4AF37] font-bold border border-[#E8D3C4]">Wishes 🥂</span>}
                      {isGreeting && <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#FFF0F5] text-[#FF85A1] font-bold">Greeting 💌</span>}
                      {isPhotoCard && <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#F3E5F5] text-[#9575CD] font-bold">Photo 📸</span>}
                    </div>
                    <p className="text-xs truncate font-medium text-[#6D5D6E]" title={item.displayText}>
                      {item.displayText}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => onSelectHistory(item)}
                      title={t?.history.restore || 'Load this QR'}
                      className="p-1 rounded-lg text-[#6D5D6E] hover:text-[#FF85A1] hover:bg-[#FFF0F5] cursor-pointer transition-colors"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyText(item)}
                      title="Copy text or URL"
                      className="p-1 rounded-lg text-[#6D5D6E] hover:text-[#6D5D6E] hover:bg-[#FFF0F5] cursor-pointer transition-colors"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDirectDownload(item)}
                      title="Download PNG image"
                      className="p-1 rounded-lg text-[#6D5D6E] hover:text-[#FF85A1] hover:bg-[#FFF0F5] cursor-pointer transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Tip Box */}
      <div className="p-4 sm:p-5 bg-[#FFFACD] rounded-[30px] border-2 border-white shadow-sm mt-3 text-[#6D5D6E]">
        <p className="text-[11px] leading-relaxed italic">
          <span className="font-bold">✨ Cute Tip:</span> Try scanning the QR Code in "Wedding Card 💒" or "Greeting Card 💌" mode with your phone to reveal an impressive full-screen interactive card!
        </p>
      </div>
    </div>
  );
}
