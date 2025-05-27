// Animation functionality
const Animations = {
  init() {
    // Initialize animations
    this.initBackgroundAnimations();
    this.initFeatureListAnimations();
    this.initSectionAnimations();
  },
  
  initBackgroundAnimations() {
    // Subtle parallax effect for orbs
    this.setupParallaxEffect();
    
    // Dynamic color transitions for orbs based on active section
    this.setupDynamicColors();
  },
  
  setupParallaxEffect() {
    const orbs = document.querySelectorAll('.orb');
    
    // Add parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 2;
        const offsetX = (x - 0.5) * speed;
        const offsetY = (y - 0.5) * speed;
        
        orb.style.transform = `translate(${offsetX}%, ${offsetY}%) rotate(${offsetX * 2}deg)`;
      });
    });
  },
  
  setupDynamicColors() {
    // Change orb colors based on active section
    const sections = document.querySelectorAll('.content-section');
    const orbs = document.querySelectorAll('.orb');
    
    // Create a color map for sections
    const colorMap = {
      'primary': 'var(--gradient-primary)',
      'secondary': 'var(--gradient-secondary)',
      'accent': 'var(--gradient-accent)',
      'purple': 'var(--gradient-purple)'
    };
    
    // Set up intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const color = entry.target.getAttribute('data-color') || 'primary';
          const gradient = colorMap[color];
          
          // Update first orb color with transition
          if (orbs[0]) {
            orbs[0].style.transition = 'background 1s ease';
            orbs[0].style.background = gradient;
          }
        }
      });
    }, { threshold: 0.5 });
    
    // Observe each section
    sections.forEach(section => {
      observer.observe(section);
    });
  },
  
  initFeatureListAnimations() {
    // Set up intersection observer for feature lists
    const featureLists = document.querySelectorAll('.feature-list');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animated class to trigger animation
          entry.target.classList.add('animated');
          
          // Stagger animations for list items
          const items = entry.target.querySelectorAll('li');
          items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
          });
          
          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    // Observe each feature list
    featureLists.forEach(list => {
      observer.observe(list);
    });
  },
  
  initSectionAnimations() {
    // Add hover effects to section numbers
    const sectionNumbers = document.querySelectorAll('.section-number');
    
    sectionNumbers.forEach((num, index) => {
      const colors = [
        'var(--gradient-primary)',
        'var(--gradient-secondary)',
        'var(--gradient-accent)',
        'var(--gradient-purple)',
        'var(--gradient-primary)',
        'var(--gradient-secondary)',
        'var(--gradient-accent)'
      ];
      
      num.style.background = colors[index % colors.length];
      
      // Add pulse effect on hover
      num.addEventListener('mouseenter', () => {
        num.style.transform = 'scale(1.1)';
        num.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
      });
      
      num.addEventListener('mouseleave', () => {
        num.style.transform = 'scale(1)';
        num.style.boxShadow = '';
      });
    });
  },
  
  restartBackgroundAnimations() {
    // Restart animations if needed
    const orbs = document.querySelectorAll('.orb');
    
    orbs.forEach(orb => {
      // Reset animation
      orb.style.animation = 'none';
      
      // Force reflow
      void orb.offsetWidth;
      
      // Restart animation
      orb.style.animation = '';
    });
  }
};