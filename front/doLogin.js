// doLogin.js
import Request from './Request.js';

export default function loginPage() {
  const root = document.getElementById('root');
  root.innerHTML = `
    帳號：<input type="text" id="email"><br>
    密碼：<input type="password" id="password"><br>
    <button id="login">登入</button>
    <div id="content"></div>
  `;

  document.getElementById('login').onclick = async () => {
    const email    = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // 顯示載入中…
    document.getElementById('content').textContent = '登入中...';

    // 組 payload（注意：Qs 放在 window 下）
    const payload = window.Qs.stringify({ email, password });

    try {
      // **移除前導 slash** → 相對 baseURL 發送
      const resp = await Request().post(
        'index.php?action=doLogin',
        payload
      );
      const { status, token, message } = resp.data;

      if (status === 200) {
        window.localStorage.setItem('jwtToken', token);
        // 重新載入，讓 main.js 再次檢查並進入主頁
        window.location.reload();
      } else {
        document.getElementById('content').innerHTML =
          `<div style="color:red">${message}</div>`;
      }
    } catch (err) {
      console.error('登入錯誤', err);
      document.getElementById('content').innerHTML =
        `<div style="color:red">登入失敗：${err.message || '未知錯誤'}</div>`;
    }
  };
}
