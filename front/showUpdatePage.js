import doUpdate from './doUpdate.js';
export default function showUpdatePage(id){

    let data = {
        "id": id,
    };
    
   axios.get("http://localhost/petHW/backend/public/index.php?action=getUsers", { params: data })
    .then(res => {
        let response = res['data'];
        switch(response['status']){
            case 200:
                const rows = response['result'];
                const row = rows[0];
                let str = `編號：<input type="text" id="id" value="` + row['id'] + `"><br>`;
                str += `姓名：<input type="text" id="name" value="` + row['name'] + `"><br>`;
                str += `email：<input type="text" id="email" value="` + row['email'] + `"><br>`;
                str += `電話：<input type="text" id="phone" value="` + row['phone'] + `"><br>`;
                str += `身分證字號：<input type="text" id="id_card" value="` + row['id_card'] + `"><br>`;
                str += `<button id="doUpdate">修改</button>`;

                document.getElementById("content").innerHTML = str;
                document.getElementById("doUpdate").onclick = function(){
                    doUpdate();
                };
                break;
            default:
                document.getElementById("content").innerHTML = response['message'];
                break;
        }
    })
    .catch(err => {
        document.getElementById("content").innerHTML = err;  
    });          
}