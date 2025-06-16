const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Tamaños de iconos requeridos
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// SVG base para el icono
const svgContent = `<svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="eye" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#60a5fa;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Fondo -->
  <rect width="192" height="192" rx="24" fill="url(#bg)"/>
  
  <!-- Círculo exterior del ojo -->
  <circle cx="96" cy="96" r="60" fill="none" stroke="url(#eye)" stroke-width="4"/>
  
  <!-- Iris del ojo -->
  <circle cx="96" cy="96" r="35" fill="url(#eye)"/>
  
  <!-- Pupila -->
  <circle cx="96" cy="96" r="20" fill="#1e293b"/>
  
  <!-- Reflejo en el ojo -->
  <circle cx="85" cy="85" r="8" fill="#ffffff" opacity="0.8"/>
  
  <!-- Estrellas decorativas -->
  <circle cx="40" cy="40" r="2" fill="#ffffff" opacity="0.6"/>
  <circle cx="152" cy="40" r="2" fill="#ffffff" opacity="0.6"/>
  <circle cx="40" cy="152" r="2" fill="#ffffff" opacity="0.6"/>
  <circle cx="152" cy="152" r="2" fill="#ffffff" opacity="0.6"/>
  <circle cx="96" cy="30" r="1.5" fill="#ffffff" opacity="0.4"/>
  <circle cx="96" cy="162" r="1.5" fill="#ffffff" opacity="0.4"/>
  <circle cx="30" cy="96" r="1.5" fill="#ffffff" opacity="0.4"/>
  <circle cx="162" cy="96" r="1.5" fill="#ffffff" opacity="0.4"/>
</svg>`;

async function generateIcons() {
  try {
    console.log('🎨 Generando iconos PWA...');
    
    for (const size of sizes) {
      const iconPath = path.join(__dirname, '..', 'public', 'icons', `icon-${size}x${size}.png`);
      
      await sharp(Buffer.from(svgContent))
        .resize(size, size)
        .png()
        .toFile(iconPath);
      
      console.log(`✅ Icono ${size}x${size}.png generado`);
    }
    
    console.log('\n🎯 Iconos PWA generados exitosamente!');
    console.log('📱 Los iconos están listos para usar en la PWA.');
    
  } catch (error) {
    console.error('❌ Error generando iconos:', error);
  }
}

generateIcons(); 