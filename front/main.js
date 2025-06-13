// ...existing code...
import Request from './Request.js';
import loginPage from './doLogin.js';
import { logout } from './index.js';
import userInfo from './userInfo.js';
import petInfo from './petInfo.js';
import adoptionInfo from './adoptionInfo.js';

const root = document.getElementById('root');
const token = window.localStorage.getItem('jwtToken');

// 如果沒有 token，就顯示登入頁
if (!token) {
  loginPage();
} else {
  // 有 token 再驗證
  Request()
    .get('index.php?action=getUsers')
    .then(res => {
      const { status, message, token: newToken } = res.data;
      if (status === 200) {
        // 驗證成功，更新 token 並顯示主頁
        if (newToken) {
          window.localStorage.setItem('jwtToken', newToken);
        }
        showMainPage();
      } else if (status === 401 || status === 403) {
        // token 無效或權限不足
        loginPage();
      } else {
        root.innerHTML = `<p style="color:red;">${message}</p>`;
      }
    })
    .catch(err => {
      console.error('驗證失敗:', err);
      root.innerHTML = `<p style="color:red;">連線失敗，請稍後再試</p>`;
    });
}

// ✅ 主頁顯示與功能按鈕綁定
export function showMainPage() {
  const sp = `
    <div class="header">
      <h2>寵物管理系統</h2>
      <button id="logout" class="logout-btn">登出</button>
    </div>
    <div class="nav-buttons">
      <button id="user"  class="custom-btn">領養者資料</button>
      <button id="pet"   class="custom-btn">寵物資料</button>
      <button id="adopt" class="custom-btn">領養資料</button>
    </div>
    <div id="content"></div>
  `;

  root.innerHTML = sp;

  // 綁定「登出」事件
  document.getElementById('logout').onclick = logout;

  // 綁定「領養者資料」
  document.getElementById('user').onclick = e => {
    e.preventDefault();
    if (typeof userInfo === 'function') {
      userInfo();
    } else {
      console.error('找不到領養者資料顯示函數');
      document.getElementById('content').innerHTML = '<p>領養者資料顯示功能尚未實現</p>';
    }
  };

  // 綁定「寵物資料」
  document.getElementById('pet').onclick = e => {
    e.preventDefault();
    if (typeof petInfo === 'function') {
      petInfo();
    } else {
      console.error('找不到寵物資料顯示函數');
      document.getElementById('content').innerHTML = '<p>寵物資料顯示功能尚未實現</p>';
    }
  };

  // 綁定「領養資料」
  document.getElementById('adopt').onclick = e => {
    e.preventDefault();
    if (typeof adoptionInfo === 'function') {
      adoptionInfo();
    } else {
      console.error('找不到領養資料顯示函數');
      document.getElementById('content').innerHTML = '<p>領養資料顯示功能尚未實現</p>';
    }
  };

  // 防止連結跳轉
  document.addEventListener('click', e => {
    if (e.target.tagName === 'A' && !e.target.hasAttribute('target')) {
      e.preventDefault();
    }
  });

  // 預設顯示第一個頁籤
  document.getElementById('user').click();
}