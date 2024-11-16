// script.js

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

    waveTime += Math.PI / 90;
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

  const patternFunction = (x, y, time) => {
    const offsetX = x / 8 - 25;
    const offsetY = y / 8 - 25;
    const distanceFactor = (offsetX ** 2 + offsetY ** 2) / 99;
    const wave1 = Math.sin(distanceFactor ** 2 - time);
    const wave2 = Math.cos(distanceFactor / 2 - time / 8);
    const posX =
      (x / 3 + (offsetX * 0.5) / Math.cos(y * 5) * wave1) * wave2 +
      offsetY * wave1 +
      jellyfishCanvas.width / 2;
    const posY =
      (x / 3 + y / 8 + distanceFactor * 9) * wave2 +
      jellyfishCanvas.height / 2;
    return [posX, posY];
  };

  let jellyfishTime = 0;
  function drawJellyfish() {
    jellyfishCtx.clearRect(0, 0, jellyfishCanvas.width, jellyfishCanvas.height);
    jellyfishCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';

    for (let y = 99; y < 300; y += 5) {
      for (let x = 99; x < 300; x += 2) {
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

    jellyfishTime += Math.PI / 60;
    requestAnimationFrame(drawJellyfish);
  }

  drawJellyfish();
}

// ==================== Generate Hidden '42's in Section 2 ====================

if (document.querySelector('.text-container')) {
  function generateHiddenNumbers() {
    const textContainer = document.querySelector('.text-container');
    const numberOf42s = 3;

    const mainTitle = document.getElementById('main-title');
    const subTitle = document.getElementById('sub-title');

    const containerRect = textContainer.getBoundingClientRect();

    const mainTitleRect = mainTitle.getBoundingClientRect();
    const subTitleRect = subTitle.getBoundingClientRect();

    const adjustedMainTitleRect = {
      top: mainTitleRect.top - containerRect.top,
      bottom: mainTitleRect.bottom - containerRect.top,
      left: mainTitleRect.left - containerRect.left,
      right: mainTitleRect.right - containerRect.left,
    };

    const adjustedSubTitleRect = {
      top: subTitleRect.top - containerRect.top,
      bottom: subTitleRect.bottom - containerRect.top,
      left: subTitleRect.left - containerRect.left,
      right: subTitleRect.right - containerRect.left,
    };

    for (let i = 0; i < numberOf42s; i++) {
      const span = document.createElement('a');
      span.classList.add('fade-text', 'hidden-number');
      span.textContent = '42';
      span.href = 'page2.html';

      let positionFound = false;
      let attempts = 0;
      const maxAttempts = 50;

      while (!positionFound && attempts < maxAttempts) {
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        const left = Math.random() * (containerWidth - 50);
        const top = Math.random() * (containerHeight - 20);

        const spanRect = {
          left: left,
          top: top,
          right: left + 50,
          bottom: top + 20,
        };

        const overlapsMainTitle =
          spanRect.left < adjustedMainTitleRect.right &&
          spanRect.right > adjustedMainTitleRect.left &&
          spanRect.top < adjustedMainTitleRect.bottom &&
          spanRect.bottom > adjustedMainTitleRect.top;

        const overlapsSubTitle =
          spanRect.left < adjustedSubTitleRect.right &&
          spanRect.right > adjustedSubTitleRect.left &&
          spanRect.top < adjustedSubTitleRect.bottom &&
          spanRect.bottom > adjustedSubTitleRect.top;

        if (!overlapsMainTitle && !overlapsSubTitle) {
          span.style.left = `${(left / containerWidth) * 100}%`;
          span.style.top = `${(top / containerHeight) * 100}%`;
          positionFound = true;
        }

        attempts++;
      }

      if (!positionFound) {
        span.style.top = '10%';
        span.style.left = '5%';
      }

      textContainer.appendChild(span);
    }
  }

  window.addEventListener('load', generateHiddenNumbers);
}
