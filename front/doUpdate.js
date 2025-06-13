export default function doUpdate(){
    let data = {
         "id": document.getElementById("id").value,
         "name": document.getElementById("name").value,
         "email": document.getElementById("email").value,
         "phone": document.getElementById("phone").value,
         "id_card": document.getElementById("id_card").value
        //這裡不能使用 .innerText  需要使用 .value、因為 <input> 裡面根本沒有 innerText
     };
     
     axios.post("http://localhost/petHW/backend/public/index.php?action=updateUser", Qs.stringify(data))
     .then(res => {
         let response = res['data'];
         document.getElementById("content").innerHTML = response['message'];
     })
     .catch(err => {
         document.getElementById("content").innerHTML = err; 
     })
 }