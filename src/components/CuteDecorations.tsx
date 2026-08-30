import { Heart, Sparkles, Star, Cloud } from 'lucide-react';
import { AppThemeMode } from '../types';

interface CuteDecorationsProps {
  themeMode?: AppThemeMode;
}

// Pre-defined static star positions to prevent hydration mismatch and keep performance high
interface StarParticle {
  id: string;
  top: string;
  left: string;
  size: number; // size in px
  type: 'sparkle' | 'star-4' | 'star-5' | 'dot' | 'mini-sparkle';
  color: string;
  animClass: string;
  opacity: number;
}

const KAWAII_STARS: StarParticle[] = [
  { id: 'k1', top: '5%', left: '8%', size: 14, type: 'sparkle', color: '#FFD700', animClass: 'animate-twinkle-1', opacity: 0.45 },
  { id: 'k2', top: '12%', left: '22%', size: 12, type: 'star-4', color: '#FFB6C1', animClass: 'animate-twinkle-2', opacity: 0.4 },
  { id: 'k3', top: '8%', left: '88%', size: 16, type: 'star-5', color: '#FDE68A', animClass: 'animate-twinkle-4', opacity: 0.5 },
  { id: 'k4', top: '18%', left: '76%', size: 10, type: 'mini-sparkle', color: '#E9D5FF', animClass: 'animate-twinkle-3', opacity: 0.35 },
  { id: 'k5', top: '28%', left: '4%', size: 15, type: 'star-4', color: '#FBCFE8', animClass: 'animate-twinkle-1', opacity: 0.4 },
  { id: 'k6', top: '35%', left: '94%', size: 13, type: 'sparkle', color: '#FDE68A', animClass: 'animate-twinkle-2', opacity: 0.45 },
  { id: 'k7', top: '48%', left: '3%', size: 11, type: 'mini-sparkle', color: '#FDE68A', animClass: 'animate-twinkle-3', opacity: 0.35 },
  { id: 'k8', top: '55%', left: '95%', size: 14, type: 'star-5', color: '#FFB6C1', animClass: 'animate-twinkle-1', opacity: 0.4 },
  { id: 'k9', top: '65%', left: '7%', size: 16, type: 'sparkle', color: '#E9D5FF', animClass: 'animate-twinkle-4', opacity: 0.45 },
  { id: 'k10', top: '72%', left: '91%', size: 12, type: 'star-4', color: '#FDE68A', animClass: 'animate-twinkle-2', opacity: 0.4 },
  { id: 'k11', top: '82%', left: '12%', size: 13, type: 'star-5', color: '#FBCFE8', animClass: 'animate-twinkle-3', opacity: 0.45 },
  { id: 'k12', top: '88%', left: '84%', size: 15, type: 'sparkle', color: '#FFD700', animClass: 'animate-twinkle-1', opacity: 0.5 },
  { id: 'k13', top: '22%', left: '15%', size: 8, type: 'dot', color: '#FFB6C1', animClass: 'animate-twinkle-2', opacity: 0.3 },
  { id: 'k14', top: '40%', left: '88%', size: 8, type: 'dot', color: '#FDE68A', animClass: 'animate-twinkle-4', opacity: 0.3 },
  { id: 'k15', top: '78%', left: '25%', size: 9, type: 'dot', color: '#E9D5FF', animClass: 'animate-twinkle-1', opacity: 0.3 },
];

const WEDDING_STARS: StarParticle[] = [
  { id: 'w1', top: '6%', left: '6%', size: 15, type: 'sparkle', color: '#D4AF37', animClass: 'animate-twinkle-1', opacity: 0.45 },
  { id: 'w2', top: '10%', left: '25%', size: 12, type: 'star-4', color: '#E8D3C4', animClass: 'animate-twinkle-2', opacity: 0.4 },
  { id: 'w3', top: '7%', left: '85%', size: 16, type: 'star-5', color: '#F3E5AB', animClass: 'animate-twinkle-4', opacity: 0.5 },
  { id: 'w4', top: '19%', left: '80%', size: 11, type: 'mini-sparkle', color: '#B76E79', animClass: 'animate-twinkle-3', opacity: 0.35 },
  { id: 'w5', top: '25%', left: '5%', size: 14, type: 'star-4', color: '#D4AF37', animClass: 'animate-twinkle-2', opacity: 0.45 },
  { id: 'w6', top: '38%', left: '95%', size: 12, type: 'sparkle', color: '#F3E5AB', animClass: 'animate-twinkle-1', opacity: 0.4 },
  { id: 'w7', top: '45%', left: '2%', size: 13, type: 'star-5', color: '#E8D3C4', animClass: 'animate-twinkle-3', opacity: 0.35 },
  { id: 'w8', top: '58%', left: '96%', size: 15, type: 'sparkle', color: '#D4AF37', animClass: 'animate-twinkle-4', opacity: 0.45 },
  { id: 'w9', top: '68%', left: '6%', size: 14, type: 'star-4', color: '#B76E79', animClass: 'animate-twinkle-1', opacity: 0.4 },
  { id: 'w10', top: '75%', left: '90%', size: 16, type: 'star-5', color: '#F3E5AB', animClass: 'animate-twinkle-2', opacity: 0.45 },
  { id: 'w11', top: '85%', left: '10%', size: 12, type: 'mini-sparkle', color: '#D4AF37', animClass: 'animate-twinkle-3', opacity: 0.4 },
  { id: 'w12', top: '90%', left: '82%', size: 15, type: 'sparkle', color: '#E8D3C4', animClass: 'animate-twinkle-1', opacity: 0.45 },
  { id: 'w13', top: '15%', left: '12%', size: 8, type: 'dot', color: '#D4AF37', animClass: 'animate-twinkle-2', opacity: 0.3 },
  { id: 'w14', top: '42%', left: '89%', size: 9, type: 'dot', color: '#B76E79', animClass: 'animate-twinkle-4', opacity: 0.3 },
  { id: 'w15', top: '82%', left: '22%', size: 8, type: 'dot', color: '#F3E5AB', animClass: 'animate-twinkle-1', opacity: 0.3 },
];

function StarSvg({ type, color, size }: { type: StarParticle['type']; color: string; size: number }) {
  if (type === 'dot') {
    return (
      <div 
        style={{ width: `${size}px`, height: `${size}px`, backgroundColor: color }} 
        className="rounded-full shadow-xs"
      />
    );
  }

  if (type === 'star-4') {
    // 4-point magical diamond sparkle star
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill={color}
        className="drop-shadow-xs"
      >
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
      </svg>
    );
  }

  if (type === 'star-5') {
    // 5-point cute star
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill={color}
        className="drop-shadow-xs"
      >
        <path d="M12 1.5L15.3 8.2L22.7 9.3L17.3 14.6L18.6 22L12 18.5L5.4 22L6.7 14.6L1.3 9.3L8.7 8.2L12 1.5Z" />
      </svg>
    );
  }

  // Sparkle icon
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="drop-shadow-xs"
    >
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>
    </svg>
  );
}

export function CuteDecorations({ themeMode = 'kawaii' }: CuteDecorationsProps) {
  const isWedding = themeMode === 'wedding';
  const starsList = isWedding ? WEDDING_STARS : KAWAII_STARS;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* 1. Star & Sparkle Particles (Gentle floating & Twinkling) */}
      {starsList.map((star) => (
        <div
          key={star.id}
          className={`absolute ${star.animClass} select-none transition-opacity duration-1000`}
          style={{
            top: star.top,
            left: star.left,
            opacity: star.opacity,
          }}
        >
          <StarSvg type={star.type} color={star.color} size={star.size} />
        </div>
      ))}

      {/* 2. Soft Ambient Glow Orbs */}
      {isWedding ? (
        <>
          <div className="absolute -top-10 -left-10 w-96 h-96 bg-gradient-to-br from-[#FDE8D5]/25 via-[#FCE4E8]/20 to-transparent rounded-full blur-3xl -z-10" />
          <div className="absolute top-1/3 -right-20 w-[420px] h-[420px] bg-gradient-to-bl from-[#FDF2EC]/30 via-[#FCE8D5]/20 to-transparent rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-10 left-1/4 w-[480px] h-[480px] bg-gradient-to-t from-[#FFF0F3]/30 to-transparent rounded-full blur-3xl -z-10" />
        </>
      ) : (
        <>
          <div className="absolute -top-10 -left-10 w-96 h-96 bg-gradient-to-br from-[#FFE0EC]/30 via-[#EFE4FF]/25 to-transparent rounded-full blur-3xl -z-10" />
          <div className="absolute top-1/3 -right-20 w-[420px] h-[420px] bg-gradient-to-bl from-[#FFF0F5]/35 via-[#FFE8F0]/25 to-transparent rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-10 left-1/4 w-[480px] h-[480px] bg-gradient-to-t from-[#FDF2F8]/35 to-transparent rounded-full blur-3xl -z-10" />
        </>
      )}

      {/* 3. Floating Cute Accent Badges (Placed comfortably at mid-lower sides away from top navbar) */}
      {isWedding ? (
        <>
          {/* Mid-Left Floating Wedding Ring Badge */}
          <div className="absolute top-44 left-3 sm:left-8 opacity-60 animate-float-slow hidden xl:block pointer-events-none">
            <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-xs px-3.5 py-1.5 rounded-full shadow-xs border border-[#E8D3C4]/80">
              <span className="text-sm">💍</span>
              <span className="text-[11px] font-serif font-bold text-[#A66C78]">Wedding Magic</span>
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            </div>
          </div>

          {/* Mid-Right Floating Champagne Toast Badge */}
          <div className="absolute top-48 right-3 sm:right-10 opacity-65 animate-float-delayed hidden xl:block pointer-events-none">
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full shadow-xs border border-[#E8D3C4]/80">
              <span className="text-sm">🥂</span>
              <span className="text-[11px] font-serif font-bold text-[#D4AF37]">Romance & Joy</span>
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            </div>
          </div>

          {/* Bottom Left Floating Flower */}
          <div className="absolute bottom-16 left-4 sm:left-12 opacity-50 animate-drift-slow hidden lg:block pointer-events-none">
            <div className="bg-white/80 backdrop-blur-xs px-2.5 py-1.5 rounded-full shadow-xs border border-[#E8D3C4]/70 flex items-center gap-1">
              <span className="text-base">🌸</span>
              <span className="text-[10px] font-serif font-bold text-[#B76E79]">Forever</span>
            </div>
          </div>

          {/* Bottom Right Floating Ring */}
          <div className="absolute bottom-12 right-4 sm:right-14 opacity-55 animate-drift-delayed hidden lg:block pointer-events-none">
            <div className="bg-white/80 backdrop-blur-xs px-2.5 py-1.5 rounded-full shadow-xs border border-[#E8D3C4]/70 flex items-center gap-1">
              <span className="text-base">💒</span>
              <span className="text-[10px] font-serif font-bold text-[#D4AF37]">Blessed</span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Mid-Left Floating Cloud Badge */}
          <div className="absolute top-44 left-3 sm:left-8 opacity-65 animate-float-slow hidden xl:block pointer-events-none">
            <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-xs px-3.5 py-1.5 rounded-full shadow-xs border border-[#FFDDF0]">
              <Cloud className="w-4 h-4 text-[#FFB6C1]" fill="#FFE4E1" />
              <span className="text-[11px] font-bold text-[#D15286]">Nano-chan ✨</span>
              <Sparkles className="w-3 h-3 text-[#FFD700]" />
            </div>
          </div>

          {/* Mid-Right Floating Kawaii Heart Badge */}
          <div className="absolute top-48 right-3 sm:right-10 opacity-70 animate-float-delayed hidden xl:block pointer-events-none">
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full shadow-xs border border-[#FFDDF0]">
              <Heart className="w-3.5 h-3.5 text-[#FF69B4]" fill="#FFB6C1" />
              <span className="text-[11px] font-bold text-[#D15286]">Kawaii Star</span>
              <Star className="w-3 h-3 text-[#FFD700]" fill="#FFE600" />
            </div>
          </div>

          {/* Bottom Left Floating Sparkle */}
          <div className="absolute bottom-16 left-4 sm:left-12 opacity-55 animate-drift-slow hidden lg:block pointer-events-none">
            <div className="bg-white/80 backdrop-blur-xs px-2.5 py-1.5 rounded-full shadow-xs border border-[#FFDDF0] flex items-center gap-1">
              <span className="text-base">🍓</span>
              <span className="text-[10px] font-bold text-[#FF85A1]">Sweet</span>
            </div>
          </div>

          {/* Bottom Right Floating Teddy */}
          <div className="absolute bottom-12 right-4 sm:right-14 opacity-60 animate-drift-delayed hidden lg:block pointer-events-none">
            <div className="bg-white/80 backdrop-blur-xs px-2.5 py-1.5 rounded-full shadow-xs border border-[#FFDDF0] flex items-center gap-1">
              <span className="text-base">🧸</span>
              <span className="text-[10px] font-bold text-[#9575CD]">Magic</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
