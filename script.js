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
    this.cloudCount = 12;
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
    for (let i = 0; i < this.cloudCount; i++) {
      this.createCloud(i);
    }
  }
  
  createCloud(index) {
    const cloud = document.createElement('div');
    cloud.className = `cloud cloud-${index}`;
    
    // Random cloud properties
    const size = this.randomBetween(60, 140);
    const height = size * this.randomBetween(0.4, 0.7);
    const topPosition = this.randomBetween(5, 85);
    const speed = this.randomBetween(25, 45);
    const delay = this.randomBetween(0, 30);
    const opacity = this.randomBetween(0.6, 0.9);
    
    // Apply styles
    cloud.style.cssText = `
      position: absolute;
      background: rgba(255, 255, 255, ${opacity});
      border-radius: ${height}px;
      width: ${size}px;
      height: ${height}px;
      top: ${topPosition}%;
      left: -200px;
      opacity: 0;
      animation: floatAcross ${speed}s linear infinite ${delay}s;
      z-index: ${this.randomBetween(1, 3)};
    `;
    
    // Create cloud puffs for realistic shape
    this.addCloudPuffs(cloud, size, height);
    
    this.cloudContainer.appendChild(cloud);
    this.clouds.push({
      element: cloud,
      size: size,
      speed: speed,
      respawnTime: (speed + delay) * 1000
    });
  }
  
  addCloudPuffs(cloud, width, height) {
    // Create 2-4 random puffs for each cloud
    const puffCount = this.randomBetween(2, 4);
    
    for (let i = 0; i < puffCount; i++) {
      const puff = document.createElement('div');
      const puffSize = this.randomBetween(height * 0.8, height * 1.5);
      const leftPos = this.randomBetween(width * 0.1, width * 0.7);
      const topPos = this.randomBetween(-puffSize * 0.6, -puffSize * 0.2);
      
      puff.style.cssText = `
        content: '';
        position: absolute;
        background: rgba(255, 255, 255, ${this.randomBetween(0.5, 0.8)});
        border-radius: 50%;
        width: ${puffSize}px;
        height: ${puffSize}px;
        left: ${leftPos}px;
        top: ${topPos}px;
        z-index: -1;
      `;
      
      cloud.appendChild(puff);
    }
  }
  
  startCloudLifecycle() {
    // Add floating animation keyframes
    this.addCloudAnimations();
    
    // Respawn clouds periodically
    setInterval(() => {
      this.maintainClouds();
    }, 5000);
  }
  
  addCloudAnimations() {
    if (document.getElementById('cloud-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'cloud-animations';
    style.textContent = `
      @keyframes floatAcross {
        0% {
          left: -250px;
          opacity: 0;
          transform: translateY(0px);
        }
        5% {
          opacity: 0.8;
        }
        25% {
          transform: translateY(-5px);
        }
        50% {
          transform: translateY(3px);
        }
        75% {
          transform: translateY(-2px);
        }
        95% {
          opacity: 0.8;
        }
        100% {
          left: calc(100vw + 100px);
          opacity: 0;
          transform: translateY(0px);
        }
      }
      
      @keyframes gentleFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      
      .cloud:hover {
        animation-play-state: paused;
        transform: scale(1.1) translateY(-5px) !important;
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(style);
  }
  
  maintainClouds() {
    // Occasionally add new clouds for variety
    if (Math.random() < 0.3 && this.clouds.length < this.cloudCount + 3) {
      this.createCloud(Date.now());
    }
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
          const clouds = document.querySelectorAll('.cloud');
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
  
  // Welcome message
  setTimeout(() => {
    console.log('✨ Welcome to Christian\'s profile! Enjoy the floating clouds!');
  }, 2000);
});

// Performance monitoring
window.addEventListener('load', () => {
  console.log('🚀 Page fully loaded with enhanced effects!');
});
