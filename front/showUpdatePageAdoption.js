// showUpdatePage.js
import { BASE_URL } from './config.js';
import doUpdateAdoption from './doUpdateAdoption.js';
import { setContent } from './domUtils.js';

export default function showUpdatePage(id) {
  const container = document.getElementById("content");
  // 1. 先撈出該筆領養紀錄
  axios.get(`${BASE_URL}/index.php?action=getAdoptions`, {
    params: { id }
  })
  .then(res => {
    const { status, result, message } = res.data;
    if (status === 200 && Array.isArray(result) && result.length > 0) {
      const item = result[0];
      // 2. 渲染表單
      const str = `
        <div class="form-container">
          <h2>編輯領養單</h2>
          <table class="custom-table">
            <tr>
              <td>ID：</td>
              <td><input type="text" id="id" value="${item.id}" readonly /></td>
            </tr>
            <tr>
              <td>領養人 ID：</td>
              <td><input type="text" id="applicant_id" value="${item.applicant_id}" /></td>
            </tr>
            <tr>
              <td>寵物 ID：</td>
              <td><input type="text" id="pet_id" value="${item.pet_id}" /></td>
            </tr>
            <tr>
              <td>申請日期：</td>
              <td><input type="date" id="apply_date" value="${item.apply_date}" /></td>
            </tr>
            <tr>
              <td>領養日期：</td>
              <td><input type="date" id="pickup_date" value="${item.pickup_date}" /></td>
            </tr>
            <tr>
              <td>狀態：</td>
              <td><input type="text" id="status" value="${item.status}" /></td>
            </tr>
            <tr>
              <td>審核者：</td>
              <td><input type="text" id="reviewed_by" value="${item.reviewed_by}" /></td>
            </tr>
            <tr>
              <td colspan="2" style="text-align:center;">
                <button id="doUpdate" class="custom-btn">更新</button>
                <button id="backToList" class="custom-btn">返回列表</button>
              </td>
            </tr>
          </table>
        </div>
      `;
      setContent(str, container);

      // 3. 綁定更新與返回列表
     document.getElementById("doUpdate").onclick = () => doUpdateAdoption();
      document.getElementById("backToList").onclick = () => {
        document.getElementById("adopt").dispatchEvent(new Event("click"));
      };
    } else {
      setContent(
        `<div class="alert-message alert-error">${message || "查無此筆紀錄"}</div>`,
        container
      );
    }
  })
  .catch(err => {
    setContent(
      `<div class="alert-message alert-error">讀取失敗：${err.message || err}</div>`,
      container
    );
  });
}
