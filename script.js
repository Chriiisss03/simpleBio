// Audio Controls
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
    cloudWrapper.style.cssText = `
      position: absolute;
      pointer-events: none;
    `;
    
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
      this.randomBetween(-baseSize/2, window.innerWidth - baseSize/2) : 
      -baseSize - 100;
    
    if (animate) {
      cloudWrapper.style.cssText += `
        top: ${topPosition}%;
        left: ${initialLeft}px;
        animation: floatAcross ${speed}s linear infinite ${delay}s,
                   gentleBob ${this.randomBetween(4, 7)}s ease-in-out infinite ${this.randomBetween(0, 2)}s;
      `;
    } else {
      // For static initial clouds
      cloudWrapper.style.cssText += `
        top: ${topPosition}%;
        left: ${initialLeft}px;
        animation: gentleBob ${this.randomBetween(4, 7)}s ease-in-out infinite ${this.randomBetween(0, 2)}s;
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
    cloudWrapper.style.cssText = `
      position: absolute;
      pointer-events: none;
    `;
    
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
    
    // Position cloud at specific X coordinate
    cloudWrapper.style.cssText += `
      top: ${topPosition}%;
      left: ${xPosition}px;
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
