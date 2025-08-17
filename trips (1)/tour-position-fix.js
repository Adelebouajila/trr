/**
 * Tour Section Position Fix
 * Ensures proper CSS ordering for tour section between budget and contact sections
 */

(function() {
    'use strict';

    function fixTourPositioning() {
        console.log('Fixing tour section positioning...');
        
        // Find the tour container
        const tourContainer = document.querySelector('.tour-override-container');
        if (!tourContainer) {
            console.log('Tour container not found');
            return;
        }

        // Find the parent form container
        const parentForm = tourContainer.closest('div[class*="space-y"], form');
        if (!parentForm) {
            console.log('Parent form not found');
            return;
        }

        // Force flexbox layout on parent to enable order property
        parentForm.style.display = 'flex';
        parentForm.style.flexDirection = 'column';
        
        // Get all direct children of the form
        const formChildren = Array.from(parentForm.children);
        
        // Find and apply correct ordering
        formChildren.forEach((child, index) => {
            const text = child.textContent.toLowerCase();
            const hasLabel = child.querySelector('label');
            const hasInput = child.querySelector('input, select, textarea');
            
            // Reset any existing order
            child.style.order = '';
            
            // Budget section gets order 1
            if (text.includes('budget per person') ||
                text.includes('budget') ||
                (hasLabel && hasLabel.textContent.toLowerCase().includes('budget')) ||
                (hasInput && (
                    child.querySelector('input[name*="budget"]') || 
                    child.querySelector('select[name*="budget"]')
                ))
            ) {
                child.style.order = '1';
                console.log('Set budget element order to 1');
            }
            
            // Contact section gets order 3
            else if (text.includes('contact details') ||
                text.includes('contact information') ||
                text.includes('full name') ||
                text.includes('email address') ||
                text.includes('phone number') ||
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
            ) {
                child.style.order = '3';
                console.log('Set contact element order to 3');
            }
            
            // Other elements get default order (appears after tour section)
            else if (child !== tourContainer) {
                child.style.order = '4';
            }
        });

        // Tour container gets order 2 (between budget and contact)
        tourContainer.style.order = '2';
        tourContainer.style.position = 'relative';
        tourContainer.style.zIndex = '1';
        
        console.log('Applied CSS ordering - Budget: 1, Tours: 2, Contact: 3, Others: 4');
    }

    function addEnhancedCSS() {
        // Add additional CSS to ensure proper positioning
        const css = `
            /* Enhanced positioning rules */
            form:has(.tour-override-container),
            div[class*="space-y"]:has(.tour-override-container) {
                display: flex !important;
                flex-direction: column !important;
            }
            
            /* Force specific ordering with higher specificity */
            .tour-override-container {
                order: 2 !important;
                position: relative !important;
                z-index: 1 !important;
                margin: 24px 0 !important;
            }
            
            /* Budget elements */
            div:has(input[name*="budget"]),
            div:has(select[name*="budget"]),
            div:has(label:contains("Budget")) {
                order: 1 !important;
            }
            
            /* Contact elements with more specific targeting */
            div:has(input[type="email"]),
            div:has(input[name*="name"]),
            div:has(input[name*="phone"]),
            div:has(textarea[name*="message"]),
            div:has(label:contains("Contact")),
            div:has(label:contains("Full Name")),
            div:has(label:contains("Email")),
            div:has(label:contains("Phone")) {
                order: 3 !important;
            }
        `;

        const style = document.createElement('style');
        style.textContent = css;
        style.id = 'tour-position-fix-styles';
        
        // Remove existing style if present
        const existingStyle = document.getElementById('tour-position-fix-styles');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        document.head.appendChild(style);
    }

    function init() {
        console.log('Tour position fix initializing...');
        
        // Add enhanced CSS first
        addEnhancedCSS();
        
        // Wait for tour container to be created
        let attempts = 0;
        const maxAttempts = 30;
        
        function checkAndFix() {
            attempts++;
            
            const tourContainer = document.querySelector('.tour-override-container');
            if (tourContainer) {
                console.log('Tour container found, applying positioning fixes...');
                fixTourPositioning();
                return;
            }
            
            if (attempts < maxAttempts) {
                setTimeout(checkAndFix, 300);
            } else {
                console.log('Tour container not found after maximum attempts');
            }
        }
        
        // Start checking
        checkAndFix();
        
        // Watch for DOM changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    const addedTourContainer = Array.from(mutation.addedNodes).find(node => 
                        node.nodeType === 1 && 
                        (node.classList?.contains('tour-override-container') || 
                         node.querySelector?.('.tour-override-container'))
                    );
                    
                    if (addedTourContainer) {
                        console.log('Tour container added to DOM, applying positioning fixes...');
                        setTimeout(() => {
                            fixTourPositioning();
                        }, 200);
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Also re-apply fixes on route changes
        let currentUrl = window.location.href;
        setInterval(() => {
            if (window.location.href !== currentUrl) {
                currentUrl = window.location.href;
                console.log('Route change detected, re-applying position fixes...');
                setTimeout(() => {
                    addEnhancedCSS();
                    fixTourPositioning();
                }, 1000);
            }
        }, 1000);
        
        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            observer.disconnect();
        });
        
        console.log('Tour position fix initialized');
    }

    // Start when ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();