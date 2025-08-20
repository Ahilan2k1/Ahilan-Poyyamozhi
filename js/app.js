/**
 * Main Application File
 * Initializes and coordinates all components
 */
class TissoVisonApp {
    constructor() {
        this.components = {};
        this.utils = {};
        this.initialized = false;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeApp();
            });
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        try {
            // Initialize utilities first
            this.initializeUtilities();
            
            // Initialize components
            this.initializeComponents();
            
            // Set up global event listeners
            this.setupGlobalEventListeners();
            
            // Apply any saved customizations
            this.applyCustomizations();
            
            this.initialized = true;
            console.log('TISSO VISON App initialized successfully');
            
            // Dispatch app ready event
            window.dispatchEvent(new CustomEvent('appReady', {
                detail: { app: this }
            }));
            
        } catch (error) {
            console.error('Error initializing TISSO VISON App:', error);
        }
    }

    initializeUtilities() {
        // Initialize Cart Manager
        this.utils.cartManager = new CartManager();
        
        // Initialize Customizer
        this.utils.customizer = new Customizer();
    }

    initializeComponents() {
        // Get initial customizer config
        const customizerConfig = this.utils.customizer.getConfig();
        
        // Initialize Banner Component
        this.components.banner = new BannerComponent({
            topBannerText: customizerConfig.topBannerText,
            brandName: customizerConfig.brandName,
            buttonText: customizerConfig.buttonText,
            heroTitle: customizerConfig.heroTitle,
            heroDescription: customizerConfig.heroDescription,
            shopButtonText: customizerConfig.shopButtonText,
            sustainableMessage: customizerConfig.sustainableMessage
        });

        // Initialize Product Grid Component
        this.components.productGrid = new ProductGridComponent({
            sectionTitle: customizerConfig.sectionTitle,
            products: this.getFilteredProducts(customizerConfig.selectedProducts)
        });

        // Initialize Product Modal Component
        this.components.productModal = new ProductModalComponent();
    }

    getFilteredProducts(selectedProductIds = []) {
        // Default products (should match ProductGridComponent defaults)
        const allProducts = [
            {
                id: 1,
                name: "Orange Wide Leg",
                price: "980,00€",
                image: "public/0ed2750ebcfd81fdfe1b5bba6550f2f62aeb8236.png",
                colors: ["White", "Black"],
                sizes: ["XS", "S", "M", "L", "XL"],
                description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
                variants: [
                    { id: 'white-xs', color: 'White', size: 'XS', stock: 5, sku: 'OWL-WHT-XS' },
                    { id: 'white-s', color: 'White', size: 'S', stock: 8, sku: 'OWL-WHT-S' },
                    { id: 'white-m', color: 'White', size: 'M', stock: 12, sku: 'OWL-WHT-M' },
                    { id: 'white-l', color: 'White', size: 'L', stock: 6, sku: 'OWL-WHT-L' },
                    { id: 'white-xl', color: 'White', size: 'XL', stock: 3, sku: 'OWL-WHT-XL' },
                    { id: 'black-xs', color: 'Black', size: 'XS', stock: 4, sku: 'OWL-BLK-XS' },
                    { id: 'black-s', color: 'Black', size: 'S', stock: 7, sku: 'OWL-BLK-S' },
                    { id: 'black-m', color: 'Black', size: 'M', stock: 10, sku: 'OWL-BLK-M' },
                    { id: 'black-l', color: 'Black', size: 'L', stock: 5, sku: 'OWL-BLK-L' },
                    { id: 'black-xl', color: 'Black', size: 'XL', stock: 2, sku: 'OWL-BLK-XL' }
                ]
            },
            {
                id: 2,
                name: "Tailored Jacket",
                price: "1840,00€",
                image: "public/d3f535ca1389eb820e66aabae6aac48a9c0666e7.png",
                colors: ["Blue", "Black"],
                sizes: ["XS", "S", "M", "L", "XL"],
                description: "This tailored jacket is crafted from premium wool with a modern fit and sophisticated silhouette.",
                variants: [
                    { id: 'blue-xs', color: 'Blue', size: 'XS', stock: 3, sku: 'TJ-BLU-XS' },
                    { id: 'blue-s', color: 'Blue', size: 'S', stock: 6, sku: 'TJ-BLU-S' },
                    { id: 'blue-m', color: 'Blue', size: 'M', stock: 8, sku: 'TJ-BLU-M' },
                    { id: 'blue-l', color: 'Blue', size: 'L', stock: 4, sku: 'TJ-BLU-L' },
                    { id: 'blue-xl', color: 'Blue', size: 'XL', stock: 2, sku: 'TJ-BLU-XL' },
                    { id: 'black-xs', color: 'Black', size: 'XS', stock: 5, sku: 'TJ-BLK-XS' },
                    { id: 'black-s', color: 'Black', size: 'S', stock: 9, sku: 'TJ-BLK-S' },
                    { id: 'black-m', color: 'Black', size: 'M', stock: 11, sku: 'TJ-BLK-M' },
                    { id: 'black-l', color: 'Black', size: 'L', stock: 7, sku: 'TJ-BLK-L' },
                    { id: 'black-xl', color: 'Black', size: 'XL', stock: 3, sku: 'TJ-BLK-XL' }
                ]
            },
            {
                id: 3,
                name: "Accordion Pleated Dress",
                price: "980,00€",
                image: "public/92d307966800f906112421cf2a2d71d630964d69.png",
                colors: ["Red", "Grey"],
                sizes: ["XS", "S", "M", "L", "XL"],
                description: "Elegant accordion pleated dress with flowing silhouette and timeless design.",
                variants: [
                    { id: 'red-xs', color: 'Red', size: 'XS', stock: 4, sku: 'APD-RED-XS' },
                    { id: 'red-s', color: 'Red', size: 'S', stock: 7, sku: 'APD-RED-S' },
                    { id: 'red-m', color: 'Red', size: 'M', stock: 9, sku: 'APD-RED-M' },
                    { id: 'red-l', color: 'Red', size: 'L', stock: 5, sku: 'APD-RED-L' },
                    { id: 'red-xl', color: 'Red', size: 'XL', stock: 2, sku: 'APD-RED-XL' },
                    { id: 'grey-xs', color: 'Grey', size: 'XS', stock: 6, sku: 'APD-GRY-XS' },
                    { id: 'grey-s', color: 'Grey', size: 'S', stock: 8, sku: 'APD-GRY-S' },
                    { id: 'grey-m', color: 'Grey', size: 'M', stock: 10, sku: 'APD-GRY-M' },
                    { id: 'grey-l', color: 'Grey', size: 'L', stock: 6, sku: 'APD-GRY-L' },
                    { id: 'grey-xl', color: 'Grey', size: 'XL', stock: 3, sku: 'APD-GRY-XL' }
                ]
            },
            {
                id: 4,
                name: "Green Tassel Scarf",
                price: "980,00€",
                image: "public/fed16528f23003f0d54e6abdb1787e6b16662980.png",
                colors: ["White", "Black"],
                sizes: ["One Size"],
                description: "Luxurious scarf with elegant tassels and premium fabric.",
                variants: [
                    { id: 'white-os', color: 'White', size: 'One Size', stock: 15, sku: 'GTS-WHT-OS' },
                    { id: 'black-os', color: 'Black', size: 'One Size', stock: 12, sku: 'GTS-BLK-OS' }
                ]
            },
            {
                id: 5,
                name: "Denim Blue Tshirt",
                price: "980,00€",
                image: "public/2011e9b4a7b03c2b79c4aebd2f40ab7926720377.png",
                colors: ["Grey", "Black"],
                sizes: ["XS", "S", "M", "L", "XL"],
                description: "Comfortable cotton t-shirt with modern fit and premium quality.",
                variants: [
                    { id: 'grey-xs', color: 'Grey', size: 'XS', stock: 8, sku: 'DBT-GRY-XS' },
                    { id: 'grey-s', color: 'Grey', size: 'S', stock: 12, sku: 'DBT-GRY-S' },
                    { id: 'grey-m', color: 'Grey', size: 'M', stock: 15, sku: 'DBT-GRY-M' },
                    { id: 'grey-l', color: 'Grey', size: 'L', stock: 10, sku: 'DBT-GRY-L' },
                    { id: 'grey-xl', color: 'Grey', size: 'XL', stock: 6, sku: 'DBT-GRY-XL' },
                    { id: 'black-xs', color: 'Black', size: 'XS', stock: 7, sku: 'DBT-BLK-XS' },
                    { id: 'black-s', color: 'Black', size: 'S', stock: 11, sku: 'DBT-BLK-S' },
                    { id: 'black-m', color: 'Black', size: 'M', stock: 14, sku: 'DBT-BLK-M' },
                    { id: 'black-l', color: 'Black', size: 'L', stock: 9, sku: 'DBT-BLK-L' },
                    { id: 'black-xl', color: 'Black', size: 'XL', stock: 5, sku: 'DBT-BLK-XL' }
                ]
            },
            {
                id: 6,
                name: "Long Sleeve Tennis Shirt",
                price: "980,00€",
                image: "public/f5f95e8ed2c25b6bc010fdcfc3a88a834462323a.png",
                colors: ["Blue", "Black"],
                sizes: ["XS", "S", "M", "L", "XL"],
                description: "Athletic long sleeve shirt with moisture-wicking fabric and comfortable fit.",
                variants: [
                    { id: 'blue-xs', color: 'Blue', size: 'XS', stock: 6, sku: 'LSTS-BLU-XS' },
                    { id: 'blue-s', color: 'Blue', size: 'S', stock: 9, sku: 'LSTS-BLU-S' },
                    { id: 'blue-m', color: 'Blue', size: 'M', stock: 12, sku: 'LSTS-BLU-M' },
                    { id: 'blue-l', color: 'Blue', size: 'L', stock: 8, sku: 'LSTS-BLU-L' },
                    { id: 'blue-xl', color: 'Blue', size: 'XL', stock: 4, sku: 'LSTS-BLU-XL' },
                    { id: 'black-xs', color: 'Black', size: 'XS', stock: 5, sku: 'LSTS-BLK-XS' },
                    { id: 'black-s', color: 'Black', size: 'S', stock: 10, sku: 'LSTS-BLK-S' },
                    { id: 'black-m', color: 'Black', size: 'M', stock: 13, sku: 'LSTS-BLK-M' },
                    { id: 'black-l', color: 'Black', size: 'L', stock: 7, sku: 'LSTS-BLK-L' },
                    { id: 'black-xl', color: 'Black', size: 'XL', stock: 3, sku: 'LSTS-BLK-XL' }
                ]
            }
        ];

        // Filter products based on selection
        if (selectedProductIds && selectedProductIds.length > 0) {
            return allProducts.filter(product => selectedProductIds.includes(product.id));
        }
        
        return allProducts;
    }

    setupGlobalEventListeners() {
        // Listen for customizer updates
        window.addEventListener('customizerUpdate', (e) => {
            this.handleCustomizerUpdate(e.detail.config);
        });

        // Listen for cart updates to validate against current products
        window.addEventListener('cartUpdated', (e) => {
            if (e.detail.action === 'add') {
                const currentProducts = this.components.productGrid.getProducts();
                this.utils.cartManager.validateCart(currentProducts);
            }
        });

        // Handle window resize for responsive behavior
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });

        // Handle app-wide keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    handleCustomizerUpdate(config) {
        // Update Banner Component
        if (this.components.banner) {
            this.components.banner.updateConfig({
                topBannerText: config.topBannerText,
                brandName: config.brandName,
                buttonText: config.buttonText,
                heroTitle: config.heroTitle,
                heroDescription: config.heroDescription,
                shopButtonText: config.shopButtonText,
                sustainableMessage: config.sustainableMessage
            });
        }

        // Update Product Grid Component
        if (this.components.productGrid) {
            this.components.productGrid.updateSectionTitle(config.sectionTitle);
            
            if (config.selectedProducts) {
                const filteredProducts = this.getFilteredProducts(config.selectedProducts);
                this.components.productGrid.updateProducts(filteredProducts);
            }
        }
    }

    handleWindowResize() {
        // Update mobile detection
        const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
        
        // Update components that need mobile awareness
        Object.values(this.components).forEach(component => {
            if (component.isMobile !== undefined) {
                component.isMobile = isMobile;
            }
        });
    }

    handleKeyboardShortcuts(e) {
        // Ctrl+Shift+C: Clear cart
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            if (confirm('Are you sure you want to clear the cart?')) {
                window.dispatchEvent(new CustomEvent('clearCart'));
            }
        }

        // Ctrl+Shift+S: Show cart summary
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            this.showCartSummary();
        }
    }

    applyCustomizations() {
        // Apply any saved customizations on app load
        const config = this.utils.customizer.getConfig();
        this.handleCustomizerUpdate(config);
    }

    showCartSummary() {
        const cartData = this.utils.cartManager.exportCart();
        console.log('Cart Summary:', cartData);
        
        // Create a simple cart summary modal
        const summary = `
Cart Summary:
- Items: ${cartData.count}
- Subtotal: €${cartData.subtotal.toFixed(2)}
- Tax: €${cartData.tax.toFixed(2)}
- Shipping: €${cartData.shipping.toFixed(2)}
- Total: €${cartData.total.toFixed(2)}
        `;
        
        alert(summary);
    }

    // Public API methods
    getComponent(name) {
        return this.components[name];
    }

    getUtil(name) {
        return this.utils[name];
    }

    isInitialized() {
        return this.initialized;
    }

    // Method to add custom functionality
    addPlugin(name, plugin) {
        if (typeof plugin === 'function') {
            plugin(this);
        } else if (typeof plugin === 'object' && plugin.init) {
            plugin.init(this);
        }
    }
}

// Initialize the app when this file is loaded
const tissoVisonApp = new TissoVisonApp();

// Make app available globally for debugging and extensions
window.TissoVisonApp = tissoVisonApp;
