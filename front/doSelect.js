export default function doSelect(){
    axios.get("../backend/public/index.php?action=getUsers")
    .then(res => {
        let response = res['data'];
        switch(response['status']){
            case 200:
                const rows = response['result'];
                // 表格建立
                let str = '<table>';
                // 表頭
                str += '<thead><tr>';
                str += '<th>編號</th>';
                str += '<th>姓名</th>';
                str += '<th>email</th>';
                str += '<th>電話</th>';
                str += '<th>身分證字號</th>';
                str += '</tr></thead>';
                // 表身
                str += '<tbody>';
                rows.forEach(element => {
                    str += "<tr>";
                    str += "<td>" + element['id'] + "</td>";
                    str += "<td>" + (element['name'] || '') + "</td>";
                    str += "<td>" + element['email'] + "</td>";
                    str += "<td>" + element['phone'] + "</td>";
                    str += "<td>" + element['id_card'] + "</td>";
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