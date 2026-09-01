/**
 * Image Processing & Format Conversion Utility
 * Supports JPEG, PNG, WEBP, GIF, SVG, BMP, and HEIC/HEIF conversion
 * Auto-resizes large photos to prevent memory limits and blank canvas renders
 */

export const DEFAULT_KAWAII_PHOTO = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80';
export const DEFAULT_WEDDING_INVITE_PHOTO = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80';
export const DEFAULT_WEDDING_WISHES_PHOTO = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80';

/**
 * Checks if a file is HEIC or HEIF format
 */
export function isHeicFile(file: File): boolean {
  const name = (file.name || '').toLowerCase();
  const type = (file.type || '').toLowerCase();
  return (
    name.endsWith('.heic') ||
    name.endsWith('.heif') ||
    type === 'image/heic' ||
    type === 'image/heif' ||
    type === 'image/heic-sequence' ||
    type === 'image/heif-sequence'
  );
}

/**
 * Converts HEIC/HEIF blob to a standard JPEG/PNG Blob
 */
async function convertHeicToBlob(file: File | Blob): Promise<Blob> {
  try {
    const heic2anyModule = await import('heic2any');
    const heic2any = (heic2anyModule.default || heic2anyModule) as unknown as (options: {
      blob: Blob;
      toType?: string;
      quality?: number;
    }) => Promise<Blob | Blob[]>;
    const result = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.9,
    });
    return Array.isArray(result) ? result[0] : result;
  } catch (error) {
    console.warn('HEIC conversion fallback or error:', error);
    return file;
  }
}

/**
 * Loads an image from a blob/url into an HTMLImageElement
 */
function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

/**
 * Smoothly resizes an image to fit within maxDimension preserving aspect ratio,
 * and returns a memory-safe data URL (JPEG/PNG).
 */
export function resizeImageToDataUrl(
  img: HTMLImageElement,
  maxDimension = 1200,
  quality = 0.88
): string {
  let width = img.naturalWidth || img.width;
  let height = img.naturalHeight || img.height;

  if (!width || !height) {
    return img.src;
  }

  // Scale down if larger than maxDimension
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
  
  if (!ctx) return img.src;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, width, height);

  try {
    return canvas.toDataURL('image/jpeg', quality);
  } catch {
    return img.src;
  }
}

/**
 * Processes an uploaded image File (JPEG, PNG, WEBP, GIF, SVG, HEIC, etc.)
 * Converts HEIC if necessary and resizes to prevent memory/blank preview issues.
 */
export async function processUploadedImage(
  file: File,
  maxDimension = 1200,
  quality = 0.88
): Promise<string> {
  let targetBlob: Blob = file;

  // 1. Check & Convert HEIC/HEIF
  if (isHeicFile(file)) {
    try {
      targetBlob = await convertHeicToBlob(file);
    } catch (e) {
      console.warn('Could not convert HEIC, trying direct read', e);
    }
  }

  // 2. Read Blob to Object URL or Data URL
  const objectUrl = URL.createObjectURL(targetBlob);

  try {
    const img = await loadImageElement(objectUrl);
    const resultDataUrl = resizeImageToDataUrl(img, maxDimension, quality);
    URL.revokeObjectURL(objectUrl);
    return resultDataUrl;
  } catch (err) {
    URL.revokeObjectURL(objectUrl);
    
    // Fallback: Read as raw Data URL if canvas load fails
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file as Data URL'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(targetBlob);
    });
  }
}
