/**
 * CLAN Website - Accordion JavaScript
 * FAQアコーディオンの開閉
 */

document.addEventListener('DOMContentLoaded', function() {
    // FAQアコーディオン
    const faqItems = document.querySelectorAll('.clan-faq-item');
    
    if (faqItems.length > 0) {
      faqItems.forEach(item => {
        const question = item.querySelector('.clan-faq-question');
        
        if (question) {
          question.addEventListener('click', function() {
            // クリックされたアイテムのアクティブ状態をトグル
            item.classList.toggle('active');
            
            // 他のアイテムを閉じる（オプション：一度に1つだけ開く場合）
            // faqItems.forEach(otherItem => {
            //   if (otherItem !== item) {
            //     otherItem.classList.remove('active');
            //   }
            // });
          });
        }
      });
    }
  });