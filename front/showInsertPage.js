import doInsert from './doInsert.js';

export default function showInsertPage(){
    let str = `
        <div class="form-container">
            <h2>領養者資料</h2>
            <table class="custom-table">
                <tr>
                    <td>ID：</td>
                    <td><input type="text" id="id"></td>
                </tr>
                <tr>
                    <td>姓名：</td>
                    <td><input type="text" id="name"></td>
                </tr>
                <tr>
                    <td>Email：</td>
                    <td><input type="text" id="email"></td>
                </tr>
                <tr>
                    <td>電話：</td>
                    <td><input type="text" id="phone"></td>
                </tr>
                <tr>
                    <td>身分證字號：</td>
                    <td><input type="text" id="id_card"></td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: center;">
                        <button id="doInsert" class="custom-btn">新增</button>
                        <button id="backToList" class="custom-btn">返回列表</button>
                    </td>
                </tr>
            </table>
        </div>
    `;
    document.getElementById("content").innerHTML = str;
    document.getElementById("doInsert").onclick = function(){
        doInsert();
    };
    
}