/**
 * Cart Utility
 * Manages cart state and operations
 */
class CartManager {
    constructor() {
        this.cart = this.loadCartFromStorage();
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.updateCartDisplay();
    }

    attachEventListeners() {
        // Listen for add to cart events
        window.addEventListener('addToCart', (e) => {
            this.addItem(e.detail.item);
        });

        // Listen for cart updates
        window.addEventListener('updateCartQuantity', (e) => {
            this.updateQuantity(e.detail.variantId, e.detail.quantity);
        });

        // Listen for item removal
        window.addEventListener('removeFromCart', (e) => {
            this.removeItem(e.detail.variantId);
        });

        // Listen for cart clear
        window.addEventListener('clearCart', () => {
            this.clearCart();
        });
    }

    addItem(item) {
        const existingItemIndex = this.cart.findIndex(cartItem => 
            cartItem.variantId === item.variantId
        );

        if (existingItemIndex > -1) {
            // Item already exists, increase quantity
            this.cart[existingItemIndex].quantity += item.quantity;
        } else {
            // New item
            this.cart.push({
                ...item,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCartToStorage();
        this.updateCartDisplay();
        this.showCartNotification(`Added ${item.name} to cart`);

        // Dispatch cart updated event
        window.dispatchEvent(new CustomEvent('cartUpdated', {
            detail: { cart: this.cart, action: 'add', item }
        }));
    }

    updateQuantity(variantId, newQuantity) {
        const itemIndex = this.cart.findIndex(item => item.variantId === variantId);
        
        if (itemIndex > -1) {
            if (newQuantity <= 0) {
                this.removeItem(variantId);
            } else {
                this.cart[itemIndex].quantity = newQuantity;
                this.saveCartToStorage();
                this.updateCartDisplay();

                // Dispatch cart updated event
                window.dispatchEvent(new CustomEvent('cartUpdated', {
                    detail: { cart: this.cart, action: 'update', variantId, quantity: newQuantity }
                }));
            }
        }
    }

    removeItem(variantId) {
        const itemIndex = this.cart.findIndex(item => item.variantId === variantId);
        
        if (itemIndex > -1) {
            const removedItem = this.cart[itemIndex];
            this.cart.splice(itemIndex, 1);
            this.saveCartToStorage();
            this.updateCartDisplay();
            this.showCartNotification(`Removed ${removedItem.name} from cart`);

            // Dispatch cart updated event
            window.dispatchEvent(new CustomEvent('cartUpdated', {
                detail: { cart: this.cart, action: 'remove', item: removedItem }
            }));
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCartToStorage();
        this.updateCartDisplay();
        this.showCartNotification('Cart cleared');

        // Dispatch cart updated event
        window.dispatchEvent(new CustomEvent('cartUpdated', {
            detail: { cart: this.cart, action: 'clear' }
        }));
    }

    getCart() {
        return [...this.cart];
    }

    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/[^0-9.,]/g, '').replace(',', '.'));
            return total + (price * item.quantity);
        }, 0);
    }

    getCartSubtotal() {
        return this.getCartTotal();
    }

    getTaxAmount(taxRate = 0.2) {
        return this.getCartSubtotal() * taxRate;
    }

    getShippingCost() {
        const subtotal = this.getCartSubtotal();
        return subtotal > 100 ? 0 : 10; // Free shipping over €100
    }

    getCartTotalWithTaxAndShipping(taxRate = 0.2) {
        return this.getCartSubtotal() + this.getTaxAmount(taxRate) + this.getShippingCost();
    }

    updateCartDisplay() {
        this.updateCartCounter();
        this.updateCartIcon();
    }

    updateCartCounter() {
        const cartCounters = document.querySelectorAll('.cart-counter');
        const count = this.getCartCount();
        
        cartCounters.forEach(counter => {
            counter.textContent = count;
            counter.style.display = count > 0 ? 'block' : 'none';
        });
    }

    updateCartIcon() {
        const cartIcons = document.querySelectorAll('.cart-icon');
        const hasItems = this.cart.length > 0;
        
        cartIcons.forEach(icon => {
            if (hasItems) {
                icon.classList.add('has-items');
            } else {
                icon.classList.remove('has-items');
            }
        });
    }

    showCartNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#333',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '4px',
            fontSize: '14px',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(notification);

        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Slide out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    saveCartToStorage() {
        try {
            localStorage.setItem('tisso_vison_cart', JSON.stringify(this.cart));
        } catch (error) {
            console.warn('Could not save cart to localStorage:', error);
        }
    }

    loadCartFromStorage() {
        try {
            const savedCart = localStorage.getItem('tisso_vison_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.warn('Could not load cart from localStorage:', error);
            return [];
        }
    }

    // Method to export cart data
    exportCart() {
        return {
            items: this.getCart(),
            count: this.getCartCount(),
            subtotal: this.getCartSubtotal(),
            tax: this.getTaxAmount(),
            shipping: this.getShippingCost(),
            total: this.getCartTotalWithTaxAndShipping(),
            timestamp: new Date().toISOString()
        };
    }

    // Method to validate cart items against current product data
    validateCart(products) {
        const validItems = [];
        let hasChanges = false;

        this.cart.forEach(cartItem => {
            const product = products.find(p => p.id === cartItem.productId);
            if (product) {
                const variant = product.variants.find(v => v.id === cartItem.variantId);
                if (variant && variant.stock > 0) {
                    // Adjust quantity if exceeds stock
                    if (cartItem.quantity > variant.stock) {
                        cartItem.quantity = variant.stock;
                        hasChanges = true;
                    }
                    validItems.push(cartItem);
                } else {
                    hasChanges = true;
                }
            } else {
                hasChanges = true;
            }
        });

        if (hasChanges) {
            this.cart = validItems;
            this.saveCartToStorage();
            this.updateCartDisplay();
            this.showCartNotification('Cart updated - some items were removed or adjusted');
        }

        return hasChanges;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartManager;
}
