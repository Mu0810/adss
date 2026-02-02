// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
window.addEventListener('load', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// Search Functionality
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.classList.toggle('active');
        document.getElementById('searchInput').focus();
    }
}

function handleSearch(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (query.trim()) {
        // Redirect to search results or filter current page
        window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
    }
}

// Exit Intent Popup
let exitPopupShown = false;
document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !exitPopupShown && document.getElementById('exitPopup')) {
        showExitPopup();
    }
});

function showExitPopup() {
    const popup = document.getElementById('exitPopup');
    if (popup && !exitPopupShown) {
        popup.style.display = 'flex';
        exitPopupShown = true;
        localStorage.setItem('exitPopupShown', 'true');
    }
}

function closeExitPopup() {
    const popup = document.getElementById('exitPopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Newsletter Signup
function handleNewsletterSignup(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Save to localStorage (in production, send to server)
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
    }
    
    alert('Thank you for subscribing! Check your email for confirmation.');
    event.target.reset();
}

// Exit Popup Form
function handleExitPopup(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Save to localStorage
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    leads.push({
        email: email,
        timestamp: new Date().toISOString(),
        source: 'exit-popup'
    });
    localStorage.setItem('leads', JSON.stringify(leads));
    
    alert('Check your email for the free guide!');
    closeExitPopup();
}

// Social Share Function
function shareArticle(platform) {
    const url = window.location.href;
    const title = document.querySelector('h1')?.textContent || 'EarnWeb';
    let shareUrl = '';

    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
            break;
        case 'facebook':
            shareUrl = `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// FAQ Toggle
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isOpen = faqItem.classList.contains('open');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.faq-answer').style.maxHeight = '0';
        item.querySelector('.toggle').textContent = '+';
    });
    
    // Toggle current FAQ
    if (!isOpen) {
        faqItem.classList.add('open');
        const answer = faqItem.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        button.querySelector('.toggle').textContent = '−';
    }
}

// Analytics Event Tracking
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    // Also save locally
    const events = JSON.parse(localStorage.getItem('trackEvents') || '[]');
    events.push({
        category,
        action,
        label,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('trackEvents', JSON.stringify(events));
}

// Track external links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="http"]');
    if (link && !link.href.includes(window.location.hostname)) {
        trackEvent('outbound', 'click', link.href);
    }
});

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const text = e.target.textContent || e.target.value;
        trackEvent('engagement', 'button_click', text);
    }
});

// Affiliate Link Manager (add ?ref=partnername)
function addAffiliateParam(url, affiliate) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}ref=${affiliate}`;
}

// Lazy Load Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    
    // Check if exit popup should be shown
    const exitPopupShown = localStorage.getItem('exitPopupShown');
    if (!exitPopupShown) {
        setTimeout(() => {
            const popup = document.getElementById('exitPopup');
            // Show after 30 seconds if user hasn't left
            // showExitPopup will be called on mouse leave
        }, 30000);
    }
});

// Performance monitoring
function measurePerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        trackEvent('performance', 'page_load_time', loadTime);
    }
}

window.addEventListener('load', measurePerformance);
