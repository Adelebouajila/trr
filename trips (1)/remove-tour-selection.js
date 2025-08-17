
/**
 * Remove Tour Selection Script
 * This script prevents the tour selection section from appearing ONLY on the build page
 * while keeping it on other pages like private/join pages
 */

(function() {
    'use strict';

    function isOnBuildPage() {
        const currentUrl = window.location.href;
        const currentHash = window.location.hash;
        const pathname = window.location.pathname;
        
        // More specific build page detection
        const isBuildUrl = pathname.includes('/build') || 
                          currentUrl.includes('/build.') || 
                          currentUrl.includes('/build?') ||
                          currentHash === '#build' || 
                          currentHash.includes('#build');
        
        // Additional confirmation - check for build page specific content
        const hasDesignText = document.body.textContent.includes('Design Your Perfect Tunisia Adventure');
        
        // Only return true if URL indicates build page AND has the specific build page content
        return isBuildUrl && hasDesignText;
    }

    function checkAndRemoveTourSelection() {
        if (!isOnBuildPage()) {
            console.log('Not on build page - preserving tour selection');
            return;
        }
        
        console.log('On build page - removing tour selection section');
        
        // Remove existing tour selection containers with the header "Select Your Tours"
        const tourContainers = document.querySelectorAll('.tour-override-container');
        tourContainers.forEach(container => {
            const header = container.querySelector('h2');
            if (header && header.textContent.includes('Select Your Tours')) {
                console.log('✅ Removing "Select Your Tours" section from build page');
                container.remove();
            }
        });

        // Look for any sections with "Select Your Tours" text and hide them
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            if (element.textContent && 
                element.textContent.includes('Select Your Tours') && 
                element.textContent.trim().startsWith('Select Your Tours')) {
                console.log('✅ Hiding tour selection element');
                element.style.display = 'none';
            }
        });

        // Hide tour cards with specific patterns - only on build page
        const originalCards = document.querySelectorAll('div[class*="Card"], div[class*="card"], div[class*="overflow-hidden"], div[class*="border"], div[class*="rounded"]');
        originalCards.forEach(card => {
            const hasTitle = card.querySelector('h3, h2, h4');
            const hasButton = card.querySelector('button');
            const cardText = card.textContent.toLowerCase();
            const hasTourKeywords = cardText.includes('tour') && (cardText.includes('day') || cardText.includes('price') || cardText.includes('duration'));
            
            // Only hide if it looks like a tour card and not part of the form
            if (hasTitle && hasButton && hasTourKeywords && !cardText.includes('design your perfect')) {
                card.style.display = 'none';
                card.classList.add('tour-removed-on-build');
                console.log('✅ Hiding tour card on build page');
            }
        });

        // Add CSS to hide tour selection elements and ensure proper ordering - only on build page
        if (!document.getElementById('build-page-tour-removal-css')) {
            const style = document.createElement('style');
            style.id = 'build-page-tour-removal-css';
            style.textContent = `
                /* Hide tour selection on build page only */
                body[data-build-page="true"] .tour-override-container {
                    display: none !important;
                    visibility: hidden !important;
                    height: 0 !important;
                    overflow: hidden !important;
                    opacity: 0 !important;
                }
                
                /* Hide any element containing "Select Your Tours" on build page only */
                body[data-build-page="true"] *[data-build-page-hidden="true"] {
                    display: none !important;
                }
                
                /* Hide tour cards on build page only */
                body[data-build-page="true"] .tour-removed-on-build {
                    display: none !important;
                }
                
                /* Ensure proper form ordering on build page */
                body[data-build-page="true"] div[class*="space-y"],
                body[data-build-page="true"] form,
                body[data-build-page="true"] .space-y-6,
                body[data-build-page="true"] .space-y-8,
                body[data-build-page="true"] .max-w-4xl,
                body[data-build-page="true"] .container {
                    display: flex !important;
                    flex-direction: column !important;
                }
                
                /* Budget section - order 1 */
                body[data-build-page="true"] div[style*="order: 1"] {
                    order: 1 !important;
                }
                
                /* Tour builder section - order 2 (between budget and contact) */
                body[data-build-page="true"] div[style*="order: 2"],
                body[data-build-page="true"] .tour-builder-container,
                body[data-build-page="true"] div:has(.tour-builder-container) {
                    order: 2 !important;
                }
                
                /* Contact section - order 3 */
                body[data-build-page="true"] div[style*="order: 3"] {
                    order: 3 !important;
                }
                
                /* Other elements - order 4 */
                body[data-build-page="true"] div[style*="order: 4"] {
                    order: 4 !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Mark the body as build page
        document.body.setAttribute('data-build-page', 'true');

        // Override the tour override script to prevent it from running - only on build page
        if (window.overrideTourDisplay) {
            const originalOverride = window.overrideTourDisplay;
            window.overrideTourDisplay = function() {
                console.log('✅ Tour override blocked on build page');
                return;
            };
        }
    }

    function ensureToursOnOtherPages() {
        if (isOnBuildPage()) {
            return; // Don't interfere with build page
        }
        
        // Remove build page markers from other pages
        document.body.removeAttribute('data-build-page');
        
        // Ensure tours are visible on other pages
        const hiddenTours = document.querySelectorAll('.tour-removed-on-build, [data-build-page-hidden="true"]');
        hiddenTours.forEach(element => {
            element.style.display = '';
            element.classList.remove('tour-removed-on-build');
            element.removeAttribute('data-build-page-hidden');
        });
        
        console.log('Ensuring tours are visible on non-build page');
    }

    // Initial check with delay
    setTimeout(() => {
        if (isOnBuildPage()) {
            checkAndRemoveTourSelection();
        } else {
            ensureToursOnOtherPages();
        }
    }, 2000);
    
    // More controlled interval for build page only
    let lastTourRemovalTime = 0;
    let lastFormPositionTime = 0;
    setInterval(() => {
        if (isOnBuildPage()) {
            const now = Date.now();
            // Prevent rapid glitching by limiting removal frequency
            if (now - lastTourRemovalTime > 500) {
                const tourContainers = document.querySelectorAll('.tour-override-container');
                if (tourContainers.length > 0) {
                    tourContainers.forEach(container => {
                        // Instead of removing, hide permanently
                        container.style.display = 'none !important';
                        container.style.visibility = 'hidden';
                        container.style.height = '0';
                        container.style.overflow = 'hidden';
                        container.setAttribute('data-build-page-hidden', 'true');
                        console.log('🗑️ Hiding tour selection container on build page');
                    });
                    lastTourRemovalTime = now;
                }
            }
            
            // Ensure form is properly positioned - less frequently to avoid conflicts
            if (now - lastFormPositionTime > 2000) {
                const tourBuilder = document.querySelector('.tour-builder-container');
                if (tourBuilder) {
                    ensureFormPlacement();
                    lastFormPositionTime = now;
                }
            }
        } else {
            // Ensure tours are visible on other pages
            ensureToursOnOtherPages();
        }
    }, 1000);
    
    function ensureFormPlacement() {
        if (!isOnBuildPage()) return;
        
        // Find the tour builder form container
        const tourBuilderContainer = document.querySelector('.tour-builder-container');
        if (!tourBuilderContainer) {
            console.log('Tour builder container not found');
            return;
        }
        
        // Find the main form container that contains all sections
        let parentForm = tourBuilderContainer.closest('form');
        if (!parentForm) {
            parentForm = tourBuilderContainer.closest('div[class*="space-y"]');
        }
        if (!parentForm) {
            parentForm = tourBuilderContainer.closest('.max-w-4xl');
        }
        if (!parentForm) {
            parentForm = tourBuilderContainer.closest('.container');
        }
        if (!parentForm) {
            // Try to find any parent that contains multiple sections
            const allContainers = document.querySelectorAll('div[class*="space-y"], div[class*="max-w"], main, section');
            for (const container of allContainers) {
                if (container.contains(tourBuilderContainer) && container.children.length > 2) {
                    parentForm = container;
                    break;
                }
            }
        }
        
        if (!parentForm) {
            console.log('Parent form container not found');
            return;
        }
        
        console.log('Found parent form container:', parentForm.className);
        
        // Force flexbox layout on parent to enable order property
        parentForm.style.display = 'flex';
        parentForm.style.flexDirection = 'column';
        
        // Get all direct children of the form
        const formChildren = Array.from(parentForm.children);
        console.log('Found form children:', formChildren.length);
        
        let budgetFound = false;
        let tourBuilderFound = false;
        let contactFound = false;
        
        // Apply ordering to all form sections
        formChildren.forEach((child, index) => {
            const text = child.textContent.toLowerCase();
            const hasLabel = child.querySelector('label');
            const hasInput = child.querySelector('input, select, textarea');
            
            // Reset any existing order
            child.style.order = '';
            
            // Budget section gets order 1
            if (!budgetFound && (
                text.includes('budget per person') ||
                (text.includes('budget') && hasInput) ||
                (hasLabel && hasLabel.textContent.toLowerCase().includes('budget')) ||
                (hasInput && (
                    child.querySelector('input[name*="budget"]') || 
                    child.querySelector('select[name*="budget"]') ||
                    child.querySelector('input[placeholder*="budget"]') ||
                    child.querySelector('input[type="number"]')
                ))
            )) {
                child.style.order = '1';
                budgetFound = true;
                console.log('Set budget element order to 1:', child.className);
            }
            
            // Tour builder gets order 2 (between budget and contact)
            else if (!tourBuilderFound && (
                child === tourBuilderContainer || 
                child.contains(tourBuilderContainer) ||
                child.classList.contains('tour-builder-container') ||
                text.includes('design your perfect tunisia adventure') ||
                text.includes('design your perfect') ||
                child.querySelector('.tour-builder-container')
            )) {
                child.style.order = '2';
                tourBuilderFound = true;
                console.log('Set tour builder order to 2:', child.className);
            }
            
            // Contact section gets order 3
            else if (!contactFound && (
                text.includes('contact details') ||
                text.includes('contact information') ||
                (text.includes('full name') && hasInput) ||
                (text.includes('email') && hasInput) ||
                (text.includes('phone') && hasInput) ||
                (hasLabel && (
                    hasLabel.textContent.toLowerCase().includes('contact') ||
                    hasLabel.textContent.toLowerCase().includes('full name') ||
                    hasLabel.textContent.toLowerCase().includes('email') ||
                    hasLabel.textContent.toLowerCase().includes('phone')
                )) ||
                (hasInput && (
                    child.querySelector('input[type="email"]') ||
                    child.querySelector('input[name*="name"]') ||
                    child.querySelector('input[name*="phone"]') ||
                    child.querySelector('input[name*="email"]') ||
                    child.querySelector('textarea[name*="message"]')
                ))
            )) {
                child.style.order = '3';
                contactFound = true;
                console.log('Set contact element order to 3:', child.className);
            }
            
            // Other elements get order 4 (appears after everything)
            else {
                child.style.order = '4';
                console.log('Set other element order to 4:', child.className);
            }
        });
        
        console.log(`Applied form ordering - Budget: ${budgetFound ? '✅' : '❌'}, Tour Builder: ${tourBuilderFound ? '✅' : '❌'}, Contact: ${contactFound ? '✅' : '❌'}`);
    }

    // Monitor for new content - but be more selective
    const observer = new MutationObserver(() => {
        if (isOnBuildPage()) {
            checkAndRemoveTourSelection();
        } else {
            ensureToursOnOtherPages();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Watch for route changes
    let currentUrl = window.location.href;
    setInterval(() => {
        if (window.location.href !== currentUrl) {
            currentUrl = window.location.href;
            setTimeout(() => {
                if (isOnBuildPage()) {
                    checkAndRemoveTourSelection();
                    overrideTourOverride();
                } else {
                    ensureToursOnOtherPages();
                    // Restore tour override on other pages
                    if (window.overrideTourDisplay && window.overrideTourDisplay.toString().includes('blocked')) {
                        // Reset the tour override function
                        window.location.reload();
                    }
                }
            }, 1000);
        }
    }, 1000);
    
    // Completely override tour override ONLY on build page
    function overrideTourOverride() {
        if (!isOnBuildPage()) {
            return; // Don't override on other pages
        }
        
        if (window.overrideTourDisplay) {
            const originalFunction = window.overrideTourDisplay;
            window.overrideTourDisplay = function() {
                console.log('✅ Tour override completely blocked on build page');
                return Promise.resolve();
            };
        }
    }
    
    // Override on navigation - but only for build page
    window.addEventListener('hashchange', () => {
        setTimeout(() => {
            if (isOnBuildPage()) {
                overrideTourOverride();
            }
        }, 500);
    });
    
    window.addEventListener('popstate', () => {
        setTimeout(() => {
            if (isOnBuildPage()) {
                overrideTourOverride();
            }
        }, 500);
    });
    
    // Initial override - only if on build page
    if (isOnBuildPage()) {
        overrideTourOverride();
    }

    console.log('Remove tour selection script loaded - will only affect build page');
})();
