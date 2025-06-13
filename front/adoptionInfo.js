// adoptionInfo.js
// 此模組負責顯示「領養單」列表，並綁定新增、編輯、刪除等功能

import showInsertPageAdoption    from "./showInsertPageAdoption.js";   // 顯示新增領養單表單的函式
import showUpdatePageAdoption    from "./showUpdatePageAdoption.js";   // 顯示編輯領養單表單的函式
import doDeleteAdoption          from "./doDeleteAdoption.js";         // 執行刪除領養單請求的函式
import { BASE_URL }              from "./config.js";                   // 後端 API 的基本路徑

/**
 * adoptionInfo():
 * 1. 向後端請求領養單資料
 * 2. 將資料正規化為陣列 rows
 * 3. 動態產生 HTML table，並插入到 #content
 * 4. 綁定「新增」、「編輯」、「刪除」按鈕事件
 */
export default function adoptionInfo() {
  // 取得顯示容器並顯示「載入中」訊息
  const container = document.getElementById("content");
  container.innerHTML = '<p>載入中…</p>';

  // 向後端取得領養單列表
  axios
    .get(`${BASE_URL}/index.php?action=getAdoptions`)
    .then(res => {
      const { status, result, message } = res.data;
      // 若狀態非 200，顯示錯誤訊息
      if (status !== 200) {
        container.innerHTML = `<div class="alert-message alert-error">${message || "伺服器錯誤"}</div>`;
        return;
      }

      // 將後端回傳的 result 正規化為陣列
      let rows = [];
      if (Array.isArray(result)) {
        rows = result;  // 直接就是陣列
      } else if (result && Array.isArray(result.rows)) {
        rows = result.rows;  // 若後端回傳 { rows: [...] }
      } else if (result && Array.isArray(result.data)) {
        rows = result.data;  // 若後端回傳 { data: [...] }
      } else if (result && typeof result === "object") {
        rows = [result];  // 單筆資料包成陣列
      }

      // 若 rows 為空，顯示「無紀錄」
      if (rows.length === 0) {
        container.innerHTML = '<p>目前沒有領養紀錄</p>';
        return;
      }

      // 動態生成表格
      let html = `
        <br/><br/>
        <table class="custom-table">
          <thead>
            <tr>
              <th>編號</th>
              <th>領養者 ID</th>
              <th>寵物 ID</th>
              <th>申請日期</th>
              <th>領養日期</th>
              <th>狀態</th>
              <th>審核者</th>
              <th style="text-align:center;"><button id="newAdopt" class="custom-btn">新增領養</button></th>
            </tr>
          </thead>
          <tbody>
      `;

      // 填入每筆資料
      rows.forEach(item => {
        html += `
          <tr>
            <td>${item.id}</td>
            <td>${item.applicant_id}</td>
            <td>${item.pet_id}</td>
            <td>${item.apply_date || ""}</td>
            <td>${item.pickup_date || ""}</td>
            <td>${item.status || ""}</td>
            <td>${item.reviewed_by || ""}</td>
            <td class="action-column" style="text-align:center;">
              <button class="custom-btn updateAdopt" data-id="${item.id}">修改</button>
              <button class="custom-btn deleteAdopt" data-id="${item.id}">刪除</button>
            </td>
          </tr>
        `;
      });

      html += `
          </tbody>
        </table>
      `;
      container.innerHTML = html;

      // 綁定「新增領養」按鈕
      document.getElementById("newAdopt").addEventListener("click", () => {
        showInsertPageAdoption();
      });

      // 綁定「修改」按鈕事件
      document.querySelectorAll(".updateAdopt").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          showUpdatePageAdoption(id);
        });
      });

      // 綁定「刪除」按鈕事件
      document.querySelectorAll(".deleteAdopt").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          if (confirm("確定要刪除此領養單嗎？")) {
            doDeleteAdoption(id);
          }
        });
      });
    })
    .catch(err => {
      // 請求失敗時顯示錯誤
      container.innerHTML = `
        <div class="alert-message alert-error">
          發生錯誤：${err.message || "網路問題"}
        </div>
      `;
    });
}
