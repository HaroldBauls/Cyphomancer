// script.js

// Function to detect if the device is a mobile device
function isMobileDevice() {
  return window.innerWidth <= 768;
}

// ==================== Wave Animation (Section 1) ====================

if (document.getElementById('waveCanvas')) {
  const waveCanvas = document.getElementById('waveCanvas');
  const waveCtx = waveCanvas.getContext('2d');

  function resizeWaveCanvas() {
    const waveSection = document.getElementById('wave-section');
    waveCanvas.width = waveSection.clientWidth;
    waveCanvas.height = waveSection.clientHeight;
  }
  window.addEventListener('resize', resizeWaveCanvas);
  resizeWaveCanvas();

  const wavePattern = (x, y, time) => {
    const offsetX = (x - waveCanvas.width / 2) / 50;
    const offsetY = (y - waveCanvas.height / 2) / 50;
    const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);

    const angle = distance * 2 - time;
    const wave1 = Math.sin(angle) * 10;
    const wave2 = Math.cos(angle / 2) * 10;

    const posX = x + wave1 + Math.cos(offsetX + time / 2) * 15;
    const posY = y + wave2 + Math.sin(offsetY + time / 3) * 15;

    return [posX, posY];
  };

  let waveTime = 0;
  const particleSize = 1.5;
  const color = 'rgba(255, 255, 255, 0.8)';

  function drawWave() {
    waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);

    for (let y = 0; y < waveCanvas.height; y += 10) {
      for (let x = 0; x < waveCanvas.width; x += 10) {
        const [posX, posY] = wavePattern(x, y, waveTime);
        if (
          posX >= 0 &&
          posX <= waveCanvas.width &&
          posY >= 0 &&
          posY <= waveCanvas.height
        ) {
          waveCtx.beginPath();
          waveCtx.arc(posX, posY, particleSize, 0, Math.PI * 2);
          waveCtx.fillStyle = color;
          waveCtx.fill();
        }
      }
    }

    // Adjust the animation speed based on device
    if (isMobileDevice()) {
      waveTime += Math.PI / 180; // Slower speed on mobile
    } else {
      waveTime += Math.PI / 90; // Original speed on desktop
    }
    requestAnimationFrame(drawWave);
  }

  drawWave();
}

// ==================== Jellyfish Animation (Section 3) ====================

if (document.getElementById('jellyfishCanvas')) {
  const jellyfishCanvas = document.getElementById('jellyfishCanvas');
  const jellyfishCtx = jellyfishCanvas.getContext('2d');

  function resizeJellyfishCanvas() {
    const jellyfishSection = document.getElementById('jellyfish-section');
    jellyfishCanvas.width = jellyfishSection.clientWidth;
    jellyfishCanvas.height = jellyfishSection.clientHeight;
  }
  window.addEventListener('resize', resizeJellyfishCanvas);
  resizeJellyfishCanvas();

  // Original pattern function for the jellyfish animation
  const patternFunction = (x, y, time) => {
    const offsetX = x / 7 - 30;
    const offsetY = y / 7 - 30;
    const distanceFactor = (offsetX ** 2 + offsetY ** 2) / 85;
    const wave1 = Math.sin(distanceFactor ** 1.7 - time);
    const wave2 = Math.cos(distanceFactor / 1.3 - time / 7);
    const posX =
      (x / 2.5 + (offsetX * 0.6) / Math.cos(y * 6) * wave1) * wave2 +
      offsetY * wave1 +
      jellyfishCanvas.width / 2;
    const posY =
      (x / 2.5 + y / 7 + distanceFactor * 7) * wave2 +
      jellyfishCanvas.height / 2;
    return [posX, posY];
  };

  let jellyfishTime = 0;
  function drawJellyfish() {
    jellyfishCtx.clearRect(0, 0, jellyfishCanvas.width, jellyfishCanvas.height);
    jellyfishCtx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // White color

    for (let y = 80; y < 320; y += 5) {
      for (let x = 80; x < 320; x += 2) {
        const [posX, posY] = patternFunction(x, y, jellyfishTime);
        if (
          posX >= 0 &&
          posX <= jellyfishCanvas.width &&
          posY >= 0 &&
          posY <= jellyfishCanvas.height
        ) {
          jellyfishCtx.beginPath();
          jellyfishCtx.arc(posX, posY, 1, 0, Math.PI * 2);
          jellyfishCtx.fill();
        }
      }
    }

    // Adjust the animation speed based on device
    if (isMobileDevice()) {
      jellyfishTime += Math.PI / 120; // Slower speed on mobile
    } else {
      jellyfishTime += Math.PI / 60; // Original speed on desktop
    }
    requestAnimationFrame(drawJellyfish);
  }

  drawJellyfish();
}

// ==================== Smaller Jellyfish Animation for deusexmachina.html ====================

if (document.getElementById('jellyfishCanvasSmall')) {
  const jellyfishCanvasSmall = document.getElementById('jellyfishCanvasSmall');
  const jellyfishCtxSmall = jellyfishCanvasSmall.getContext('2d');

  function resizeJellyfishCanvasSmall() {
    const jellyfishContainerSmall = document.querySelector('.jellyfish-container-small');
    jellyfishCanvasSmall.width = jellyfishContainerSmall.clientWidth;
    jellyfishCanvasSmall.height = jellyfishContainerSmall.clientHeight;
  }
  window.addEventListener('resize', resizeJellyfishCanvasSmall);
  resizeJellyfishCanvasSmall();

  // Adjusted pattern function for the smaller jellyfish animation
  const patternFunctionSmall = (x, y, time) => {
    const offsetX = x / 7 - 25;
    const offsetY = y / 7 - 25;
    const distanceFactor = (offsetX ** 2 + offsetY ** 2) / 80;
    const wave1 = Math.sin(distanceFactor ** 1.6 - time);
    const wave2 = Math.cos(distanceFactor / 1.4 - time / 6);
    const posX =
      (x / 2.6 + (offsetX * 0.55) / Math.cos(y * 5.5) * wave1) * wave2 +
      offsetY * wave1 +
      jellyfishCanvasSmall.width / 2;
    const posY =
      (x / 2.6 + y / 7 + distanceFactor * 6.5) * wave2 +
      jellyfishCanvasSmall.height / 2;
    return [posX, posY];
  };

  let jellyfishTimeSmall = 0;
  function drawJellyfishSmall() {
    jellyfishCtxSmall.clearRect(0, 0, jellyfishCanvasSmall.width, jellyfishCanvasSmall.height);
    jellyfishCtxSmall.fillStyle = 'rgba(255, 255, 255, 0.5)'; // White color

    for (let y = 70; y < 270; y += 5) {
      for (let x = 70; x < 270; x += 2) {
        const [posX, posY] = patternFunctionSmall(x, y, jellyfishTimeSmall);
        if (
          posX >= 0 &&
          posX <= jellyfishCanvasSmall.width &&
          posY >= 0 &&
          posY <= jellyfishCanvasSmall.height
        ) {
          jellyfishCtxSmall.beginPath();
          jellyfishCtxSmall.arc(posX, posY, 1, 0, Math.PI * 2);
          jellyfishCtxSmall.fill();
        }
      }
    }

    // Adjust the animation speed
    if (isMobileDevice()) {
      jellyfishTimeSmall += Math.PI / 125; // Slower speed on mobile
    } else {
      jellyfishTimeSmall += Math.PI / 65; // Speed for desktop
    }
    requestAnimationFrame(drawJellyfishSmall);
  }

  drawJellyfishSmall();
}

// ==================== Main Text Fade Effect ====================

// Handle the main text fade effect
const fadeTexts = document.querySelectorAll('.fade-text');
fadeTexts.forEach((element) => {
  // For touch devices
  element.addEventListener('click', () => {
    element.classList.add('active');
  });

  // For desktop hover effect
  element.addEventListener('mouseenter', () => {
    element.classList.add('active');
  });
  element.addEventListener('mouseleave', () => {
    element.classList.remove('active');
  });
});
