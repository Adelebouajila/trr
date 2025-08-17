/**
 * PHP Page Generator Form
 * Creates a form to generate PHP pages for tours with all required fields
 */

class PHPPageForm {
    constructor() {
        this.selectedTour = null;
        this.formData = {
            itinerary: {
                pickupLocation: '',
                arriveBackAt: '',
                mainStops: [],
                mapsLink: ''
            },
            notSuitableFor: [],
            fullDescription: '',
            gygReviews: '',
            faq: [],
            paymentLink: '',
            urlSlug: ''
        };
        this.init();
    }

    init() {
        this.injectStyles();
        // Only initialize on admin pages
        if (this.isAdminPage()) {
            this.addProductPageButton();
        }
    }

    isAdminPage() {
        // More strict admin page detection
        const url = window.location.href.toLowerCase();
        if (url.includes('/admin') || url.includes('admin.php') || url.includes('dashboard')) {
            return true;
        }

        // Check for React admin elements that appear after login
        const reactAdminElements = [
            '[class*="admin"]',
            '#admin-panel', 
            '[data-testid*="admin"]',
            '.admin-container',
            '.dashboard-container'
        ];
        
        for (const selector of reactAdminElements) {
            if (document.querySelector(selector)) {
                return true;
            }
        }

        // Check for "Add New Tour" button specifically (strong admin indicator)
        const buttons = document.querySelectorAll('button');
        for (const button of buttons) {
            const buttonText = button.textContent.trim().toLowerCase();
            if (buttonText.includes('add new tour') || buttonText.includes('create tour')) {
                return true;
            }
        }

        // Look for admin navigation or headings
        const headings = document.querySelectorAll('h1, h2, h3, .title, .heading');
        for (const heading of headings) {
            const text = heading.textContent.toLowerCase();
            if (text.includes('tour management') || 
                text.includes('admin dashboard') || 
                text.includes('manage tours')) {
                return true;
            }
        }
        
        return false;
    }

    findAdminContainer() {
        // Look for admin panel titles and headings first
        const adminTitleSelectors = [
            'h1', 'h2', 'h3', '.title', '.heading', '.header-title', 
            '[class*="title"]', '[class*="heading"]'
        ];
        
        for (const selector of adminTitleSelectors) {
            const elements = document.querySelectorAll(selector);
            for (const element of elements) {
                const text = element.textContent.toLowerCase();
                if (text.includes('tour management') || 
                    text.includes('dashboard') ||
                    text.includes('admin panel') ||
                    text.includes('tour admin') ||
                    text.includes('manage tours') ||
                    text.includes('tour dashboard')) {
                    // Found admin title, place buttons near it
                    return element.parentNode || element;
                }
            }
        }
        
        // Look for containers with admin-like content structure
        const allContainers = document.querySelectorAll('div, section, main, article');
        for (const container of allContainers) {
            const text = container.textContent.toLowerCase();
            const innerHTML = container.innerHTML.toLowerCase();
            
            // Check for admin panel indicators
            if ((text.includes('tour') && text.includes('management')) ||
                (text.includes('admin') && text.includes('tour')) ||
                (innerHTML.includes('add') && innerHTML.includes('tour') && innerHTML.includes('edit'))) {
                
                // Additional validation: should have buttons or form elements
                const hasButtons = container.querySelectorAll('button').length > 0;
                const hasForms = container.querySelectorAll('form, input').length > 0;
                
                if (hasButtons || hasForms) {
                    return container;
                }
            }
        }
        
        // Fallback: Look for "Add New Tour" button as last resort
        const addNewTourButton = this.findAddNewTourButton();
        if (addNewTourButton) {
            return addNewTourButton.parentNode;
        }
        
        // If no admin context found, return null
        return null;
    }
    
    findAddNewTourButton() {
        const buttons = document.querySelectorAll('button');
        for (const button of buttons) {
            if (button.textContent.trim().includes('Add New Tour')) {
                return button;
            }
        }
        return null;
    }
    

    
    getDefaultButtonClasses() {
        // Return default button classes that work universally
        return 'btn btn-primary admin-button';
    }

    injectStyles() {
        if (document.getElementById('php-page-form-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'php-page-form-styles';
        styles.textContent = `
            .php-page-form-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                backdrop-filter: blur(5px);
            }

            .php-page-form {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 900px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.3s ease-out;
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .php-form-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 12px 12px 0 0;
                text-align: center;
            }

            .php-form-header h2 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }

            .php-form-content {
                padding: 30px;
            }

            .form-section {
                margin-bottom: 30px;
                border: 1px solid #e1e5e9;
                border-radius: 8px;
                padding: 20px;
                background: #f8f9fa;
            }

            .form-section h3 {
                margin: 0 0 15px 0;
                color: #333;
                font-size: 18px;
                font-weight: 600;
                border-bottom: 2px solid #667eea;
                padding-bottom: 8px;
            }

            .form-group {
                margin-bottom: 20px;
            }

            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: #333;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 12px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 14px;
                transition: border-color 0.3s ease;
            }

            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }

            .form-group textarea {
                min-height: 100px;
                max-height: 300px;
                resize: vertical;
                overflow-y: auto;
                word-wrap: break-word;
                overflow-wrap: break-word;
                box-sizing: border-box;
            }

            /* Enhanced styling for full description textarea and French detailed description */
            textarea[name="full_description"],
            #full_description,
            textarea[name="detailed_description_fr"],
            #detailed_description_fr {
                min-height: 150px !important;
                max-height: 350px !important;
                height: 200px !important;
                overflow-y: auto !important;
                overflow-x: hidden !important;
                word-wrap: break-word !important;
                white-space: pre-wrap !important;
                resize: vertical !important;
                border: 2px solid #e1e5e9 !important;
                border-radius: 8px !important;
                padding: 15px !important;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                font-size: 14px !important;
                line-height: 1.5 !important;
                background: #fafbfc !important;
                transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
            }

            /* Focus state for full description and French detailed description */
            textarea[name="full_description"]:focus,
            #full_description:focus,
            textarea[name="detailed_description_fr"]:focus,
            #detailed_description_fr:focus {
                border-color: #667eea !important;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
                background: white !important;
                outline: none !important;
            }

            /* Custom scrollbar for description textarea and French detailed description */
            textarea[name="full_description"]::-webkit-scrollbar,
            #full_description::-webkit-scrollbar,
            textarea[name="detailed_description_fr"]::-webkit-scrollbar,
            #detailed_description_fr::-webkit-scrollbar {
                width: 8px;
            }

            textarea[name="full_description"]::-webkit-scrollbar-track,
            #full_description::-webkit-scrollbar-track,
            textarea[name="detailed_description_fr"]::-webkit-scrollbar-track,
            #detailed_description_fr::-webkit-scrollbar-track {
                background: #f1f3f4;
                border-radius: 4px;
            }

            textarea[name="full_description"]::-webkit-scrollbar-thumb,
            #full_description::-webkit-scrollbar-thumb,
            textarea[name="detailed_description_fr"]::-webkit-scrollbar-thumb,
            #detailed_description_fr::-webkit-scrollbar-thumb {
                background: #c1c8cd;
                border-radius: 4px;
            }

            textarea[name="full_description"]::-webkit-scrollbar-thumb:hover,
            #full_description::-webkit-scrollbar-thumb:hover,
            textarea[name="detailed_description_fr"]::-webkit-scrollbar-thumb:hover,
            #detailed_description_fr::-webkit-scrollbar-thumb:hover {
                background: #a8b2b9;
            }

            /* Firefox scrollbar styling */
            textarea[name="full_description"],
            #full_description,
            textarea[name="detailed_description_fr"],
            #detailed_description_fr {
                scrollbar-width: thin;
                scrollbar-color: #c1c8cd #f1f3f4;
            }

            .dynamic-list {
                border: 1px solid #ddd;
                border-radius: 6px;
                padding: 15px;
                background: white;
            }

            .dynamic-item {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                padding: 8px;
                background: #f1f3f4;
                border-radius: 4px;
            }

            .dynamic-item input {
                flex: 1;
                margin: 0 10px 0 0;
                border: none;
                background: transparent;
                padding: 4px;
            }

            .dynamic-item input:focus {
                background: white;
                border: 1px solid #667eea;
            }

            .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
                text-decoration: none;
                display: inline-block;
                text-align: center;
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
                background: #6c757d;
                color: white;
            }

            .btn-secondary:hover {
                background: #5a6268;
            }

            .btn-success {
                background: #28a745;
                color: white;
            }

            .btn-success:hover {
                background: #218838;
            }

            .btn-danger {
                background: #dc3545;
                color: white;
                padding: 5px 10px;
                font-size: 12px;
            }

            .btn-danger:hover {
                background: #c82333;
            }

            .btn-small {
                padding: 6px 12px;
                font-size: 12px;
            }

            .form-actions {
                display: flex;
                justify-content: space-between;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e1e5e9;
            }

            .faq-item {
                background: white;
                border: 1px solid #ddd;
                border-radius: 6px;
                padding: 15px;
                margin-bottom: 15px;
            }

            .faq-item h4 {
                margin: 0 0 10px 0;
                color: #333;
            }

            .faq-editor-item {
                background: #f8f9fa;
                border: 2px solid #e1e5e9;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 20px;
                position: relative;
            }

            .faq-editor-item h4 {
                background: #667eea;
                color: white;
                margin: -20px -20px 15px -20px;
                padding: 10px 20px;
                border-radius: 6px 6px 0 0;
                font-size: 14px;
                font-weight: 600;
            }

            .faq-editor-item label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: #333;
            }

            .faq-editor-item input,
            .faq-editor-item textarea {
                width: 100%;
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 6px;
                font-size: 14px;
                margin-bottom: 15px;
                transition: border-color 0.2s ease;
            }

            .faq-editor-item input:focus,
            .faq-editor-item textarea:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }

            .faq-editor-item textarea {
                min-height: 80px;
                resize: vertical;
                font-family: inherit;
            }

            .tour-selector {
                background: white;
                border: 1px solid #ddd;
                border-radius: 6px;
                padding: 15px;
                margin-bottom: 20px;
            }

            .tour-option {
                display: flex;
                align-items: center;
                padding: 10px;
                border-radius: 4px;
                cursor: pointer;
                transition: background 0.2s ease;
            }

            .tour-option:hover {
                background: #f8f9fa;
            }

            .tour-option.selected {
                background: #e3f2fd;
                border: 1px solid #2196f3;
            }

            .tour-option input[type="radio"] {
                margin-right: 10px;
                width: auto;
            }

            .tour-info {
                flex: 1;
            }

            .tour-title {
                font-weight: 600;
                color: #333;
                margin-bottom: 4px;
            }

            .tour-details {
                font-size: 12px;
                color: #666;
            }

            .loading {
                text-align: center;
                padding: 20px;
                color: #666;
            }

            .success-message {
                background: #d4edda;
                color: #155724;
                padding: 15px;
                border-radius: 6px;
                margin-bottom: 20px;
                border: 1px solid #c3e6cb;
            }

            .error-message {
                background: #f8d7da;
                color: #721c24;
                padding: 15px;
                border-radius: 6px;
                margin-bottom: 20px;
                border: 1px solid #f5c6cb;
            }

            /* Independent button styling */
            .admin-button {
                background: #667eea;
                color: white;
                border: none;
                padding: 10px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
                font-size: 14px;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                text-decoration: none;
                box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
            }

            .admin-button:hover {
                background: #5a67d8;
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
            }

            .admin-button:active {
                transform: translateY(0);
                box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
            }

            .admin-button svg {
                margin-right: 8px;
                width: 16px;
                height: 16px;
            }

            /* Fixed container specific styles */
            #php-form-buttons-container .admin-buttons-container {
                gap: 12px;
                margin: 0;
            }

            #php-form-buttons-container .admin-button {
                font-size: 13px;
                padding: 8px 12px;
            }
        `;

        document.head.appendChild(styles);
    }

    addProductPageButton() {
        console.log('🔍 Looking for admin panel to add all page generation buttons...');
        
        // Debug: Log what we can see on the page
        const titles = document.querySelectorAll('h1, h2, h3, .title, .heading');
        console.log('📝 Found page titles:', Array.from(titles).map(t => t.textContent.trim()).slice(0, 5));

        // Check if buttons already exist
        if (document.getElementById('add-product-page-btn') || 
            document.getElementById('add-fr-page-btn') || 
            document.getElementById('add-it-page-btn') || 
            document.getElementById('add-gr-page-btn')) {
            console.log('✅ Page generation buttons already exist');
            return;
        }

        // Look for admin container - only show buttons in admin panel
        let targetContainer = this.findAdminContainer();
        
        if (!targetContainer) {
            console.log('❌ Admin container not found, stopping (not in admin panel)');
            return;
        }

        console.log('✅ Found admin container for buttons');

        // Add responsive CSS for button container
        if (!document.getElementById('admin-buttons-responsive-styles')) {
            const responsiveStyles = document.createElement('style');
            responsiveStyles.id = 'admin-buttons-responsive-styles';
            responsiveStyles.textContent = `
                .admin-layout-enhanced {
                    display: flex !important;
                    flex-direction: row !important;
                    flex-wrap: wrap !important;
                    align-items: flex-start !important;
                    gap: 0 !important;
                }

                .admin-buttons-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-left: 12px;
                    align-items: center;
                }

                @media (max-width: 768px) {
                    .admin-layout-enhanced {
                        flex-direction: column !important;
                        align-items: stretch !important;
                    }

                    .admin-buttons-container {
                        margin-left: 0 !important;
                        margin-top: 12px !important;
                        width: 100% !important;
                        justify-content: flex-start;
                        order: 2;
                    }

                    .admin-buttons-container button {
                        font-size: 14px !important;
                        padding: 8px 12px !important;
                        min-width: auto !important;
                    }

                    .admin-buttons-container svg {
                        width: 14px !important;
                        height: 14px !important;
                        margin-right: 6px !important;
                    }
                }

                @media (max-width: 480px) {
                    .admin-buttons-container {
                        gap: 6px !important;
                        flex-direction: column !important;
                        align-items: stretch !important;
                    }

                    .admin-buttons-container button {
                        font-size: 12px !important;
                        padding: 8px 12px !important;
                        width: 100% !important;
                        min-width: 0 !important;
                        margin-bottom: 6px !important;
                    }

                    .admin-buttons-container svg {
                        width: 12px !important;
                        height: 12px !important;
                        margin-right: 4px !important;
                    }
                }
            `;
            document.head.appendChild(responsiveStyles);
        }

        // Create a responsive button container
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'admin-buttons-container';

        // Create the Product Page button with default styling
        const productPageButton = document.createElement('button');
        productPageButton.id = 'add-product-page-btn';
        productPageButton.className = this.getDefaultButtonClasses();
        productPageButton.style.cssText = `
            margin: 0;
            white-space: nowrap;
            min-width: fit-content;
        `;
        productPageButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
            </svg>
            Add Product Page
        `;

        productPageButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🚀 Product Page button clicked');
            this.openForm();
        });

        // Create the additional language page buttons (placeholders)
        const frPageButton = document.createElement('button');
        frPageButton.id = 'add-fr-page-btn';
        frPageButton.className = this.getDefaultButtonClasses();
        frPageButton.style.cssText = `
            margin: 0;
            white-space: nowrap;
            min-width: fit-content;
        `;
        frPageButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            FR page
        `;

        const itPageButton = document.createElement('button');
        itPageButton.id = 'add-it-page-btn';
        itPageButton.className = this.getDefaultButtonClasses();
        itPageButton.style.cssText = `
            margin: 0;
            white-space: nowrap;
            min-width: fit-content;
        `;
        itPageButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            IT page
        `;

        const grPageButton = document.createElement('button');
        grPageButton.id = 'add-gr-page-btn';
        grPageButton.className = this.getDefaultButtonClasses();
        grPageButton.style.cssText = `
            margin: 0;
            white-space: nowrap;
            min-width: fit-content;
        `;
        grPageButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            GR page
        `;

        // Add translation form event listener
        frPageButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.openTranslationForm();
        });

        itPageButton.addEventListener('click', (e) => {
            e.preventDefault();
            alert('IT page generation feature coming soon!');
        });

        grPageButton.addEventListener('click', (e) => {
            e.preventDefault();
            alert('GR page generation feature coming soon!');
        });

        // Add all buttons to the container
        buttonContainer.appendChild(productPageButton);
        buttonContainer.appendChild(frPageButton);
        buttonContainer.appendChild(itPageButton);
        buttonContainer.appendChild(grPageButton);

        // Insert the button container into the target container
        targetContainer.appendChild(buttonContainer);

        // Add layout styling to the target container if it's not a fixed container
        if (targetContainer.id !== 'php-form-buttons-container' && !targetContainer.classList.contains('admin-layout-enhanced')) {
            targetContainer.classList.add('admin-layout-enhanced');
            targetContainer.style.cssText += `
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: flex-start;
                gap: 0;
            `;
        }

        console.log('✅ All buttons added successfully: "Add Product Page", "FR page", "IT page", "GR page"');
    }

    async openForm() {
        // Fetch available tours
        const tours = await this.fetchTours();
        this.showForm(tours);
    }

    async fetchTours() {
        try {
            const response = await fetch('/api/tours');
            const tours = await response.json();
            return tours;
        } catch (error) {
            console.error('Error fetching tours:', error);
            return [];
        }
    }

    showForm(tours) {
        const formContainer = document.createElement('div');
        formContainer.className = 'php-page-form-container';
        formContainer.innerHTML = `
            <div class="php-page-form">
                <div class="php-form-header">
                    <h2>Create Product Page</h2>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">Generate a modern PHP page for your tour</p>
                </div>
                <div class="php-form-content">
                    ${this.generateFormHTML(tours)}
                </div>
            </div>
        `;

        document.body.appendChild(formContainer);
        this.bindFormEvents(formContainer);

        // Close form when clicking outside
        formContainer.addEventListener('click', (e) => {
            if (e.target === formContainer) {
                this.closeForm();
            }
        });
    }

    generateFormHTML(tours) {
        return `
            <form id="php-page-form">
                <!-- Tour Selection -->
                <div class="form-section">
                    <h3>1. Select Tour</h3>
                    <div class="tour-selector">
                        ${tours.length > 0 ? tours.map(tour => `
                            <div class="tour-option" data-tour-id="${tour.id}">
                                <input type="radio" name="selected_tour" value="${tour.id}" id="tour_${tour.id}">
                                <div class="tour-info">
                                    <div class="tour-title">${tour.title}</div>
                                    <div class="tour-details">${tour.city} • ${tour.duration} days • €${tour.price} • ${tour.type}</div>
                                </div>
                            </div>
                        `).join('') : '<div class="loading">No tours available</div>'}
                    </div>
                </div>

                <!-- Itinerary Section -->
                <div class="form-section">
                    <h3>2. Itinerary Details</h3>
                    <div class="form-group">
                        <label for="pickup_location">Pickup Location *</label>
                        <input type="text" id="pickup_location" name="pickup_location" placeholder="Enter pickup location" required>
                    </div>
                    <div class="form-group">
                        <label for="arrive_back_at">Arrive Back At *</label>
                        <input type="text" id="arrive_back_at" name="arrive_back_at" placeholder="Enter return location" required>
                    </div>
                    <div class="form-group">
                        <label>Main Stops</label>
                        <div class="dynamic-list" id="main_stops_list">
                            <div class="dynamic-item">
                                <input type="text" placeholder="Enter main stop" name="main_stops[]">
                                <button type="button" class="btn btn-danger btn-small" onclick="this.parentElement.remove()">Remove</button>
                            </div>
                        </div>
                        <button type="button" class="btn btn-secondary btn-small" onclick="phpPageForm.addMainStop()">Add Main Stop</button>
                    </div>
                    <div class="form-group">
                        <label for="maps_link">Google Maps Itinerary Link</label>
                        <input type="url" id="maps_link" name="maps_link" placeholder="https://maps.google.com/...">
                    </div>
                </div>

                <!-- Additional Information -->
                <div class="form-section">
                    <h3>3. Additional Information</h3>
                    <div class="form-group">
                        <label>Not Suitable For</label>
                        <div class="dynamic-list" id="not_suitable_list">
                            <div class="dynamic-item">
                                <input type="text" placeholder="e.g., Pregnant women" name="not_suitable[]">
                                <button type="button" class="btn btn-danger btn-small" onclick="this.parentElement.remove()">Remove</button>
                            </div>
                        </div>
                        <button type="button" class="btn btn-secondary btn-small" onclick="phpPageForm.addNotSuitable()">Add Item</button>
                    </div>
                    <div class="form-group">
                        <label for="full_description">Full Description</label>
                        <textarea id="full_description" name="full_description" placeholder="Enter detailed description with any reference links..."></textarea>
                    </div>
                </div>

                <!-- Reviews and FAQ -->
                <div class="form-section">
                    <h3>4. Reviews & FAQ</h3>
                    <div class="form-group" style="border: 2px solid #007bff; border-radius: 8px; padding: 15px; background: #f8fbff;">
                        <label for="gyg_reviews" style="color: #007bff; font-weight: bold;">🎫 GetYourGuide Reviews Link</label>
                        <input type="url" id="gyg_reviews" name="gyg_reviews" placeholder="https://www.getyourguide.com/..." style="border: 2px solid #007bff;">
                        <small style="color: #007bff; display: block; margin-top: 5px; font-weight: 600;">Link to GetYourGuide reviews page</small>
                    </div>
                    <div class="form-group" style="border: 2px solid #28a745; border-radius: 8px; padding: 15px; background: #f8fff9;">
                        <label for="tripadvisor_reviews" style="color: #28a745; font-weight: bold;">🌍 TripAdvisor Reviews Link</label>
                        <input type="url" id="tripadvisor_reviews" name="tripadvisor_reviews" placeholder="https://www.tripadvisor.com/..." style="border: 2px solid #28a745;">
                        <small style="color: #28a745; display: block; margin-top: 5px; font-weight: 600;">Link to TripAdvisor reviews page</small>
                    </div>
                    <div class="form-group">
                        <label>FAQ Section</label>
                        <div id="faq_list">
                            <div class="faq-item">
                                <h4>FAQ Item 1</h4>
                                <input type="text" placeholder="Question" name="faq_questions[]" style="margin-bottom: 10px;">
                                <textarea placeholder="Answer (plain text only)" name="faq_answers[]" style="font-family: Arial, sans-serif; resize: vertical;"></textarea>
                                <button type="button" class="btn btn-danger btn-small" onclick="this.parentElement.remove()" style="margin-top: 10px;">Remove FAQ</button>
                            </div>
                        </div>
                        <button type="button" class="btn btn-secondary btn-small" onclick="phpPageForm.addFAQ()">Add FAQ</button>
                    </div>
                </div>

                <!-- Payment and SEO -->
                <div class="form-section">
                    <h3>5. Payment & SEO</h3>
                    <div class="form-group">
                        <label for="payment_link">Payment Gateway Link *</label>
                        <input type="url" id="payment_link" name="payment_link" placeholder="https://payment-gateway.com/..." required>
                    </div>
                    <div class="form-group">
                        <label for="url_slug">URL Slug for SEO *</label>
                        <input type="text" id="url_slug" name="url_slug" placeholder="e.g., grand-tunisia-tour" required>
                        <small style="color: #666; display: block; margin-top: 5px;">Use lowercase letters, numbers, and hyphens only</small>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="phpPageForm.closeForm()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Generate PHP Page</button>
                </div>
            </form>
        `;
    }

    bindFormEvents(container) {
        const form = container.querySelector('#php-page-form');

        // Tour selection
        const tourOptions = container.querySelectorAll('.tour-option');
        tourOptions.forEach(option => {
            option.addEventListener('click', () => {
                tourOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                option.querySelector('input[type="radio"]').checked = true;
                this.selectedTour = option.dataset.tourId;

                // Auto-generate URL slug based on tour title
                const tourTitle = option.querySelector('.tour-title').textContent;
                const slug = this.generateSlug(tourTitle);
                container.querySelector('#url_slug').value = slug;
            });
        });

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmission(form);
        });
    }

    addMainStop() {
        const list = document.getElementById('main_stops_list');
        const item = document.createElement('div');
        item.className = 'dynamic-item';
        item.innerHTML = `
            <input type="text" placeholder="Enter main stop" name="main_stops[]">
            <button type="button" class="btn btn-danger btn-small" onclick="this.parentElement.remove()">Remove</button>
        `;
        list.appendChild(item);
    }

    addNotSuitable() {
        const list = document.getElementById('not_suitable_list');
        const item = document.createElement('div');
        item.className = 'dynamic-item';
        item.innerHTML = `
            <input type="text" placeholder="e.g., People with mobility issues" name="not_suitable[]">
            <button type="button" class="btn btn-danger btn-small" onclick="this.parentElement.remove()">Remove</button>
        `;
        list.appendChild(item);
    }

    addFAQ() {
        const list = document.getElementById('faq_list');
        const faqCount = list.children.length + 1;
        const item = document.createElement('div');
        item.className = 'faq-item';
        item.innerHTML = `
            <h4>FAQ Item ${faqCount}</h4>
            <input type="text" placeholder="Question" name="faq_questions[]" style="margin-bottom: 10px;">
            <textarea placeholder="Answer" name="faq_answers[]"></textarea>
            <button type="button" class="btn btn-danger btn-small" onclick="this.parentElement.remove()" style="margin-top: 10px;">Remove FAQ</button>
        `;
        list.appendChild(item);
    }

    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    async handleFormSubmission(form) {
        const formData = new FormData(form);

        if (!this.selectedTour) {
            this.showMessage('Please select a tour', 'error');
            return;
        }

        // Collect form data
        const data = {
            tourId: this.selectedTour,
            itinerary: {
                pickupLocation: formData.get('pickup_location'),
                arriveBackAt: formData.get('arrive_back_at'),
                mainStops: formData.getAll('main_stops[]').filter(stop => stop.trim()),
                mapsLink: formData.get('maps_link')
            },
            notSuitableFor: formData.getAll('not_suitable[]').filter(item => item.trim()),
            fullDescription: formData.get('full_description'),
            gygReviews: formData.get('gyg_reviews'),
            tripadvisorReviews: formData.get('tripadvisor_reviews'),
            faq: this.collectFAQData(form),
            paymentLink: formData.get('payment_link'),
            urlSlug: formData.get('url_slug')
        };

        try {
            this.showMessage('Generating PHP page...', 'loading');

            const response = await fetch('/api/generate-php-page', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                this.showMessage(`PHP page generated successfully! File: ${result.filename}`, 'success');
                setTimeout(() => this.closeForm(), 2000);
            } else {
                this.showMessage(result.error || 'Failed to generate PHP page', 'error');
            }
        } catch (error) {
            console.error('Error generating PHP page:', error);
            this.showMessage('Error generating PHP page: ' + error.message, 'error');
        }
    }

    collectFAQData(form) {
        const questions = form.querySelectorAll('input[name="faq_questions[]"]');
        const answers = form.querySelectorAll('textarea[name="faq_answers[]"]');
        const faq = [];

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i].value.trim();
            const answer = answers[i].value.trim();
            if (question && answer) {
                faq.push({ question, answer });
            }
        }

        return faq;
    }

    showMessage(message, type) {
        const container = document.querySelector('.php-form-content');
        let messageDiv = container.querySelector('.message');

        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            container.insertBefore(messageDiv, container.firstChild);
        }

        messageDiv.className = `message ${type === 'error' ? 'error-message' : type === 'success' ? 'success-message' : 'loading'}`;
        messageDiv.textContent = message;

        if (type !== 'loading') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }

    closeForm() {
        const container = document.querySelector('.php-page-form-container');
        if (container) {
            container.remove();
        }
    }

    // New translation form functionality
    async openTranslationForm() {
        // Fetch available PHP files from prodpage directory
        const phpFiles = await this.fetchPHPFiles();
        this.showTranslationForm(phpFiles);
    }

    async fetchPHPFiles() {
        try {
            const response = await fetch('/api/get-php-files');
            const files = await response.json();
            return files;
        } catch (error) {
            console.error('Error fetching PHP files:', error);
            return [];
        }
    }

    showTranslationForm(phpFiles) {
        const formContainer = document.createElement('div');
        formContainer.className = 'php-page-form-container';
        formContainer.innerHTML = `
            <div class="php-page-form">
                <div class="php-form-header">
                    <h2>French Translation Form</h2>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">Translate existing PHP tour page to French</p>
                </div>
                <div class="php-form-content">
                    <form id="translation-form">
                        <div class="form-section">
                            <h3>Select PHP File to Translate</h3>
                            <div class="form-group">
                                <label for="php_file_select">Choose PHP File *</label>
                                <select id="php_file_select" name="php_file" required>
                                    <option value="">Select a PHP file...</option>
                                    ${phpFiles.map(file => `<option value="${file}">${file}</option>`).join('')}
                                </select>
                                <button type="button" id="load-content-btn" class="btn btn-secondary btn-small" style="margin-top: 10px;">Load Content for Translation</button>
                            </div>
                        </div>

                        <div id="translation-sections" style="display: none;">
                            <!-- Translation sections will be loaded here -->
                        </div>

                        <div class="form-actions" id="form-actions" style="display: none;">
                            <button type="button" class="btn btn-secondary" onclick="phpPageForm.closeTranslationForm()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Generate French Page</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(formContainer);
        this.bindTranslationFormEvents(formContainer);
    }

    bindTranslationFormEvents(container) {
        const loadBtn = container.querySelector('#load-content-btn');
        const form = container.querySelector('#translation-form');
        const fileSelect = container.querySelector('#php_file_select');

        loadBtn.addEventListener('click', async () => {
            const selectedFile = fileSelect.value;
            if (!selectedFile) {
                alert('Please select a PHP file first');
                return;
            }

            this.showTranslationMessage('Loading content for translation...', 'loading');
            await this.loadFileContent(selectedFile);
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.submitTranslation(form);
        });
    }

    async loadFileContent(filename) {
        try {
            const response = await fetch('/api/parse-php-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename })
            });

            const result = await response.json();

            if (response.ok) {
                this.showTranslationSections(result.sections);
                this.showTranslationMessage('Content loaded successfully! You can now edit the translations.', 'success');
            } else {
                this.showTranslationMessage(result.error || 'Failed to load content', 'error');
            }
        } catch (error) {
            console.error('Error loading file content:', error);
            this.showTranslationMessage('Error loading content: ' + error.message, 'error');
        }
    }

    showTranslationSections(sections) {
        const sectionsContainer = document.querySelector('#translation-sections');
        const formActions = document.querySelector('#form-actions');

        sectionsContainer.innerHTML = `
            <div class="form-section">
                <h3>Translation Sections</h3>
                <p style="color: #666; margin-bottom: 20px;">Edit the content below to translate from English to French. The original English text is pre-filled for you to modify.</p>

                <div class="form-group">
                    <label for="tour_title_fr">Tour Title (French) *</label>
                    <input type="text" id="tour_title_fr" name="tour_title_fr" required value="${sections.tourTitle || ''}" placeholder="Enter the French tour title">
                </div>

                <div class="form-group">
                    <label for="about_tour_fr">About This Tour (French) *</label>
                    <textarea id="about_tour_fr" name="about_tour_fr" required>${sections.aboutTour || ''}</textarea>
                </div>

                <div class="form-group">
                    <label for="tour_highlights_fr">Tour Highlights (French) *</label>
                    <textarea id="tour_highlights_fr" name="tour_highlights_fr" required>${sections.tourHighlights || ''}</textarea>
                </div>

                <div class="form-group">
                    <label for="whats_included_fr">What's Included (French) *</label>
                    <textarea id="whats_included_fr" name="whats_included_fr" required>${sections.whatsIncluded || ''}</textarea>
                </div>

                <div class="form-group">
                    <label for="whats_not_included_fr">What's Not Included (French) *</label>
                    <textarea id="whats_not_included_fr" name="whats_not_included_fr" required>${sections.whatsNotIncluded || ''}</textarea>
                </div>

                <div class="form-group">
                    <label for="not_suitable_for_fr">Not Suitable For (French)</label>
                    <textarea id="not_suitable_for_fr" name="not_suitable_for_fr">${sections.notSuitableFor || ''}</textarea>
                </div>

                <div class="form-group">
                    <label for="detailed_description_fr">Detailed Description (French) *</label>
                    <textarea id="detailed_description_fr" name="detailed_description_fr" required placeholder="Enter detailed description with any reference links...">${sections.detailedDescription || ''}</textarea>
                </div>

                <div class="form-group">
                    <label>Frequently Asked Questions (French) *</label>
                    <div id="faq_fr_container">
                        ${this.buildFAQEditor(sections.faq)}
                    </div>
                    <input type="hidden" id="faq_fr" name="faq_fr" />
                </div>
            </div>

            <div class="form-section">
                <h3>SEO URL</h3>
                <div class="form-group">
                    <label for="custom_filename">Custom French Filename (Optional)</label>
                    <input type="text" id="custom_filename" name="custom_filename" placeholder="e.g., nuit-sous-tente-dans-le-desert.php">
                    <small style="color: #666; display: block; margin-top: 5px;">Leave empty to use original filename. Use lowercase letters, numbers, and hyphens only.</small>
                </div>
            </div>
        `;

        sectionsContainer.style.display = 'block';
        formActions.style.display = 'flex';
        
        // Update FAQ hidden field when form is submitted
        this.updateFAQHiddenField();
    }

    buildFAQEditor(faqText) {
        if (!faqText) return '<p style="color: #666; font-style: italic;">No FAQ items found in the original content.</p>';
        
        // Parse FAQ text (Q: ... A: ... format)
        const faqPairs = faqText.split('\n\n').filter(pair => pair.trim());
        
        if (faqPairs.length === 0) {
            return '<p style="color: #666; font-style: italic;">No FAQ items found in the original content.</p>';
        }
        
        let editorHTML = '';
        
        faqPairs.forEach((pair, index) => {
            const lines = pair.split('\n');
            let question = '';
            let answer = '';
            
            lines.forEach(line => {
                if (line.startsWith('Q:')) {
                    question = line.substring(2).trim();
                } else if (line.startsWith('A:')) {
                    answer = line.substring(2).trim();
                }
            });
            
            editorHTML += `
                <div class="faq-editor-item">
                    <h4>FAQ Item ${index + 1}</h4>
                    <label for="faq_question_${index}">Question (French):</label>
                    <input type="text" id="faq_question_${index}" 
                           data-faq-index="${index}" 
                           data-faq-type="question"
                           value="${question}" 
                           placeholder="Enter the question in French..." 
                           onchange="phpPageForm.updateFAQHiddenField()">
                    
                    <label for="faq_answer_${index}">Answer (French):</label>
                    <textarea id="faq_answer_${index}" 
                              data-faq-index="${index}" 
                              data-faq-type="answer"
                              placeholder="Enter the answer in French..." 
                              onchange="phpPageForm.updateFAQHiddenField()">${answer}</textarea>
                </div>
            `;
        });
        
        return editorHTML;
    }

    updateFAQHiddenField() {
        const container = document.getElementById('faq_fr_container');
        const hiddenField = document.getElementById('faq_fr');
        
        if (!container || !hiddenField) return;
        
        const faqItems = [];
        const questionInputs = container.querySelectorAll('input[data-faq-type="question"]');
        const answerInputs = container.querySelectorAll('textarea[data-faq-type="answer"]');
        
        questionInputs.forEach((questionInput, index) => {
            const answerInput = answerInputs[index];
            const question = questionInput.value.trim();
            const answer = answerInput ? answerInput.value.trim() : '';
            
            if (question && answer) {
                faqItems.push({ question, answer });
            }
        });
        
        // Set the hidden field value as JSON for the server to handle
        hiddenField.value = JSON.stringify(faqItems);
    }

    async submitTranslation(form) {
        try {
            // Update FAQ hidden field before submitting
            this.updateFAQHiddenField();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Parse FAQ JSON if it exists
            if (data.faq_fr) {
                try {
                    data.faq_fr = JSON.parse(data.faq_fr);
                } catch (e) {
                    console.warn('Could not parse FAQ JSON, using as string:', e);
                }
            }

            this.showTranslationMessage('Generating French PHP page...', 'loading');

            const response = await fetch('/api/generate-french-page', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                this.showTranslationMessage(`French page generated successfully! File: ${result.filename}`, 'success');
                setTimeout(() => this.closeTranslationForm(), 3000);
            } else {
                this.showTranslationMessage(result.error || 'Failed to generate French page', 'error');
            }
        } catch (error) {
            console.error('Error generating French page:', error);
            this.showTranslationMessage('Error generating French page: ' + error.message, 'error');
        }
    }

    showTranslationMessage(message, type) {
        const container = document.querySelector('.php-form-content');
        let messageDiv = container.querySelector('.translation-message');

        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.className = 'translation-message';
            container.insertBefore(messageDiv, container.firstChild);
        }

        messageDiv.className = `translation-message ${type === 'error' ? 'error-message' : type === 'success' ? 'success-message' : 'loading'}`;
        messageDiv.textContent = message;

        if (type !== 'loading') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }

    closeTranslationForm() {
        const container = document.querySelector('.php-page-form-container');
        if (container) {
            container.remove();
        }
    }
}

// Initialize the PHP page form
const phpPageForm = new PHPPageForm();

// Make it globally available
window.phpPageForm = phpPageForm;