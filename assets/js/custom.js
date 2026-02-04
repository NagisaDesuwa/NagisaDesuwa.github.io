// ========================================
// 自定义脚本 - Custom Scripts
// ========================================

(function() {
    'use strict';

    // 1. 视差滚动效果
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(function(element) {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = 'translateY(' + yPos + 'px)';
            });
        });
    }

    // 2. 创建浮动粒子背景
    function createParticles() {
        const particlesContainer = document.querySelector('.particles-background');
        if (!particlesContainer) return;

        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // 随机位置
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';

            // 随机动画延迟
            particle.style.animationDelay = Math.random() * 20 + 's';

            // 随机大小
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            particlesContainer.appendChild(particle);
        }
    }

    // 3. 平滑滚动到锚点
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // 4. 滚动时显示动画
    function initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-on-scroll').forEach(element => {
            observer.observe(element);
        });
    }

    // 5. 鼠标跟随效果（可选）
    function initMouseFollow() {
        const follower = document.createElement('div');
        follower.className = 'mouse-follower';
        follower.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(102, 126, 234, 0.5);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            display: none;
        `;
        document.body.appendChild(follower);

        document.addEventListener('mousemove', function(e) {
            follower.style.display = 'block';
            follower.style.left = e.clientX - 10 + 'px';
            follower.style.top = e.clientY - 10 + 'px';
        });

        document.addEventListener('mouseleave', function() {
            follower.style.display = 'none';
        });
    }

    // 6. 动态背景颜色根据滚动位置
    function initDynamicBackground() {
        window.addEventListener('scroll', function() {
            const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            const hue = Math.floor((scrollPercent / 100) * 360);
            const bg = document.querySelector('.parallax-background');

            if (bg) {
                bg.style.filter = `hue-rotate(${hue}deg)`;
            }
        });
    }

    // 7. 站内搜索功能
    function initSiteSearch() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        if (!searchInput || !searchResults) {
            console.log('Search elements not found');
            return;
        }

        // 实时搜索功能
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim().toLowerCase();

            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }

            searchTimeout = setTimeout(function() {
                performSearch(query, searchResults);
            }, 300);
        });

        // 点击页面其他地方关闭搜索结果
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.innerHTML = '';
            }
        });

        // 按ESC键清空搜索并关闭结果
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchInput.value = '';
                searchResults.innerHTML = '';
                searchInput.blur();
            }
        });
    }

    // 执行搜索
    function performSearch(query, resultsContainer) {
        // 搜索页面内所有链接和标题
        const searchableElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, .archive__item-title');
        const results = [];
        const seen = new Set();

        searchableElements.forEach(function(element) {
            const text = element.textContent.toLowerCase();
            const normalText = element.textContent;

            if (text.includes(query)) {
                let link = '';
                let title = '';
                let description = '';

                // 如果是链接
                if (element.tagName === 'A') {
                    link = element.href;
                    title = normalText;
                }
                // 如果是标题
                else if (element.tagName.match(/^H[1-6]$/)) {
                    // 查找最近的链接
                    const parent = element.closest('article, .archive__item');
                    if (parent) {
                        const parentLink = parent.querySelector('a');
                        if (parentLink) {
                            link = parentLink.href;
                        }
                    }
                    title = normalText;
                }
                // 如果是段落或其他元素
                else {
                    const parent = element.closest('article, .archive__item');
                    if (parent) {
                        const parentLink = parent.querySelector('a');
                        const parentTitle = parent.querySelector('h1, h2, h3, .archive__item-title');
                        if (parentLink && parentTitle) {
                            link = parentLink.href;
                            title = parentTitle.textContent;
                            description = normalText.substring(0, 100) + '...';
                        }
                    }
                }

                // 避免重复结果
                if (link && !seen.has(link)) {
                    seen.add(link);
                    results.push({
                        link: link,
                        title: title || 'Untitled',
                        description: description
                    });
                }
            }
        });

        // 显示搜索结果
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result-item no-results">未找到相关内容</div>';
        } else {
            let html = '';
            // 限制显示前10个结果
            results.slice(0, 10).forEach(function(result) {
                html += '<a href="' + result.link + '" class="search-result-item">';
                html += '<div class="search-result-title">' + escapeHtml(result.title) + '</div>';
                if (result.description) {
                    html += '<div class="search-result-description">' + escapeHtml(result.description) + '</div>';
                }
                html += '</a>';
            });
            resultsContainer.innerHTML = html;
        }
    }

    // HTML转义函数
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Custom scripts loaded!');

        // 初始化所有功能
        initParallax();
        createParticles();
        initSmoothScroll();
        initScrollReveal();
        // initMouseFollow(); // 取消注释以启用鼠标跟随效果
        initDynamicBackground();
        initSiteSearch(); // 初始化搜索功能
    });

})();
