/**
 * CLAN Website - Main JavaScript
 * 共通機能の実装
 */

document.addEventListener('DOMContentLoaded', function() {
    // リンクのスムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 100, // ヘッダー分の高さを考慮
            behavior: 'smooth'
          });
        }
      });
    });
    
    // 外部リンクに_blankと属性を追加
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (!link.hasAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
    
    // 画像の遅延読み込み
    if ('loading' in HTMLImageElement.prototype) {
      // ネイティブの遅延読み込みをサポートしているブラウザ
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        img.src = img.dataset.src;
      });
    } else {
      // Intersection Observer APIを使用した代替手段
      const loadImage = (image) => {
        image.src = image.dataset.src;
      };
      
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
      });
    }
    
    // 画面内に入ったら要素をフェードイン
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
      const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
      
      fadeElements.forEach(element => {
        fadeObserver.observe(element);
      });
    }
  });