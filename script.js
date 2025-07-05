// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    
    // ハンバーガーメニューの制御
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // ナビゲーションリンクがクリックされたらメニューを閉じる
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
    
    // スムーススクロール
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#home' || targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else if (targetId === '#contact' || targetId === '#contact-cta') {
                // CTAバーまでスクロール
                const ctaBar = document.querySelector('.fixed-cta');
                if (ctaBar) {
                    const ctaPosition = ctaBar.offsetTop + ctaBar.offsetParent.offsetTop - 50;
                    window.scrollTo({
                        top: ctaPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // フォールバック：通常のcontactセクション
                    const targetElement = document.querySelector('#contact');
                    if (targetElement) {
                        const headerHeight = 80;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = 80; // ヘッダーの高さ
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // FAQの開閉機能
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = this.classList.contains('active');
            
            // 他のFAQを閉じる
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.parentElement.querySelector('.faq-answer').classList.remove('active');
            });
            
            // クリックされたFAQを開閉
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
    
    // 症例写真スライダー
    const caseStudies = [
        {
            title: '40代女性 - 顔全体のたるみ改善',
            description: '300ショット施術後１ヶ月の経過',
            before: 'src/assets/case1before.png',
            after: 'src/assets/case1after.png'
        },
        {
            title: '40代女性 - ほうれい線・毛穴の改善',
            description: '３００ショット施術後１ヶ月の経過',
            before: 'src/assets/case2before.png',
            after: 'src/assets/case2after.png'
        },
        {
            title: '40代男性 - 頬周りのコケ・肌質改善',
            description: '300ショット施術後１ヶ月の経過',
            before: 'src/assets/case3before.png',
            after: 'src/assets/case3after.png'
        },
        {
            title: '40代女性 - たるみ改善・小顔効果',
            description: '150ショット施術後1ヶ月の経過',
            before: 'src/assets/case4Before.png',
            after: 'src/assets/case4After.png'
        }
    ];
    
    let currentSlide = 0;
    const caseTitle = document.getElementById('caseTitle');
    const caseDescription = document.getElementById('caseDescription');
    const beforeImage = document.getElementById('beforeImage');
    const afterImage = document.getElementById('afterImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.querySelectorAll('.dot');
    
    // スライドを更新する関数
    function updateSlide(index) {
        if (caseTitle && caseDescription && beforeImage && afterImage) {
            const currentCase = caseStudies[index];
            caseTitle.textContent = currentCase.title;
            caseDescription.textContent = currentCase.description;
            beforeImage.src = currentCase.before;
            afterImage.src = currentCase.after;
            
            // ドットの状態を更新
            sliderDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
    
    // 前のスライドに移動
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + caseStudies.length) % caseStudies.length;
            updateSlide(currentSlide);
        });
    }
    
    // 次のスライドに移動
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % caseStudies.length;
            updateSlide(currentSlide);
        });
    }
    
    // ドットをクリックしてスライド移動
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateSlide(currentSlide);
        });
    });
    
    // 自動スライド（3秒間隔）
    let autoSlideInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % caseStudies.length;
        updateSlide(currentSlide);
    }, 3000);
    
    // スライダー領域にマウスが入ったら自動スライドを停止
    const casesSlider = document.querySelector('.cases-slider');
    if (casesSlider) {
        casesSlider.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });
        
        // マウスが離れたら自動スライドを再開
        casesSlider.addEventListener('mouseleave', function() {
            autoSlideInterval = setInterval(function() {
                currentSlide = (currentSlide + 1) % caseStudies.length;
                updateSlide(currentSlide);
            }, 3000);
        });
    }
    
    // 初期表示
    updateSlide(0);
    
    // スクロール時のヘッダー背景変更
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 電話番号のクリック処理
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // モバイルデバイスでない場合は確認ダイアログを表示
            if (!isMobileDevice()) {
                e.preventDefault();
                const phoneNumber = this.getAttribute('href').replace('tel:', '');
                alert(`お電話でのお問い合わせ: ${phoneNumber}`);
            }
        });
    });
    
    // モバイルデバイスかどうかを判定する関数
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // フォーム送信の処理（将来的に実装予定）
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('お問い合わせありがとうございます。後日ご連絡いたします。');
        });
    });
    
    // 画像の遅延読み込み（Intersection Observer API）
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ページ読み込み完了時のアニメーション
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // エラーハンドリング
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
    });
    
    // 外部リンクの処理
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // キーボードナビゲーション対応
    document.addEventListener('keydown', function(e) {
        // Escapeキーでメニューを閉じる
        if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        }
        
        // 矢印キーでスライダー操作
        if (e.key === 'ArrowLeft' && document.activeElement.closest('.cases-slider')) {
            e.preventDefault();
            currentSlide = (currentSlide - 1 + caseStudies.length) % caseStudies.length;
            updateSlide(currentSlide);
        }
        
        if (e.key === 'ArrowRight' && document.activeElement.closest('.cases-slider')) {
            e.preventDefault();
            currentSlide = (currentSlide + 1) % caseStudies.length;
            updateSlide(currentSlide);
        }
    });
    
    // パフォーマンス監視
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            }, 0);
        });
    }
});

// ユーティリティ関数
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}