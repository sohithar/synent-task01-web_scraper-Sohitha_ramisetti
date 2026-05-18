// ==================== GLOBAL VARIABLES ====================
let allProducts = [];
let filteredProducts = [];

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    applyThemePreference();
});

// ==================== LOAD PRODUCTS ====================
function loadProducts() {
    // Load products from data.json
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Extract metadata
            const metadata = data.metadata;
            allProducts = data.products;
            filteredProducts = [...allProducts];

            // Update metadata display
            document.getElementById('totalProducts').innerHTML = 
                `Total Products: <strong>${metadata.total_products}</strong>`;
            document.getElementById('scrapedAt').innerHTML = 
                `Scraped: <strong>${metadata.scraped_at}</strong>`;
            document.getElementById('scrapeTool').innerHTML = 
                `Tool: <strong>${metadata.scraping_tool}</strong>`;

            // Display products
            displayProducts(filteredProducts);

            // Calculate and display statistics
            calculateStatistics();

            // Show stats section
            document.getElementById('statsSection').style.display = 'block';
        })
        .catch(error => {
            console.error('Error loading products:', error);
            document.getElementById('productsGrid').innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                    <p>Error loading products. Please check the data.json file.</p>
                </div>
            `;
        });
}

// ==================== DISPLAY PRODUCTS ====================
function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');

    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">
                    <i class="fas fa-search"></i>
                </div>
                <p>No products found matching your search.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = products.map((product, index) => {
        const price = parseFloat(product.price.replace('$', ''));
        const rating = parseFloat(product.rating.split('/')[0]);
        const stars = generateStars(rating);

        return `
            <div class="product-card" data-index="${index}">
                <div class="product-image">
                    <div class="product-icon">
                        <i class="${getProductIcon(product.title)}"></i>
                    </div>
                </div>
                <div class="product-content">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">${product.price}</div>
                    <div class="product-rating">
                        <span class="stars">${stars}</span>
                        <span class="rating-value">${product.rating}</span>
                    </div>
                    <a href="${product.link}" target="_blank" class="product-link">
                        View Product <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;
    }).join('');

    // Update item count
    document.getElementById('itemCount').textContent = products.length;
}

// ==================== GENERATE STARS ====================
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    
    if (hasHalfStar) {
        stars += '☆';
    }
    
    stars += '☆'.repeat(5 - Math.ceil(rating));
    return stars;
}

// ==================== GET PRODUCT ICON ====================
function getProductIcon(title) {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('headphone')) return 'fas fa-headphones';
    if (titleLower.includes('cable') || titleLower.includes('usb')) return 'fas fa-cable';
    if (titleLower.includes('protector') || titleLower.includes('screen')) return 'fas fa-shield';
    if (titleLower.includes('power') || titleLower.includes('battery') || titleLower.includes('bank')) return 'fas fa-battery-full';
    if (titleLower.includes('case')) return 'fas fa-mobile';
    
    return 'fas fa-box';
}

// ==================== CALCULATE STATISTICS ====================
function calculateStatistics() {
    if (allProducts.length === 0) return;

    // Extract prices and ratings
    const prices = allProducts.map(p => parseFloat(p.price.replace('$', '')));
    const ratings = allProducts.map(p => parseFloat(p.rating.split('/')[0]));

    // Calculate average price
    const avgPrice = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2);
    document.getElementById('avgPrice').textContent = `$${avgPrice}`;

    // Calculate average rating
    const avgRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
    document.getElementById('avgRating').textContent = `${avgRating}/5`;

    // Find highest rated product
    const highestRatedIndex = ratings.indexOf(Math.max(...ratings));
    document.getElementById('highestRated').textContent = allProducts[highestRatedIndex].title;

    // Find cheapest product
    const cheapestPrice = Math.min(...prices);
    const cheapestIndex = prices.indexOf(cheapestPrice);
    document.getElementById('cheapestItem').textContent = allProducts[cheapestIndex].title;
}

// ==================== SETUP EVENT LISTENERS ====================
function setupEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filteredProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    // Sort functionality
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        const sortBy = e.target.value;
        sortProducts(sortBy);
        displayProducts(filteredProducts);
    });

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

// ==================== SORT PRODUCTS ====================
function sortProducts(sortBy) {
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => 
                parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''))
            );
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => 
                parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''))
            );
            break;
        case 'rating':
            filteredProducts.sort((a, b) => 
                parseFloat(b.rating.split('/')[0]) - parseFloat(a.rating.split('/')[0])
            );
            break;
        default:
            filteredProducts = [...allProducts];
    }
}

// ==================== THEME TOGGLE ====================
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    // Update icon
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// ==================== APPLY THEME PREFERENCE ====================
function applyThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
        document.body.classList.add('dark-mode');
        const icon = document.getElementById('themeToggle').querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Ctrl+K or Cmd+K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Ctrl+L or Cmd+L to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        toggleTheme();
    }
});
