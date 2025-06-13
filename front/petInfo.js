// petInfo.js
import showpetInsertPage   from "./showpetInsertPage.js";
import showpetUpdatePage   from "./showpetUpdatePage.js";
import doDeletepet         from "./doDeletepet.js";

export default function petInfo() {
  const contentEl = document.getElementById("content");
  if (!contentEl) {
    console.error("找不到 content 元素");
    return;
  }

  axios.get("http://localhost/petHW/backend/public/index.php?action=getpet_information")
    .then(res => {
      const response = res.data;
      if (response.status !== 200) {
        contentEl.innerHTML = `<p style="color:red;">${response.message}</p>`;
        return;
      }

      const rows = response.result;
      let str = `
        <br/><br/>
        <table class="custom-table">
          <thead>
            <tr>
              <th>編號</th>
              <th>姓名</th>
              <th>品種</th>
              <th>年齡</th>
              <th class="hide-on-tablet">描述</th>
              <th class="hide-on-tablet">照片</th>
              <th>狀態</th>
              <th class="hide-on-tablet">建立者</th>
              <th style="text-align:center;">
                <button type="button" id="newPet" class="custom-btn">新增寵物</button>
              </th>
            </tr>
          </thead>
          <tbody>
      `;

      rows.forEach(el => {
        // 狀態文字與樣式
        let statusText = el.status || "";
        let statusClass = "";
        if (el.status === "available") {
          statusText = "可收養"; statusClass = "status-available";
        } else if (el.status === "pending") {
          statusText = "待處理"; statusClass = "status-pending";
        } else if (el.status === "adopted") {
          statusText = "已收養"; statusClass = "status-adopted";
        }

        str += `
          <tr>
            <td data-id="${el.id}" data-title="編號">${el.id}</td>
            <td data-title="姓名">${el.name || ""}</td>
            <td data-title="品種">${el.species || ""}</td>
            <td data-title="年齡">${el.age || ""}</td>
            <td class="hide-on-tablet" data-title="描述">
              ${(el.description || "").slice(0, 30)}${el.description && el.description.length > 30 ? "…" : ""}
            </td>
            <td class="hide-on-tablet" data-title="照片">
              ${el.photo ? `<img src="${el.photo}" width="50">` : ""}
            </td>
            <td data-title="狀態"><span class="${statusClass}">${statusText}</span></td>
            <td class="hide-on-tablet" data-title="建立者">${el.created_by || ""}</td>
            <td class="action-column" data-title="操作">
              <button type="button" name="updatePet" class="custom-btn">修改</button>
              &ensp;
              <button type="button" name="deletePet" class="custom-btn delete-btn">刪除</button>
            </td>
          </tr>
        `;
      });

      str += `
          </tbody>
        </table>
      `;
      contentEl.innerHTML = str;

      // 綁定「新增寵物」
      document.getElementById("newPet").addEventListener("click", e => {
        e.preventDefault();
        showpetInsertPage();
      });

      // 取得所有列的 id cell
      const idCells = Array.from(contentEl.querySelectorAll("td[data-id]"));

      // 綁定「修改」按鈕
      const updateBtns = contentEl.querySelectorAll("button[name='updatePet']");
      updateBtns.forEach((btn, idx) => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          const id = idCells[idx]?.getAttribute("data-id");
          if (id) showpetUpdatePage(id);
        });
      });

      // 綁定「刪除」按鈕
      const deleteBtns = contentEl.querySelectorAll("button[name='deletePet']");
      deleteBtns.forEach((btn, idx) => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          const id = idCells[idx]?.getAttribute("data-id");
          if (id) doDeletepet(id);
        });
      });

    })
    .catch(err => {
      contentEl.innerHTML = `<p style="color:red;">網路錯誤：${err.message || err}</p>`;
    });
}
