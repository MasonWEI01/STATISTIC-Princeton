// Princeton Probability Theory Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (sidebar && sidebar.classList.contains('active') && 
            !sidebar.contains(event.target) && 
            event.target !== menuToggle) {
            sidebar.classList.remove('active');
        }
    });
    
    // Highlight active navigation item
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
            
            // Expand parent if in sublist
            let currentElement = link.closest('li.nav-item');
            while (currentElement) {
                const parentUl = currentElement.parentElement;
                if (parentUl && parentUl.classList.contains('nav-sublist')) {
                    const parentExpander = parentUl.previousElementSibling;
                    if (parentExpander && parentExpander.classList.contains('nav-expander')) {
                        parentExpander.classList.add('active');
                        parentUl.style.display = 'block';
                    }
                    currentElement = parentUl.closest('li.nav-item'); // Move up to the parent li of the sublist
                } else {
                    currentElement = null; // Stop if not in a sublist or no parent li
                }
            }
        }
    });
    
    // Navigation expander for chapters
    const navExpanders = document.querySelectorAll('.nav-expander');
    
    navExpanders.forEach(expander => {
        expander.addEventListener('click', function() {
            this.classList.toggle('active');
            const sublist = this.nextElementSibling;
            if (sublist && sublist.classList.contains('nav-sublist')) {
                if (sublist.style.display === 'block') {
                    sublist.style.display = 'none';
                } else {
                    sublist.style.display = 'block';
                }
            }
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    function performSearch(query) {
        if (!query.trim()) return;
        
        // Redirect to search results page with query parameter
        window.location.href = `search.html?q=${encodeURIComponent(query.trim())}`;
    }
    
    // Handle search results page
    if (currentPage === 'search.html') {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        
        if (query) {
            document.getElementById('search-query').textContent = query;
            searchContent(query);
        }
    }
    
    // Function to search through content
    function searchContent(query) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;
        
        // This would typically involve AJAX or fetch to search through content
        // For now, we'll simulate results
        
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        // Load search index (in a real implementation)
        // For now, we'll simulate finding results
        const simulatedResults = [
            {
                title: 'Discrete Random Variables',
                chapter: 'Chapter 7',
                url: 'chapter7.html',
                excerpt: '...contains the definition of discrete random variables and probability mass functions...'
            },
            {
                title: 'Continuous Random Variables',
                chapter: 'Chapter 8',
                url: 'chapter8.html',
                excerpt: '...discusses probability density functions and cumulative distribution functions...'
            },
            {
                title: 'Expectation',
                chapter: 'Chapter 9',
                url: 'chapter9.html',
                excerpt: '...covers the concept of mathematical expectation and its properties...'
            }
        ];
        
        if (simulatedResults.length > 0) {
            simulatedResults.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <h3><a href="${result.url}">${result.title}</a></h3>
                    <p class="search-result-chapter">${result.chapter}</p>
                    <p class="search-result-excerpt">${result.excerpt}</p>
                `;
                resultsContainer.appendChild(resultItem);
            });
        } else {
            resultsContainer.innerHTML = '<p>No results found for your query.</p>';
        }
    }
    
    // MathJax configuration for rendering mathematical formulas
    if (typeof MathJax !== 'undefined') {
        MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['\\[', '\\]']],
                processEscapes: true
            }
        });
    }
});
