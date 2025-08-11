// Theme JavaScript functionality

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
});

function initializeTheme() {
  initializeColorSelector();
  initializeFAQ();
  initializeComments();
  initializeInstagramGallery();
  initializeCart();
  initializeSmoothScrolling();
  initializeQuickAdd();
  initializeNewsletterForm();
}

// Color Selector functionality
function initializeColorSelector() {
  const colorOptions = document.querySelectorAll('.color-option');
  const selectedColorName = document.getElementById('selectedColorName');
  const variantSelector = document.getElementById('variant-selector');
  const variantPrice = document.getElementById('variant-price');

  colorOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remove selected class from all options
      colorOptions.forEach(opt => {
        opt.classList.remove('selected');
        const checkmark = opt.querySelector('.color-checkmark');
        if (checkmark) {
          checkmark.style.opacity = '0';
        }
      });

      // Add selected class to clicked option
      this.classList.add('selected');
      const checkmark = this.querySelector('.color-checkmark');
      if (checkmark) {
        checkmark.style.opacity = '1';
      }

      // Update selected color name
      const colorName = this.dataset.color;
      if (selectedColorName && colorName) {
        selectedColorName.textContent = colorName;
      }

      // Update variant selector
      const variantId = this.dataset.variantId;
      if (variantSelector && variantId) {
        variantSelector.value = variantId;
      }

      // Update price
      const price = this.dataset.price;
      if (variantPrice && price) {
        variantPrice.textContent = price;
      }
    });
  });
}

// FAQ functionality
function initializeFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');

      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) {
            otherAnswer.style.maxHeight = '0';
          }
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// Comments functionality
function initializeComments() {
  const commentForm = document.getElementById('commentForm');
  const commentsList = document.getElementById('commentsList');

  if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const comment = formData.get('comment');

      if (name && email && comment) {
        addComment(name, email, comment);
        this.reset();
      }
    });
  }

  function addComment(name, email, commentText) {
    if (!commentsList) return;

    const avatar = name.charAt(0).toUpperCase();
    const colors = ['#F8BBD9', '#B2F2BB', '#FBBF24', '#8B5CF6', '#EC4899'];
    const avatarColor = colors[Math.floor(Math.random() * colors.length)];
    const date = new Date().toLocaleDateString();

    const commentHTML = `
      <div class="comment">
        <div class="comment-header">
          <div class="comment-avatar" style="background-color: ${avatarColor};">${avatar}</div>
          <div>
            <h4 class="comment-name">${name}</h4>
            <div class="comment-date">${date}</div>
          </div>
        </div>
        <p class="comment-text">${commentText}</p>
      </div>
    `;

    commentsList.insertAdjacentHTML('afterbegin', commentHTML);
  }
}

// Instagram Gallery functionality
function initializeInstagramGallery() {
  const instagramGrid = document.getElementById('instagramGrid');
  
  if (instagramGrid) {
    // Simulated Instagram posts (in real implementation, this would come from Instagram API)
    const instagramPosts = [
      { image: 'instagram-real-new-1.jpg', alt: 'Instagram post 1' },
      { image: 'instagram-real-new-4-fixed.jpg', alt: 'Instagram post 2' },
      { image: 'instagram-real-new-5.jpg', alt: 'Instagram post 3' },
      { image: 'instagram-real-new-6.jpg', alt: 'Instagram post 4' },
      { image: 'instagram-real-new-7.jpg', alt: 'Instagram post 5' },
      { image: 'instagram-real-new-8.jpg', alt: 'Instagram post 6' }
    ];

    instagramPosts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.className = 'instagram-post';
      postElement.innerHTML = `
        <img src="${getAssetUrl(post.image)}" alt="${post.alt}" loading="lazy">
        <div class="instagram-overlay">
          <svg class="instagram-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
      `;
      instagramGrid.appendChild(postElement);
    });
  }
}

// Cart functionality
function initializeCart() {
  const addToCartForm = document.getElementById('add-to-cart-form');
  
  if (addToCartForm) {
    addToCartForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const variantId = formData.get('id');
      const quantity = formData.get('quantity') || 1;

      addToCart(variantId, quantity);
    });
  }

  // Quick add functionality
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('quick-add')) {
      e.preventDefault();
      const productId = e.target.dataset.productId;
      if (productId) {
        // In a real implementation, you'd get the default variant ID
        addToCart(productId, 1);
      }
    }
  });
}

function addToCart(variantId, quantity) {
  const button = document.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  
  // Show loading state
  button.textContent = 'Adding...';
  button.disabled = true;

  fetch(window.routes.cart_add_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({
      id: variantId,
      quantity: quantity
    })
  })
  .then(response => response.json())
  .then(data => {
    // Show success message
    showNotification('Item added to cart!', 'success');
    
    // Update cart count if element exists
    updateCartCount();
    
    // Reset button
    button.textContent = originalText;
    button.disabled = false;
  })
  .catch(error => {
    console.error('Error adding to cart:', error);
    showNotification('Error adding item to cart', 'error');
    
    // Reset button
    button.textContent = originalText;
    button.disabled = false;
  });
}

function updateCartCount() {
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      const cartCountElements = document.querySelectorAll('[data-cart-count]');
      cartCountElements.forEach(element => {
        element.textContent = cart.item_count;
      });
    })
    .catch(error => {
      console.error('Error updating cart count:', error);
    });
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
  // Scroll to section function
  window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle anchor links
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      scrollToSection(targetId);
    }
  });
}

// Quick add functionality
function initializeQuickAdd() {
  const quickAddButtons = document.querySelectorAll('.quick-add');
  
  quickAddButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const productId = this.dataset.productId;
      const originalText = this.textContent;
      
      // Show loading state
      this.textContent = 'Adding...';
      this.disabled = true;
      
      // Simulate add to cart (in real implementation, you'd make an actual API call)
      setTimeout(() => {
        showNotification('Item added to cart!', 'success');
        this.textContent = originalText;
        this.disabled = false;
      }, 1000);
    });
  });
}

// Newsletter form functionality
function initializeNewsletterForm() {
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const submitButton = this.querySelector('button[type="submit"]');
      const email = emailInput.value;
      
      if (email) {
        // Show loading state
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        
        // Simulate subscription (in real implementation, you'd make an API call)
        setTimeout(() => {
          showNotification('Thanks for subscribing!', 'success');
          emailInput.value = '';
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }, 1000);
      }
    });
  });
}

// Utility functions
function getAssetUrl(filename) {
  return `/assets/${filename}`;
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
    color: white;
    border-radius: 8px;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    font-weight: 600;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  `;
  notification.textContent = message;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Intersection Observer for animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements with animation classes
  const animateElements = document.querySelectorAll('.product-card, .feature-card, .review-card');
  animateElements.forEach(el => observer.observe(el));
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAnimations);

// Handle resize events
window.addEventListener('resize', debounce(() => {
  // Handle responsive changes
  handleResponsiveChanges();
}, 250));

function handleResponsiveChanges() {
  // Adjust layout based on screen size
  const isMobile = window.innerWidth < 768;
  
  // Example: Adjust Instagram grid columns on mobile
  const instagramGrid = document.getElementById('instagramGrid');
  if (instagramGrid) {
    if (isMobile) {
      instagramGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else {
      instagramGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(25rem, 1fr))';
    }
  }
}

// Handle scroll events for performance
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});

function handleScroll() {
  const scrollY = window.scrollY;
  
  // Example: Add shadow to header on scroll
  const header = document.querySelector('.header');
  if (header) {
    if (scrollY > 10) {
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
}

// Form validation helpers
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
    
    if (input.type === 'email' && input.value && !validateEmail(input.value)) {
      isValid = false;
      input.classList.add('error');
    }
  });
  
  return isValid;
}

// Accessibility improvements
function initializeAccessibility() {
  // Add focus management for FAQ
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
  
  // Add keyboard navigation for color selector
  const colorOptions = document.querySelectorAll('.color-option');
  colorOptions.forEach((option, index) => {
    option.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        option.click();
      }
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (index + 1) % colorOptions.length;
        colorOptions[nextIndex].focus();
      }
      
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = index === 0 ? colorOptions.length - 1 : index - 1;
        colorOptions[prevIndex].focus();
      }
    });
  });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
  // In production, you might want to send this to an error tracking service
});

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
  });
}

// Export functions for global use
window.themeUtils = {
  showNotification,
  validateEmail,
  validateForm,
  scrollToSection,
  addToCart,
  updateCartCount
};
