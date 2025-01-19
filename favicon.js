// favicon.js

// Function to create a favicon with the number "42" in black text on a transparent background
function createFavicon() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  // Clear canvas for transparent background
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set text properties
  ctx.font = 'bold 48px sans-serif';
  ctx.fillStyle = '#000'; // Black text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw the number "42"
  ctx.fillText('42', canvas.width / 2, canvas.height / 2);

  // Set the favicon link
  const faviconLink = document.getElementById('dynamic-favicon');
  faviconLink.href = canvas.toDataURL('image/png');
}

// Call the function to generate the favicon
createFavicon();
