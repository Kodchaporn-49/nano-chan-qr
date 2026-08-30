import { WeddingInviteData } from '../types';

/**
 * Generate Google Calendar Add-Event URL
 */
export function getGoogleCalendarUrl(data: WeddingInviteData): string {
  const title = encodeURIComponent(`💍 งานมงคลสมรส: ${data.groomName} & ${data.brideName}`);
  
  // Format date for Google Calendar (YYYYMMDDTHHmmss or YYYYMMDD)
  let dateParam = '';
  const cleanDateStr = (data.eventDateRaw || '').replace(/-/g, '');
  
  if (cleanDateStr && cleanDateStr.length === 8) {
    // If eventDateRaw is e.g. 20261224
    dateParam = `${cleanDateStr}T110000Z/${cleanDateStr}T150000Z`;
  } else {
    // Default fallback date
    dateParam = '20261224T110000Z/20261224T150000Z';
  }

  const details = encodeURIComponent(
    `ขอเรียนเชิญร่วมเป็นเกียรติและสักขีพยานในงานมงคลสมรส\n` +
    `ระหว่าง ${data.groomName} และ ${data.brideName}\n\n` +
    `📅 วันที่: ${data.eventDate}\n` +
    `⏰ เวลา: ${data.eventTime}\n` +
    `📍 สถานที่: ${data.venueName}${data.venueRoom ? ' (' + data.venueRoom + ')' : ''}\n\n` +
    `"${data.sweetQuote || 'Together is a beautiful place to be 💕'}"`
  );

  const location = encodeURIComponent(`${data.venueName}${data.venueRoom ? ' ' + data.venueRoom : ''}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateParam}&details=${details}&location=${location}`;
}

/**
 * Generate and download .ics iCalendar file for Apple Calendar, Outlook, and Android
 */
export function downloadIcsCalendar(data: WeddingInviteData): void {
  const cleanDateStr = (data.eventDateRaw || '2026-12-24').replace(/-/g, '');
  const startDt = `${cleanDateStr}T180000`;
  const endDt = `${cleanDateStr}T220000`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kawaii Wedding Magic//Wedding Smart Card//TH',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${Date.now()}@kawaii-qr.app`,
    `DTSTAMP:${cleanDateStr}T000000Z`,
    `DTSTART;TZID=Asia/Bangkok:${startDt}`,
    `DTEND;TZID=Asia/Bangkok:${endDt}`,
    `SUMMARY:💍 งานมงคลสมรส: ${data.groomName} & ${data.brideName}`,
    `DESCRIPTION:ขอเรียนเชิญร่วมงานมงคลสมรสระหว่าง ${data.groomName} และ ${data.brideName}\\nสถานที่: ${data.venueName}\\nเวลา: ${data.eventTime}`,
    `LOCATION:${data.venueName}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `Wedding-${data.groomName}-${data.brideName}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Get Google Maps Direct Navigation URL
 */
export function getGoogleMapsNavigationUrl(venueName: string, customUrl?: string): string {
  if (customUrl && customUrl.trim().startsWith('http')) {
    return customUrl.trim();
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueName || 'โรงแรมจัดงานแต่งงาน')}`;
}
