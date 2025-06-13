// doInsertAdoption.js
// 處理「新增領養單」：收集表單值、驗證必填欄位、呼叫後端並顯示結果

export default function doInsertAdoption() {
  // 取得主容器和內容區塊
  const root = document.getElementById("root");
  const container = root?.querySelector("#content");
  if (!container) {
    console.error("找不到 #content 容器，無法顯示結果");
    return;
  }

  // 收集表單欄位值
  const data = {
    id:            document.getElementById("id").value.trim(),
    applicant_id:  document.getElementById("applicant_id").value.trim(),
    pet_id:        document.getElementById("pet_id").value.trim(),
    apply_date:    document.getElementById("apply_date").value,
    pickup_date:   document.getElementById("pickup_date").value,
    status:        document.getElementById("status").value.trim(),
    reviewed_by:   document.getElementById("reviewed_by").value.trim()
  };

  // 必填驗證
  if (!data.applicant_id || !data.pet_id) {
    container.innerHTML =
      `<div class="alert-message alert-error">請填寫「領養人 ID」與「寵物 ID」</div>`;
    return;
  }
  if (!data.apply_date) {
    container.innerHTML =
      `<div class="alert-message alert-error">請先完成聲請表後再新增領養單</div>`;
    return;
  }

  // 呼叫後端 API
  axios.post(
    "../backend/public/index.php?action=insertAdoption",
    Qs.stringify(data)
  )
  .then(res => {
    const resp = res.data;
    const cls  = resp.status === 200 ? "alert-success" : "alert-error";
    container.innerHTML =
      `<div class="alert-message ${cls}">${resp.message}</div>`;
    // 1.5 秒後返回列表
    setTimeout(() => {
      document.getElementById("adopt").click();
    }, 1500);
  })
  .catch(err => {
    container.innerHTML =
      `<div class="alert-message alert-error">新增失敗：${err.message || err}</div>`;
    setTimeout(() => {
      document.getElementById("adopt").click();
    }, 1500);
  });
}
