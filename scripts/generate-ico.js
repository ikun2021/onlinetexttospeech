const fs = require('fs');
const path = require('path');

function generateIco() {
  const size = 32;
  const imageSize = size * size * 4;
  const maskSize = (size * size) / 8; // 1 bit per pixel
  const headerSize = 6;
  const dirSize = 16;
  const bmpHeaderSize = 40;
  const totalDataSize = bmpHeaderSize + imageSize + maskSize;
  const totalFileSize = headerSize + dirSize + totalDataSize;

  const buf = Buffer.alloc(totalFileSize);

  // 1. ICO Header
  buf.writeUInt16LE(0, 0); // Reserved
  buf.writeUInt16LE(1, 2); // Type 1 = ICO
  buf.writeUInt16LE(1, 4); // 1 Image

  // 2. Directory Entry
  buf.writeUInt8(size, 6); // Width
  buf.writeUInt8(size, 7); // Height
  buf.writeUInt8(0, 8); // Color count
  buf.writeUInt8(0, 9); // Reserved
  buf.writeUInt16LE(1, 10); // Color planes
  buf.writeUInt16LE(32, 12); // Bits per pixel
  buf.writeUInt32LE(totalDataSize, 14); // Bytes in resource
  buf.writeUInt32LE(headerSize + dirSize, 18); // Image offset

  // 3. BITMAPINFOHEADER (BMP Header)
  const bmpOffset = headerSize + dirSize;
  buf.writeUInt32LE(bmpHeaderSize, bmpOffset + 0); // biSize
  buf.writeInt32LE(size, bmpOffset + 4); // biWidth
  buf.writeInt32LE(size * 2, bmpOffset + 8); // biHeight (XOR + AND mask height = 2 * size)
  buf.writeUInt16LE(1, bmpOffset + 12); // biPlanes
  buf.writeUInt16LE(32, bmpOffset + 14); // biBitCount
  buf.writeUInt32LE(0, bmpOffset + 16); // biCompression = BI_RGB
  buf.writeUInt32LE(imageSize + maskSize, bmpOffset + 20); // biSizeImage
  buf.writeInt32LE(0, bmpOffset + 24); // biXPelsPerMeter
  buf.writeInt32LE(0, bmpOffset + 28); // biYPelsPerMeter
  buf.writeUInt32LE(0, bmpOffset + 32); // biClrUsed
  buf.writeUInt32LE(0, bmpOffset + 36); // biClrImportant

  // Helper to determine if a pixel (x, y) is inside the 5 rounded soundwave bars
  // x: 0..31, y: 0..31 (y=0 top, y=31 bottom)
  const bars = [
    { cx: 4, cy: 15.5, hw: 1.8, hh: 5 },
    { cx: 9.5, cy: 15.5, hw: 1.8, hh: 9 },
    { cx: 15.5, cy: 15.5, hw: 1.8, hh: 13 },
    { cx: 21.5, cy: 15.5, hw: 1.8, hh: 9 },
    { cx: 27, cy: 15.5, hw: 1.8, hh: 5 },
  ];

  function getPixelAlpha(px, py) {
    for (const b of bars) {
      const dx = Math.abs(px - b.cx);
      const dy = Math.abs(py - b.cy);
      if (dx <= b.hw) {
        if (dy <= b.hh) return 255;
        // Rounded cap
        const extraY = dy - b.hh;
        const dist = Math.sqrt(dx * dx + extraY * extraY);
        if (dist <= b.hw + 0.3) {
          if (dist <= b.hw - 0.2) return 255;
          return Math.floor(255 * Math.max(0, 1 - (dist - (b.hw - 0.2)) / 0.5));
        }
      }
    }
    return 0;
  }

  // BMP pixel data is stored bottom-to-top
  const pixelOffset = bmpOffset + bmpHeaderSize;
  const maskOffset = pixelOffset + imageSize;

  for (let row = 0; row < size; row++) {
    // BMP row from bottom: bmpRow 0 is actual visual bottom (y = size - 1)
    const visualY = size - 1 - row;
    for (let col = 0; col < size; col++) {
      const visualX = col;
      const alpha = getPixelAlpha(visualX, visualY);

      const pIdx = pixelOffset + (row * size + col) * 4;
      if (alpha > 0) {
        // Solid black with alpha (BGRA)
        buf.writeUInt8(0, pIdx + 0); // B
        buf.writeUInt8(0, pIdx + 1); // G
        buf.writeUInt8(0, pIdx + 2); // R
        buf.writeUInt8(alpha, pIdx + 3); // A
      } else {
        buf.writeUInt32LE(0, pIdx);
      }
    }

    // Mask row: 1 bit per pixel, 1 = transparent, 0 = opaque
    // In 32-bit icons with alpha, mask is 0 or 1
    const mRowIdx = maskOffset + row * (size / 8);
    for (let b = 0; b < size / 8; b++) {
      let byteVal = 0;
      for (let bit = 0; bit < 8; bit++) {
        const col = b * 8 + bit;
        const alpha = getPixelAlpha(col, visualY);
        if (alpha < 128) {
          byteVal |= (1 << (7 - bit)); // 1 for transparent
        }
      }
      buf.writeUInt8(byteVal, mRowIdx + b);
    }
  }

  const appIcoPath = path.join(__dirname, '..', 'src', 'app', 'favicon.ico');
  const publicIcoPath = path.join(__dirname, '..', 'public', 'favicon.ico');

  fs.writeFileSync(appIcoPath, buf);
  fs.writeFileSync(publicIcoPath, buf);
  console.log('Successfully generated favicon.ico at:', appIcoPath, 'and', publicIcoPath);
}

generateIco();
