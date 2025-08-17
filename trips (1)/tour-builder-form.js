/**
 * Tour Builder Form for Build Page
 * Transforms the Build page into a comprehensive day-by-day tour planning interface
 */

class TourBuilderForm {
    constructor() {
        this.days = [];
        this.currentDayIndex = 0;
        this.tunisianCities = [
            'Tunis', 'Carthage', 'Sidi Bou Said', 'Nabeul', 'Hammamet', 'Sousse', 'Monastir', 'Mahdia', 'Sfax',
            'Chenini Oasis', 'Toujane', 'Tozeur', 'Matmata', 'Medenine', 'Djerba Island',
            'Zarzis', 'Tataouine'
        ];
        
        this.accommodationTypes = [
            'Economy', 'Standard', 'Luxury', 'Villa + Pool', 'Apartment', 'Camping', 'No Accommodation'
        ];
        
        this.transportationOptions = [
            'Berline', 'Suv', 'Microbus', 'MiniVan', 'Bus'
        ];
        
        this.guideLanguages = [
            'English', 'French', 'German', 'Italian', 'Spanish', 'Arabic', 'No Guide'
        ];
        
        this.mealOptions = [
            'Breakfast Only', 'Half Board', 'Full Board', 'All Inclusive Soft', 
            'All Inclusive + Alcohol', 'No Meals'
        ];
        
        this.activities = [
            { name: 'Jet Ski', icon: '🚤', description: 'Thrilling water sport experience' },
            { name: 'Parachuting', icon: '🪂', description: 'Skydiving adventure' },
            { name: 'Pirate Ship', icon: '🏴‍☠️', description: 'Themed boat excursion' },
            { name: 'Quad', icon: '🏍️', description: 'Off-road quad biking' },
            { name: 'Buggy', icon: '🏜️', description: 'Desert buggy rides' },
            { name: 'Scuba Diving', icon: '🤿', description: 'Underwater exploration' },
            { name: 'Dolphin Search', icon: '🐬', description: 'Marine wildlife watching' },
            { name: 'Camel Ride', icon: '🐪', description: 'Traditional desert transport' },
            { name: 'Horse Ride', icon: '🐎', description: 'Horseback riding adventure' },
            { name: 'Desert Safari', icon: '🏜️', description: 'Desert exploration adventure' },
            { name: 'Boat Trip', icon: '⛵', description: 'Scenic boat excursions' },
            { name: 'Cultural Tours', icon: '🏛️', description: 'Historical and cultural sites' },
            { name: 'Beach Activities', icon: '🏖️', description: 'Beach and coastal activities' },
            { name: 'Market Tours', icon: '🛍️', description: 'Traditional markets and shopping' }
        ];
        
        this.init();
    }
    
    init() {
        // Wait for the page to load and inject the tour builder
        setTimeout(() => {
            this.injectTourBuilder();
        }, 1000);
        
        // Keep checking if we're on the build page
        setInterval(() => {
            if (window.location.pathname.includes('/build') && !document.querySelector('.tour-builder-container')) {
                this.injectTourBuilder();
            }
        }, 2000);
    }
    
    injectTourBuilder() {
        // Look for the budget section to inject after it
        const budgetSection = this.findBudgetSection();
        if (!budgetSection) {
            console.log('Budget section not found, retrying...');
            return;
        }
        
        // Check if tour builder already exists
        if (document.querySelector('.tour-builder-container')) {
            return;
        }
        
        console.log('✅ Injecting Tour Builder Form');
        
        // Inject CSS styles
        this.injectStyles();
        
        // Create and inject the tour builder
        const tourBuilderContainer = this.createTourBuilderHTML();
        budgetSection.insertAdjacentElement('afterend', tourBuilderContainer);
        
        // Initialize first day
        this.addDay();
        
        // Bind events
        this.bindEvents();
    }
    
    findBudgetSection() {
        // Look for the budget section in various ways
        const selectors = [
            '[class*="Budget"]',
            '[class*="budget"]',
            'h2:contains("Budget")',
            'div:contains("Budget per Person")',
            '[class*="card"]:has([placeholder*="amount"])',
            '[class*="card"]:has([type="number"])'
        ];
        
        for (const selector of selectors) {
            if (selector.includes(':contains') || selector.includes(':has')) {
                // Use a different approach for pseudo-selectors
                const elements = document.querySelectorAll('*');
                for (const el of elements) {
                    if (el.textContent && el.textContent.includes('Budget')) {
                        const card = el.closest('[class*="card"]') || el.closest('div[class*="p-"]');
                        if (card) return card;
                    }
                }
            } else {
                const element = document.querySelector(selector);
                if (element) {
                    return element.closest('[class*="card"]') || element.parentElement;
                }
            }
        }
        
        // Fallback: look for number input (budget field)
        const numberInput = document.querySelector('input[type="number"]');
        if (numberInput) {
            return numberInput.closest('[class*="card"]') || numberInput.closest('div[class*="p-"]');
        }
        
        return null;
    }
    
    injectStyles() {
        if (document.querySelector('#tour-builder-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'tour-builder-styles';
        style.textContent = `
            .tour-builder-container {
                background: white;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
                margin: 24px 0;
                padding: 24px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            
            .tour-builder-header {
                margin-bottom: 24px;
                text-align: center;
            }
            
            .tour-builder-title {
                font-size: 24px;
                font-weight: 600;
                color: #1a202c;
                margin-bottom: 8px;
            }
            
            .tour-builder-subtitle {
                color: #64748b;
                font-size: 16px;
            }
            
            .day-container {
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                padding: 24px;
                margin-bottom: 16px;
                background: #f8fafc;
                transition: all 0.3s ease;
            }
            
            .day-container.collapsed {
                padding: 12px 24px;
                background: #f1f5f9;
            }
            
            .day-header {
                display: flex;
                justify-content: between;
                align-items: center;
                margin-bottom: 20px;
            }
            
            .day-title {
                font-size: 20px;
                font-weight: 600;
                color: #0073e6;
                margin: 0;
            }
            
            .day-controls {
                display: flex;
                gap: 8px;
            }
            
            .form-section {
                margin-bottom: 20px;
            }
            
            .form-label {
                display: block;
                font-weight: 500;
                margin-bottom: 8px;
                color: #374151;
            }
            
            .dropdown-button {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid #e2e8f0;
                border-radius: 6px;
                background: white;
                color: #374151;
                font-size: 14px;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all 0.2s ease;
            }
            
            .dropdown-button:hover {
                border-color: #0073e6;
                background: #f8fafc;
            }
            
            .dropdown-button.active {
                border-color: #0073e6;
                background: #eff6ff;
            }
            
            .dropdown-content {
                display: none;
                position: absolute;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                max-height: 200px;
                overflow-y: auto;
                width: 100%;
                margin-top: 4px;
            }
            
            .dropdown-content.show {
                display: block;
            }
            
            .dropdown-item {
                padding: 12px 16px;
                cursor: pointer;
                border-bottom: 1px solid #f1f5f9;
                transition: background 0.2s ease;
            }
            
            .dropdown-item:hover {
                background: #f8fafc;
            }
            
            .dropdown-item:last-child {
                border-bottom: none;
            }
            
            .note-input {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                margin-top: 8px;
                font-size: 14px;
                resize: vertical;
                min-height: 60px;
            }
            
            .note-input:focus {
                outline: none;
                border-color: #0073e6;
                box-shadow: 0 0 0 3px rgba(0,115,230,0.1);
            }
            
            .checkbox-section {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                margin-bottom: 8px;
            }
            
            .checkbox-input {
                width: 18px;
                height: 18px;
                accent-color: #0073e6;
                margin-top: 2px;
            }
            
            .checkbox-label {
                font-size: 14px;
                color: #374151;
                line-height: 1.4;
            }
            
            .activities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 12px;
                margin-top: 12px;
            }
            
            .activity-card {
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                padding: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
                background: white;
            }
            
            .activity-card:hover {
                border-color: #0073e6;
                background: #f8fafc;
            }
            
            .activity-card.selected {
                border-color: #0073e6;
                background: #eff6ff;
            }
            
            .activity-icon {
                font-size: 24px;
                margin-bottom: 8px;
                display: block;
            }
            
            .activity-name {
                font-weight: 500;
                margin-bottom: 4px;
                color: #374151;
            }
            
            .activity-description {
                font-size: 12px;
                color: #64748b;
            }
            
            .selected-activities {
                margin-top: 12px;
                padding: 12px;
                background: #eff6ff;
                border-radius: 6px;
            }
            
            .selected-activities-title {
                font-weight: 500;
                margin-bottom: 8px;
                color: #0073e6;
            }
            
            .selected-activity-tag {
                display: inline-block;
                background: #0073e6;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                margin: 2px 4px 2px 0;
            }
            
            .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                display: inline-flex;
                align-items: center;
                gap: 8px;
            }
            
            .btn-primary {
                background: #0073e6;
                color: white;
            }
            
            .btn-primary:hover {
                background: #005bb5;
            }
            
            .btn-secondary {
                background: #f1f5f9;
                color: #374151;
                border: 1px solid #e2e8f0;
            }
            
            .btn-secondary:hover {
                background: #e2e8f0;
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
            
            .day-summary {
                padding: 16px;
                background: #f8fafc;
                border-radius: 8px;
                border-left: 4px solid #0073e6;
            }
            
            .day-summary-title {
                font-weight: 600;
                color: #0073e6;
                margin-bottom: 8px;
            }
            
            .day-summary-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 4px;
                font-size: 14px;
            }
            
            .day-summary-label {
                color: #64748b;
            }
            
            .day-summary-value {
                color: #374151;
                font-weight: 500;
            }
            
            .add-day-section {
                text-align: center;
                margin-top: 24px;
                padding-top: 24px;
                border-top: 2px dashed #e2e8f0;
            }
            
            .form-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
            }
            
            @media (max-width: 768px) {
                .form-grid {
                    grid-template-columns: 1fr;
                }
                
                .activities-grid {
                    grid-template-columns: 1fr;
                }
                
                .day-header {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 12px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    createTourBuilderHTML() {
        const container = document.createElement('div');
        container.className = 'tour-builder-container';
        container.innerHTML = `
            <div class="tour-builder-header">
                <h2 class="tour-builder-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; margin-right: 8px;">
                        <path d="M9 11H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-4"/>
                        <polyline points="9,11 12,8 15,11"/>
                        <line x1="12" y1="8" x2="12" y2="21"/>
                    </svg>
                    Design Your Perfect Tunisia Adventure
                </h2>
            </div>
            
            <div id="days-container">
                <!-- Days will be added here dynamically -->
            </div>
            
            <div class="add-day-section">
                <button class="btn btn-primary" id="add-day-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add Another Day
                </button>
            </div>
        `;
        
        return container;
    }
    
    addDay() {
        const dayNumber = this.days.length + 1;
        const dayData = {
            id: Date.now(),
            number: dayNumber,
            city: '',
            cityNote: '',
            accommodation: '',
            accommodationNote: '',
            transportation: '',
            transportationNote: '',
            guideLanguage: '',
            entranceFees: false,
            meals: '',
            mealsNote: '',
            activities: [],
            activityNote: '',
            collapsed: false
        };
        
        this.days.push(dayData);
        this.renderDay(dayData);
    }
    
    renderDay(dayData) {
        const daysContainer = document.getElementById('days-container');
        if (!daysContainer) return;
        
        const dayElement = document.createElement('div');
        dayElement.className = `day-container ${dayData.collapsed ? 'collapsed' : ''}`;
        dayElement.dataset.dayId = dayData.id;
        
        if (dayData.collapsed) {
            dayElement.innerHTML = this.renderCollapsedDay(dayData);
        } else {
            dayElement.innerHTML = this.renderFullDay(dayData);
        }
        
        daysContainer.appendChild(dayElement);
        
        // Bind events for this day
        this.bindDayEvents(dayElement, dayData);
    }
    
    renderCollapsedDay(dayData) {
        const summary = this.generateDaySummary(dayData);
        return `
            <div class="day-summary">
                <div class="day-summary-title">Day ${dayData.number} Summary</div>
                ${summary}
                <div style="margin-top: 12px;">
                    <button class="btn btn-secondary expand-day-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit Day
                    </button>
                    ${this.days.length > 1 ? `<button class="btn btn-danger remove-day-btn" style="margin-left: 8px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;">
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1 2-2h4a2,2 0 0,1 2,2v2"/>
                        </svg>
                        Remove
                    </button>` : ''}
                </div>
            </div>
        `;
    }
    
    renderFullDay(dayData) {
        return `
            <div class="day-header">
                <h3 class="day-title">Day ${dayData.number}</h3>
                <div class="day-controls">
                    ${this.days.length > 1 ? `<button class="btn btn-danger remove-day-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;">
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1 2-2h4a2,2 0 0,1 2,2v2"/>
                        </svg>
                        Remove
                    </button>` : ''}
                </div>
            </div>
            
            <div class="form-section">
                <h4 style="color: #0073e6; margin-bottom: 16px; font-size: 18px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; margin-right: 8px;">
                        <path d="M9 11H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-4"/>
                        <polyline points="9,11 12,8 15,11"/>
                        <line x1="12" y1="8" x2="12" y2="21"/>
                    </svg>
                    Desired Services
                </h4>
                
                <div class="form-grid">
                    <div>
                        <label class="form-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; margin-right: 6px;">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            City
                        </label>
                        <div class="dropdown-wrapper" style="position: relative;">
                            <button class="dropdown-button city-dropdown" type="button">
                                <span>${dayData.city || 'Select city to visit'}</span>
                                <span>▼</span>
                            </button>
                            <div class="dropdown-content city-dropdown-content">
                                ${this.tunisianCities.map(city => `
                                    <div class="dropdown-item" data-value="${city}">${city}</div>
                                `).join('')}
                            </div>
                        </div>
                        <textarea class="note-input city-note" placeholder="Describe where you want to go, visit, or see..." rows="2">${dayData.cityNote}</textarea>
                    </div>
                    
                    <div>
                        <label class="form-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; margin-right: 6px;">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9,22 9,12 15,12 15,22"/>
                            </svg>
                            Accommodation Type
                        </label>
                        <div class="dropdown-wrapper" style="position: relative;">
                            <button class="dropdown-button accommodation-dropdown" type="button">
                                <span>${dayData.accommodation || 'Select accommodation type'}</span>
                                <span>▼</span>
                            </button>
                            <div class="dropdown-content accommodation-dropdown-content">
                                ${this.accommodationTypes.map(type => `
                                    <div class="dropdown-item" data-value="${type}">${type}</div>
                                `).join('')}
                            </div>
                        </div>
                        <textarea class="note-input accommodation-note" placeholder="Any specific requirements..." rows="2">${dayData.accommodationNote}</textarea>
                    </div>
                    
                    <div>
                        <label class="form-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; margin-right: 6px;">
                                <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.14a1 1 0 0 0-.76-.35H8.5l-.5 5.5"/>
                                <circle cx="6.5" cy="16" r="2.5"/>
                                <circle cx="16.5" cy="16" r="2.5"/>
                            </svg>
                            Transportation
                        </label>
                        <div class="dropdown-wrapper" style="position: relative;">
                            <button class="dropdown-button transportation-dropdown" type="button">
                                <span>${dayData.transportation || 'Select transportation'}</span>
                                <span>▼</span>
                            </button>
                            <div class="dropdown-content transportation-dropdown-content">
                                ${this.transportationOptions.map(option => `
                                    <div class="dropdown-item" data-value="${option}">${option}</div>
                                `).join('')}
                            </div>
                        </div>
                        <textarea class="note-input transportation-note" placeholder="Any specific requirements..." rows="2">${dayData.transportationNote}</textarea>
                    </div>
                    
                    <div>
                        <label class="form-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; margin-right: 6px;">
                                <path d="M5 8l6 6"/>
                                <path d="M4 14l6-6 2-3"/>
                                <path d="M2 5h12"/>
                                <path d="M7 2h1"/>
                                <path d="M22 22l-5-10-5 10"/>
                                <path d="M14 18h6"/>
                            </svg>
                            Guide Language
                        </label>
                        <div class="dropdown-wrapper" style="position: relative;">
                            <button class="dropdown-button guide-dropdown" type="button">
                                <span>${dayData.guideLanguage || 'Select guide language'}</span>
                                <span>▼</span>
                            </button>
                            <div class="dropdown-content guide-dropdown-content">
                                ${this.guideLanguages.map(lang => `
                                    <div class="dropdown-item" data-value="${lang}">${lang}</div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label class="form-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; margin-right: 6px;">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            Entrance Fees
                        </label>
                        <div class="checkbox-section">
                            <input type="checkbox" class="checkbox-input entrance-fees-checkbox" ${dayData.entranceFees ? 'checked' : ''}>
                            <label class="checkbox-label">Include entrance fees (museums, synagogues, galleries, etc.) in my package.</label>
                        </div>
                    </div>
                    
                    <div>
                        <label class="form-label">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; margin-right: 6px;">
                                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
                                <path d="M7 2v20"/>
                                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"/>
                            </svg>
                            Meals
                        </label>
                        <div class="dropdown-wrapper" style="position: relative;">
                            <button class="dropdown-button meals-dropdown" type="button">
                                <span>${dayData.meals || 'Select meal plan'}</span>
                                <span>▼</span>
                            </button>
                            <div class="dropdown-content meals-dropdown-content">
                                ${this.mealOptions.map(option => `
                                    <div class="dropdown-item" data-value="${option}">${option}</div>
                                `).join('')}
                            </div>
                        </div>
                        <textarea class="note-input meals-note" placeholder="Please tell us if you prefer specific things like Local Traditional Cuisine, Vegetarian, Vegan, Allergies, Low Sodium/Low Fat/High Protein..." rows="3">${dayData.mealsNote}</textarea>
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <label class="form-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; margin-right: 6px;">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                        <line x1="9" y1="9" x2="9.01" y2="9"/>
                        <line x1="15" y1="9" x2="15.01" y2="9"/>
                    </svg>
                    Activities
                </label>
                <div class="dropdown-wrapper" style="position: relative;">
                    <button class="dropdown-button activities-dropdown" type="button">
                        <span>${dayData.activities.length > 0 ? `${dayData.activities.length} activities selected` : 'Select activities (multiple choice)'}</span>
                        <span>▼</span>
                    </button>
                    <div class="dropdown-content activities-dropdown-content" style="max-height: 400px; overflow-y: auto;">
                        <div class="activities-grid" style="padding: 12px; grid-template-columns: 1fr; gap: 8px;">
                            ${this.activities.map(activity => `
                                <div class="activity-card ${dayData.activities.includes(activity.name) ? 'selected' : ''}" data-activity="${activity.name}" style="padding: 8px; border-radius: 6px; display: flex; align-items: center; gap: 12px; cursor: pointer;">
                                    <span class="activity-icon" style="font-size: 20px;">${activity.icon}</span>
                                    <div style="flex: 1;">
                                        <div class="activity-name" style="font-weight: 500; margin-bottom: 2px;">${activity.name}</div>
                                        <div class="activity-description" style="font-size: 11px; color: #64748b;">${activity.description}</div>
                                    </div>
                                    <div class="activity-checkbox" style="width: 16px; height: 16px; border: 2px solid #0073e6; border-radius: 3px; background: ${dayData.activities.includes(activity.name) ? '#0073e6' : 'white'}; display: flex; align-items: center; justify-content: center;">
                                        ${dayData.activities.includes(activity.name) ? '<span style="color: white; font-size: 10px;">✓</span>' : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                ${dayData.activities.length > 0 ? `
                    <div class="selected-activities">
                        <div class="selected-activities-title">Selected Activities:</div>
                        ${dayData.activities.map(activity => `
                            <span class="selected-activity-tag">${activity}</span>
                        `).join('')}
                    </div>
                ` : ''}
                
                <textarea class="note-input activity-note" placeholder="Specify or ask about something related to the activities..." rows="2">${dayData.activityNote}</textarea>
            </div>
            
            <div class="form-section" style="text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <button class="btn btn-success confirm-day-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
                        <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    Confirm Day
                </button>
            </div>
        `;
    }
    
    generateDaySummary(dayData) {
        const items = [
            { label: 'City', value: dayData.city || 'Not selected' },
            { label: 'Accommodation', value: dayData.accommodation || 'Not selected' },
            { label: 'Transportation', value: dayData.transportation || 'Not selected' },
            { label: 'Guide Language', value: dayData.guideLanguage || 'Not selected' },
            { label: 'Entrance Fees', value: dayData.entranceFees ? 'Included' : 'Not included' },
            { label: 'Meals', value: dayData.meals || 'Not selected' },
            { label: 'Activities', value: dayData.activities.length > 0 ? dayData.activities.join(', ') : 'None selected' }
        ];
        
        return items.map(item => `
            <div class="day-summary-item">
                <span class="day-summary-label">${item.label}:</span>
                <span class="day-summary-value">${item.value}</span>
            </div>
        `).join('');
    }
    
    bindEvents() {
        // Add day button
        const addDayBtn = document.getElementById('add-day-btn');
        if (addDayBtn) {
            addDayBtn.addEventListener('click', () => this.addDay());
        }
        
        // Intercept form submissions to include tour builder data
        this.interceptFormSubmissions();
    }
    
    bindDayEvents(dayElement, dayData) {
        // Expand day button
        const expandBtn = dayElement.querySelector('.expand-day-btn');
        if (expandBtn) {
            expandBtn.addEventListener('click', () => {
                dayData.collapsed = false;
                this.rerenderDay(dayData);
            });
        }
        
        // Confirm day button
        const confirmBtn = dayElement.querySelector('.confirm-day-btn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                this.saveDayData(dayElement, dayData);
                dayData.collapsed = true;
                this.rerenderDay(dayData);
            });
        }
        
        // Remove day button
        const removeBtn = dayElement.querySelector('.remove-day-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                this.removeDay(dayData.id);
            });
        }
        
        // Dropdown buttons
        this.bindDropdownEvents(dayElement);
        
        // Activity cards
        this.bindActivityEvents(dayElement, dayData);
        
        // Input events
        this.bindInputEvents(dayElement, dayData);
    }
    
    bindDropdownEvents(dayElement) {
        const dropdownButtons = dayElement.querySelectorAll('.dropdown-button');
        
        dropdownButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown-content.show').forEach(content => {
                    if (content !== button.nextElementSibling) {
                        content.classList.remove('show');
                        content.previousElementSibling.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                const content = button.nextElementSibling;
                content.classList.toggle('show');
                button.classList.toggle('active');
            });
        });
        
        // Dropdown items
        const dropdownItems = dayElement.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const value = item.dataset.value;
                const content = item.closest('.dropdown-content');
                const button = content.previousElementSibling;
                
                button.querySelector('span').textContent = value;
                content.classList.remove('show');
                button.classList.remove('active');
                
                // Trigger change event
                button.dispatchEvent(new CustomEvent('change', { detail: { value } }));
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-wrapper')) {
                document.querySelectorAll('.dropdown-content.show').forEach(content => {
                    content.classList.remove('show');
                    content.previousElementSibling.classList.remove('active');
                });
            }
        });
    }
    
    bindActivityEvents(dayElement, dayData) {
        const activityCards = dayElement.querySelectorAll('.activity-card');
        
        activityCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const activityName = card.dataset.activity;
                const isSelected = card.classList.contains('selected');
                const checkbox = card.querySelector('.activity-checkbox');
                
                if (isSelected) {
                    // Remove activity
                    card.classList.remove('selected');
                    dayData.activities = dayData.activities.filter(a => a !== activityName);
                    checkbox.style.background = 'white';
                    checkbox.innerHTML = '';
                } else {
                    // Add activity
                    card.classList.add('selected');
                    dayData.activities.push(activityName);
                    checkbox.style.background = '#0073e6';
                    checkbox.innerHTML = '<span style="color: white; font-size: 10px;">✓</span>';
                }
                
                // Update dropdown button text
                const activitiesDropdown = dayElement.querySelector('.activities-dropdown span');
                if (activitiesDropdown) {
                    activitiesDropdown.textContent = dayData.activities.length > 0 ? 
                        `${dayData.activities.length} activities selected` : 
                        'Select activities (multiple choice)';
                }
                
                // Update selected activities display
                this.updateSelectedActivitiesDisplay(dayElement, dayData);
            });
        });
    }
    
    updateSelectedActivitiesDisplay(dayElement, dayData) {
        const activitiesSection = dayElement.querySelector('.form-section:last-child');
        const existingSelectedDiv = activitiesSection.querySelector('.selected-activities');
        
        if (dayData.activities.length > 0) {
            const selectedHTML = `
                <div class="selected-activities">
                    <div class="selected-activities-title">Selected Activities:</div>
                    ${dayData.activities.map(activity => `
                        <span class="selected-activity-tag">${activity}</span>
                    `).join('')}
                </div>
            `;
            
            if (existingSelectedDiv) {
                existingSelectedDiv.outerHTML = selectedHTML;
            } else {
                const activitiesGrid = activitiesSection.querySelector('.activities-grid');
                activitiesGrid.insertAdjacentHTML('afterend', selectedHTML);
            }
        } else if (existingSelectedDiv) {
            existingSelectedDiv.remove();
        }
    }
    
    bindInputEvents(dayElement, dayData) {
        // Note inputs
        const noteInputs = dayElement.querySelectorAll('.note-input');
        noteInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const className = e.target.className;
                if (className.includes('city-note')) dayData.cityNote = e.target.value;
                else if (className.includes('accommodation-note')) dayData.accommodationNote = e.target.value;
                else if (className.includes('transportation-note')) dayData.transportationNote = e.target.value;
                else if (className.includes('meals-note')) dayData.mealsNote = e.target.value;
                else if (className.includes('activity-note')) dayData.activityNote = e.target.value;
            });
        });
        
        // Checkbox
        const entranceFeesCheckbox = dayElement.querySelector('.entrance-fees-checkbox');
        if (entranceFeesCheckbox) {
            entranceFeesCheckbox.addEventListener('change', (e) => {
                dayData.entranceFees = e.target.checked;
            });
        }
        
        // Dropdown change events
        const dropdownButtons = dayElement.querySelectorAll('.dropdown-button');
        dropdownButtons.forEach(button => {
            button.addEventListener('change', (e) => {
                const value = e.detail.value;
                const className = button.className;
                
                if (className.includes('city-dropdown')) dayData.city = value;
                else if (className.includes('accommodation-dropdown')) dayData.accommodation = value;
                else if (className.includes('transportation-dropdown')) dayData.transportation = value;
                else if (className.includes('guide-dropdown')) dayData.guideLanguage = value;
                else if (className.includes('meals-dropdown')) dayData.meals = value;
            });
        });
    }
    
    saveDayData(dayElement, dayData) {
        // Data is already saved through event listeners
        console.log('Day data saved:', dayData);
    }
    
    rerenderDay(dayData) {
        const dayElement = document.querySelector(`[data-day-id="${dayData.id}"]`);
        if (!dayElement) return;
        
        dayElement.className = `day-container ${dayData.collapsed ? 'collapsed' : ''}`;
        
        if (dayData.collapsed) {
            dayElement.innerHTML = this.renderCollapsedDay(dayData);
        } else {
            dayElement.innerHTML = this.renderFullDay(dayData);
        }
        
        this.bindDayEvents(dayElement, dayData);
    }
    
    removeDay(dayId) {
        const dayIndex = this.days.findIndex(day => day.id === dayId);
        if (dayIndex === -1) return;
        
        // Remove from array
        this.days.splice(dayIndex, 1);
        
        // Remove from DOM
        const dayElement = document.querySelector(`[data-day-id="${dayId}"]`);
        if (dayElement) {
            dayElement.remove();
        }
        
        // Renumber remaining days
        this.renumberDays();
    }
    
    renumberDays() {
        this.days.forEach((day, index) => {
            day.number = index + 1;
        });
        
        // Re-render days with new numbers
        const daysContainer = document.getElementById('days-container');
        if (daysContainer) {
            daysContainer.innerHTML = '';
            this.days.forEach(day => this.renderDay(day));
        }
    }
    
    interceptFormSubmissions() {
        // Find and enhance the contact form
        setTimeout(() => {
            this.enhanceContactForm();
        }, 2000);
        
        // Keep checking for form submissions
        setInterval(() => {
            this.enhanceContactForm();
        }, 5000);
    }
    
    enhanceContactForm() {
        // Look for the contact form
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            if (!form.dataset.tourBuilderEnhanced) {
                form.dataset.tourBuilderEnhanced = 'true';
                
                form.addEventListener('submit', (e) => {
                    // Add tour builder data to form submission
                    this.addTourBuilderDataToSubmission(e);
                });
            }
        });
        
        // Also intercept fetch requests
        if (!window.tourBuilderFetchIntercepted) {
            window.tourBuilderFetchIntercepted = true;
            
            const originalFetch = window.fetch;
            window.fetch = async (...args) => {
                const [url, options] = args;
                
                if (options && options.method === 'POST' && 
                    (url.includes('/api/bookings') || url.includes('booking'))) {
                    
                    // Add tour builder data to booking request
                    if (options.body) {
                        try {
                            const data = JSON.parse(options.body);
                            data.tourBuilderData = this.getTourBuilderData();
                            options.body = JSON.stringify(data);
                            
                            console.log('Enhanced booking data with tour builder:', data);
                        } catch (e) {
                            console.log('Could not enhance booking data:', e);
                        }
                    }
                }
                
                return originalFetch(...args);
            };
        }
    }
    
    addTourBuilderDataToSubmission(event) {
        const tourBuilderData = this.getTourBuilderData();
        
        if (tourBuilderData.days.length > 0) {
            // Create hidden input with tour builder data
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'tourBuilderData';
            hiddenInput.value = JSON.stringify(tourBuilderData);
            
            event.target.appendChild(hiddenInput);
            
            console.log('Added tour builder data to form submission:', tourBuilderData);
        }
    }
    
    getTourBuilderData() {
        return {
            days: this.days.map(day => ({
                number: day.number,
                city: day.city,
                cityNote: day.cityNote,
                accommodation: day.accommodation,
                accommodationNote: day.accommodationNote,
                transportation: day.transportation,
                transportationNote: day.transportationNote,
                guideLanguage: day.guideLanguage,
                entranceFees: day.entranceFees,
                meals: day.meals,
                mealsNote: day.mealsNote,
                activities: day.activities,
                activityNote: day.activityNote
            })),
            totalDays: this.days.length,
            createdAt: new Date().toISOString()
        };
    }
}

// Initialize the tour builder when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Tour Builder Form loading...');
    new TourBuilderForm();
});

// Also initialize if the page is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🎯 Tour Builder Form loading...');
        new TourBuilderForm();
    });
} else {
    console.log('🎯 Tour Builder Form loading...');
    new TourBuilderForm();
}