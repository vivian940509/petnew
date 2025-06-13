import { BASE_URL } from './config.js';

export default function doInsertpet() {
    const formData = new FormData();
    formData.append('id', document.getElementById('id').value);
    formData.append('name', document.getElementById('name').value);
    const speciesValue = document.getElementById('species').value;
    formData.append('species', speciesValue);
    formData.append('age', document.getElementById('age').value);
    formData.append('description', document.getElementById('description').value);
    const file = document.getElementById('photo').files[0];
    if (file) {
        formData.append('photo', file);
    }
    formData.append('status', document.getElementById('status').value);
    formData.append('created_by', document.getElementById('created_by').value);
    
    // 簡單驗證
    if (!speciesValue) {
        document.getElementById("content").innerHTML =
            `<div class="alert-message alert-error">寵物種類不可為空</div>`;
        return;
    }
    
    // 使用 axios 直接發送 FormData
    axios.post(`${BASE_URL}/index.php?action=newpet_information`, formData)
        .then(res => {
            let response = res.data;
            
            let alertClass = response.status === 200 ? 'alert-success' : 'alert-error';
            document.getElementById("content").innerHTML = 
                `<div class="alert-message ${alertClass}">${response.message}</div>`;
            
            setTimeout(() => {
                const event = new Event('click');
                document.getElementById('pet').dispatchEvent(event);
            }, 1500);
        })
        .catch(err => {
            document.getElementById("content").innerHTML = 
                `<div class="alert-message alert-error">發生錯誤: ${err}</div>`;
            
            setTimeout(() => {
                const event = new Event('click');
                document.getElementById('pet').dispatchEvent(event);
            }, 1500);
        });
}