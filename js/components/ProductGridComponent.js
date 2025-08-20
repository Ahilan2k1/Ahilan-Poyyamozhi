/**
 * ProductGrid Component
 * Handles the product grid display with customizable products
 */
class ProductGridComponent {
    constructor(config = {}) {
        this.config = {
            sectionTitle: "Tisso vison in the wild",
            products: [
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
            ],
            ...config
        };
        
        this.isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
        this.init();
    }

    init() {
        this.renderSectionTitle();
        this.renderProductGrid();
        this.attachEventListeners();
    }

    renderSectionTitle() {
        const sectionTitleElement = document.querySelector('.section-title');
        if (sectionTitleElement) {
            sectionTitleElement.textContent = this.config.sectionTitle;
        }
    }

    renderProductGrid() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;

        productGrid.innerHTML = '';

        this.config.products.forEach((product, index) => {
            const productCard = this.createProductCard(product);
            productGrid.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.productId = product.id;
        
        // Generate random position for the plus icon
        const randomTop = Math.floor(Math.random() * 60) + 20; // 20-80%
        const randomLeft = Math.floor(Math.random() * 60) + 20; // 20-80%
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="add-icon" style="top: ${randomTop}%; left: ${randomLeft}%;">+</div>
        `;
        
        return productCard;
    }

    attachEventListeners() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;

        // Event delegation for product cards
        productGrid.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productId = parseInt(productCard.dataset.productId);
                const product = this.config.products.find(p => p.id === productId);
                if (product) {
                    this.handleProductClick(product);
                }
            }
        });

        // Touch events for mobile
        if (this.isMobile) {
            productGrid.addEventListener('touchstart', (e) => {
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    e.preventDefault();
                    const productId = parseInt(productCard.dataset.productId);
                    const product = this.config.products.find(p => p.id === productId);
                    if (product) {
                        this.handleProductClick(product);
                    }
                }
            });
        }
    }

    handleProductClick(product) {
        // Dispatch custom event with product data
        window.dispatchEvent(new CustomEvent('productSelected', {
            detail: { product }
        }));
    }

    // Method to update products
    updateProducts(newProducts) {
        this.config.products = newProducts;
        this.renderProductGrid();
    }

    // Method to add a product
    addProduct(product) {
        this.config.products.push(product);
        this.renderProductGrid();
    }

    // Method to remove a product
    removeProduct(productId) {
        this.config.products = this.config.products.filter(p => p.id !== productId);
        this.renderProductGrid();
    }

    // Method to get products
    getProducts() {
        return [...this.config.products];
    }

    // Method to get product by ID
    getProductById(id) {
        return this.config.products.find(p => p.id === id);
    }

    // Method to update section title
    updateSectionTitle(title) {
        this.config.sectionTitle = title;
        this.renderSectionTitle();
    }

    // Method to get current configuration
    getConfig() {
        return { ...this.config };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductGridComponent;
}
