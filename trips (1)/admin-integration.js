/**
 * Admin Panel Integration Script
 * This script enhances the existing admin panel with new fields and PHP page generation
 * Include this script in your index.html file
 */

(function() {
    'use strict';

    // Initialize enhanced admin functionality
    function initializeEnhancedAdmin() {
        // Wait for React app to load
        setTimeout(() => {
            enhanceAdminPanel();
            setupFormInterception();
        }, 2000);
    }

    function enhanceAdminPanel() {
        // Add CSS for enhanced form styling
        const styles = document.createElement('style');
        styles.innerHTML = `
            .enhanced-admin-section {
                margin: 20px 0;
                padding: 20px;
                border: 2px solid #0068B7;
                border-radius: 8px;
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            }
            
            .enhanced-admin-section h3 {
                color: #0068B7;
                margin-bottom: 15px;
                font-size: 18px;
                font-weight: 600;
                border-bottom: 2px solid #0068B7;
                padding-bottom: 8px;
            }
            
            .enhanced-form-group {
                margin-bottom: 15px;
            }
            
            .enhanced-form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: #333;
                font-size: 14px;
            }
            
            .enhanced-form-group input,
            .enhanced-form-group textarea,
            .enhanced-form-group select {
                width: 100%;
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 6px;
                font-size: 14px;
                transition: border-color 0.3s ease;
            }
            
            .enhanced-form-group input:focus,
            .enhanced-form-group textarea:focus {
                border-color: #0068B7;
                outline: none;
                box-shadow: 0 0 0 3px rgba(0, 104, 183, 0.1);
            }
            
            .enhanced-form-group textarea {
                min-height: 100px;
                resize: vertical;
            }
            
            .dynamic-list {
                border: 1px solid #e2e8f0;
                padding: 15px;
                border-radius: 6px;
                margin: 10px 0;
                background: #fff;
            }
            
            .dynamic-item {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                gap: 10px;
                padding: 10px;
                background: #f8f9fa;
                border-radius: 4px;
            }
            
            .dynamic-item input,
            .dynamic-item textarea {
                flex: 1;
                margin: 0;
                border: 1px solid #ddd;
            }
            
            .btn-dynamic {
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                transition: all 0.3s ease;
            }
            
            .btn-add {
                background: #0068B7;
                color: white;
                margin-top: 10px;
            }
            
            .btn-add:hover {
                background: #005294;
            }
            
            .btn-remove {
                background: #dc3545;
                color: white;
                min-width: 80px;
            }
            
            .btn-remove:hover {
                background: #c82333;
            }
            
            .faq-item {
                border: 2px solid #e2e8f0;
                padding: 15px;
                margin-bottom: 15px;
                border-radius: 6px;
                background: #fff;
            }
            
            .faq-item input {
                margin-bottom: 10px;
                font-weight: 600;
            }
            
            .required-field {
                color: #dc3545;
            }
            
            .form-section-divider {
                height: 2px;
                background: linear-gradient(90deg, #0068B7, #87ceeb);
                margin: 30px 0;
                border-radius: 1px;
            }
        `;
        document.head.appendChild(styles);
    }

    function setupFormInterception() {
        // Intercept form submissions to add enhanced fields
        document.addEventListener('submit', function(e) {
            const form = e.target;
            if (form.querySelector('[name="title"]') && form.querySelector('[name="description"]')) {
                e.preventDefault();
                handleEnhancedFormSubmission(form);
            }
        });

        // Watch for modal opens to enhance forms
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.querySelector && node.querySelector('[role="dialog"]')) {
                        setTimeout(() => {
                            enhanceFormModal(node);
                        }, 500);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function enhanceFormModal(modal) {
        const form = modal.querySelector('form');
        if (!form || form.classList.contains('enhanced')) return;

        form.classList.add('enhanced');

        // Find the submit button to insert new fields before it
        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) return;

        // Create enhanced fields HTML
        const enhancedFieldsHTML = `
            <div class="form-section-divider"></div>
            
            <!-- Itinerary Section -->
            <div class="enhanced-admin-section">
                <h3>🗺️ Itinerary Details</h3>
                <div class="enhanced-form-group">
                    <label>Pickup Location <span class="required-field">*</span></label>
                    <input type="text" name="pickupLocation" required 
                           placeholder="e.g., Hotel lobby, Airport terminal">
                </div>
                <div class="enhanced-form-group">
                    <label>Return Location <span class="required-field">*</span></label>
                    <input type="text" name="arriveBackAt" required 
                           placeholder="e.g., Same pickup point, City center">
                </div>
                <div class="enhanced-form-group">
                    <label>Main Stops Along the Way</label>
                    <div class="dynamic-list" id="itinerary-stops">
                        <div class="dynamic-item">
                            <input type="text" placeholder="Enter stop name" class="stop-input">
                            <button type="button" class="btn-dynamic btn-remove" onclick="removeStop(this)">Remove</button>
                        </div>
                    </div>
                    <button type="button" class="btn-dynamic btn-add" onclick="addStop()">+ Add Stop</button>
                </div>
                <div class="enhanced-form-group">
                    <label>Google Maps Embed Link</label>
                    <input type="url" name="googleMapsLink" 
                           placeholder="https://www.google.com/maps/embed?pb=...">
                    <small style="color: #666; font-size: 12px;">Get embed link from Google Maps > Share > Embed a map</small>
                </div>
            </div>

            <!-- Not Suitable For Section -->
            <div class="enhanced-admin-section">
                <h3>⚠️ Not Suitable For</h3>
                <div class="enhanced-form-group">
                    <label>Add Restrictions (one per line)</label>
                    <textarea name="notSuitableFor" rows="4" 
                              placeholder="Pregnant women&#10;People with mobility issues&#10;Children under 5&#10;People with heart conditions"></textarea>
                    <small style="color: #666; font-size: 12px;">Each restriction on a new line</small>
                </div>
            </div>

            <!-- Full Description Section -->
            <div class="enhanced-admin-section">
                <h3>📝 Detailed Description</h3>
                <div class="enhanced-form-group">
                    <label>Full Description for Tour Page</label>
                    <textarea name="fullDescription" rows="6" 
                              placeholder="Write a comprehensive description that will appear on the individual tour page. This can include more details, history, what to expect, etc."></textarea>
                </div>
            </div>

            <!-- Reviews Section -->
            <div class="enhanced-admin-section">
                <h3>⭐ Customer Reviews</h3>
                <div class="enhanced-form-group">
                    <label>GetYourGuide Reviews Link</label>
                    <input type="url" name="reviewsLink" 
                           placeholder="https://www.getyourguide.com/your-tour-link">
                    <small style="color: #666; font-size: 12px;">Only 5-star reviews will be imported automatically</small>
                </div>
            </div>

            <!-- FAQ Section -->
            <div class="enhanced-admin-section">
                <h3>❓ Frequently Asked Questions</h3>
                <div id="faq-container">
                    <div class="faq-item">
                        <input type="text" placeholder="Question (e.g., What should I bring?)" class="faq-question">
                        <textarea placeholder="Answer" class="faq-answer" rows="3"></textarea>
                        <button type="button" class="btn-dynamic btn-remove" onclick="removeFAQ(this)">Remove FAQ</button>
                    </div>
                </div>
                <button type="button" class="btn-dynamic btn-add" onclick="addFAQ()">+ Add FAQ</button>
            </div>

            <!-- Payment Link Section -->
            <div class="enhanced-admin-section">
                <h3>💳 Book Now Button</h3>
                <div class="enhanced-form-group">
                    <label>Payment Gateway Link <span class="required-field">*</span></label>
                    <input type="url" name="paymentLink" required 
                           placeholder="https://your-payment-gateway.com/tour-booking">
                    <small style="color: #666; font-size: 12px;">This link will be used for the "Book Now" button</small>
                </div>
            </div>
        `;

        // Insert enhanced fields before submit button
        const enhancedDiv = document.createElement('div');
        enhancedDiv.innerHTML = enhancedFieldsHTML;
        submitButton.parentNode.insertBefore(enhancedDiv, submitButton);

        // Add global functions for dynamic elements
        window.addStop = function() {
            const container = document.getElementById('itinerary-stops');
            const newStop = document.createElement('div');
            newStop.className = 'dynamic-item';
            newStop.innerHTML = `
                <input type="text" placeholder="Enter stop name" class="stop-input">
                <button type="button" class="btn-dynamic btn-remove" onclick="removeStop(this)">Remove</button>
            `;
            container.appendChild(newStop);
        };

        window.removeStop = function(button) {
            if (document.querySelectorAll('.stop-input').length > 1) {
                button.parentElement.remove();
            }
        };

        window.addFAQ = function() {
            const container = document.getElementById('faq-container');
            const newFAQ = document.createElement('div');
            newFAQ.className = 'faq-item';
            newFAQ.innerHTML = `
                <input type="text" placeholder="Question" class="faq-question">
                <textarea placeholder="Answer" class="faq-answer" rows="3"></textarea>
                <button type="button" class="btn-dynamic btn-remove" onclick="removeFAQ(this)">Remove FAQ</button>
            `;
            container.appendChild(newFAQ);
        };

        window.removeFAQ = function(button) {
            if (document.querySelectorAll('.faq-item').length > 1) {
                button.parentElement.remove();
            }
        };
    }

    function handleEnhancedFormSubmission(form) {
        // Collect all form data
        const formData = new FormData(form);
        
        // Collect dynamic data
        const stops = [];
        document.querySelectorAll('.stop-input').forEach(input => {
            if (input.value.trim()) {
                stops.push(input.value.trim());
            }
        });
        
        const faqItems = [];
        document.querySelectorAll('.faq-item').forEach(item => {
            const question = item.querySelector('.faq-question').value.trim();
            const answer = item.querySelector('.faq-answer').value.trim();
            if (question && answer) {
                faqItems.push({ question, answer });
            }
        });
        
        const notSuitableFor = formData.get('notSuitableFor')
            ? formData.get('notSuitableFor').split('\n').map(item => item.trim()).filter(item => item)
            : [];

        // Create enhanced tour data
        const tourData = {
            title: formData.get('title'),
            description: formData.get('description'),
            duration: parseInt(formData.get('duration')),
            price: parseFloat(formData.get('price')),
            images: getFormArrayData(formData, 'images'),
            type: formData.get('type'),
            city: formData.get('city'),
            rating: parseFloat(formData.get('rating') || '4.5'),
            accommodation: formData.get('accommodation'),
            highlights: getFormArrayData(formData, 'highlights'),
            included: getFormArrayData(formData, 'included'),
            notIncluded: getFormArrayData(formData, 'notIncluded'),
            languages: getFormArrayData(formData, 'languages'),
            
            // Enhanced fields
            itinerary: {
                pickupLocation: formData.get('pickupLocation'),
                arriveBackAt: formData.get('arriveBackAt'),
                mainStops: stops,
                googleMapsLink: formData.get('googleMapsLink')
            },
            notSuitableFor: notSuitableFor,
            fullDescription: formData.get('fullDescription'),
            reviews: {
                getyourguideLink: formData.get('reviewsLink'),
                importedReviews: []
            },
            faq: faqItems,
            paymentLink: formData.get('paymentLink')
        };

        // Submit to enhanced endpoint
        submitEnhancedTour(tourData);
    }

    function getFormArrayData(formData, fieldName) {
        const values = formData.getAll(fieldName);
        if (values.length === 0) {
            const singleValue = formData.get(fieldName);
            if (singleValue) {
                return singleValue.split('\n').map(item => item.trim()).filter(item => item);
            }
        }
        return values.filter(value => value && value.trim());
    }

    function submitEnhancedTour(tourData) {
        // Show loading indicator
        const submitBtn = document.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating Tour & PHP Page...';
        submitBtn.disabled = true;

        fetch('/api/tours/enhanced', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tourData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error: ' + data.error);
            } else {
                alert(`Tour created successfully!\nPHP page generated: tour-${data.id}.php\n\nYou can access it at: /prodpage/tour-${data.id}.php`);
                location.reload();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error creating tour');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeEnhancedAdmin);
    } else {
        initializeEnhancedAdmin();
    }

})();