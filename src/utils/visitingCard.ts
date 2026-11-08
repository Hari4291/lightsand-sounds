import { toPng } from 'html-to-image';
import QRCode from 'qrcode';
import { businessConfig } from '../config/business';
import { getWhatsAppUrl, hasWhatsAppNumber } from './whatsapp';

/**
 * Generates a high-quality data URL QR Code for the business WhatsApp.
 * Returns null if no WhatsApp number is configured (Strict condition: Never generate a QR code for a fake/empty number).
 */
export async function generateWhatsAppQRCode(): Promise<string | null> {
  if (!hasWhatsAppNumber()) return null;

  const url = getWhatsAppUrl(
    `Hello ${businessConfig.businessName}! I scanned your digital visiting card and would like to enquire about your event services.`
  );
  if (!url) return null;

  try {
    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 280,
      margin: 1,
      color: {
        dark: '#0a0d14', // Deep Navy / Almost Black
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    });
    return qrDataUrl;
  } catch (err) {
    console.error('Error generating WhatsApp QR code:', err);
    return null;
  }
}

/**
 * Fallback Canvas generator that crafts an ultra-crisp 1200x700 printable business card PNG
 * when DOM capture encounters cross-origin or SVG rendering limits.
 */
function generateCanvasVisitingCard(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 700;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Dark Luxury Background
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 700);
  bgGrad.addColorStop(0, '#0a0d14');
  bgGrad.addColorStop(0.5, '#0e131d');
  bgGrad.addColorStop(1, '#05070a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 700);

  // 2. Gold Borders
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, 1140, 640);

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(42, 42, 1116, 616);

  // Corner decorations
  ctx.fillStyle = '#d4af37';
  const corners = [
    [30, 30],
    [1160, 30],
    [30, 660],
    [1160, 660]
  ];
  corners.forEach(([x, y]) => {
    ctx.fillRect(x - 4, y - 4, 8, 8);
  });

  // 3. Brand Header
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 42px "Playfair Display", Georgia, serif';
  ctx.fillText(businessConfig.businessName, 80, 120);

  ctx.fillStyle = '#d4af37';
  ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(businessConfig.tagline.toUpperCase(), 80, 155);

  // Divider
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
  ctx.beginPath();
  ctx.moveTo(80, 185);
  ctx.lineTo(720, 185);
  ctx.stroke();

  // 4. Contact & Location
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`📍 Location: ${businessConfig.location}`, 80, 225);

  let currentY = 265;
  if (businessConfig.phoneNumber) {
    ctx.fillText(`📞 Phone: ${businessConfig.phoneNumber}`, 80, currentY);
    currentY += 40;
  }
  if (businessConfig.whatsappNumber) {
    ctx.fillText(`💬 WhatsApp: +${businessConfig.whatsappNumber}`, 80, currentY);
    currentY += 40;
  }

  // 5. Six Services List
  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('CORE SERVICES OFFERED:', 80, currentY + 15);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '400 17px "Plus Jakarta Sans", sans-serif';
  const services = businessConfig.services.map((s) => s.title);
  const col1 = services.slice(0, 3);
  const col2 = services.slice(3, 6);

  col1.forEach((svc, idx) => {
    ctx.fillText(`• ${svc}`, 80, currentY + 50 + idx * 32);
  });
  col2.forEach((svc, idx) => {
    ctx.fillText(`• ${svc}`, 380, currentY + 50 + idx * 32);
  });

  // 6. Right Side Frame: Leadership & Quality Mark
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2;
  ctx.strokeRect(800, 90, 320, 480);
  ctx.fillStyle = '#101522';
  ctx.fillRect(802, 92, 316, 476);

  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 20px "Playfair Display", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('PREMIUM EVENT SERVICES', 960, 160);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Paluri Vari Palli, Andhra Pradesh', 960, 190);

  // Gold emblem box
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.strokeRect(880, 230, 160, 160);
  ctx.fillStyle = '#182032';
  ctx.fillRect(882, 232, 156, 156);

  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 44px "Playfair Display", serif';
  ctx.fillText('GLS', 960, 325);

  ctx.fillStyle = '#ffffff';
  ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Dedicated Event Leadership', 960, 440);

  ctx.fillStyle = '#d4af37';
  ctx.font = '400 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Direct Calls & WhatsApp Only', 960, 470);

  ctx.textAlign = 'left';
  return canvas.toDataURL('image/png');
}

/**
 * Downloads a visiting card DOM element as a high-resolution PNG image.
 */
export async function downloadVisitingCard(
  cardElement: HTMLElement,
  fileName: string = `${businessConfig.businessName.replace(/\s+/g, '-')}-Visiting-Card.png`
): Promise<boolean> {
  if (!cardElement) return false;

  const triggerDownload = (url: string) => {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  try {
    // 2x pixel ratio for sharp printable export
    const dataUrl = await toPng(cardElement, {
      quality: 0.98,
      pixelRatio: 2,
      backgroundColor: '#0a0d14',
      cacheBust: true,
      filter: (node) => {
        // Exclude action buttons from the printed/downloaded card
        if (node instanceof HTMLElement && node.classList.contains('no-print-export')) {
          return false;
        }
        return true;
      }
    });

    triggerDownload(dataUrl);
    return true;
  } catch (error) {
    console.warn('DOM capture had a minor warning, generating canvas card fallback...', error);
    try {
      const fallbackUrl = generateCanvasVisitingCard();
      if (fallbackUrl) {
        triggerDownload(fallbackUrl);
        return true;
      }
    } catch (fallbackError) {
      console.error('Failed to generate visiting card fallback:', fallbackError);
    }
    return false;
  }
}

/**
 * Shares the business visiting card via Web Share API or falls back to copying business contact details to clipboard.
 */
export async function shareBusinessCard(): Promise<{
  success: boolean;
  method: 'share' | 'clipboard' | 'failed';
  message: string;
}> {
  const shareText = `${businessConfig.businessName} - ${businessConfig.tagline}
📍 Location: ${businessConfig.location}
${businessConfig.phoneNumber ? `📞 Call: ${businessConfig.phoneNumber}` : ''}
${businessConfig.whatsappNumber ? `💬 WhatsApp: https://wa.me/${businessConfig.whatsappNumber.replace(/[^0-9]/g, '')}` : ''}
✨ Services: DJ Services, Lighting, Tent House, Car/Driving, Sound Systems, Event Decoration.`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: `${businessConfig.businessName} - Digital Visiting Card`,
        text: shareText,
        url: window.location.href
      });
      return { success: true, method: 'share', message: 'Shared successfully!' };
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') {
        return { success: false, method: 'share', message: 'Share canceled.' };
      }
      // Fallback to clipboard if share failed
    }
  }

  // Clipboard fallback
  try {
    await navigator.clipboard.writeText(shareText);
    return {
      success: true,
      method: 'clipboard',
      message: 'Business card details copied to clipboard!'
    };
  } catch {
    return {
      success: false,
      method: 'failed',
      message: 'Could not share or copy business card.'
    };
  }
}
