/**
 * CLAN Website - Navigation JavaScript
 * モバイルメニューの開閉と戻るボタンの制御
 */

document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニュー開閉
    const mobileMenuBtn = document.querySelector('.clan-mobile-menu-btn');
    const mobileMenu = document.querySelector('.clan-mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        // スクロール防止
        document.body.classList.toggle('no-scroll');
      });
      
      // モバイルメニュー内のリンククリック時にメニューを閉じる
      const mobileNavLinks = document.querySelectorAll('.clan-mobile-nav-list a');
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenuBtn.classList.remove('active');
          mobileMenu.classList.remove('open');
          document.body.classList.remove('no-scroll');
        });
      });
    }
    
    // 戻るボタン
    const backToTopBtn = document.querySelector('.clan-back-to-top');
    
    if (backToTopBtn) {
      // スクロール位置によって戻るボタンの表示/非表示を切り替え
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      });
      
      // 戻るボタンクリック時のスムーズスクロール
      backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    
    // 現在のページをナビゲーションでアクティブにする
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.clan-nav-list a');
    const mobileNavLinks = document.querySelectorAll('.clan-mobile-nav-list a');
    
    function setActiveNavLink(links) {
      links.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // トップページの場合
        if (currentLocation === '/' || currentLocation === '/index.html') {
          if (linkPath === 'index.html' || linkPath === './') {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        } 
        // その他のページの場合
        else if (currentLocation.includes(linkPath) && linkPath !== 'index.html' && linkPath !== './') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
    
    setActiveNavLink(navLinks);
    setActiveNavLink(mobileNavLinks);
  });