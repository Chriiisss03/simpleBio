const audio = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

function toggleMusic() {
  if (isPlaying) {
    audio.pause();
    musicBtn.textContent = '🎵 Play Music';
    musicBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    isPlaying = false;
  } else {
    // Check if audio file exists first
    audio.play().then(() => {
      musicBtn.textContent = '🔇 Mute Music';
      musicBtn.style.backgroundColor = 'rgba(114, 137, 218, 0.2)';
      isPlaying = true;
    }).catch(error => {
      console.log('Audio play failed:', error);
      musicBtn.textContent = '❌ Audio Error';
      musicBtn.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
      
      // Show helpful error message
      setTimeout(() => {
        alert('Music file not found! Make sure you have:\n1. A folder named "audio"\n2. Your music file "I-KNOW.mp3" inside that folder\n3. Both in the same directory as your HTML file');
      }, 100);
    });
  }
}

// Test if audio file loads
audio.addEventListener('loadstart', () => {
  console.log('Audio loading...');
});

audio.addEventListener('canplay', () => {
  console.log('Audio ready to play!');
  musicBtn.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
});

audio.addEventListener('error', (e) => {
  console.log('Audio error:', e);
  musicBtn.textContent = '❌ No Audio';
  musicBtn.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
});

// Auto-pause when tab is not visible (optional)
document.addEventListener('visibilitychange', function() {
  if (document.hidden && isPlaying) {
    audio.pause();
  }
});
