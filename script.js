// Audio Controls - Fixed version
let audio = null;
let musicBtn = null;
let isPlaying = false;

// Initialize audio controls when DOM is ready
function initAudioControls() {
  audio = document.getElementById('bgMusic');
  musicBtn = document.getElementById('musicBtn');
  
  if (!audio || !musicBtn) {
    console.error('Audio elements not found!');
    return;
  }
  
  // Add click event listener to the button
  musicBtn.addEventListener('click', toggleMusic);
  
  // Set initial volume
  audio.volume = 0.5;
  
  // Add audio event listeners
  audio.addEventListener('loadstart', () => {
    console.log('Audio loading...');
    musicBtn.textContent = '⏳ Loading...';
  });
  
  audio.addEventListener('canplaythrough', () => {
    console.log('Audio ready to play!');
    musicBtn.textContent = '🎵 Play Music';
    musicBtn.disabled = false;
    musicBtn.style.cursor = 'pointer';
  });
  
  audio.addEventListener('playing', () => {
    console.log('Music is playing');
    musicBtn.textContent = '🔇 Mute Music';
    musicBtn.style.backgroundColor = 'rgba(114, 137, 218, 0.2)';
    isPlaying = true;
  });
  
  audio.addEventListener('pause', () => {
    console.log('Music paused');
    musicBtn.textContent = '🎵 Play Music';
    musicBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    isPlaying = false;
  });
  
  audio.addEventListener('error', (e) => {
    console.error('Audio loading error:', e);
    musicBtn.textContent = '❌ Audio Error';
    musicBtn.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
    musicBtn.title = 'Audio file could not be loaded';
    
    // Try to provide helpful error message
    const errorMessages = {
      1: 'Audio loading aborted',
      2: 'Network error while loading audio',
      3: 'Audio decoding error',
      4: 'Audio format not supported'
    };
    
    const errorCode = audio.error ? audio.error.code : 0;
    const errorMsg = errorMessages[errorCode] || 'Unknown audio error';
    
    console.error('Error details:', errorMsg);
    
    // Provide fallback action
    musicBtn.addEventListener('click', () => {
      alert(`Audio Error: ${errorMsg}\n\nTo fix this:\n1. Check your internet connection (if using online audio)\n2. Or add your own MP3 file in the "audio" folder\n3. Or update the audio source in the HTML file`);
    });
  });
}

function toggleMusic() {
  if (!audio) {
    console.error('Audio not initialized!');
    return;
  }
  
  if (isPlaying) {
    audio.pause();
    console.log('Pausing music');
  } else {
    // Use play() with promise handling
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Music started successfully');
        })
        .catch(error => {
          console.error('Playback failed:', error);
          musicBtn.textContent = '🚫 Click Again';
          musicBtn.style.backgroundColor = 'rgba(255, 200, 0, 0.3)';
          
          // Browser might be blocking autoplay, need user interaction
          if (error.name === 'NotAllowedError') {
            alert('Please click the button again to play music.\n\nModern browsers require user interaction to play audio.');
          } else {
            alert('Could not play audio. Error: ' + error.message);
          }
        });
    }
  }
}

// Auto-pause when tab is not visible (optional)
document.addEventListener('visibilitychange', function() {
  if (document.hidden && isPlaying) {
    audio.pause();
  }
});

// =====================================
// DYNAMIC CLOUD GENERATION SYSTEM
// =====================================
class CloudSystem {
  constructor() {
    this.clouds = [];
    this.cloudContainer = null;
    this.cloudCount = 12; // Increased for better coverage
    this.init();
  }
  
  init() {
    // Create clouds container if it doesn't exist
    this.cloudContainer = document.querySelector('.clouds');
    if (!this.cloudContainer) {
      this.createCloudContainer();
    }
    
    // Generate initial clouds
    this.generateClouds();
    
    // Start cloud lifecycle management
    this.startCloudLifecycle();
  }
  
  createCloudContainer() {
    this.cloudContainer = document.createElement('div');
    this.cloudContainer.className = 'clouds';
    this.cloudContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;
    document.body.insertBefore(this.cloudContainer, document.body.firstChild);
  }
  
  generateClouds() {
    // Create clouds at different starting positions across the screen
    for (let i = 0; i < this.cloudCount; i++) {
      setTimeout(() => {
        this.createRealisticCloud(i, true);
      }, i * 1500);
    }
    
    // Add some clouds that start already on screen
    for (let i = 0; i < 5; i++) {
      this.createRealisticCloud(`initial-${i}`, false, true);
    }
  }
  
  createRealisticCloud(index, animate = true, startOnScreen = false) {
    const cloudWrapper = document.createElement('div');
    cloudWrapper.className = `cloud-wrapper cloud-${index}`;
    
    // Random cloud properties with better distribution
    const baseSize = this.randomBetween(80, 250);
    const height = baseSize * this.randomBetween(0.4, 0.6);
    const topPosition = this.randomBetween(0, 95); // Full screen height coverage
    const speed = this.randomBetween(45, 80);
    const delay = startOnScreen ? 0 : this.randomBetween(0, 30);
    const opacity = this.randomBetween(0.3, 0.7);
    
    // Create main cloud body
    const mainCloud = document.createElement('div');
    mainCloud.style.cssText = `
      position: absolute;
      width: ${baseSize}px;
      height: ${height}px;
      background: radial-gradient(ellipse at center,
        rgba(255, 255, 255, ${opacity}) 0%,
        rgba(255, 255, 255, ${opacity * 0.7}) 30%,
        rgba(255, 255, 255, ${opacity * 0.4}) 60%,
        rgba(255, 255, 255, 0) 100%);
      border-radius: ${height}px;
      filter: blur(${this.randomBetween(1, 3)}px);
    `;
    
    cloudWrapper.appendChild(mainCloud);
    
    // Create multiple cloud puffs for realistic shape
    const puffCount = this.randomBetween(4, 8);
    for (let i = 0; i < puffCount; i++) {
      this.addRealisticPuff(cloudWrapper, baseSize, height, opacity);
    }
    
    // Set initial position and animation
    let initialLeft = startOnScreen ? 
      this.randomBetween(0, window.innerWidth - baseSize) : 
      -(baseSize + 100);
    
    // Apply positioning and animations
    cloudWrapper.style.cssText = `
      position: absolute;
      pointer-events: none;
      top: ${topPosition}%;
      left: ${initialLeft}px;
      width: ${baseSize}px;
      height: ${height}px;
    `;
    
    if (animate) {
      // Animate cloud across screen
      cloudWrapper.style.animation = `
        cloudMove ${speed}s linear infinite ${delay}s,
        gentleBob ${this.randomBetween(4, 7)}s ease-in-out infinite ${this.randomBetween(0, 2)}s
      `;
    } else {
      // Just bob in place for initial clouds
      cloudWrapper.style.animation = `
        gentleBob ${this.randomBetween(4, 7)}s ease-in-out infinite ${this.randomBetween(0, 2)}s
      `;
    }
    
    this.cloudContainer.appendChild(cloudWrapper);
    this.clouds.push({
      element: cloudWrapper,
      size: baseSize,
      speed: speed
    });
  }
  
  addRealisticPuff(cloudWrapper, baseWidth, baseHeight, baseOpacity) {
    const puff = document.createElement('div');
    puff.className = 'cloud-puff';
    
    // Varied puff sizes for natural look
    const puffWidth = this.randomBetween(baseWidth * 0.3, baseWidth * 0.8);
    const puffHeight = this.randomBetween(baseHeight * 0.6, baseHeight * 1.4);
    
    // Random positioning around the main cloud
    const leftOffset = this.randomBetween(-baseWidth * 0.2, baseWidth * 0.8);
    const topOffset = this.randomBetween(-baseHeight * 0.5, baseHeight * 0.3);
    
    // Varied opacity for depth
    const puffOpacity = baseOpacity * this.randomBetween(0.6, 1.2);
    
    puff.style.cssText = `
      position: absolute;
      width: ${puffWidth}px;
      height: ${puffHeight}px;
      left: ${leftOffset}px;
      top: ${topOffset}px;
      background: radial-gradient(circle at center,
        rgba(255, 255, 255, ${puffOpacity}) 0%,
        rgba(255, 255, 255, ${puffOpacity * 0.6}) 30%,
        rgba(255, 255, 255, ${puffOpacity * 0.3}) 60%,
        rgba(255, 255, 255, 0) 100%);
      border-radius: 50%;
      filter: blur(${this.randomBetween(2, 4)}px);
      transform: scale(${this.randomBetween(0.9, 1.1)});
    `;
    
    cloudWrapper.appendChild(puff);
  }
  
  startCloudLifecycle() {
    // Add floating animation keyframes if not already added
    this.addCloudAnimations();
    
    // Continuously spawn new clouds
    setInterval(() => {
      if (this.clouds.length < this.cloudCount + 5) {
        this.createRealisticCloud(Date.now(), true, false);
      }
      
      // Remove clouds that have left the screen
      this.cleanupClouds();
    }, 6000);
    
    // Add scattered clouds periodically
    setInterval(() => {
      if (Math.random() < 0.3 && this.clouds.length < this.cloudCount + 8) {
        const randomX = this.randomBetween(0, window.innerWidth);
        this.createCloudAtPosition(Date.now(), randomX);
      }
    }, 10000);
  }
  
  createCloudAtPosition(index, xPosition) {
    const cloudWrapper = document.createElement('div');
    cloudWrapper.className = `cloud-wrapper cloud-${index}`;
    
    const baseSize = this.randomBetween(60, 180);
    const height = baseSize * this.randomBetween(0.4, 0.6);
    const topPosition = this.randomBetween(0, 95);
    const speed = this.randomBetween(50, 90);
    const opacity = this.randomBetween(0.3, 0.6);
    
    // Create main cloud body
    const mainCloud = document.createElement('div');
    mainCloud.style.cssText = `
      position: absolute;
      width: ${baseSize}px;
      height: ${height}px;
      background: radial-gradient(ellipse at center,
        rgba(255, 255, 255, ${opacity}) 0%,
        rgba(255, 255, 255, ${opacity * 0.7}) 30%,
        rgba(255, 255, 255, ${opacity * 0.4}) 60%,
        rgba(255, 255, 255, 0) 100%);
      border-radius: ${height}px;
      filter: blur(${this.randomBetween(1, 3)}px);
    `;
    
    cloudWrapper.appendChild(mainCloud);
    
    // Add puffs
    const puffCount = this.randomBetween(3, 6);
    for (let i = 0; i < puffCount; i++) {
      this.addRealisticPuff(cloudWrapper, baseSize, height, opacity);
    }
    
    // Position cloud at specific X coordinate and animate from there
    cloudWrapper.style.cssText = `
      position: absolute;
      pointer-events: none;
      top: ${topPosition}%;
      left: ${xPosition}px;
      width: ${baseSize}px;
      height: ${height}px;
      animation: floatFromPosition ${speed}s linear infinite,
                 gentleBob ${this.randomBetween(4, 7)}s ease-in-out infinite;
    `;
    
    this.cloudContainer.appendChild(cloudWrapper);
    this.clouds.push({
      element: cloudWrapper,
      size: baseSize,
      speed: speed
    });
  }
  
  cleanupClouds() {
    this.clouds = this.clouds.filter(cloud => {
      const rect = cloud.element.getBoundingClientRect();
      if (rect.left > window.innerWidth + 200) {
        cloud.element.remove();
        return false;
      }
      return true;
    });
  }
  
  addCloudAnimations() {
    if (document.getElementById('cloud-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'cloud-animations';
    style.textContent = `
      @keyframes cloudMove {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(calc(100vw + 500px));
        }
      }
      
      @keyframes floatAcross {
        0% {
          transform: translateX(0) translateZ(0);
          opacity: 0;
        }
        2% {
          opacity: 0.3;
        }
        5% {
          opacity: 0.7;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        95% {
          opacity: 0.7;
        }
        98% {
          opacity: 0.3;
        }
        100% {
          transform: translateX(calc(100vw + 400px)) translateZ(0);
          opacity: 0;
        }
      }
      
      @keyframes floatFromPosition {
        0% {
          transform: translateX(0) translateZ(0);
        }
        100% {
          transform: translateX(calc(100vw + 400px)) translateZ(0);
        }
      }
      
      @keyframes gentleBob {
        0%, 100% { 
          transform: translateY(0px) scale(1) rotate(0deg); 
        }
        25% { 
          transform: translateY(-10px) scale(1.02) rotate(1deg); 
        }
        50% { 
          transform: translateY(5px) scale(0.98) rotate(-1deg); 
        }
        75% { 
          transform: translateY(-3px) scale(1.01) rotate(0.5deg); 
        }
      }
      
      .cloud-wrapper {
        will-change: transform;
        transform: translateZ(0);
      }
      
      .cloud-wrapper:hover .cloud-puff {
        filter: blur(2px) brightness(1.1);
        transition: all 0.5s ease;
      }
    `;
    document.head.appendChild(style);
  }
  
  randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  // Method to pause/resume clouds
  pauseClouds() {
    this.clouds.forEach(cloud => {
      cloud.element.style.animationPlayState = 'paused';
    });
  }
  
  resumeClouds() {
    this.clouds.forEach(cloud => {
      cloud.element.style.animationPlayState = 'running';
    });
  }
  
  // Method to change cloud speed
  setCloudSpeed(speedMultiplier = 1) {
    this.clouds.forEach(cloud => {
      const newDuration = cloud.speed / speedMultiplier;
      cloud.element.style.animationDuration = `${newDuration}s`;
    });
  }
  
  // Add wind effect
  addWindEffect(strength = 1) {
    this.clouds.forEach(cloud => {
      const currentSpeed = parseFloat(cloud.element.style.animationDuration);
      const newSpeed = currentSpeed / (1 + strength * 0.5);
      cloud.element.style.animationDuration = `${newSpeed}s`;
      
      setTimeout(() => {
        cloud.element.style.animationDuration = `${currentSpeed}s`;
      }, 3000);
    });
  }
}

// =====================================
// ENHANCED INTERACTIVITY
// =====================================
class InteractiveEffects {
  constructor() {
    this.init();
  }
  
  init() {
    this.addMouseTracker();
    this.addKeyboardShortcuts();
    this.addContainerEffects();
  }
  
  addMouseTracker() {
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Subtle parallax effect on container
      const container = document.querySelector('.container');
      if (container) {
        const moveX = (mouseX - window.innerWidth / 2) * 0.02;
        const moveY = (mouseY - window.innerHeight / 2) * 0.02;
        container.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-5px)`;
      }
    });
  }
  
  addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Space bar to toggle music
      if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        toggleMusic();
      }
      
      // 'C' key to pause/resume clouds
      if (e.key.toLowerCase() === 'c') {
        if (window.cloudSystem) {
          const clouds = document.querySelectorAll('.cloud-wrapper');
          const isPaused = clouds[0]?.style.animationPlayState === 'paused';
          
          if (isPaused) {
            window.cloudSystem.resumeClouds();
            console.log('☁️ Clouds resumed');
          } else {
            window.cloudSystem.pauseClouds();
            console.log('⏸️ Clouds paused');
          }
        }
      }
      
      // 'W' key to add wind effect
      if (e.key.toLowerCase() === 'w') {
        if (window.cloudSystem) {
          window.cloudSystem.addWindEffect(1.5);
          console.log('💨 Wind gust!');
        }
      }
    });
  }
  
  addContainerEffects() {
    const container = document.querySelector('.container');
    if (container) {
      // Enhanced hover effects
      container.addEventListener('mouseenter', () => {
        container.style.transform = 'translateY(-10px) scale(1.02)';
        container.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
      });
      
      container.addEventListener('mouseleave', () => {
        container.style.transform = 'translateY(0px) scale(1)';
        container.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
      });
    }
  }
}

// =====================================
// INITIALIZE EVERYTHING
// =====================================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize audio controls FIRST
  initAudioControls();
  
  // Initialize cloud system
  window.cloudSystem = new CloudSystem();
  
  // Initialize interactive effects
  window.interactiveEffects = new InteractiveEffects();
  
  // Console info
  console.log('🌤️ Cloud system initialized!');
  console.log('🎮 Keyboard shortcuts:');
  console.log('   SPACE - Toggle music');
  console.log('   C - Pause/Resume clouds');
  console.log('   W - Add wind effect');
  
  // Welcome message
  setTimeout(() => {
    console.log('✨ Welcome to Christian\'s profile! Enjoy the floating clouds!');
  }, 2000);
});

// Performance monitoring
window.addEventListener('load', () => {
  console.log('🚀 Page fully loaded with enhanced effects!');
});
