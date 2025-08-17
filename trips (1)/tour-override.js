/**
 * Enhanced Tour Card Override - Full Display with Multiple Selection
 * Positions tours correctly between budget and contact sections with multiple selection capability
 */

(function() {
    'use strict';

    // Track selected tours for multiple selection
    let selectedTours = new Set();

    // Enhanced CSS for properly positioned tour cards with multiple selection
    function injectOverrideCSS() {
        const css = `
            /* Tour section container - positioned between budget and contact */
            .tour-override-container {
                
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                margin: 24px 0;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                order: 2; /* Position between budget (order: 1) and contact (order: 3) */
                width: 100% !important;
                max-width: none !important;
            }

            .tour-override-container h2 {
                background: linear-gradient(135deg, #0073e6, #0066cc);
                color: white;
                margin: 0;
                padding: 20px 24px;
                border-radius: 12px 12px 0 0;
                font-size: 20px;
                font-weight: 700;
                text-align: center;
            }

            .tour-override-selected-summary {
                background: #f0f9ff;
                border-bottom: 1px solid #e0f2fe;
                padding: 16px 24px;
                color: #0369a1;
                font-weight: 500;
                display: none;
            }

            .tour-override-selected-summary.has-selections {
                display: block;
            }

            .tour-override-list {
                padding: 24px;
                list-style-type: disc;
                gap: 20px;
            }

            /* Individual tour card */
            .tour-override {
                background: #fafafa;
                border: 2px solid #e5e7eb;
                border-radius: 12px;
                overflow: hidden;
                transition: all 0.3s ease;
                position: relative;
            }

            .tour-override:hover {
                border-color: #0073e6;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,115,230,0.15);
            }

            .tour-override.selected {
                border-color: #10b981;
                background: #f0fdf4;
                box-shadow: 0 4px 16px rgba(16, 185, 129, 0.2);
            }

            .tour-override-header {
                padding: 20px 24px;
                
                position: relative;
            }

            .tour-override.selected .tour-override-header {
                background: #ecfdf5;
            }

            .tour-override-title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 12px;
            }

            .tour-override-title h3 {
                margin: 0;
                font-size: 20px;
                font-weight: 700;
                color: #1f2937;
                flex: 1;
            }

            .tour-badge {
                background: #dbeafe;
                color: #1e40af;
                padding: 6px 14px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .selection-status {
                position: absolute;
                top: 16px;
                right: 16px;
            }

            .tour-selection-indicator {
                background: #10b981;
                color: white;
                
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                animation: fadeInScale 0.3s ease;
            }

            @keyframes fadeInScale {
                0% { opacity: 0; transform: scale(0.8); }
                100% { opacity: 1; transform: scale(1); }
            }

            .tour-meta {
                display: flex;
                flex-wrap: nowrap;
                
                color: #6b7280;
                font-size: 14px;
                margin-bottom: 6px;
                line-height: 1.5;
                font-weight: 500;
                margin-bottom: 16px;
                overflow-x: auto;
                scrollbar-width: none;
                -ms-overflow-style: none;
            }
            
            .tour-meta::-webkit-scrollbar {
                display: none;
            }

            .tour-meta-item {
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 6px 10px;
                
                border-radius: 8px;
                border: 1px solid #f3f4f6;
                white-space: nowrap;
                flex-shrink: 0;
                min-width: fit-content;
                font-size: 13px;
            }

            /* Tab system */
            .tour-tabs {
                display: flex;
                background: #f8fafc;
                border-bottom: 1px solid #e2e8f0;
                border-top: 1px solid #e2e8f0;
            }

            .tour-tab {
                flex: 1;
                padding: 14px 20px;
                border: none;
                background: transparent;
                cursor: pointer;
                font-size: 14px;
                margin-bottom: 6px;
                line-height: 1.5;
                font-weight: 600;
                color: #64748b;
                border-bottom: 3px solid transparent;
                transition: all 0.2s;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .tour-tab:hover {
                background: #f1f5f9;
                color: #334155;
            }

            .tour-tab.active {
                color: #0073e6;
                border-bottom-color: #0073e6;
                
            }

            .tour-tab-content {
                padding: 24px;
                display: none;
                
            }

            .tour-tab-content.active {
                display: block;
            }

            /* Overview tab styles */
            .tour-image {
                width: 100%;
                height: 240px;
                object-fit: cover;
                border-radius: 12px;
                margin-bottom: 20px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }

            .tour-description {
                color: #374151;
                line-height: 1.7;
                margin-bottom: 20px;
                font-size: 15px;
            }

            .tour-highlights {
                margin: 24px 0;
            }

            .tour-highlights h4 {
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 16px;
                color: #1f2937;
                display: flex;
                align-items: center;
                
            }

            .tour-highlights h4::before {
                content: "✨";
                font-size: 20px;
            }

            .tour-highlights ul {
                margin: 0;
                padding-left: 20px;
                color: #4b5563;
                line-height: 1.6;
            }

            .tour-highlights li {
                color: #4b5563;
                font-weight: 400;
                margin-bottom: 8px;
                font-size: 15px;
            }

            /* Details tab styles */
            .tour-info-grid {
                list-style-type: disc;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 24px;
            }

            .tour-info-item {
                padding: 20px;
                background: #f8fafc;
                border-radius: 12px;
                border-left: 4px solid #0073e6;
                text-align: center;
            }

            .tour-info-label {
                color: #64748b;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 8px;
            }

            .tour-info-value {
                font-weight: 700;
                color: #1e293b;
                font-size: 20px;
            }

            .inclusion-grid {
                list-style-type: disc;
                grid-template-columns: 1fr 1fr;
                gap: 24px;
                margin-top: 24px;
            }

            .inclusion-section {
                background: #f9fafb;
                padding: 20px;
                border-radius: 12px;
            }

            .inclusion-section h5 {
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 16px;
                display: flex;
                align-items: center;
                
            }

            .included h5 { color: #059669; }
            .not-included h5 { color: #dc2626; }

            .inclusion-section ul {
                margin: 0;
                padding: 0 0 0 20px;
                list-style-type: disc;
                
            }

            .inclusion-section li {
                font-size: 14px;
                margin-bottom: 6px;
                line-height: 1.5;
                color: #4b5563;
                
                
                
                
                
            }


            /* Description truncation styles */
            .tour-description.truncated {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                position: relative;
            }

            .tour-description.expanded {
                display: block;
            }

            .read-more-btn {
                background: none;
                border: none;
                color: #0073e6;
                cursor: pointer;
                font-weight: 600;
                font-size: 14px;
                padding: 4px 0;
                margin-top: 8px;
                text-decoration: underline;
                transition: color 0.2s ease;
            }

            .read-more-btn:hover {
                color: #0066cc;
            }

            /* Gallery tab styles */
            .tour-gallery {
                list-style-type: disc;
                grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                gap: 16px;
            }

            .gallery-image {
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 12px;
                cursor: pointer;
                transition: transform 0.3s ease;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .gallery-image:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            }

            /* Accommodation selector */
            .accommodation-selector {
                margin: 24px 0;
                background: #f8fafc;
                padding: 20px;
                border-radius: 12px;
                border: 1px solid #e2e8f0;
            }

            .accommodation-selector label {
                display: block;
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 12px;
                color: #374151;
            }

            .accommodation-selector select {
                width: 100%;
                padding: 12px 16px;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                
                font-size: 15px;
                font-weight: 500;
            }

            /* Action buttons */
            .tour-actions {
                display: flex;
                gap: 16px;
                padding: 24px;
                background: #f8fafc;
                border-top: 1px solid #e2e8f0;
            }

            .tour-btn {
                flex: 1;
                padding: 16px 24px;
                border: none;
                border-radius: 10px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
                font-size: 15px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .tour-btn-primary {
                background: linear-gradient(135deg, #0073e6, #0066cc);
                color: white;
                box-shadow: 0 4px 12px rgba(0,115,230,0.3);
            }

            .tour-btn-primary:hover {
                background: linear-gradient(135deg, #0066cc, #005bb5);
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(0,115,230,0.4);
            }

            .tour-btn-selected {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                box-shadow: 0 4px 12px rgba(16,185,129,0.3);
            }

            .tour-btn-selected:hover {
                background: linear-gradient(135deg, #059669, #047857);
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(16,185,129,0.4);
            }

            .tour-btn-remove {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
                box-shadow: 0 4px 12px rgba(239,68,68,0.3);
            }

            .tour-btn-remove:hover {
                background: linear-gradient(135deg, #dc2626, #b91c1c);
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(239,68,68,0.4);
            }

            /* Hide original collapsible cards */
            .tour-override-processed {
                display: none !important;
            }

            /* Force proper positioning in form layout with better specificity */
            form:has(.tour-override-container),
            div[class*="space-y"]:has(.tour-override-container) {
                display: flex !important;
                flex-direction: column !important;
            }

            /* Ensure budget section comes first - more specific selectors */
            form > div:has(label[class*="text"]:contains("Budget")),
            form > div:has(span:contains("Budget")),
            div[class*="space-y"] > div:has(label[class*="text"]:contains("Budget")),
            div[class*="space-y"] > div:has(span:contains("Budget")),
            div:has(input[name*="budget"]),
            div:has(select[name*="budget"]) {
                order: 1 !important;
            }

            /* Tour container comes second with higher specificity */
            .tour-override-container {
                order: 2 !important;
                z-index: 1;
                position: relative;
            }

            /* Contact details come third - more specific selectors */
            form > div:has(label[class*="text"]:contains("Contact")),
            form > div:has(h3:contains("Contact")),
            form > div:has(h2:contains("Contact")),
            div[class*="space-y"] > div:has(label[class*="text"]:contains("Contact")),
            div[class*="space-y"] > div:has(h3:contains("Contact")),
            div[class*="space-y"] > div:has(h2:contains("Contact")),
            div:has(input[name*="contact"]),
            div:has(input[type="email"]),
            div:has(input[name*="phone"]),
            div:has(input[name*="name"]),
            div:has(textarea[name*="message"]) {
                order: 3 !important;
            }

            /* Responsive design */
            @media (max-width: 768px) {
                .tour-override-list {
                    padding: 16px;
                }
                
                .tour-meta {
                    /* Keep horizontal layout on mobile */
                    gap: 6px;
                }
                
                .tour-meta-item {
                    /* Smaller padding on mobile for better fit */
                    padding: 4px 8px;
                    font-size: 12px;
                    gap: 3px;
                }
                
                .inclusion-grid {
                    grid-template-columns: 1fr;
                }
                
                .tour-actions {
                    flex-direction: column;
                    gap: 12px;
                }
                
                .tour-override-header {
                    padding: 16px 20px;
                }
                
                .tour-override-title h3 {
                    font-size: 18px;
                }
            }
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    // Enhanced override function that properly positions tours and allows multiple selection
    async function overrideTourDisplay() {
        // Fetch actual tour data
        const tours = await fetchTourData();
        console.log('Fetched tours for override:', tours.length);
        
        // Find the form container that should hold our tour section
        const formContainers = document.querySelectorAll('div[class*="space-y"], form, .space-y-6, .space-y-8');
        
        formContainers.forEach((container, containerIndex) => {
            // Skip if already processed
            if (container.dataset.tourOverrideProcessed === 'true') {
                return;
            }
            
            // Look for budget and contact sections to ensure we're in the right form
            const hasBudget = container.querySelector('label')?.textContent?.includes('Budget') || 
                            container.textContent.includes('Budget per person');
            const hasContact = container.querySelector('label')?.textContent?.includes('Contact') ||
                             container.textContent.includes('Contact Details');
            
            if (hasBudget || hasContact) {
                console.log(`Found form container ${containerIndex} with budget/contact sections`);
                
                // Hide original tour cards
                const originalCards = container.querySelectorAll('div[class*="Card"], div[class*="card"], div[class*="overflow-hidden"], div[class*="border"], div[class*="rounded"]');
                originalCards.forEach(card => {
                    const hasTitle = card.querySelector('h3, h2, h4');
                    const hasButton = card.querySelector('button');
                    const cardText = card.textContent.toLowerCase();
                    const hasTourKeywords = cardText.includes('tour') || cardText.includes('day') || cardText.includes('price');
                    
                    if (hasTitle && hasButton && hasTourKeywords) {
                        card.style.display = 'none';
                        card.classList.add('tour-override-processed');
                    }
                });
                
                // Create tour section if tours exist and not already created
                if (tours.length > 0 && !container.querySelector('.tour-override-container')) {
                    createTourSection(container, tours);
                }
                
                // Mark container as processed
                container.dataset.tourOverrideProcessed = 'true';
            }
        });
    }

    async function fetchTourData() {
        try {
            const response = await fetch('/api/tours');
            const tours = await response.json();
            return tours.filter(tour => tour.type === 'private');
        } catch (error) {
            console.log('Could not fetch tour data:', error);
            return [];
        }
    }

    function createTourSection(container, tours) {
        // Create the tour container
        const tourContainer = document.createElement('div');
        tourContainer.className = 'tour-override-container';
        
        // Create header
        const header = document.createElement('h2');
        header.textContent = 'Select Your Tours';
        tourContainer.appendChild(header);
        
        // Create selected summary
        const summary = document.createElement('div');
        summary.className = 'tour-override-selected-summary';
        summary.innerHTML = '<span id="selected-count">0</span> tour(s) selected';
        tourContainer.appendChild(summary);
        
        // Create tour list
        const tourList = document.createElement('div');
        tourList.className = 'tour-override-list';
        
        tours.forEach((tour, index) => {
            const tourCard = createFullTourCard(tour, index);
            tourList.appendChild(tourCard);
        });
        
        tourContainer.appendChild(tourList);
        
        // Insert the tour container in the right position
        insertTourContainerInCorrectPosition(container, tourContainer);
    }

    function insertTourContainerInCorrectPosition(container, tourContainer) {
        // Find budget and contact sections with more comprehensive detection
        const allChildren = Array.from(container.children);
        let budgetIndex = -1;
        let contactIndex = -1;
        
        allChildren.forEach((child, index) => {
            const text = child.textContent.toLowerCase();
            const hasInput = child.querySelector('input, select, textarea');
            const hasLabel = child.querySelector('label');
            
            // Look for budget section
            if ((text.includes('budget') || 
                (hasInput && (child.querySelector('input[name*="budget"]') || 
                             child.querySelector('select[name*="budget"]'))) ||
                (hasLabel && hasLabel.textContent.toLowerCase().includes('budget'))) && 
                budgetIndex === -1) {
                budgetIndex = index;
                console.log('Found budget section at index:', index);
            }
            
            // Look for contact section
            if ((text.includes('contact') || text.includes('phone') || text.includes('email') ||
                text.includes('name') || text.includes('message') ||
                (hasInput && (child.querySelector('input[type="email"]') ||
                             child.querySelector('input[name*="phone"]') ||
                             child.querySelector('input[name*="name"]') ||
                             child.querySelector('textarea[name*="message"]'))) ||
                (hasLabel && (hasLabel.textContent.toLowerCase().includes('contact') ||
                             hasLabel.textContent.toLowerCase().includes('phone') ||
                             hasLabel.textContent.toLowerCase().includes('email')))) &&
                contactIndex === -1) {
                contactIndex = index;
                console.log('Found contact section at index:', index);
            }
        });
        
        console.log('Budget index:', budgetIndex, 'Contact index:', contactIndex);
        
        // Insert between budget and contact with better logic
        if (budgetIndex >= 0 && contactIndex >= 0 && contactIndex > budgetIndex) {
            // Insert right after budget section
            const insertPosition = budgetIndex + 1;
            console.log('Inserting tour section at position:', insertPosition);
            if (insertPosition < allChildren.length && insertPosition < contactIndex) {
                container.insertBefore(tourContainer, allChildren[insertPosition]);
            } else {
                container.insertBefore(tourContainer, allChildren[contactIndex]);
            }
        } else if (budgetIndex >= 0) {
            // Insert after budget if no contact found
            const insertPosition = budgetIndex + 1;
            console.log('Inserting after budget at position:', insertPosition);
            if (insertPosition < allChildren.length) {
                container.insertBefore(tourContainer, allChildren[insertPosition]);
            } else {
                container.appendChild(tourContainer);
            }
        } else if (contactIndex >= 0) {
            // Insert before contact if no budget found
            console.log('Inserting before contact at position:', contactIndex);
            container.insertBefore(tourContainer, allChildren[contactIndex]);
        } else {
            // Fallback: try to find the best position or append at the end
            console.log('Using fallback insertion');
            const middleIndex = Math.floor(allChildren.length / 2);
            if (middleIndex < allChildren.length && allChildren.length > 2) {
                container.insertBefore(tourContainer, allChildren[middleIndex]);
            } else {
                container.appendChild(tourContainer);
            }
        }
    }

    function createFullTourCard(tourData, cardIndex) {
        const tour = tourData || {};
        
        const title = tour.title || 'Tunisia Tour';
        const description = tour.description || 'Experience the best of Tunisia with this carefully crafted tour.';
        const city = tour.city || 'Tunisia';
        const duration = tour.duration || 3;
        const price = tour.price || 299;
        const rating = tour.rating || 4.5;
        const type = tour.type || 'private';
        const images = Array.isArray(tour.images) && tour.images.length > 0 ? tour.images : ['https://images.unsplash.com/photo-1539650116574-75c0c6d60d2d?w=600&h=300&fit=crop'];
        const highlights = Array.isArray(tour.highlights) && tour.highlights.length > 0 ? tour.highlights : ['Explore ancient ruins and historical sites', 'Experience authentic Tunisian culture', 'Visit stunning natural landscapes', 'Enjoy traditional cuisine and hospitality'];
        const included = Array.isArray(tour.included) && tour.included.length > 0 ? tour.included : ['Professional guide', 'Transportation', 'Entrance fees', 'Meals as specified'];
        const notIncluded = Array.isArray(tour.notIncluded) && tour.notIncluded.length > 0 ? tour.notIncluded : ['International flights', 'Personal expenses', 'Travel insurance', 'Tips and gratuities'];
        const accommodation = tour.accommodation || 'Standard';
        
        const typeLabel = type === 'private' ? 'Private Tour' : type === 'group' ? 'Group Tour' : 'Custom Tour';
        const cardId = `tour-card-${cardIndex}-${Date.now()}`;
        const tourId = tour.id || cardIndex;
        
        // Create new full tour card
        const newCard = document.createElement('div');
        newCard.className = 'tour-override';
        newCard.dataset.tourId = tourId;
        newCard.id = cardId;
        
        // Generate lists
        const highlightsList = highlights.map(h => `<li>${h}</li>`).join('');
        const includedList = included.map(i => `<li>${i}</li>`).join('');
        const notIncludedList = notIncluded.map(ni => `<li>${ni}</li>`).join('');
        const galleryImages = images.map((img, idx) => 
            `<img src="${img}" alt="${title} - Image ${idx + 1}" class="gallery-image" onclick="openImageModal('${img}')">`
        ).join('');

        newCard.innerHTML = `
            <div class="tour-override-header">
                <div class="tour-override-title">
                    <h3>${title}</h3>
                    <span class="tour-badge">${typeLabel}</span>
                </div>
                <div class="selection-status"></div>
                <div class="tour-meta">
                    <div class="tour-meta-item">📍 ${city}</div>
                    <div class="tour-meta-item">⏱️ ${duration} Day${duration > 1 ? 's' : ''}</div>
                    <div class="tour-meta-item">💰 €${price}</div>
                    <div class="tour-meta-item">⭐ ${rating}</div>
                </div>
            </div>
            
            <div class="tour-tabs">
                <button class="tour-tab active" onclick="switchTab('${cardId}', 'overview')">Overview</button>
                <button class="tour-tab" onclick="switchTab('${cardId}', 'details')">Details</button>
                <button class="tour-tab" onclick="switchTab('${cardId}', 'gallery')">Gallery</button>
            </div>
            
            <div class="tour-tab-content active" id="${cardId}-overview">
                <img class="tour-image" src="${images[0]}" alt="${title}">
                <div class="tour-description truncated" id="${cardId}-description">
                    ${description}
                </div>
                <button class="read-more-btn" id="${cardId}-read-more" onclick="toggleDescription('${cardId}')">read more...</button>
            </div>
            
            <div class="tour-tab-content" id="${cardId}-details">
                <div class="tour-highlights">
                    <h4>Tour Highlights</h4>
                    <ul>${highlightsList}</ul>
                </div>
                
                <div class="inclusion-grid">
                    <div class="inclusion-section included">
                        <h5>✅ What's Included</h5>
                        <ul>${includedList}</ul>
                    </div>
                    <div class="inclusion-section not-included">
                        <h5>❌ Not Included</h5>
                        <ul>${notIncludedList}</ul>
                    </div>
                </div>
                
                <div class="accommodation-selector">
                    <label>Accommodation Level:</label>
                    <select data-accommodation-selector data-tour-id="${tourId}">
                        <option value="Economy" ${accommodation === 'Economy' ? 'selected' : ''}>Economy</option>
                        <option value="Standard" ${accommodation === 'Standard' ? 'selected' : ''}>Standard</option>
                        <option value="Luxury" ${accommodation === 'Luxury' ? 'selected' : ''}>Luxury</option>
                        <option value="Camping" ${accommodation === 'Camping' ? 'selected' : ''}>Camping</option>
                    </select>
                </div>
            </div>
            
            <div class="tour-tab-content" id="${cardId}-gallery">
                <div class="tour-gallery">
                    ${galleryImages}
                </div>
            </div>
            
            <div class="tour-actions">
                <button class="tour-btn tour-btn-primary" onclick="toggleTourSelection('${tourId}', '${title.replace(/'/g, "\\'")}', this)" data-tour-select data-tour-id="${tourId}">
                    Add to Selection
                </button>
            </div>
        `;

        return newCard;
    }

    // Tab switching functionality
    window.switchTab = function(cardId, tabName) {
        const card = document.getElementById(cardId);
        if (!card) return;
        
        // Hide all tab contents
        const tabContents = card.querySelectorAll('.tour-tab-content');
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from all tabs
        const tabs = card.querySelectorAll('.tour-tab');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected tab content
        const targetContent = document.getElementById(`${cardId}-${tabName}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
        
        // Activate selected tab
        const targetTab = Array.from(tabs).find(tab => 
            tab.textContent.toLowerCase().includes(tabName.toLowerCase())
        );
        if (targetTab) {
            targetTab.classList.add('active');
        }
    };

    // Description truncation toggle functionality
    window.toggleDescription = function(cardId) {
        const description = document.getElementById(`${cardId}-description`);
        const readMoreBtn = document.getElementById(`${cardId}-read-more`);
        
        if (!description || !readMoreBtn) return;
        
        if (description.classList.contains('truncated')) {
            // Expand description
            description.classList.remove('truncated');
            description.classList.add('expanded');
            readMoreBtn.textContent = 'read less...';
        } else {
            // Truncate description
            description.classList.remove('expanded');
            description.classList.add('truncated');
            readMoreBtn.textContent = 'read more...';
        }
    };

    // Image modal functionality
    window.openImageModal = function(imageSrc) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 8px;
        `;
        
        modal.appendChild(img);
        document.body.appendChild(modal);
        
        modal.onclick = () => {
            document.body.removeChild(modal);
        };
    };

    // Enhanced tour selection functionality with multiple selection
    window.toggleTourSelection = function(tourId, title, buttonElement) {
        console.log('Toggling tour selection:', tourId, title);
        
        const card = buttonElement.closest('.tour-override');
        const isCurrentlySelected = selectedTours.has(tourId);
        
        if (isCurrentlySelected) {
            // Remove from selection
            selectedTours.delete(tourId);
            card.classList.remove('selected');
            
            const statusDiv = card.querySelector('.selection-status');
            if (statusDiv) statusDiv.innerHTML = '';
            
            buttonElement.textContent = 'Add to Selection';
            buttonElement.className = 'tour-btn tour-btn-primary';
        } else {
            // Add to selection
            selectedTours.add(tourId);
            card.classList.add('selected');
            
            const statusDiv = card.querySelector('.selection-status');
            if (statusDiv) {
                statusDiv.innerHTML = '<span class="tour-selection-indicator">Selected ✓</span>';
            }
            
            buttonElement.textContent = 'Remove from Selection';
            buttonElement.className = 'tour-btn tour-btn-remove';
        }
        
        // Update summary
        updateSelectionSummary();
        
        // Trigger React events
        triggerReactEvents(tourId, title, !isCurrentlySelected);
        
        console.log('Current selections:', Array.from(selectedTours));
    };

    function updateSelectionSummary() {
        const summary = document.querySelector('.tour-override-selected-summary');
        const countElement = document.getElementById('selected-count');
        
        if (summary && countElement) {
            countElement.textContent = selectedTours.size;
            
            if (selectedTours.size > 0) {
                summary.classList.add('has-selections');
                summary.innerHTML = `<span id="selected-count">${selectedTours.size}</span> tour(s) selected`;
            } else {
                summary.classList.remove('has-selections');
            }
        }
    }

    function triggerReactEvents(tourId, title, isSelected) {
        // Dispatch multiple event types to ensure React catches them
        const customEvents = [
            new CustomEvent('tourSelectionChanged', { 
                detail: { tourId, title, isSelected, selectedTours: Array.from(selectedTours) }, 
                bubbles: true 
            }),
            new CustomEvent('tour:multiselect', { 
                detail: { id: tourId, name: title, selected: isSelected, allSelected: Array.from(selectedTours) }, 
                bubbles: true 
            }),
            new CustomEvent('multiTourSelection', { 
                detail: { tourId, title, isSelected, selections: Array.from(selectedTours) }, 
                bubbles: true 
            })
        ];
        
        customEvents.forEach(event => {
            document.dispatchEvent(event);
            document.body.dispatchEvent(event);
            const root = document.getElementById('root');
            if (root) root.dispatchEvent(event);
        });
    }

    // Enhanced initialization
    function init() {
        console.log('Enhanced tour override script initializing...');
        injectOverrideCSS();
        
        // Initial delay to let React render
        setTimeout(() => {
            overrideTourDisplay();
        }, 1500);
        
        // Set up periodic checks for new content
        const intervalId = setInterval(() => {
            const unprocessedContainers = document.querySelectorAll('div[class*="space-y"]:not([data-tour-override-processed="true"])');
            if (unprocessedContainers.length > 0) {
                overrideTourDisplay();
            }
        }, 3000);
        
        // Watch for DOM changes
        let timeoutId;
        const observer = new MutationObserver((mutations) => {
            const hasRelevantChanges = mutations.some(mutation => 
                mutation.type === 'childList' && 
                mutation.addedNodes.length > 0 &&
                Array.from(mutation.addedNodes).some(node => 
                    node.nodeType === 1 && 
                    (node.querySelector && (
                        node.querySelector('h3, button, label, form') ||
                        node.textContent.toLowerCase().includes('budget') ||
                        node.textContent.toLowerCase().includes('contact')
                    ))
                )
            );
            
            if (hasRelevantChanges) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    overrideTourDisplay();
                }, 1000);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
        });
        
        // Watch for route changes
        let currentUrl = window.location.href;
        setInterval(() => {
            if (window.location.href !== currentUrl) {
                currentUrl = window.location.href;
                setTimeout(() => {
                    // Reset on route change
                    selectedTours.clear();
                    document.querySelectorAll('[data-tour-override-processed]').forEach(el => {
                        el.dataset.tourOverrideProcessed = 'false';
                    });
                    overrideTourDisplay();
                }, 2000);
            }
        }, 1000);
        
        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            clearInterval(intervalId);
            observer.disconnect();
        });
        
        console.log('Enhanced tour override script initialized successfully');
    }

    // Start when ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();