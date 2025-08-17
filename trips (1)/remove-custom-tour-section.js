
/**
 * Remove Custom Tour Section Script
 * Removes the old "Design Your Custom Tour" section from the build page
 * since we now have the new tour builder form
 */

class CustomTourSectionRemover {
    constructor() {
        this.init();
    }

    init() {
        // Wait for page to load
        setTimeout(() => {
            this.removeCustomTourSection();
        }, 1000);

        // Keep checking periodically but less frequently
        setInterval(() => {
            this.removeCustomTourSection();
        }, 5000);

        // Watch for DOM changes but with throttling
        let timeout;
        const observer = new MutationObserver(() => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.removeCustomTourSection();
            }, 1000);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    removeCustomTourSection() {
        // Only run on build page
        if (!window.location.pathname.includes('/build')) {
            return;
        }

        // Check all text elements for the target phrase - but be more specific
        const allElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, div, section');
        
        for (const element of allElements) {
            const text = element.textContent || element.innerText || '';
            
            // Only target exact matches to avoid removing other content
            if (text.trim() === 'Design Your Custom Tour' || 
                text.trim() === 'Design your custom tour' ||
                text.trim() === 'DESIGN YOUR CUSTOM TOUR') {
                
                console.log('Found "Design Your Custom Tour" section, checking for removal...');
                
                // Find the parent container to remove
                const containerToRemove = this.findContainerToRemove(element);
                
                if (containerToRemove && !containerToRemove.dataset.customTourRemoved) {
                    // Don't remove if it contains our tour builder or any essential form elements
                    const hasEssentialContent = containerToRemove.querySelector('.tour-builder-container') ||
                                              containerToRemove.querySelector('.tour-override-container') ||
                                              containerToRemove.querySelector('input[type="email"]') ||
                                              containerToRemove.querySelector('textarea') ||
                                              containerToRemove.querySelector('button[type="submit"]');
                    
                    if (!hasEssentialContent) {
                        containerToRemove.style.display = 'none';
                        containerToRemove.dataset.customTourRemoved = 'true';
                        console.log('✅ Removed old "Design Your Custom Tour" section');
                    } else {
                        console.log('⚠️ Skipped removal - contains essential content');
                    }
                }
            }
        }

        // Look for tour selection cards or forms that might be the old system
        this.removeOldTourCards();
    }

    findContainerToRemove(element) {
        // Look for the appropriate parent container
        let current = element;
        
        // Go up the DOM tree to find a suitable container
        while (current && current !== document.body) {
            const tagName = current.tagName.toLowerCase();
            const className = current.className || '';
            
            // Look for container-like elements
            if (tagName === 'section' || 
                tagName === 'div' && (
                    className.includes('container') ||
                    className.includes('section') ||
                    className.includes('card') ||
                    className.includes('panel') ||
                    className.includes('box') ||
                    current.style.padding ||
                    current.style.margin
                )) {
                return current;
            }
            
            current = current.parentElement;
        }
        
        return element;
    }

    removeOldTourCards() {
        // Look for old-style tour selection cards - but be more specific
        const cards = document.querySelectorAll('div[class*="card"], div[class*="Card"]');
        
        cards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            
            // Only remove if it specifically contains the old tour selection elements
            // and has the exact text we want to remove
            const hasExactOldTourText = (
                cardText.includes('design your custom tour') ||
                cardText.includes('design your tour') ||
                cardText.includes('custom tour design')
            );
            
            // Check if it has tour selection buttons or radio buttons
            const hasSelectionElements = card.querySelector('input[type="radio"]') || 
                                       card.querySelector('input[type="checkbox"]') ||
                                       card.querySelector('button[class*="tour"]');

            if (hasExactOldTourText && hasSelectionElements && !card.dataset.customTourRemoved) {
                // Make sure this isn't our new tour builder or essential content
                if (!card.closest('.tour-builder-container') && 
                    !card.querySelector('.tour-builder-container') &&
                    !card.querySelector('input[name="name"]') && // Don't remove contact forms
                    !card.querySelector('input[name="email"]')) { // Don't remove contact forms
                    
                    card.style.display = 'none';
                    card.dataset.customTourRemoved = 'true';
                    console.log('✅ Removed old tour selection card');
                }
            }
        });
    }
}

// Initialize the remover
document.addEventListener('DOMContentLoaded', () => {
    console.log('🗑️ Custom Tour Section Remover loading...');
    new CustomTourSectionRemover();
});

// Also initialize if page is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🗑️ Custom Tour Section Remover loading...');
        new CustomTourSectionRemover();
    });
} else {
    console.log('🗑️ Custom Tour Section Remover loading...');
    new CustomTourSectionRemover();
}
