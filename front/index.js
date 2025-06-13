// index.js
import startPage  from './startPage.js';
import userInfo   from './userInfo.js';
import petInfo    from './petInfo.js';
import loginPage  from './loginPage.js';
import adoptionInfo from './adoptionInfo.js';

function init() {
  setupAxiosInterceptors();
  const token = window.localStorage.getItem('jwtToken');
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    showStartPage();
  } else {
    showLogin();
  }
}

function showStartPage() {
  document.getElementById('root').innerHTML = startPage();
  document.getElementById('user').onclick = userInfo;
  document.getElementById('pet').onclick  = petInfo;
  document.getElementById('adopt').onclick = adoptionInfo;
}

function showLogin() {
  document.getElementById('root').innerHTML = loginPage();
  document.getElementById('loginBtn').onclick = doLogin;
}

async function doLogin() {
  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const msgEl    = document.getElementById('loginMessage');

  if (!email || !password) {
    msgEl.innerText = "請輸入帳號和密碼";
    return;
  }
  msgEl.innerText = "登入中…";

  try {
    const res = await axios.post(
      '../backend/public/index.php?action=doLogin',
      Qs.stringify({ email, password })
    );
    const { status, token, message } = res.data;
    if (status === 200 && token) {
      // → 存成 jwtToken
      window.localStorage.setItem('jwtToken', token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      showStartPage();
    } else {
      msgEl.innerText = message || "登入失敗";
    }
  } catch (err) {
    console.error("登入錯誤:", err);
    msgEl.innerText = err.message || "發生錯誤";
  }
}

function setupAxiosInterceptors() {
  axios.interceptors.response.use(
    response => {
      const newToken = response.data?.token;
      if (newToken) {
        window.localStorage.setItem('jwtToken', newToken);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
      }
      if ([401, 403].includes(response.data?.status)) {
        window.localStorage.removeItem('jwtToken');
        showLogin();
      }
      return response;
    },
    error => {
      if ([401, 403].includes(error.response?.status)) {
        window.localStorage.removeItem('jwtToken');
        showLogin();
      }
      return Promise.reject(error);
    }
  );
}

export function logout() {
  window.localStorage.removeItem('jwtToken');
  showLogin();
}

// 一定要在最後才初始化
window.onload = init;
