/**
 * Banner Component
 * Handles the top banner section with customizable text and animated buttons
 */
class BannerComponent {
    constructor(config = {}) {
        this.config = {
            topBannerText: "Find the ideal gift for your loved ones.",
            brandName: "TISSO VISON",
            buttonText: "CHOOSE GIFT",
            heroTitle: "The Gift Guide",
            heroDescription: "Discover Joy: Your Ultimate Holiday Gift Destination. Explore our curated selection and find the perfect gifts to delight your loved ones this holiday season.",
            shopButtonText: "SHOP NOW",
            sustainableMessage: "SUSTAINABLE, ETHICALLY MADE CLOTHES IN SIZES XXS TO 6XL",
            ...config
        };
        
        this.init();
    }

    init() {
        this.renderTopBanner();
        this.renderHeroSection();
        this.renderSustainableMessage();
        this.attachEventListeners();
        this.initAnimations();
    }

    renderTopBanner() {
        const topBanner = document.querySelector('.top-banner');
        if (topBanner) {
            const bannerContent = topBanner.querySelector('.banner-content');
            
            // Update brand name
            const brandNameElement = bannerContent.querySelector('.brand-name-header');
            if (brandNameElement) {
                brandNameElement.textContent = this.config.brandName;
            }
            
            // Update center text
            const centerTextElement = bannerContent.querySelector('.banner-center span');
            if (centerTextElement) {
                centerTextElement.textContent = this.config.topBannerText;
            }
            
            // Update button text
            const buttonElement = bannerContent.querySelector('.btn-primary');
            if (buttonElement) {
                buttonElement.innerHTML = `${this.config.buttonText} →`;
            }
        }
    }

    renderHeroSection() {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const heroTitle = heroSection.querySelector('.hero-title');
            const heroDescription = heroSection.querySelector('.hero-description');
            const shopButton = heroSection.querySelector('.btn-dark');
            
            if (heroTitle) {
                heroTitle.textContent = this.config.heroTitle;
            }
            
            if (heroDescription) {
                heroDescription.textContent = this.config.heroDescription;
            }
            
            if (shopButton) {
                shopButton.innerHTML = `${this.config.shopButtonText} →`;
            }
        }
    }

    renderSustainableMessage() {
        const sustainableMessage = document.querySelector('.sustainable-message p');
        if (sustainableMessage) {
            sustainableMessage.textContent = this.config.sustainableMessage;
        }
    }

    attachEventListeners() {
        // Top banner button
        const topBannerButton = document.querySelector('.top-banner .btn-primary');
        if (topBannerButton) {
            topBannerButton.addEventListener('click', (e) => {
                this.handleTopBannerClick(e);
            });
        }

        // Hero shop button
        const shopButton = document.querySelector('.hero .btn-dark');
        if (shopButton) {
            shopButton.addEventListener('click', (e) => {
                this.handleShopButtonClick(e);
            });
        }

        // Mobile menu functionality
        this.initMobileMenu();
    }

    initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileSidebar = document.getElementById('mobile-sidebar');

        // Also update sidebar text/button on open
        const updateSidebarContent = () => {
            const sidebarText = document.querySelector('.mobile-sidebar-content p');
            if (sidebarText) sidebarText.textContent = 'Find the ideal gift for your loved ones.';
            const sidebarBtn = document.querySelector('.sidebar-button');
            if (sidebarBtn) sidebarBtn.innerHTML = `${this.config.buttonText} →`;
        };
        // Also add a global function for testing
        window.toggleMobileSidebar = () => {
            const mobileSidebar = document.getElementById('mobile-sidebar');
            if (mobileSidebar) {
                if (mobileSidebar.classList.contains('open')) {
                    this.closeSidebar();
                } else {
                    this.openSidebar();
                }
            }
        };

        if (mobileMenuBtn && mobileSidebar) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (mobileSidebar.classList.contains('open')) {
                    this.closeSidebar();
                } else {
                    updateSidebarContent();
                    this.openSidebar();
                }
            });
        } else {
            console.error('Mobile menu elements not found:', { mobileMenuBtn, mobileSidebar });
        }
    }

    openSidebar() {
        const mobileSidebar = document.getElementById('mobile-sidebar');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (mobileSidebar) {
            mobileSidebar.classList.add('open');
        }
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.add('open');
        }
        
        // Add class to body to hide illustrations
        document.body.classList.add('sidebar-open');
    }

    closeSidebar() {
        const mobileSidebar = document.getElementById('mobile-sidebar');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (mobileSidebar) {
            mobileSidebar.classList.remove('open');
        }
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('open');
        }
        
        // Remove class from body to show illustrations again
        document.body.classList.remove('sidebar-open');
    }

    initAnimations() {
        // Button hover animations
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
                button.style.transition = 'all 0.3s ease';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });

            // Click animation
            button.addEventListener('mousedown', () => {
                button.style.transform = 'translateY(0) scale(0.98)';
            });

            button.addEventListener('mouseup', () => {
                button.style.transform = 'translateY(-2px) scale(1)';
            });
        });

        // Fade in animation for hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            heroContent.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    handleTopBannerClick(e) {
        e.preventDefault();
        // Scroll to product section
        const productSection = document.querySelector('.product-section');
        if (productSection) {
            productSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('bannerButtonClick', {
            detail: { type: 'gift-guide' }
        }));
    }

    handleShopButtonClick(e) {
        e.preventDefault();
        // Scroll to product section
        const productSection = document.querySelector('.product-section');
        if (productSection) {
            productSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('shopButtonClick', {
            detail: { type: 'shop-now' }
        }));
    }

    // Method to update configuration
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.init();
    }

    // Method to get current configuration
    getConfig() {
        return { ...this.config };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BannerComponent;
}
