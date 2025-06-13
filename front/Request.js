

export default function Request() {
  const req = axios.create({
    baseURL: 'http://localhost/petHW/backend/public/',  // ← 注意最後要有 "/"
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  // 每次請求才從 localStorage 取最新 token
  req.interceptors.request.use(cfg => {
    const t = window.localStorage.getItem('jwtToken');
    if (t) cfg.headers.Authorization = `Bearer ${t}`;
    return cfg;
  });

  req.interceptors.response.use(
    r => r,
    e => {
      if (e.response && e.response.status === 401) {
        window.localStorage.removeItem('jwtToken');
        // window.location.href = '/login.html';
      }
      return Promise.reject(e);
    }
  );
  return req;
}