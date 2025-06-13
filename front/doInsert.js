export default function doInsert(){
    let data = {
         // 取得所有表單資料
         "id": document.getElementById("id").value,
         "name": document.getElementById("name").value,
         "email": document.getElementById("email").value,
         "phone": document.getElementById("phone").value,
         "id_card": document.getElementById("id_card").value
     };
     
     // 簡單驗證
     if (!data.name) {
         document.getElementById("content").innerHTML = 
             `<div class="alert-message alert-error">姓名不可為空</div>`;
         return;
     }
     
     if (!data.id) {
         document.getElementById("content").innerHTML = 
             `<div class="alert-message alert-error">ID不可為空</div>`;
         return;
     }
    
    axios.post("../backend/public/index.php?action=newUser", Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        
        let alertClass = response['status'] === 200 ? 'alert-success' : 'alert-error';
        document.getElementById("content").innerHTML = 
            `<div class="alert-message ${alertClass}">${response['message']}</div>`;
        
        // 無論成功或失敗，都延遲1.5秒後重新載入列表
        setTimeout(() => {
            const event = new Event('click');
            document.getElementById('user').dispatchEvent(event);
        }, 1500);
    })
    .catch(err => {
        document.getElementById("content").innerHTML = 
            `<div class="alert-message alert-error">發生錯誤: ${err}</div>`;
        
        setTimeout(() => {
            const event = new Event('click');
            document.getElementById('user').dispatchEvent(event);
        }, 1500);
    });
}