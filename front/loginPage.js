// loginPage.js
export default function loginPage() {
  return `
    <div class="login-container" style="max-width:320px;margin:40px auto;padding:20px;border:1px solid #ccc;border-radius:8px;">
      <h2 style="text-align:center;margin-bottom:16px;">寵物管理系統 登入</h2>
      <div style="margin-bottom:8px;">
        <label for="email">帳號：</label><br>
        <input type="text" id="email" placeholder="Email" style="width:100%;padding:8px;"/>
      </div>
      <div style="margin-bottom:16px;">
        <label for="password">密碼：</label><br>
        <input type="password" id="password" placeholder="Password" style="width:100%;padding:8px;"/>
      </div>
      <div style="text-align:center;">
        <button id="loginBtn" style="padding:8px 16px;border:none;border-radius:4px;cursor:pointer;">登入</button>
      </div>
      <div id="loginMessage" style="color:red;margin-top:12px;text-align:center;"></div>
    </div>
  `;
}
