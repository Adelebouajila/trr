/**
 * Success Popup for Tour Booking Forms
 * Shows a beautiful popup after successful form submission with navigation options
 */

(function() {
    'use strict';

    let popupContainer = null;
    let originalFetch = null;
    let originalXMLHttpRequest = null;

    function initializeSuccessPopup() {
        console.log('Initializing success popup system...');
        
        // Create popup HTML structure
        createPopupHTML();
        
        // Intercept form submissions and API calls
        interceptAPIRequests();
        
        // Setup event listeners
        setupEventListeners();
    }

    function createPopupHTML() {
        // Remove existing popup if it exists
        const existingPopup = document.getElementById('success-popup-overlay');
        if (existingPopup) {
            existingPopup.remove();
        }

        // Create popup HTML
        const popupHTML = `
            <div id="success-popup-overlay" class="success-popup-overlay" style="display: none;">
                <div class="success-popup-container">
                    <div class="success-popup-content">
                        <div class="success-popup-header">
                            <img src="/logo.jpg" alt="Depart Travel Services" class="success-popup-logo" />
                            <h2 class="success-popup-title">Thank You!</h2>
                        </div>
                        
                        <div class="success-popup-body">
                            <div class="success-checkmark">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <circle cx="30" cy="30" r="28" fill="#10B981" stroke="#059669" stroke-width="2"/>
                                    <path d="M20 30L26 36L40 22" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            
                            <p class="success-popup-message">
                                Your booking request has been submitted successfully! 
                                We'll get back to you soon with tour details and pricing.
                            </p>
                        </div>
                        
                        <div class="success-popup-actions">
                            <button class="success-btn success-btn-primary" id="more-tours-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                                More Tours
                            </button>
                            
                            <button class="success-btn success-btn-secondary" id="back-website-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Back to Website
                            </button>
                        </div>
                        
                        <button class="success-popup-close" id="close-popup-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add popup to document
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        popupContainer = document.getElementById('success-popup-overlay');

        // Add CSS styles
        addPopupStyles();
    }

    function addPopupStyles() {
        // Remove existing styles
        const existingStyles = document.getElementById('success-popup-styles');
        if (existingStyles) {
            existingStyles.remove();
        }

        const styles = `
            <style id="success-popup-styles">
                .success-popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(8px);
                    z-index: 999999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .success-popup-overlay.show {
                    opacity: 1;
                }

                .success-popup-container {
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
                    max-width: 480px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    transform: scale(0.9) translateY(20px);
                    transition: transform 0.3s ease;
                }

                .success-popup-overlay.show .success-popup-container {
                    transform: scale(1) translateY(0);
                }

                .success-popup-content {
                    padding: 40px 30px 30px;
                    text-align: center;
                }

                .success-popup-header {
                    margin-bottom: 30px;
                }

                .success-popup-logo {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 20px;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }

                .success-popup-title {
                    font-size: 28px;
                    font-weight: 700;
                    color: #1F2937;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .success-popup-body {
                    margin-bottom: 40px;
                }

                .success-checkmark {
                    margin-bottom: 24px;
                    animation: checkmark-bounce 0.6s ease-out 0.2s both;
                }

                @keyframes checkmark-bounce {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.1);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .success-popup-message {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #6B7280;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .success-popup-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .success-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    padding: 16px 24px;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: none;
                    text-decoration: none;
                    min-height: 56px;
                }

                .success-btn-primary {
                    background: linear-gradient(135deg, #0073e6 0%, #005bb5 100%);
                    color: white;
                    box-shadow: 0 4px 12px rgba(0, 115, 230, 0.3);
                }

                .success-btn-primary:hover {
                    background: linear-gradient(135deg, #005bb5 0%, #004994 100%);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(0, 115, 230, 0.4);
                }

                .success-btn-secondary {
                    background: white;
                    color: #374151;
                    border: 2px solid #E5E7EB;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                }

                .success-btn-secondary:hover {
                    background: #F9FAFB;
                    border-color: #D1D5DB;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .success-popup-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: #F3F4F6;
                    border: none;
                    border-radius: 8px;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: #6B7280;
                }

                .success-popup-close:hover {
                    background: #E5E7EB;
                    color: #374151;
                }

                /* Mobile responsive */
                @media (max-width: 768px) {
                    .success-popup-content {
                        padding: 30px 20px 20px;
                    }

                    .success-popup-logo {
                        width: 60px;
                        height: 60px;
                    }

                    .success-popup-title {
                        font-size: 24px;
                    }

                    .success-popup-message {
                        font-size: 14px;
                    }

                    .success-btn {
                        padding: 14px 20px;
                        font-size: 14px;
                        min-height: 48px;
                    }

                    .success-checkmark svg {
                        width: 50px;
                        height: 50px;
                    }
                }

                /* Dark mode support */
                @media (prefers-color-scheme: dark) {
                    .success-popup-container {
                        background: #1F2937;
                        color: white;
                    }

                    .success-popup-title {
                        color: white;
                    }

                    .success-popup-message {
                        color: #D1D5DB;
                    }

                    .success-btn-secondary {
                        background: #374151;
                        color: white;
                        border-color: #4B5563;
                    }

                    .success-btn-secondary:hover {
                        background: #4B5563;
                        border-color: #6B7280;
                    }

                    .success-popup-close {
                        background: #374151;
                        color: #D1D5DB;
                    }

                    .success-popup-close:hover {
                        background: #4B5563;
                        color: white;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    function setupEventListeners() {
        if (!popupContainer) return;

        // More Tours button
        const moreTours = document.getElementById('more-tours-btn');
        if (moreTours) {
            moreTours.addEventListener('click', function() {
                window.open('http://trips.depart-travel-services.com/', '_blank');
                hidePopup();
            });
        }

        // Back to Website button
        const backWebsite = document.getElementById('back-website-btn');
        if (backWebsite) {
            backWebsite.addEventListener('click', function() {
                window.open('https://depart-travel-services.com/', '_blank');
                hidePopup();
            });
        }

        // Close button
        const closeBtn = document.getElementById('close-popup-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', hidePopup);
        }

        // Close on overlay click
        popupContainer.addEventListener('click', function(e) {
            if (e.target === popupContainer) {
                hidePopup();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popupContainer && popupContainer.style.display !== 'none') {
                hidePopup();
            }
        });
    }

    function showPopup() {
        if (!popupContainer) {
            createPopupHTML();
            setupEventListeners();
        }

        popupContainer.style.display = 'flex';
        
        // Trigger animation
        setTimeout(() => {
            popupContainer.classList.add('show');
        }, 10);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        console.log('Success popup displayed');
    }

    function hidePopup() {
        if (!popupContainer) return;

        popupContainer.classList.remove('show');
        
        setTimeout(() => {
            popupContainer.style.display = 'none';
            // Restore body scroll
            document.body.style.overflow = '';
        }, 300);

        console.log('Success popup hidden');
    }

    function interceptAPIRequests() {
        // Intercept fetch requests
        if (!originalFetch) {
            originalFetch = window.fetch;
            
            window.fetch = async function(url, options = {}) {
                console.log('Fetch intercepted for success popup:', url);

                try {
                    const response = await originalFetch(url, options);
                    
                    // Check if this is a successful booking request
                    if (url.includes('/api/bookings') && 
                        options.method === 'POST' && 
                        response.ok) {
                        
                        console.log('Successful booking detected, showing popup');
                        
                        // Show popup after a short delay to ensure form processing is complete
                        setTimeout(() => {
                            showPopup();
                        }, 500);
                    }
                    
                    return response;
                } catch (error) {
                    console.error('Fetch error:', error);
                    throw error;
                }
            };
        }

        // Intercept XMLHttpRequest as backup
        if (!originalXMLHttpRequest) {
            originalXMLHttpRequest = window.XMLHttpRequest;
            
            window.XMLHttpRequest = function() {
                const xhr = new originalXMLHttpRequest();
                
                // Store original methods
                const originalSend = xhr.send;
                const originalOpen = xhr.open;
                
                let requestMethod = '';
                let requestUrl = '';
                
                xhr.open = function(method, url, ...args) {
                    requestMethod = method;
                    requestUrl = url;
                    return originalOpen.call(this, method, url, ...args);
                };
                
                xhr.send = function(data) {
                    // Add load event listener for successful responses
                    xhr.addEventListener('load', function() {
                        if (requestUrl.includes('/api/bookings') && 
                            requestMethod === 'POST' && 
                            xhr.status >= 200 && xhr.status < 300) {
                            
                            console.log('Successful booking detected via XHR, showing popup');
                            
                            setTimeout(() => {
                                showPopup();
                            }, 500);
                        }
                    });
                    
                    return originalSend.call(this, data);
                };
                
                return xhr;
            };
        }
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSuccessPopup);
    } else {
        initializeSuccessPopup();
    }

    // Export functions for external use if needed
    window.successPopup = {
        show: showPopup,
        hide: hidePopup
    };

})();