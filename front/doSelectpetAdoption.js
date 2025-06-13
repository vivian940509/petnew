// adoptionList.js
export default function doSelectAdoptions() {
  axios.get("../backend/public/index.php?action=getAdoptions")
    .then(res => {
      const { status, result: rows, message } = res.data;

      if (status === 200) {
        // 開始組 table
        let str = '<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;">';
        // 表頭
        str += `
          <thead>
            <tr>
              <th>編號</th>
              <th>領養人 ID</th>
              <th>寵物 ID</th>
              <th>申請日期</th>
              <th>領養日期</th>
              <th>狀態</th>
              <th>審核者</th>
            </tr>
          </thead>
        `;
        // 表身
        str += '<tbody>';
        if (Array.isArray(rows) && rows.length > 0) {
          rows.forEach(item => {
            str += `
              <tr>
                <td>${item.id}</td>
                <td>${item.applicant_id}</td>
                <td>${item.pet_id}</td>
                <td>${item.apply_date || ""}</td>
                <td>${item.pickup_date || ""}</td>
                <td>${item.status || ""}</td>
                <td>${item.reviewed_by || ""}</td>
              </tr>
            `;
          });
        } else {
          str += `
            <tr>
              <td colspan="7" style="text-align:center;">目前沒有任何領養紀錄</td>
            </tr>
          `;
        }
        str += '</tbody></table>';

        document.getElementById("content").innerHTML = str;
      } else {
        document.getElementById("content").innerHTML =
          `<div class="alert-message alert-error">${message}</div>`;
      }
    })
    .catch(err => {
      document.getElementById("content").innerHTML =
        `<div class="alert-message alert-error">讀取失敗：${err.message || err}</div>`;
    });
}
