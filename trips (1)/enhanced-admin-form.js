/**
 * Enhanced Admin Form System
 * Complete redesign for Tunisia Tour Admin Panel
 */

class EnhancedTourAdmin {
    constructor() {
        this.formData = {};
        this.currentStep = 1;
        this.totalSteps = 4;
        this.imageUrls = [];
        this.itinerary = [];
        this.amenities = [];
        this.tags = [];
        this.highlights = [];
        this.included = [];
        this.notIncluded = [];
        this.mainStops = [];
        this.notSuitableFor = [];
        this.faq = [];
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeForm());
        } else {
            this.initializeForm();
        }
    }

    initializeForm() {
        // Find the admin form container
        const adminContainer = this.findAdminContainer();
        if (!adminContainer) {
            console.log('Admin container not found, retrying...');
            setTimeout(() => this.initializeForm(), 1000);
            return;
        }

        this.injectStyles();
        this.replaceForm(adminContainer);
        this.bindEvents();
    }

    findAdminContainer() {
        // Look for various admin panel selectors
        const selectors = [
            '[data-testid="admin-panel"]',
            '.admin-panel',
            '#admin-panel',
            'form[action*="tours"]',
            '.admin-container',
            'div:has(h2:contains("Add New Tour"))',
            'div:has(input[placeholder*="Tour"])'
        ];

        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) return element;
        }

        // Fallback: look for any form with tour-related inputs
        const forms = document.querySelectorAll('form');
        for (const form of forms) {
            if (form.querySelector('input[placeholder*="Tour"]') || 
                form.querySelector('input[name*="title"]')) {
                return form.closest('div') || form;
            }
        }

        return null;
    }

    injectStyles() {
        if (document.getElementById('enhanced-admin-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'enhanced-admin-styles';
        styles.textContent = `
            .enhanced-admin-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .enhanced-admin-header {
                text-align: center;
                margin-bottom: 30px;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            }

            .enhanced-admin-header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 600;
            }

            .step-indicator {
                display: flex;
                justify-content: center;
                margin: 30px 0;
                gap: 20px;
            }

            .step {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                transition: all 0.3s ease;
                position: relative;
            }

            .step.active {
                background: #667eea;
                color: white;
                transform: scale(1.1);
            }

            .step.completed {
                background: #10b981;
                color: white;
            }

            .step.pending {
                background: #e5e7eb;
                color: #6b7280;
            }

            .step::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 100%;
                width: 20px;
                height: 2px;
                background: #e5e7eb;
                transform: translateY(-50%);
            }

            .step:last-child::after {
                display: none;
            }

            .form-section {
                display: none;
                background: white;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 4px 24px rgba(0,0,0,0.08);
                margin-bottom: 20px;
            }

            .form-section.active {
                display: block;
                animation: fadeInUp 0.3s ease;
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .form-group {
                margin-bottom: 24px;
            }

            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: #374151;
                font-size: 14px;
            }

            .form-group input,
            .form-group textarea,
            .form-group select {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                font-size: 14px;
                transition: all 0.2s ease;
                background: white;
            }

            .form-group input:focus,
            .form-group textarea:focus,
            .form-group select:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }

            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }

            .form-row-3 {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 20px;
            }

            .dynamic-list {
                border: 2px dashed #e5e7eb;
                border-radius: 8px;
                padding: 20px;
                margin-top: 10px;
            }

            .dynamic-item {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 12px;
                padding: 12px;
                background: #f9fafb;
                border-radius: 6px;
            }

            .dynamic-item input {
                flex: 1;
                margin: 0;
                border: 1px solid #d1d5db;
            }

            .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 14px;
            }

            .btn-primary {
                background: #667eea;
                color: white;
            }

            .btn-primary:hover {
                background: #5a67d8;
                transform: translateY(-1px);
            }

            .btn-secondary {
                background: #6b7280;
                color: white;
            }

            .btn-secondary:hover {
                background: #4b5563;
            }

            .btn-success {
                background: #10b981;
                color: white;
            }

            .btn-success:hover {
                background: #059669;
            }

            .btn-danger {
                background: #ef4444;
                color: white;
            }

            .btn-danger:hover {
                background: #dc2626;
            }

            .btn-add {
                background: #10b981;
                color: white;
                margin-top: 10px;
            }

            .navigation-buttons {
                display: flex;
                justify-content: space-between;
                margin-top: 30px;
                padding: 20px;
                background: #f9fafb;
                border-radius: 8px;
            }

            .section-title {
                font-size: 20px;
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid #e5e7eb;
            }

            .image-preview {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 15px;
                margin-top: 15px;
            }

            .image-preview-item {
                position: relative;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .image-preview-item img {
                width: 100%;
                height: 100px;
                object-fit: cover;
            }

            .image-preview-item .remove-btn {
                position: absolute;
                top: 5px;
                right: 5px;
                background: rgba(239, 68, 68, 0.9);
                color: white;
                border: none;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                cursor: pointer;
                font-size: 12px;
            }

            .preview-panel {
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                padding: 20px;
                margin-top: 20px;
            }

            .preview-panel h3 {
                margin-bottom: 15px;
                color: #1e293b;
            }

            .success-message {
                background: #dcfce7;
                border: 1px solid #bbf7d0;
                color: #166534;
                padding: 16px;
                border-radius: 8px;
                margin: 20px 0;
                display: none;
            }

            .error-message {
                background: #fef2f2;
                border: 1px solid #fecaca;
                color: #991b1b;
                padding: 16px;
                border-radius: 8px;
                margin: 20px 0;
                display: none;
            }

            @media (max-width: 768px) {
                .form-row,
                .form-row-3 {
                    grid-template-columns: 1fr;
                }

                .enhanced-admin-container {
                    padding: 10px;
                }
            }

            .form-group textarea {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                font-size: 14px;
                transition: all 0.2s ease;
                background: white;
                resize: vertical;
                min-height: 120px;
                max-height: 300px;
                overflow-y: auto !important;
                overflow-x: hidden !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
                white-space: pre-wrap !important;
                box-sizing: border-box !important;
                scrollbar-width: thin;
                scrollbar-color: #888 #f1f1f1;
                line-height: 1.5 !important;
                vertical-align: top !important;
            }

            .form-group textarea::-webkit-scrollbar {
                width: 8px;
            }

            .form-group textarea::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 4px;
            }

            .form-group textarea::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 4px;
            }

            .form-group textarea::-webkit-scrollbar-thumb:hover {
                background: #555;
            }

            .rich-text-editor {
                border: 2px solid #007bff;
                border-radius: 8px;
                background: white;
                overflow: hidden;
                margin: 8px 0;
                max-height: 400px;
                display: flex;
                flex-direction: column;
            }

            /* Specific styling for full description field */
            textarea[name="fullDescription"],
            #fullDescription,
            textarea[name="full_description"],
            #full_description {
                max-height: 300px !important;
                overflow-y: auto !important;
                overflow-x: hidden !important;
                resize: vertical !important;
                word-wrap: break-word !important;
                white-space: pre-wrap !important;
                box-sizing: border-box !important;
                scrollbar-width: thin !important;
                scrollbar-color: #888 #f1f1f1 !important;
                width: 100% !important;
                padding: 12px 16px !important;
                border: 2px solid #e5e7eb !important;
                border-radius: 8px !important;
                font-family: inherit !important;
                line-height: 1.5 !important;
                background: white !important;
            }

            /* Force text to stay within bounds */
            textarea[name="fullDescription"]:focus,
            #fullDescription:focus,
            textarea[name="full_description"]:focus,
            #full_description:focus {
                outline: none !important;
                border-color: #667eea !important;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
                overflow-y: auto !important;
                overflow-x: hidden !important;
            }

            textarea[name="fullDescription"]::-webkit-scrollbar,
            #fullDescription::-webkit-scrollbar,
            textarea[name="full_description"]::-webkit-scrollbar,
            #full_description::-webkit-scrollbar {
                width: 8px !important;
            }

            textarea[name="fullDescription"]::-webkit-scrollbar-track,
            #fullDescription::-webkit-scrollbar-track,
            textarea[name="full_description"]::-webkit-scrollbar-track,
            #full_description::-webkit-scrollbar-track {
                background: #f1f1f1 !important;
                border-radius: 4px !important;
            }

            textarea[name="fullDescription"]::-webkit-scrollbar-thumb,
            #fullDescription::-webkit-scrollbar-thumb,
            textarea[name="full_description"]::-webkit-scrollbar-thumb,
            #full_description::-webkit-scrollbar-thumb {
                background: #888 !important;
                border-radius: 4px !important;
            }

            .rich-text-content {
                max-height: 300px;
                overflow-y: auto;
                overflow-x: hidden;
                padding: 12px;
                word-wrap: break-word;
                overflow-wrap: break-word;
                white-space: pre-wrap;
                box-sizing: border-box;
                scrollbar-width: thin;
                scrollbar-color: #888 #f1f1f1;
            }

            /* FAQ-specific styling to ensure simple text inputs */
            .faq-question-input,
            .faq-answer-input {
                width: 100% !important;
                padding: 12px 16px !important;
                border: 2px solid #e5e7eb !important;
                border-radius: 8px !important;
                font-size: 14px !important;
                transition: all 0.2s ease !important;
                background: white !important;
                font-family: inherit !important;
                box-sizing: border-box !important;
                margin: 0 !important;
                resize: none !important;
            }

            .faq-question-input:focus,
            .faq-answer-input:focus {
                outline: none !important;
                border-color: #667eea !important;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
            }

            .faq-item {
                flex-direction: column !important;
                align-items: stretch !important;
                gap: 8px !important;
            }
        `;
        document.head.appendChild(styles);
    }

    replaceForm(container) {
        container.innerHTML = this.generateFormHTML();
        this.updateStepIndicator();
    }

    generateFormHTML() {
        return `
            <div class="enhanced-admin-container">
                <div class="enhanced-admin-header">
                    <h1>🏛️ Enhanced Tour Management System</h1>
                    <p>Create comprehensive tour packages with advanced features</p>
                </div>

                <div class="step-indicator">
                    <div class="step active" data-step="1">1</div>
                    <div class="step pending" data-step="2">2</div>
                    <div class="step pending" data-step="3">3</div>
                    <div class="step pending" data-step="4">4</div>
                </div>

                <div class="success-message" id="successMessage"></div>
                <div class="error-message" id="errorMessage"></div>

                <form id="enhancedTourForm">
                    <!-- Step 1: Basic Information -->
                    <div class="form-section active" data-step="1">
                        <h2 class="section-title">📋 Basic Tour Information</h2>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="title">Tour Title *</label>
                                <input type="text" id="title" name="title" placeholder="e.g., Grand Tunisia Adventure" required>
                            </div>
                            <div class="form-group">
                                <label for="type">Tour Type *</label>
                                <select id="type" name="type" required>
                                    <option value="">Select Type</option>
                                    <option value="private">Private Tour</option>
                                    <option value="group">Group Tour</option>
                                    <option value="custom">Custom Tour</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="description">Short Description *</label>
                            <textarea id="description" name="description" rows="4" placeholder="Brief overview of the tour experience..." required></textarea>
                        </div>

                        <div class="form-row-3">
                            <div class="form-group">
                                <label for="city">Location/City *</label>
                                <select id="city" name="city" required>
                                    <option value="">Select City</option>
                                    <option value="Tunis">Tunis</option>
                                    <option value="Sfax">Sfax</option>
                                    <option value="Sousse">Sousse</option>
                                    <option value="Kairouan">Kairouan</option>
                                    <option value="Bizerte">Bizerte</option>
                                    <option value="Gabès">Gabès</option>
                                    <option value="Ariana">Ariana</option>
                                    <option value="Gafsa">Gafsa</option>
                                    <option value="Kasserine">Kasserine</option>
                                    <option value="Monastir">Monastir</option>
                                    <option value="Hammamet">Hammamet</option>
                                    <option value="Nabeul">Nabeul</option>
                                    <option value="Djerba">Djerba</option>
                                    <option value="Douz">Douz</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="duration">Duration (days) *</label>
                                <input type="number" id="duration" name="duration" min="1" max="30" required>
                            </div>
                            <div class="form-group">
                                <label for="price">Price (USD) *</label>
                                <input type="number" id="price" name="price" min="0" step="0.01" required>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="difficulty">Difficulty Level</label>
                                <select id="difficulty" name="difficulty_level">
                                    <option value="easy">Easy</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="challenging">Challenging</option>
                                    <option value="expert">Expert</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="accommodation">Accommodation Type</label>
                                <select id="accommodation" name="accommodation">
                                    <option value="Economy">Economy</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Luxury">Luxury</option>
                                    <option value="Camping">Camping</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Step 2: Media & Content -->
                    <div class="form-section" data-step="2">
                        <h2 class="section-title">🖼️ Media & Visual Content</h2>

                        <div class="form-group">
                            <label>Tour Images</label>
                            <div class="dynamic-list" id="imagesList">
                                <div class="dynamic-item">
                                    <input type="url" placeholder="Enter image URL" class="image-url-input">
                                    <button type="button" class="btn btn-success" onclick="tourAdmin.addImageUrl()">Add</button>
                                </div>
                            </div>
                            <div class="image-preview" id="imagePreview"></div>
                        </div>

                        <div class="form-group">
                            <label for="fullDescription">Detailed Description</label>
                            <textarea id="fullDescription" name="fullDescription" rows="8" placeholder="Comprehensive tour description, history, what to expect, cultural insights..."></textarea>
                        </div>

                        <div class="form-group">
                            <label>Tour Highlights</label>
                            <div class="dynamic-list" id="highlightsList">
                                <div class="dynamic-item">
                                    <input type="text" placeholder="Enter highlight" class="highlight-input">
                                    <button type="button" class="btn btn-success" onclick="tourAdmin.addHighlight()">Add</button>
                                </div>
                            </div>
                            <div id="highlightsDisplay"></div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>What's Included</label>
                                <div class="dynamic-list" id="includedList">
                                    <div class="dynamic-item">
                                        <input type="text" placeholder="Enter included item" class="included-input">
                                        <button type="button" class="btn btn-success" onclick="tourAdmin.addIncluded()">Add</button>
                                    </div>
                                </div>
                                <div id="includedDisplay"></div>
                            </div>
                            <div class="form-group">
                                <label>What's Not Included</label>
                                <div class="dynamic-list" id="notIncludedList">
                                    <div class="dynamic-item">
                                        <input type="text" placeholder="Enter not included item" class="notincluded-input">
                                        <button type="button" class="btn btn-success" onclick="tourAdmin.addNotIncluded()">Add</button>
                                    </div>
                                </div>
                                <div id="notIncludedDisplay"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3: Detailed Configuration -->
                    <div class="form-section" data-step="3">
                        <h2 class="section-title">⚙️ Tour Configuration</h2>

                        <!-- Itinerary Section -->
                        <div class="form-group">
                            <label>📍 Itinerary</label>
                            <div class="itinerary-builder">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="pickupLocation">Pickup Location *</label>
                                        <input type="text" id="pickupLocation" name="pickup_location" placeholder="e.g., Hotel lobby, Airport terminal" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="arriveBackAt">Arrive Back At *</label>
                                        <input type="text" id="arriveBackAt" name="arrive_back_at" placeholder="e.g., Same as pickup location" required>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Main Stops</label>
                                    <div class="dynamic-list" id="mainStopsList">
                                        <div class="dynamic-item">
                                            <input type="text" placeholder="Enter main stop" class="mainstop-input">
                                            <button type="button" class="btn btn-success" onclick="tourAdmin.addMainStop()">Add Stop</button>
                                        </div>
                                    </div>
                                    <div id="mainStopsDisplay"></div>
                                </div>

                                <div class="form-group">
                                    <label for="googleMapsLink">Google Maps Itinerary Link</label>
                                    <input type="url" id="googleMapsLink" name="google_maps_link" placeholder="https://maps.google.com/...">
                                    <small class="text-muted">Paste Google Maps link showing the complete itinerary route</small>
                                </div>
                            </div>
                        </div>

                        <!-- Not Suitable For Section -->
                        <div class="form-group">
                            <label>⚠️ Not Suitable For</label>
                            <div class="dynamic-list" id="notSuitableList">
                                <div class="dynamic-item">
                                    <input type="text" placeholder="e.g., Pregnant women, Children under 5" class="notsuitable-input">
                                    <button type="button" class="btn btn-success" onclick="tourAdmin.addNotSuitableItem()">Add</button>
                                </div>
                            </div>
                            <div id="notSuitableDisplay"></div>
                        </div>

                        <!-- Full Description Section -->
                        <div class="form-group">
                            <label for="fullDescriptionDetail">📝 Full Description (for product page)</label>
                            <textarea id="fullDescriptionDetail" name="full_description" rows="6" placeholder="Comprehensive description with history, cultural insights, what to expect..."></textarea>
                            <small class="text-muted">This detailed description will appear on the individual tour page</small>
                        </div>

                        <!-- Reviews Section -->
                        <div class="form-row">
                            <div class="form-group">
                                <label for="reviewsLink">⭐ GetYourGuide Reviews Link</label>
                                <input type="url" id="reviewsLink" name="getyourguide_reviews_link" placeholder="https://www.getyourguide.com/...">
                                <small class="text-muted">Link to GetYourGuide page to import 5-star reviews</small>
                            </div>
                            <div class="form-group">
                                <label for="tripadvisorLink">🏆 TripAdvisor Reviews Link</label>
                                <input type="url" id="tripadvisorLink" name="tripadvisor_reviews_link" placeholder="https://www.tripadvisor.com/...">
                                <small class="text-muted">Link to TripAdvisor reviews page</small>
                            </div>
                        </div>

                        <!-- FAQ Section -->
                        <div class="form-group">
                            <label>❓ Frequently Asked Questions</label>
                            <div class="faq-builder">
                                <div class="dynamic-list" id="faqList">
                                    <div class="dynamic-item faq-item" style="flex-direction: column; align-items: stretch;">
                                        <input type="text" placeholder="Enter question" class="faq-question-input" style="margin-bottom: 8px; width: 100%;">
                                        <input type="text" placeholder="Enter answer" class="faq-answer-input" style="margin-bottom: 8px; width: 100%;">
                                        <button type="button" class="btn btn-success" onclick="tourAdmin.addFAQ()" style="width: auto; align-self: flex-start;">Add FAQ</button>
                                    </div>
                                </div>
                                <div id="faqDisplay"></div>
                            </div>
                        </div>

                        <!-- Payment Link Section -->
                        <div class="form-group">
                            <label for="paymentLink">💳 Payment Gateway Link</label>
                            <input type="url" id="paymentLink" name="payment_link" placeholder="https://payment-gateway.com/...">
                            <small class="text-muted">Direct link to payment gateway for this specific tour</small>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="groupSizeMin">Minimum Group Size</label>
                                <input type="number" id="groupSizeMin" name="group_size_min" min="1" value="1">
                            </div>
                            <div class="form-group">
                                <label for="groupSizeMax">Maximum Group Size</label>
                                <input type="number" id="groupSizeMax" name="group_size_max" min="1" value="50">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="ageRestrictions">Age Restrictions</label>
                            <textarea id="ageRestrictions" name="age_restrictions" rows="3" placeholder="e.g., Not suitable for children under 5, pregnant women, people with heart conditions..."></textarea>
                        </div>

                        <div class="form-group">
                            <label>Amenities & Features</label>
                            <div class="dynamic-list" id="amenitiesList">
                                <div class="dynamic-item">
                                    <input type="text" placeholder="Enter amenity" class="amenity-input">
                                    <button type="button" class="btn btn-success" onclick="tourAdmin.addAmenity()">Add</button>
                                </div>
                            </div>
                            <div id="amenitiesDisplay"></div>
                        </div>

                        <div class="form-group">
                            <label for="bookingPolicies">Booking Policies</label>
                            <textarea id="bookingPolicies" name="booking_policies" rows="4" placeholder="Booking terms, payment policies, confirmation requirements..."></textarea>
                        </div>

                        <div class="form-group">
                            <label for="cancellationPolicy">Cancellation Policy</label>
                            <textarea id="cancellationPolicy" name="cancellation_policy" rows="4" placeholder="Cancellation terms, refund policies, time limits..."></textarea>
                        </div>
                    </div>

                    <!-- Step 4: SEO & Advanced -->
                    <div class="form-section" data-step="4">
                        <h2 class="section-title">🚀 SEO & Advanced Settings</h2>

                        <div class="form-group">
                            <label for="metaTitle">SEO Title</label>
                            <input type="text" id="metaTitle" name="meta_title" maxlength="60" placeholder="SEO optimized title (60 chars max)">
                            <small>Characters: <span id="metaTitleCount">0</span>/60</small>
                        </div>

                        <div class="form-group">
                            <label for="metaDescription">SEO Description</label>
                            <textarea id="metaDescription" name="meta_description" maxlength="160" rows="3" placeholder="SEO meta description (160 chars max)"></textarea>
                            <small>Characters: <span id="metaDescCount">0</span>/160</small>
                        </div>

                        <div class="form-group">
                            <label>Tags</label>
                            <div class="dynamic-list" id="tagsList">
                                <div class="dynamic-item">
                                    <input type="text" placeholder="Enter tag" class="tag-input">
                                    <button type="button" class="btn btn-success" onclick="tourAdmin.addTag()">Add</button>
                                </div>
                            </div>
                            <div id="tagsDisplay"></div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="rating">Tour Rating</label>
                                <input type="number" id="rating" name="rating" min="1" max="5" step="0.1" value="4.5">
                            </div>
                            <div class="form-group">
                                <label for="languages">Available Languages</label>
                                <select id="languages" name="languages" multiple>
                                    <option value="English">English</option>
                                    <option value="French">French</option>
                                    <option value="Arabic">Arabic</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="Italian">Italian</option>
                                    <option value="German">German</option>
                                </select>
                            </div>
                        </div>

                        <div class="preview-panel">
                            <h3>📋 Tour Preview</h3>
                            <div id="tourPreview"></div>
                        </div>
                    </div>

                    <div class="navigation-buttons">
                        <button type="button" class="btn btn-secondary" id="prevBtn" onclick="tourAdmin.prevStep()">Previous</button>
                        <button type="button" class="btn btn-primary" id="nextBtn" onclick="tourAdmin.nextStep()">Next</button>
                        <button type="submit" class="btn btn-success" id="submitBtn" style="display: none;">Create Tour</button>
                    </div>
                </form>
            </div>
        `;
    }

    // Navigation methods
    nextStep() {
        if (this.validateCurrentStep()) {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateStepDisplay();
            }
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStepDisplay();
        }
    }

    updateStepDisplay() {
        // Hide all sections
        document.querySelectorAll('.form-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show current section
        document.querySelector(`[data-step="${this.currentStep}"]`).classList.add('active');

        this.updateStepIndicator();
        this.updateNavigationButtons();

        if (this.currentStep === 4) {
            this.updatePreview();
        }
    }

    updateStepIndicator() {
        document.querySelectorAll('.step').forEach((step, index) => {
            const stepNum = index + 1;
            step.classList.remove('active', 'completed', 'pending');

            if (stepNum < this.currentStep) {
                step.classList.add('completed');
            } else if (stepNum === this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.add('pending');
            }
        });
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');

        prevBtn.style.display = this.currentStep === 1 ? 'none' : 'block';
        nextBtn.style.display = this.currentStep === this.totalSteps ? 'none' : 'block';
        submitBtn.style.display = this.currentStep === this.totalSteps ? 'block' : 'none';
    }

    validateCurrentStep() {
        const currentSection = document.querySelector(`[data-step="${this.currentStep}"]`);
        const requiredFields = currentSection.querySelectorAll('[required]');

        for (const field of requiredFields) {
            if (!field.value.trim()) {
                this.showError(`Please fill in the required field: ${field.previousElementSibling.textContent}`);
                field.focus();
                return false;
            }
        }
        return true;
    }

    // Dynamic list methods
    addImageUrl() {
        const input = document.querySelector('.image-url-input');
        const url = input.value.trim();

        if (url && this.isValidUrl(url)) {
            this.imageUrls.push(url);
            this.updateImagePreview();
            input.value = '';
        } else {
            this.showError('Please enter a valid image URL');
        }
    }

    addHighlight() {
        this.addToList('highlight', 'highlights');
    }

    addIncluded() {
        this.addToList('included', 'included');
    }

    addNotIncluded() {
        this.addToList('notincluded', 'notIncluded');
    }

    addAmenity() {
        this.addToList('amenity', 'amenities');
    }

    addTag() {
        this.addToList('tag', 'tags');
    }

    addMainStop() {
        this.addToList('mainstop', 'mainStops');
    }

    addNotSuitableItem() {
        this.addToList('notsuitable', 'notSuitableFor');
    }

    addFAQ() {
        const questionInput = document.querySelector('.faq-question-input');
        const answerInput = document.querySelector('.faq-answer-input');
        const question = questionInput.value.trim();
        const answer = answerInput.value.trim();

        if (question && answer) {
            if (!this.faq) this.faq = [];
            this.faq.push({ question, answer });
            this.updateFAQDisplay();
            questionInput.value = '';
            answerInput.value = '';
        }
    }

    updateFAQDisplay() {
        const container = document.getElementById('faqDisplay');
        container.innerHTML = this.faq.map((item, index) => `
            <div style="background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #667eea;">
                <div style="font-weight: 600; margin-bottom: 8px;">${item.question}</div>
                <div style="color: #666; margin-bottom: 10px;">${item.answer}</div>
                <button type="button" onclick="tourAdmin.removeFAQ(${index})" style="background: #ef4444; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 12px; cursor: pointer;">Remove</button>
            </div>
        `).join('');
    }

    removeFAQ(index) {
        this.faq.splice(index, 1);
        this.updateFAQDisplay();
    }

    addToList(inputClass, arrayName) {
        const input = document.querySelector(`.${inputClass}-input`);
        const value = input.value.trim();

        if (value && !this[arrayName].includes(value)) {
            this[arrayName].push(value);
            this.updateDisplay(arrayName);
            input.value = '';
        }
    }

    updateDisplay(arrayName) {
        const displayId = arrayName === 'highlights' ? 'highlightsDisplay' :
                         arrayName === 'included' ? 'includedDisplay' :
                         arrayName === 'notIncluded' ? 'notIncludedDisplay' :
                         arrayName === 'amenities' ? 'amenitiesDisplay' :
                         'tagsDisplay';

        const container = document.getElementById(displayId);
        container.innerHTML = this[arrayName].map((item, index) => `
            <span style="display: inline-block; background: #e0f2fe; padding: 6px 12px; margin: 4px; border-radius: 20px; font-size: 12px;">
                ${item}
                <button type="button" onclick="tourAdmin.removeFromList('${arrayName}', ${index})" style="border: none; background: none; margin-left: 8px; color: #ef4444; cursor: pointer;">×</button>
            </span>
        `).join('');
    }

    removeFromList(arrayName, index) {
        this[arrayName].splice(index, 1);
        this.updateDisplay(arrayName);

        if (arrayName === 'imageUrls') {
            this.updateImagePreview();
        }
    }

    updateImagePreview() {
        const container = document.getElementById('imagePreview');
        container.innerHTML = this.imageUrls.map((url, index) => `
            <div class="image-preview-item">
                <img src="${url}" alt="Tour image ${index + 1}" onerror="this.style.display='none'">
                <button type="button" class="remove-btn" onclick="tourAdmin.removeFromList('imageUrls', ${index})">×</button>
            </div>
        `).join('');
    }

    updatePreview() {
        const formData = new FormData(document.getElementById('enhancedTourForm'));
        const preview = document.getElementById('tourPreview');

        preview.innerHTML = `
            <div style="padding: 20px; background: white; border-radius: 8px;">
                <h3>${formData.get('title') || 'Tour Title'}</h3>
                <p><strong>Type:</strong> ${formData.get('type') || 'Not specified'}</p>
                <p><strong>Location:</strong> ${formData.get('city') || 'Not specified'}</p>
                <p><strong>Duration:</strong> ${formData.get('duration') || 'Not specified'} days</p>
                <p><strong>Price:</strong> €${formData.get('price') || '0'}</p>
                <p><strong>Images:</strong> ${this.imageUrls.length} images</p>
                <p><strong>Highlights:</strong> ${this.highlights.length} items</p>
                <p><strong>Amenities:</strong> ${this.amenities.length} items</p>
                <p><strong>Tags:</strong> ${this.tags.length} tags</p>
            </div>
        `;
    }

    bindEvents() {
        // Form submission
        document.getElementById('enhancedTourForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });

        // Character counters
        document.getElementById('metaTitle').addEventListener('input', (e) => {
            document.getElementById('metaTitleCount').textContent = e.target.value.length;
        });

        document.getElementById('metaDescription').addEventListener('input', (e) => {
            document.getElementById('metaDescCount').textContent = e.target.value.length;
        });

        // Enter key handling for dynamic inputs
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('image-url-input')) {
                e.preventDefault();
                this.addImageUrl();
            }
        });

        // Initialize rich text editors for description fields
        setTimeout(() => {
            this.initializeRichTextEditors();
        }, 500);
    }

    initializeRichTextEditors() {
        // Initialize rich text editors only for description fields (explicitly exclude FAQ fields)
        const editorIds = ['description', 'fullDescription', 'fullDescriptionDetail'];
        
        // Explicitly exclude FAQ inputs from any rich text processing
        const excludeSelectors = ['.faq-question-input', '.faq-answer-input', 'input[class*="faq"]'];

        editorIds.forEach(id => {
            const textarea = document.getElementById(id);
            
            // Skip if element is FAQ-related
            if (textarea && textarea.classList.contains('faq-question-input') || 
                textarea && textarea.classList.contains('faq-answer-input')) {
                return;
            }
            
            if (textarea && !textarea.classList.contains('rich-text-initialized')) {
                textarea.classList.add('rich-text-initialized');

                // Check if RichTextEditor class is available
                if (window.RichTextEditor) {
                    new window.RichTextEditor('rich-text-container', id);
                } else {
                    // Load and initialize rich text editor
                    this.loadRichTextEditor(id);
                }
            }
        });
    }

    loadRichTextEditor(textareaId) {
        // Inline rich text editor implementation
        const textarea = document.getElementById(textareaId);
        if (!textarea) return;

        const container = document.createElement('div');
        container.className = 'rich-text-container';
        container.style.cssText = `
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            background: white;
            margin-bottom: 1rem;
        `;

        container.innerHTML = `
            <div class="rich-text-toolbar" style="
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 12px;
                background: #f8f9fa;
                border-bottom: 1px solid #ddd;
                border-radius: 6px 6px 0 0;
                flex-wrap: wrap;
            ">
                <div class="toolbar-group" style="display: flex; align-items: center; gap: 4px;">
                    <button type="button" class="toolbar-btn" data-command="bold" title="Bold" style="
                        background: white; border: 1px solid #ddd; border-radius: 4px; padding: 6px 10px;
                        cursor: pointer; font-weight: bold; min-width: 32px; height: 32px;
                    ">B</button>
                    <button type="button" class="toolbar-btn" data-command="italic" title="Italic" style="
                        background: white; border: 1px solid #ddd; border-radius: 4px; padding: 6px 10px;
                        cursor: pointer; font-style: italic; min-width: 32px; height: 32px;
                    ">I</button>
                    <button type="button" class="toolbar-btn" data-command="underline" title="Underline" style="
                        background: white; border: 1px solid #ddd; border-radius: 4px; padding: 6px 10px;
                        cursor: pointer; text-decoration: underline; min-width: 32px; height: 32px;
                    ">U</button>
                </div>

                <div style="width: 1px; height: 20px; background: #ddd; margin: 0 8px;"></div>

                <div class="toolbar-group" style="display: flex; align-items: center; gap: 4px;">
                    <select class="toolbar-select" data-command="fontSize" title="Font Size" style="
                        padding: 6px 8px; border: 1px solid #ddd; border-radius: 4px; background: white; font-size: 14px; height: 32px;
                    ">
                        <option value="">Size</option>
                        <option value="1">Small</option>
                        <option value="3">Normal</option>
                        <option value="5">Large</option>
                        <option value="7">Extra Large</option>
                    </select>
                    <input type="color" class="toolbar-color" data-command="foreColor" title="Text Color" value="#000000" style="
                        width: 32px; height: 32px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; background: white;
                    ">
                </div>

                <div style="width: 1px; height: 20px; background: #ddd; margin: 0 8px;"></div>

                <div class="toolbar-group" style="display: flex; align-items: center; gap: 4px;">
                    <button type="button" class="toolbar-btn" data-command="justifyLeft" title="Align Left" style="
                        background: white; border: 1px solid #ddd; border-radius: 4px; padding: 6px 10px;
                        cursor: pointer; min-width: 32px; height: 32px;
                    ">⬅</button>
                    <button type="button" class="toolbar-btn" data-command="justifyCenter" title="Align Center" style="
                        background: white; border: 1px solid #ddd; border-radius: 4px; padding: 6px 10px;
                        cursor: pointer; min-width: 32px; height: 32px;
                    ">↔</button>
                    <button type="button" class="toolbar-btn" data-command="justifyRight" title="Align Right" style="
                        background: white; border: 1px solid #ddd; border-radius: 4px; padding: 6px 10px;
                        cursor: pointer; min-width: 32px; height: 32px;
                    ">➡</button>
                </div>

                <div style="width: 1px; height: 20px; background: #ddd; margin: 0 8px;"></div>

                <div class="toolbar-group" style="display: flex; align-items: center; gap: 4px;">
                    <button type="button" class="toolbar-btn" data-command="createLink" title="Insert Link" style="
                        background: white; border: 1px solid #ddd; border-radius: 4px; padding: 6px 10px;
                        cursor: pointer; min-width: 32px; height: 32px;
                    ">🔗</button>
                    <button type="button" class="toolbar-btn" data-command="unlink" title="Remove Link" style="
                        background: white; border: 1px solid #ddd; border-radius: 4px; padding: 6px 10px;
                        cursor: pointer; min-width: 32px; height: 32px;
                    ">🔓</button>
                </div>
            </div>

            <div class="rich-text-editor" contenteditable="true" id="${textareaId}_editor" style="
                min-height: 200px; padding: 15px; outline: none;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 16px; line-height: 1.6; border-radius: 0 0 6px 6px;
            ">
                ${textarea.value || '<p>Write your detailed description here...</p>'}
            </div>
        `;

        textarea.style.display = 'none';
        textarea.parentNode.insertBefore(container, textarea);

        // Bind editor events
        this.bindRichTextEvents(textareaId);
    }

    bindRichTextEvents(textareaId) {
        const editor = document.getElementById(`${textareaId}_editor`);
        const textarea = document.getElementById(textareaId);
        const toolbar = editor.parentNode.querySelector('.rich-text-toolbar');

        if (!editor || !textarea || !toolbar) return;

        // Toolbar button clicks
        toolbar.addEventListener('click', (e) => {
            if (e.target.closest('.toolbar-btn')) {
                e.preventDefault();
                const btn = e.target.closest('.toolbar-btn');
                const command = btn.dataset.command;

                if (command === 'createLink') {
                    const url = prompt('Enter the URL:', 'https://');
                    if (url && url !== 'https://') {
                        const linkText = prompt('Enter link text:', 'Click here');
                        if (linkText) {
                            const link = `<a href="${url}" style="color: #007bff; text-decoration: underline;">${linkText}</a>`;
                            document.execCommand('insertHTML', false, link);
                        }
                    }
                } else {
                    document.execCommand(command, false, null);
                }

                editor.focus();
                this.syncEditorContent(textareaId);
            }
        });

        // Select and input changes
        toolbar.addEventListener('change', (e) => {
            if (e.target.classList.contains('toolbar-select')) {
                const command = e.target.dataset.command;
                const value = e.target.value;

                if (value) {
                    document.execCommand(command, false, value);
                    e.target.value = '';
                }

                editor.focus();
                this.syncEditorContent(textareaId);
            }
        });

        toolbar.addEventListener('input', (e) => {
            if (e.target.classList.contains('toolbar-color')) {
                const command = e.target.dataset.command;
                const color = e.target.value;

                document.execCommand(command, false, color);
                editor.focus();
                this.syncEditorContent(textareaId);
            }
        });

        // Editor content changes
        editor.addEventListener('input', () => {
            this.syncEditorContent(textareaId);
        });

        // Initial sync
        this.syncEditorContent(textareaId);
    }

    syncEditorContent(textareaId) {
        const editor = document.getElementById(`${textareaId}_editor`);
        const textarea = document.getElementById(textareaId);

        if (editor && textarea) {
            textarea.value = editor.innerHTML;
        }
    }

    async submitForm() {
        if (!this.validateCurrentStep()) return;

        const formData = new FormData(document.getElementById('enhancedTourForm'));
        const submitBtn = document.getElementById('submitBtn');

        // Prepare tour data
        const tourData = {
            title: formData.get('title'),
            description: formData.get('description'),
            duration: parseInt(formData.get('duration')),
            price: parseFloat(formData.get('price')),
            images: this.imageUrls,
            type: formData.get('type'),
            city: formData.get('city'),
            rating: parseFloat(formData.get('rating')) || 4.5,
            accommodation: formData.get('accommodation'),
            highlights: this.highlights,
            included: this.included,
            notIncluded: this.notIncluded,
            languages: Array.from(document.getElementById('languages').selectedOptions).map(opt => opt.value),
            difficulty_level: formData.get('difficulty_level'),
            group_size_min: parseInt(formData.get('group_size_min')) || 1,
            group_size_max: parseInt(formData.get('group_size_max')) || 50,
            age_restrictions: formData.get('age_restrictions'),
            amenities: this.amenities,
            booking_policies: formData.get('booking_policies'),
            cancellation_policy: formData.get('cancellation_policy'),
            meta_title: formData.get('meta_title'),
            meta_description: formData.get('meta_description'),
            tags: this.tags,
            pickup_location: formData.get('pickup_location'),
            arrive_back_at: formData.get('arrive_back_at'),
            main_stops: this.mainStops,
            google_maps_link: formData.get('google_maps_link'),
            not_suitable_for: this.notSuitableFor,
            full_description: formData.get('full_description'),
            getyourguide_reviews_link: formData.get('getyourguide_reviews_link'),
            tripadvisor_reviews_link: formData.get('tripadvisor_reviews_link'),
            faq: this.faq,
            payment_link: formData.get('payment_link')
        };

        // Show loading state
        submitBtn.textContent = 'Creating Tour...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/tours/enhanced', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tourData)
            });

            const result = await response.json();

            if (response.ok) {
                const phpPageInfo = result.php_page ? ` PHP page: ${result.php_page}` : '';
                this.showSuccess(`Tour created successfully! Tour ID: ${result.id}.${phpPageInfo} The page is available at /prodpage/${result.php_page || `tour-${result.id}.php`}`);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                this.showError(result.error || 'Failed to create tour');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showError('Network error occurred');
        } finally {
            submitBtn.textContent = 'Create Tour';
            submitBtn.disabled = false;
        }
    }

    showSuccess(message) {
        const successEl = document.getElementById('successMessage');
        successEl.textContent = message;
        successEl.style.display = 'block';
        setTimeout(() => successEl.style.display = 'none', 5000);
    }

    showError(message) {
        const errorEl = document.getElementById('errorMessage');
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        setTimeout(() => errorEl.style.display = 'none', 5000);
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
}

// Initialize the enhanced admin
window.tourAdmin = new EnhancedTourAdmin();

// Make methods globally accessible
window.tourAdmin = window.tourAdmin;