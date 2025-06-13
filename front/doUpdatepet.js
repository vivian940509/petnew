console.log('loading from:', new URL('./main.js', import.meta.url).href);
import { showMainPage } from './main.js';

export default function doUpdatepet(){
    let data = {
         "id": document.getElementById("id").value,
         "name": document.getElementById("name").value,
         "species": document.getElementById("species").value,
         "age": document.getElementById("age").value,
         "description": document.getElementById("description").value,
         "photo": document.getElementById("photo").value,
         "status": document.getElementById("status").value,
         "created_by": document.getElementById("created_by").value
     };
     
     axios.post("http://localhost/petHW/backend/public/index.php?action=updatepet_information", Qs.stringify(data))
     .then(res => {
         let response = res['data'];
         document.getElementById("content").innerHTML = response['message'];
         if (response['status'] == 200){
            console.log(response);
            showMainPage(); // 這裡改成 showMainPage
         }
     })
     .catch(err => {
         document.getElementById("content").innerHTML = err; 
     })
}