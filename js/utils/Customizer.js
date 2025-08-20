/**
 * Customizer Utility
 * Handles the customization of editable content and product selection
 */
class Customizer {
    constructor() {
        this.config = this.loadConfigFromStorage();
        this.isEditMode = false;
        this.init();
    }

    init() {
        this.createCustomizerPanel();
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Listen for customizer toggle
        document.addEventListener('keydown', (e) => {
            // Press Ctrl+E to toggle customizer
            if (e.ctrlKey && e.key === 'e') {
                e.preventDefault();
                this.toggleCustomizer();
            }
        });

        // Listen for escape key to close customizer
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isEditMode) {
                this.closeCustomizer();
            }
        });
    }

    createCustomizerPanel() {
        const customizer = document.createElement('div');
        customizer.id = 'customizer-panel';
        customizer.className = 'customizer-panel';
        customizer.style.display = 'none';
        
        customizer.innerHTML = `
            <div class="customizer-header">
                <h3>Content Customizer</h3>
                <button class="customizer-close" id="customizer-close">✕</button>
            </div>
            <div class="customizer-content">
                <div class="customizer-section">
                    <h4>Banner Settings</h4>
                    <div class="form-group">
                        <label>Brand Name:</label>
                        <input type="text" id="brand-name-input" placeholder="TISSO VISON">
                    </div>
                    <div class="form-group">
                        <label>Top Banner Text:</label>
                        <input type="text" id="top-banner-text-input" placeholder="Find the ideal gift...">
                    </div>
                    <div class="form-group">
                        <label>Button Text:</label>
                        <input type="text" id="banner-button-text-input" placeholder="CHOOSE GIFT">
                    </div>
                    <div class="form-group">
                        <label>Hero Title:</label>
                        <input type="text" id="hero-title-input" placeholder="The Gift Guide">
                    </div>
                    <div class="form-group">
                        <label>Hero Description:</label>
                        <textarea id="hero-description-input" placeholder="Discover Joy..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Shop Button Text:</label>
                        <input type="text" id="shop-button-text-input" placeholder="SHOP NOW">
                    </div>
                    <div class="form-group">
                        <label>Sustainable Message:</label>
                        <textarea id="sustainable-message-input" placeholder="SUSTAINABLE, ETHICALLY MADE..."></textarea>
                    </div>
                </div>
                
                <div class="customizer-section">
                    <h4>Product Grid Settings</h4>
                    <div class="form-group">
                        <label>Section Title:</label>
                        <input type="text" id="section-title-input" placeholder="Tisso vison in the wild">
                    </div>
                    <div class="form-group">
                        <label>Product Selection:</label>
                        <div id="product-selection">
                            <!-- Product checkboxes will be generated here -->
                        </div>
                    </div>
                </div>
                
                <div class="customizer-actions">
                    <button class="btn btn-primary" id="save-customizer">Save Changes</button>
                    <button class="btn btn-secondary" id="reset-customizer">Reset to Default</button>
                    <button class="btn btn-secondary" id="export-config">Export Config</button>
                    <button class="btn btn-secondary" id="import-config">Import Config</button>
                    <input type="file" id="config-file-input" accept=".json" style="display: none;">
                </div>
            </div>
        `;

        document.body.appendChild(customizer);

        // Add customizer toggle button
        this.createCustomizerToggle();

        // Attach panel event listeners
        this.attachPanelEventListeners();
    }

    createCustomizerToggle() {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'customizer-toggle';
        toggleBtn.className = 'customizer-toggle';
        toggleBtn.innerHTML = '⚙️';
        toggleBtn.title = 'Open Customizer (Ctrl+E)';
        
        Object.assign(toggleBtn.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#333',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            zIndex: '9999',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
        });

        toggleBtn.addEventListener('click', () => {
            this.toggleCustomizer();
        });

        toggleBtn.addEventListener('mouseenter', () => {
            toggleBtn.style.transform = 'scale(1.1)';
        });

        toggleBtn.addEventListener('mouseleave', () => {
            toggleBtn.style.transform = 'scale(1)';
        });

        document.body.appendChild(toggleBtn);
    }

    attachPanelEventListeners() {
        const closeBtn = document.getElementById('customizer-close');
        const saveBtn = document.getElementById('save-customizer');
        const resetBtn = document.getElementById('reset-customizer');
        const exportBtn = document.getElementById('export-config');
        const importBtn = document.getElementById('import-config');
        const fileInput = document.getElementById('config-file-input');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeCustomizer();
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveCustomization();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetToDefault();
            });
        }

        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportConfig();
            });
        }

        if (importBtn) {
            importBtn.addEventListener('click', () => {
                fileInput.click();
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.importConfig(e.target.files[0]);
            });
        }
    }

    toggleCustomizer() {
        if (this.isEditMode) {
            this.closeCustomizer();
        } else {
            this.openCustomizer();
        }
    }

    openCustomizer() {
        const panel = document.getElementById('customizer-panel');
        if (panel) {
            panel.style.display = 'block';
            this.isEditMode = true;
            this.populateCustomizerFields();
            this.generateProductSelection();
            document.body.classList.add('customizer-open');
        }
    }

    closeCustomizer() {
        const panel = document.getElementById('customizer-panel');
        if (panel) {
            panel.style.display = 'none';
            this.isEditMode = false;
            document.body.classList.remove('customizer-open');
        }
    }

    populateCustomizerFields() {
        // Banner fields
        const brandNameInput = document.getElementById('brand-name-input');
        const topBannerTextInput = document.getElementById('top-banner-text-input');
        const bannerButtonTextInput = document.getElementById('banner-button-text-input');
        const heroTitleInput = document.getElementById('hero-title-input');
        const heroDescriptionInput = document.getElementById('hero-description-input');
        const shopButtonTextInput = document.getElementById('shop-button-text-input');
        const sustainableMessageInput = document.getElementById('sustainable-message-input');
        const sectionTitleInput = document.getElementById('section-title-input');

        if (brandNameInput) brandNameInput.value = this.config.brandName || 'TISSO VISON';
        if (topBannerTextInput) topBannerTextInput.value = this.config.topBannerText || 'Find the ideal gift for your loved ones.';
        if (bannerButtonTextInput) bannerButtonTextInput.value = this.config.buttonText || 'CHOOSE GIFT';
        if (heroTitleInput) heroTitleInput.value = this.config.heroTitle || 'The Gift Guide';
        if (heroDescriptionInput) heroDescriptionInput.value = this.config.heroDescription || 'Discover Joy: Your Ultimate Holiday Gift Destination. Explore our curated selection and find the perfect gifts to delight your loved ones this holiday season.';
        if (shopButtonTextInput) shopButtonTextInput.value = this.config.shopButtonText || 'SHOP NOW';
        if (sustainableMessageInput) sustainableMessageInput.value = this.config.sustainableMessage || 'SUSTAINABLE, ETHICALLY MADE CLOTHES IN SIZES XXS TO 6XL';
        if (sectionTitleInput) sectionTitleInput.value = this.config.sectionTitle || 'Tisso vison in the wild';
    }

    generateProductSelection() {
        const productSelection = document.getElementById('product-selection');
        if (!productSelection) return;

        // Get available products (this should come from ProductGridComponent)
        const availableProducts = this.getAvailableProducts();
        const selectedProductIds = this.config.selectedProducts || availableProducts.map(p => p.id);

        productSelection.innerHTML = '';

        availableProducts.forEach(product => {
            const checkboxWrapper = document.createElement('div');
            checkboxWrapper.className = 'product-checkbox-wrapper';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `product-${product.id}`;
            checkbox.value = product.id;
            checkbox.checked = selectedProductIds.includes(product.id);
            
            const label = document.createElement('label');
            label.htmlFor = `product-${product.id}`;
            label.textContent = product.name;
            
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            img.style.width = '40px';
            img.style.height = '40px';
            img.style.objectFit = 'cover';
            img.style.marginRight = '10px';
            
            checkboxWrapper.appendChild(checkbox);
            checkboxWrapper.appendChild(img);
            checkboxWrapper.appendChild(label);
            productSelection.appendChild(checkboxWrapper);
        });
    }

    getAvailableProducts() {
        // This should ideally get products from ProductGridComponent
        // For now, return default products
        return [
            {
                id: 1,
                name: "Orange Wide Leg",
                image: "public/0ed2750ebcfd81fdfe1b5bba6550f2f62aeb8236.png"
            },
            {
                id: 2,
                name: "Tailored Jacket",
                image: "public/d3f535ca1389eb820e66aabae6aac48a9c0666e7.png"
            },
            {
                id: 3,
                name: "Accordion Pleated Dress",
                image: "public/92d307966800f906112421cf2a2d71d630964d69.png"
            },
            {
                id: 4,
                name: "Green Tassel Scarf",
                image: "public/fed16528f23003f0d54e6abdb1787e6b16662980.png"
            },
            {
                id: 5,
                name: "Denim Blue Tshirt",
                image: "public/2011e9b4a7b03c2b79c4aebd2f40ab7926720377.png"
            },
            {
                id: 6,
                name: "Long Sleeve Tennis Shirt",
                image: "public/f5f95e8ed2c25b6bc010fdcfc3a88a834462323a.png"
            }
        ];
    }

    saveCustomization() {
        // Collect form data
        const newConfig = {
            brandName: document.getElementById('brand-name-input')?.value || 'TISSO VISON',
            topBannerText: document.getElementById('top-banner-text-input')?.value || 'Find the ideal gift for your loved ones.',
            buttonText: document.getElementById('banner-button-text-input')?.value || 'CHOOSE GIFT',
            heroTitle: document.getElementById('hero-title-input')?.value || 'The Gift Guide',
            heroDescription: document.getElementById('hero-description-input')?.value || '',
            shopButtonText: document.getElementById('shop-button-text-input')?.value || 'SHOP NOW',
            sustainableMessage: document.getElementById('sustainable-message-input')?.value || '',
            sectionTitle: document.getElementById('section-title-input')?.value || 'Tisso vison in the wild',
            selectedProducts: this.getSelectedProducts()
        };

        this.config = { ...this.config, ...newConfig };
        this.saveConfigToStorage();
        this.applyCustomization();
        this.showNotification('Customization saved successfully!');
    }

    getSelectedProducts() {
        const checkboxes = document.querySelectorAll('#product-selection input[type="checkbox"]:checked');
        return Array.from(checkboxes).map(cb => parseInt(cb.value));
    }

    applyCustomization() {
        // Dispatch customization update events
        window.dispatchEvent(new CustomEvent('customizerUpdate', {
            detail: { config: this.config }
        }));
    }

    resetToDefault() {
        if (confirm('Are you sure you want to reset all customizations to default values?')) {
            this.config = this.getDefaultConfig();
            this.saveConfigToStorage();
            this.populateCustomizerFields();
            this.generateProductSelection();
            this.applyCustomization();
            this.showNotification('Reset to default settings');
        }
    }

    getDefaultConfig() {
        return {
            brandName: 'TISSO VISON',
            topBannerText: 'Find the ideal gift for your loved ones.',
            buttonText: 'CHOOSE GIFT',
            heroTitle: 'The Gift Guide',
            heroDescription: 'Discover Joy: Your Ultimate Holiday Gift Destination. Explore our curated selection and find the perfect gifts to delight your loved ones this holiday season.',
            shopButtonText: 'SHOP NOW',
            sustainableMessage: 'SUSTAINABLE, ETHICALLY MADE CLOTHES IN SIZES XXS TO 6XL',
            sectionTitle: 'Tisso vison in the wild',
            selectedProducts: [1, 2, 3, 4, 5, 6]
        };
    }

    exportConfig() {
        const configBlob = new Blob([JSON.stringify(this.config, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(configBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tisso-vison-config.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Configuration exported successfully!');
    }

    importConfig(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedConfig = JSON.parse(e.target.result);
                this.config = { ...this.getDefaultConfig(), ...importedConfig };
                this.saveConfigToStorage();
                this.populateCustomizerFields();
                this.generateProductSelection();
                this.applyCustomization();
                this.showNotification('Configuration imported successfully!');
            } catch (error) {
                this.showNotification('Error importing configuration: Invalid JSON file', 'error');
            }
        };
        reader.readAsText(file);
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `customizer-notification ${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '80px',
            left: '20px',
            padding: '12px 20px',
            borderRadius: '4px',
            fontSize: '14px',
            zIndex: '10001',
            backgroundColor: type === 'error' ? '#dc3545' : '#28a745',
            color: 'white',
            transform: 'translateX(-100%)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        setTimeout(() => {
            notification.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    saveConfigToStorage() {
        try {
            localStorage.setItem('tisso_vison_customizer_config', JSON.stringify(this.config));
        } catch (error) {
            console.warn('Could not save customizer config to localStorage:', error);
        }
    }

    loadConfigFromStorage() {
        try {
            const savedConfig = localStorage.getItem('tisso_vison_customizer_config');
            return savedConfig ? JSON.parse(savedConfig) : this.getDefaultConfig();
        } catch (error) {
            console.warn('Could not load customizer config from localStorage:', error);
            return this.getDefaultConfig();
        }
    }

    getConfig() {
        return { ...this.config };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Customizer;
}
