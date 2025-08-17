/**
 * Flag Size Fix for Phone Number and Language Selectors
 * Addresses oversized flags in dropdown selectors on private, build, and join pages
 */

console.log('🏁 Loading flag size fixes...');

// Flag sizing constants
const FLAG_WIDTH = '16px';
const FLAG_HEIGHT = '12px';

function fixFlagSizes() {
  // Find all flag elements with various selectors
  const flagSelectors = [
    'svg[role="img"]',
    'img[alt*="flag"]',
    'img[src*="flagcdn"]',
    'img[src*="flag"]',
    '.react-country-flag',
    '.react-country-flag svg',
    '.react-country-flag img',
    '[class*="flag"] img',
    '[class*="flag"] svg'
  ];

  flagSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (element.dataset.flagFixed) return;
      
      // Apply size constraints
      element.style.setProperty('width', FLAG_WIDTH, 'important');
      element.style.setProperty('height', FLAG_HEIGHT, 'important');
      element.style.setProperty('max-width', FLAG_WIDTH, 'important');
      element.style.setProperty('max-height', FLAG_HEIGHT, 'important');
      element.style.setProperty('min-width', FLAG_WIDTH, 'important');
      element.style.setProperty('min-height', FLAG_HEIGHT, 'important');
      element.style.setProperty('object-fit', 'cover', 'important');
      element.style.setProperty('flex-shrink', '0', 'important');
      element.style.setProperty('display', 'inline-block', 'important');
      element.style.setProperty('vertical-align', 'middle', 'important');
      element.style.setProperty('transform', 'none', 'important');
      element.style.setProperty('scale', '1', 'important');
      
      element.dataset.flagFixed = 'true';
    });
  });
}

function fixSelectDropdowns() {
  // Target Radix Select components specifically
  const selectSelectors = [
    '[data-radix-select-content]',
    '[data-radix-select-item]',
    '[data-radix-select-trigger]',
    '[data-radix-select-viewport]'
  ];

  selectSelectors.forEach(selector => {
    const containers = document.querySelectorAll(selector);
    containers.forEach(container => {
      if (container.dataset.selectFixed) return;
      
      // Fix flags within select components
      const flags = container.querySelectorAll('svg[role="img"], img[src*="flag"], .react-country-flag');
      flags.forEach(flag => {
        flag.style.setProperty('width', FLAG_WIDTH, 'important');
        flag.style.setProperty('height', FLAG_HEIGHT, 'important');
        flag.style.setProperty('max-width', FLAG_WIDTH, 'important');
        flag.style.setProperty('max-height', FLAG_HEIGHT, 'important');
        flag.style.setProperty('transform', 'none', 'important');
        flag.style.setProperty('scale', '1', 'important');
      });

      // Fix flex containers
      const flexContainers = container.querySelectorAll('.flex, [class*="flex"]');
      flexContainers.forEach(flex => {
        flex.style.setProperty('align-items', 'center', 'important');
        flex.style.setProperty('gap', '8px', 'important');
        flex.style.setProperty('height', 'auto', 'important');
        flex.style.setProperty('overflow', 'hidden', 'important');
      });
      
      container.dataset.selectFixed = 'true';
    });
  });
}

function fixButtonContainers() {
  // Fix buttons containing flags
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    const hasFlag = button.querySelector('svg[role="img"], img[src*="flag"], .react-country-flag');
    if (hasFlag && !button.dataset.buttonFixed) {
      button.style.setProperty('display', 'flex', 'important');
      button.style.setProperty('align-items', 'center', 'important');
      button.style.setProperty('gap', '8px', 'important');
      button.style.setProperty('height', 'auto', 'important');
      button.style.setProperty('min-height', '36px', 'important');
      
      button.dataset.buttonFixed = 'true';
    }
  });
}

function applyAllFixes() {
  fixFlagSizes();
  fixSelectDropdowns();
  fixButtonContainers();
}

// Create mutation observer to handle dynamic content
function setupFlagObserver() {
  const observer = new MutationObserver((mutations) => {
    let shouldFix = false;
    
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          // Check if new flags were added
          if (node.matches && (
            node.matches('svg[role="img"], img[src*="flag"], .react-country-flag') ||
            node.querySelector('svg[role="img"], img[src*="flag"], .react-country-flag')
          )) {
            shouldFix = true;
          }
          
          // Check if select components were added
          if (node.matches && (
            node.matches('[data-radix-select-content], [data-radix-select-item]') ||
            node.querySelector('[data-radix-select-content], [data-radix-select-item]')
          )) {
            shouldFix = true;
          }
        }
      });
    });
    
    if (shouldFix) {
      setTimeout(applyAllFixes, 50); // Small delay to ensure DOM is stable
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  return observer;
}

// Initialize flag fixes
function initializeFlagFixes() {
  console.log('🏁 Initializing flag size fixes...');
  
  // Apply initial fixes
  applyAllFixes();
  
  // Setup observer for dynamic content
  setupFlagObserver();
  
  // Apply fixes when page becomes visible (for React router navigation)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      setTimeout(applyAllFixes, 100);
    }
  });
  
  // Apply fixes on hash change (for SPA navigation)
  window.addEventListener('hashchange', () => {
    setTimeout(applyAllFixes, 100);
  });
  
  // Apply fixes periodically for dynamic content
  setInterval(applyAllFixes, 2000);
  
  console.log('✅ Flag size fixes initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFlagFixes);
} else {
  initializeFlagFixes();
}

// Apply fixes immediately if page is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initializeFlagFixes, 100);
}