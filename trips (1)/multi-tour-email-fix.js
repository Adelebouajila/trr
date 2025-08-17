/**
 * Multi-Tour Email Fix for Private/Build Pages
 * This script ensures multiple tour selections are properly captured and sent in emails
 */

(function() {
    'use strict';

    // Store for tracking multiple tour selections with full details
    let multiTourData = new Map();
    let originalFormSubmit = null;

    function initializeMultiTourFix() {
        console.log('Initializing multi-tour email fix...');

        // Listen for tour selection events from tour-override.js
        document.addEventListener('tourSelectionChanged', handleTourSelectionChange);
        document.addEventListener('tour:multiselect', handleTourSelectionChange);
        document.addEventListener('multiTourSelection', handleTourSelectionChange);

        // Intercept form submissions
        interceptFormSubmissions();

        // Set up periodic checks for form submissions
        setInterval(checkAndInterceptForms, 2000);
    }

    function handleTourSelectionChange(event) {
        const { tourId, title, isSelected, selectedTours } = event.detail;
        
        console.log('Tour selection changed:', { tourId, title, isSelected });

        if (isSelected) {
            // Add tour to our tracking with full details
            multiTourData.set(tourId, {
                id: tourId,
                title: title,
                selected: true,
                timestamp: Date.now()
            });
        } else {
            // Remove tour from tracking
            multiTourData.delete(tourId);
        }

        console.log('Current multi-tour data:', Array.from(multiTourData.values()));

        // Update React form state to include all selected tours
        updateReactFormWithMultipleTours();
    }

    function updateReactFormWithMultipleTours() {
        // Find the days state setter in React
        const reactRoot = document.getElementById('root');
        if (!reactRoot) return;

        // Create days array from selected tours
        const selectedTours = Array.from(multiTourData.values());
        if (selectedTours.length === 0) return;

        // Dispatch a custom event that React can listen to
        const updateEvent = new CustomEvent('updateDaysWithMultipleTours', {
            detail: {
                tours: selectedTours,
                days: selectedTours.map((tour, index) => ({
                    tour: tour.title,
                    tourId: tour.id,
                    accommodation: 'Standard',
                    dayIndex: index
                }))
            },
            bubbles: true
        });

        document.dispatchEvent(updateEvent);
    }

    function interceptFormSubmissions() {
        // Find and override form submission handlers
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            if (form.dataset.multiTourFixed) return;
            
            form.addEventListener('submit', handleFormSubmission, true);
            form.dataset.multiTourFixed = 'true';
        });

        // Also intercept button clicks that might submit forms
        document.addEventListener('click', function(event) {
            const button = event.target.closest('button');
            if (!button) return;

            const buttonText = button.textContent.toLowerCase();
            if (buttonText.includes('submit') || buttonText.includes('book') || buttonText.includes('confirm')) {
                // Small delay to let React process, then modify the request
                setTimeout(() => {
                    interceptNetworkRequests();
                }, 100);
            }
        });
    }

    function handleFormSubmission(event) {
        console.log('Form submission intercepted');
        
        const selectedTours = Array.from(multiTourData.values());
        if (selectedTours.length === 0) return;

        console.log('Modifying form submission with multiple tours:', selectedTours);

        // Don't prevent the default, but set up network interception
        setTimeout(() => {
            interceptNetworkRequests();
        }, 50);
    }

    function interceptNetworkRequests() {
        // Override fetch to modify booking requests
        if (!window.originalFetch) {
            window.originalFetch = window.fetch;
            
            window.fetch = async function(url, options = {}) {
                console.log('Fetch intercepted:', url, options);

                // Check if this is a booking request
                if (url.includes('/api/bookings') && options.method === 'POST') {
                    return handleBookingRequest(url, options);
                }

                return window.originalFetch(url, options);
            };
        }

        // Override XMLHttpRequest as backup
        if (!window.originalXMLHttpRequest) {
            window.originalXMLHttpRequest = window.XMLHttpRequest;
            
            window.XMLHttpRequest = function() {
                const xhr = new window.originalXMLHttpRequest();
                const originalSend = xhr.send;
                
                xhr.send = function(data) {
                    if (xhr._url && xhr._url.includes('/api/bookings') && data) {
                        try {
                            const requestData = JSON.parse(data);
                            const modifiedData = enhanceBookingDataWithMultipleTours(requestData);
                            console.log('XHR booking request enhanced:', modifiedData);
                            return originalSend.call(this, JSON.stringify(modifiedData));
                        } catch (e) {
                            console.error('Error modifying XHR request:', e);
                        }
                    }
                    return originalSend.call(this, data);
                };

                const originalOpen = xhr.open;
                xhr.open = function(method, url, ...args) {
                    xhr._url = url;
                    return originalOpen.call(this, method, url, ...args);
                };

                return xhr;
            };
        }
    }

    async function handleBookingRequest(url, options) {
        console.log('Handling booking request...');
        
        try {
            const requestData = JSON.parse(options.body);
            const enhancedData = enhanceBookingDataWithMultipleTours(requestData);
            
            console.log('Original booking data:', requestData);
            console.log('Enhanced booking data:', enhancedData);

            const modifiedOptions = {
                ...options,
                body: JSON.stringify(enhancedData)
            };

            return window.originalFetch(url, modifiedOptions);
        } catch (error) {
            console.error('Error enhancing booking request:', error);
            return window.originalFetch(url, options);
        }
    }

    function enhanceBookingDataWithMultipleTours(bookingData) {
        const selectedTours = Array.from(multiTourData.values());
        
        if (selectedTours.length === 0) {
            return bookingData;
        }

        console.log('Enhancing booking data with tours:', selectedTours);

        // Create enhanced days array with all selected tours
        const enhancedDays = selectedTours.map((tour, index) => ({
            tour: tour.title,
            tourId: tour.id,
            accommodation: bookingData.days && bookingData.days[0] ? 
                bookingData.days[0].accommodation || 'Standard' : 'Standard',
            dayIndex: index,
            selected: true
        }));

        // Set the primary tour_id to the first selected tour
        const primaryTourId = selectedTours[0].id;

        // Create comprehensive tour selection data
        const tourSelectionData = {
            selectedTours: selectedTours,
            primaryTourId: primaryTourId,
            tourCount: selectedTours.length,
            tourTitles: selectedTours.map(t => t.title),
            tourIds: selectedTours.map(t => t.id)
        };

        return {
            ...bookingData,
            days: enhancedDays,
            tourId: primaryTourId, // For backward compatibility
            selectedTours: selectedTours, // Full tour selection data
            tourSelectionData: tourSelectionData, // Structured selection info
            multiTourBooking: true // Flag to indicate this is a multi-tour booking
        };
    }

    function checkAndInterceptForms() {
        const forms = document.querySelectorAll('form:not([data-multi-tour-fixed])');
        if (forms.length > 0) {
            interceptFormSubmissions();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeMultiTourFix);
    } else {
        initializeMultiTourFix();
    }

    // Also initialize after a delay to catch dynamically created forms
    setTimeout(initializeMultiTourFix, 2000);

    console.log('Multi-tour email fix script loaded');

})();