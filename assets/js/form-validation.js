/**
 * CLAN Website - Form Validation JavaScript
 * フォームの入力チェックとバリデーション
 */

document.addEventListener('DOMContentLoaded', function() {
  // お問い合わせフォーム
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      if (!validateForm(contactForm)) {
        event.preventDefault();
      } else {
        // 本番環境では、ここでフォームデータをサーバーに送信するAjax処理などを実装
        // 今回はデモなので、ローカルストレージにデータを保存
        saveFormDataToLocalStorage('contactFormData', contactForm);
        
        // 送信成功メッセージ（実際の環境では不要）
        alert('お問い合わせが送信されました。担当者からご連絡いたします。');
      }
    });
  }
  
  // 無料相談フォーム
  const seminarForm = document.getElementById('seminarForm');
  if (seminarForm) {
    seminarForm.addEventListener('submit', function(event) {
      if (!validateForm(seminarForm)) {
        event.preventDefault();
      } else {
        // 本番環境では、ここでフォームデータをサーバーに送信するAjax処理などを実装
        // 今回はデモなので、ローカルストレージにデータを保存
        saveFormDataToLocalStorage('seminarFormData', seminarForm);
        
        // 送信成功メッセージ（実際の環境では不要）
        alert('無料相談のお申し込みを受け付けました。担当者から詳細についてご連絡いたします。');
      }
    });
  }
  
  // フォームの入力値をチェックする関数
  function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // 必須項目のチェック
    requiredFields.forEach(field => {
      // エラーメッセージを削除
      removeErrorMessage(field);
      
      if (!field.value.trim()) {
        // 未入力エラー
        showErrorMessage(field, '必須項目です');
        isValid = false;
      } else if (field.type === 'email' && !isValidEmail(field.value)) {
        // メールアドレス形式チェック
        showErrorMessage(field, '有効なメールアドレスを入力してください');
        isValid = false;
      } else if (field.type === 'tel' && !isValidPhone(field.value)) {
        // 電話番号形式チェック
        showErrorMessage(field, '有効な電話番号を入力してください');
        isValid = false;
      } else if (field.type === 'checkbox' && !field.checked) {
        // チェックボックスチェック
        showErrorMessage(field, 'チェックが必要です');
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  // メールアドレスの形式チェック
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  
  // 電話番号の形式チェック（日本の電話番号形式に対応）
  function isValidPhone(phone) {
    // 数字、ハイフン、プラス、カッコのみを許可
    const cleanedPhone = phone.replace(/[^\d\-+()]/g, '');
    // 最低6桁、最大15桁（国際番号を含む場合）
    return cleanedPhone.length >= 6 && cleanedPhone.length <= 15;
  }
  
  // エラーメッセージを表示する関数
  function showErrorMessage(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'clan-form-error';
    errorDiv.textContent = message;
    
    // フィールドの後ろにエラーメッセージを挿入
    field.parentNode.appendChild(errorDiv);
    
    // エラー発生フィールドのスタイルを変更
    field.style.borderColor = '#e53e3e';
  }
  
  // エラーメッセージを削除する関数
  function removeErrorMessage(field) {
    const errorDiv = field.parentNode.querySelector('.clan-form-error');
    if (errorDiv) {
      errorDiv.parentNode.removeChild(errorDiv);
    }
    
    // フィールドのスタイルをリセット
    field.style.borderColor = '';
  }
  
  // フォームデータをローカルストレージに保存（デモ用）
  function saveFormDataToLocalStorage(key, form) {
    const formData = new FormData(form);
    const formDataObj = {};
    
    for (const [name, value] of formData.entries()) {
      formDataObj[name] = value;
    }
    
    localStorage.setItem(key, JSON.stringify(formDataObj));
  }
});
