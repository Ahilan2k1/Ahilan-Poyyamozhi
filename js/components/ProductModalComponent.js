/**
 * ProductModal Component
 * Handles the product popup with variants and add to cart functionality
 */
class ProductModalComponent {
    constructor(config = {}) {
        this.config = {
            ...config
        };
        
        this.currentProduct = null;
        this.selectedColor = null;
        this.selectedSize = null;
        this.selectedVariant = null;
        this.isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
        
        this.init();
    }

    init() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Listen for product selection events
        window.addEventListener('productSelected', (e) => {
            this.openModal(e.detail.product);
        });

        // Modal close events
        const modal = document.getElementById('product-modal');
        const closeBtn = document.getElementById('close-modal');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Add to cart button
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                this.handleAddToCart();
            });
        }
    }

    openModal(product) {
        this.currentProduct = product;
        this.selectedColor = product.colors[0]; // Default to first color
        this.selectedSize = null;
        this.selectedVariant = null;

        this.renderModalContent();
        this.showModal();
        
        // Focus management for accessibility
        if (!this.isMobile) {
            const closeBtn = document.getElementById('close-modal');
            if (closeBtn) closeBtn.focus();
        }
    }

    renderModalContent() {
        if (!this.currentProduct) return;

        // Update product image
        const modalImg = document.getElementById('modal-img');
        if (modalImg) {
            modalImg.src = this.currentProduct.image;
            modalImg.alt = this.currentProduct.name;
        }

        // Update product name
        const modalName = document.getElementById('modal-name');
        if (modalName) {
            modalName.textContent = this.currentProduct.name;
        }

        // Update product price
        const modalPrice = document.getElementById('modal-price');
        if (modalPrice) {
            modalPrice.textContent = this.currentProduct.price;
        }

        // Update product description
        const modalDescription = document.getElementById('modal-description');
        if (modalDescription) {
            modalDescription.textContent = this.currentProduct.description;
        }

        // Render color options
        this.renderColorOptions();
        
        // Render size options
        this.renderSizeOptions();

        // Update add to cart button state
        this.updateAddToCartButton();
    }

    renderColorOptions() {
        const colorsContainer = document.getElementById('modal-colors');
        if (!colorsContainer || !this.currentProduct) return;

        colorsContainer.innerHTML = '';

        this.currentProduct.colors.forEach((color, index) => {
            const colorBtn = document.createElement('button');
            colorBtn.className = 'color-btn';
            colorBtn.textContent = color;
            colorBtn.dataset.color = color;
            
            if (index === 0) {
                colorBtn.classList.add('selected');
            }

            colorBtn.addEventListener('click', () => {
                this.selectColor(color);
            });

            colorsContainer.appendChild(colorBtn);
        });
    }

    renderSizeOptions() {
        const sizeOptions = document.getElementById('size-options');
        const dropdownBtn = document.getElementById('size-dropdown-btn');
        
        if (!sizeOptions || !dropdownBtn || !this.currentProduct) return;

        // Clear existing options
        sizeOptions.innerHTML = '';

        // Create size options based on product sizes
        this.currentProduct.sizes.forEach(size => {
            const sizeOption = document.createElement('div');
            sizeOption.className = 'size-option';
            sizeOption.dataset.size = size;
            sizeOption.textContent = size;

            // Check if this size is available for selected color
            const isAvailable = this.isSizeAvailable(size, this.selectedColor);
            if (!isAvailable) {
                sizeOption.classList.add('out-of-stock');
            }

            sizeOption.addEventListener('click', (e) => {
                if (!isAvailable) return;
                e.stopPropagation();
                this.selectSize(size);
            });

            sizeOptions.appendChild(sizeOption);
        });

        // Initialize dropdown functionality
        this.initializeSizeDropdown();
    }

    initializeSizeDropdown() {
        const dropdownBtn = document.getElementById('size-dropdown-btn');
        const sizeOptions = document.getElementById('size-options');
        
        if (!dropdownBtn || !sizeOptions) return;

        // Remove existing event listeners by cloning
        const newDropdownBtn = dropdownBtn.cloneNode(true);
        dropdownBtn.parentNode.replaceChild(newDropdownBtn, dropdownBtn);

        // Toggle dropdown
        newDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sizeOptions.classList.toggle('show');
            newDropdownBtn.classList.toggle('open');
        });

        // Close dropdown when clicking outside
        const closeDropdown = (e) => {
            if (!newDropdownBtn.contains(e.target) && !sizeOptions.contains(e.target)) {
                sizeOptions.classList.remove('show');
                newDropdownBtn.classList.remove('open');
            }
        };
        
        document.addEventListener('click', closeDropdown);
        document.addEventListener('touchstart', closeDropdown);

        // Reset dropdown text
        newDropdownBtn.innerHTML = 'Choose your size';
        newDropdownBtn.classList.remove('open');
        sizeOptions.classList.remove('show');
    }

    selectColor(color) {
        this.selectedColor = color;
        this.selectedSize = null; // Reset size when color changes
        this.selectedVariant = null;

        // Update color button states
        const colorBtns = document.querySelectorAll('.color-btn');
        colorBtns.forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.color === color) {
                btn.classList.add('selected');
            }
        });

        // Re-render size options for new color
        this.renderSizeOptions();
        this.updateAddToCartButton();
    }

    selectSize(size) {
        this.selectedSize = size;
        
        // Find the corresponding variant
        this.selectedVariant = this.currentProduct.variants.find(variant => 
            variant.color === this.selectedColor && variant.size === size
        );

        // Update size option states
        const sizeOptionElements = document.querySelectorAll('.size-option');
        sizeOptionElements.forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.size === size) {
                option.classList.add('selected');
            }
        });

        // Update dropdown button text
        const dropdownBtn = document.getElementById('size-dropdown-btn');
        if (dropdownBtn) {
            dropdownBtn.innerHTML = size;
            dropdownBtn.classList.remove('open');
        }

        // Hide dropdown
        const sizeOptions = document.getElementById('size-options');
        if (sizeOptions) {
            sizeOptions.classList.remove('show');
        }

        this.updateAddToCartButton();
    }

    isSizeAvailable(size, color) {
        if (!this.currentProduct || !this.currentProduct.variants) return true;
        
        const variant = this.currentProduct.variants.find(v => 
            v.color === color && v.size === size
        );
        
        return variant && variant.stock > 0;
    }

    updateAddToCartButton() {
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        if (!addToCartBtn) return;

        const isSelectionComplete = this.selectedColor && this.selectedSize;
        const isInStock = this.selectedVariant && this.selectedVariant.stock > 0;

        if (isSelectionComplete && isInStock) {
            addToCartBtn.disabled = false;
            addToCartBtn.classList.remove('disabled');
            addToCartBtn.innerHTML = 'ADD TO CART →';
        } else if (isSelectionComplete && !isInStock) {
            addToCartBtn.disabled = true;
            addToCartBtn.classList.add('disabled');
            addToCartBtn.innerHTML = 'OUT OF STOCK';
        } else {
            addToCartBtn.disabled = true;
            addToCartBtn.classList.add('disabled');
            addToCartBtn.innerHTML = 'SELECT SIZE →';
        }
    }

    handleAddToCart() {
        if (!this.selectedVariant || this.selectedVariant.stock <= 0) {
            return;
        }

        const cartItem = {
            productId: this.currentProduct.id,
            variantId: this.selectedVariant.id,
            name: this.currentProduct.name,
            price: this.currentProduct.price,
            image: this.currentProduct.image,
            color: this.selectedColor,
            size: this.selectedSize,
            sku: this.selectedVariant.sku,
            quantity: 1
        };

        // Dispatch add to cart event
        window.dispatchEvent(new CustomEvent('addToCart', {
            detail: { item: cartItem }
        }));

        // Show success animation
        this.showAddToCartSuccess();
    }

    showAddToCartSuccess() {
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        if (!addToCartBtn) return;

        const originalText = addToCartBtn.innerHTML;
        addToCartBtn.innerHTML = '✓ ADDED TO CART';
        addToCartBtn.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            addToCartBtn.innerHTML = originalText;
            addToCartBtn.style.backgroundColor = '';
            this.closeModal();
        }, 1500);
    }

    showModal() {
        const modal = document.getElementById('product-modal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.classList.add('modal-open');
            
            // Fade in animation
            setTimeout(() => {
                modal.classList.add('modal-visible');
            }, 10);
        }
    }

    closeModal() {
        const modal = document.getElementById('product-modal');
        if (modal) {
            modal.classList.remove('modal-visible');
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }, 300);
        }

        // Reset state
        this.currentProduct = null;
        this.selectedColor = null;
        this.selectedSize = null;
        this.selectedVariant = null;

        // Reset dropdown
        const dropdownBtn = document.getElementById('size-dropdown-btn');
        const sizeOptions = document.getElementById('size-options');
        if (dropdownBtn) {
            dropdownBtn.innerHTML = 'Choose your size';
            dropdownBtn.classList.remove('open');
        }
        if (sizeOptions) {
            sizeOptions.classList.remove('show');
        }
    }

    // Method to get current selection
    getCurrentSelection() {
        return {
            product: this.currentProduct,
            color: this.selectedColor,
            size: this.selectedSize,
            variant: this.selectedVariant
        };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductModalComponent;
}

