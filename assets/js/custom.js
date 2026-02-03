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
    });

})();
