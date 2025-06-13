// showAdoptionInsertPage.js
import doInsertAdoption from './doInsertAdoption.js';

export default function showAdoptionInsertPage() {
  const str = `
    <div class="form-container">
      <h2>新增領養單</h2>
      <table class="custom-table">
        <tr>
          <td>ID (選填)：</td>
          <td><input type="text" id="id" /></td>
        </tr>
        <tr>
          <td>領養人 ID：</td>
          <td><input type="text" id="applicant_id" /></td>
        </tr>
        <tr>
          <td>寵物 ID：</td>
          <td><input type="text" id="pet_id" /></td>
        </tr>
        <tr>
          <td>申請日期：</td>
          <td><input type="date" id="apply_date" /></td>
        </tr>
        <tr>
          <td>領養日期：</td>
          <td><input type="date" id="pickup_date" /></td>
        </tr>
        <tr>
          <td>狀態：</td>
          <td><input type="text" id="status" /></td>
        </tr>
        <tr>
          <td>審核者：</td>
          <td><input type="text" id="reviewed_by" /></td>
        </tr>
        <tr>
          <td colspan="2" style="text-align:center;">
            <button id="doInsert" class="custom-btn">送出申請</button>
            <button id="backToList" class="custom-btn">返回列表</button>
          </td>
        </tr>
      </table>
      <div id="content"></div>
    </div>
  `;
  document.getElementById("content").innerHTML = str;

  // 綁定送出申請
  document.getElementById("doInsert").onclick = () => {
    doInsertAdoption();
  };

  // 綁定返回列表
  document.getElementById("backToList").onclick = () => {
    document.getElementById("adopt").dispatchEvent(new Event("click"));
  };
}
