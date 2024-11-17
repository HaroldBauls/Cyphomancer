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

  // Modified pattern function for the jellyfish animation
  const patternFunction = (x, y, time) => {
    // Introduce slight changes to the pattern to make the animation look different
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
    jellyfishCtx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // Changed color to white

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
      const link = document.createElement('a');
      link.classList.add('fade-text', 'hidden-number');
      link.textContent = '42';
      link.href = 'deusexmachina.html'; // Updated link to new file name

      let positionFound = false;
      let attempts = 0;
      const maxAttempts = 50;

      while (!positionFound && attempts < maxAttempts) {
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        const left = Math.random() * (containerWidth - 50);
        const top = Math.random() * (containerHeight - 20);

        const linkRect = {
          left: left,
          top: top,
          right: left + 50,
          bottom: top + 20,
        };

        const overlapsMainTitle =
          linkRect.left < adjustedMainTitleRect.right &&
          linkRect.right > adjustedMainTitleRect.left &&
          linkRect.top < adjustedMainTitleRect.bottom &&
          linkRect.bottom > adjustedMainTitleRect.top;

        const overlapsSubTitle =
          linkRect.left < adjustedSubTitleRect.right &&
          linkRect.right > adjustedSubTitleRect.left &&
          linkRect.top < adjustedSubTitleRect.bottom &&
          linkRect.bottom > adjustedSubTitleRect.top;

        if (!overlapsMainTitle && !overlapsSubTitle) {
          link.style.left = `${(left / containerWidth) * 100}%`;
          link.style.top = `${(top / containerHeight) * 100}%`;
          positionFound = true;
        }

        attempts++;
      }

      if (!positionFound) {
        link.style.top = '10%';
        link.style.left = '5%';
      }

      // Add touch and click events to toggle 'active' class
      link.addEventListener('click', function (e) {
        // Prevent default navigation to allow the active class to be applied
        e.preventDefault();
        link.classList.add('active');

        // Navigate to the link after a short delay
        setTimeout(() => {
          window.location.href = link.href;
        }, 200);
      });

      // For desktop hover effect
      link.addEventListener('mouseenter', function () {
        link.classList.add('active');
      });
      link.addEventListener('mouseleave', function () {
        link.classList.remove('active');
      });

      textContainer.appendChild(link);
    }

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
  }

  window.addEventListener('load', generateHiddenNumbers);
}
