export default function doSelectpet(){
    // 修改 API 端點為寵物相關
    axios.get("../backend/public/index.php?action=getpet_information")
    .then(res => {
        let response = res['data'];
        switch(response['status']){
            case 200:
                const rows = response['result'];
                // 表格建立
                let str = '<table>';
                // 表頭 - 修改為寵物資料欄位
                str += '<thead><tr>';
                str += '<th>編號</th>';
                str += '<th>名稱</th>';
                str += '<th>種類</th>';
                str += '<th>年齡</th>';
                str += '<th>描述</th>';
                str += '<th>照片</th>';
                str += '<th>狀態</th>';
                str += '<th>建立者</th>';
                str += '</tr></thead>';
                // 表身
                str += '<tbody>';
                rows.forEach(element => {
                    str += "<tr>";
                    str += "<td>" + element['id'] + "</td>";
                    str += "<td>" + (element['name'] || '') + "</td>";
                    str += "<td>" + (element['species'] || '') + "</td>";
                    str += "<td>" + (element['age'] || '') + "</td>";
                    str += "<td>" + (element['description'] || '') + "</td>";
                    
                    // 照片欄位可能需要特殊處理，如果是URL可以顯示圖片
                    if (element['photo']) {
                        str += "<td><img src='" + element['photo'] + "' alt='寵物照片' width='50' height='50'></td>";
                    } else {
                        str += "<td>無照片</td>";
                    }
                    
                    str += "<td>" + (element['status'] || '') + "</td>";
                    str += "<td>" + (element['created_by'] || '') + "</td>";
                    str += "</tr>";
                });
                str += '</tbody></table>';
                document.getElementById("content").innerHTML = str;
                break;
            default:
                document.getElementById("content").innerHTML = response['message'];
                break;
        }
    })
    .catch(err => {
        document.getElementById("content").innerHTML = err;
    })
}