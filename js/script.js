/**
 * Legacy Script Bridge File
 * This file maintains compatibility with the old script.js while the new component system is active.
 * The new component-based system handles all functionality automatically.
 */

// Log that the new system is active
console.log('TISSO VISON: Component-based system is active');

// If the app hasn't loaded yet, wait for it
if (!window.TissoVisonApp) {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('TISSO VISON: Components initialized successfully');
    });
} else {
    console.log('TISSO VISON: App already initialized');
}

// Expose some legacy functions for backward compatibility if needed
window.TissoVisonLegacy = {
    // Legacy product data access
    getProducts: function() {
        if (window.TissoVisonApp && window.TissoVisonApp.components.productGrid) {
            return window.TissoVisonApp.components.productGrid.getProducts();
        }
        return [];
    },
    
    // Legacy cart access
    getCart: function() {
        if (window.TissoVisonApp && window.TissoVisonApp.utils.cartManager) {
            return window.TissoVisonApp.utils.cartManager.getCart();
        }
        return [];
    },
    
    // Legacy customizer access
    getConfig: function() {
        if (window.TissoVisonApp && window.TissoVisonApp.utils.customizer) {
            return window.TissoVisonApp.utils.customizer.getConfig();
        }
        return {};
    }
};

// Add some helpful developer functions
window.TissoVisonDev = {
    // Show current component state
    showState: function() {
        if (window.TissoVisonApp) {
            console.log('App State:', {
                components: Object.keys(window.TissoVisonApp.components),
                utils: Object.keys(window.TissoVisonApp.utils),
                initialized: window.TissoVisonApp.isInitialized()
            });
        }
    },
    
    // Toggle customizer
    openCustomizer: function() {
        if (window.TissoVisonApp && window.TissoVisonApp.utils.customizer) {
            window.TissoVisonApp.utils.customizer.openCustomizer();
        }
    },
    
    // Show cart summary
    showCart: function() {
        if (window.TissoVisonApp && window.TissoVisonApp.utils.cartManager) {
            console.log('Cart:', window.TissoVisonApp.utils.cartManager.exportCart());
        }
    }
};
