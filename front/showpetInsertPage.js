import doInsertpet from './doInsertpet.js';


export default function showpetInsertPage(){
    let str = `
        <div class="form-container">
            <h2>寵物資料</h2>
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
                    <td>品種：</td>
                    <td><input type="text" id="species"></td>
                </tr>
                <tr>
                    <td>年齡：</td>
                    <td><input type="number" id="age"></td>
                </tr>
                <tr>
                    <td>描述：</td>
                    <td><textarea id="description" rows="3"></textarea></td>
                </tr>
                <tr>
                    <td>照片：</td>
                    <td><input type="file" id="photo" accept="image/*"></td>
                </tr>
                <tr>
                    <td>狀態：</td>
                    <td>
                        <select id="status">
                            <option value="available">可收養</option>
                            <option value="pending">待處理</option>
                            <option value="adopted">已收養</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>建立者：</td>
                    <td><input type="text" id="created_by"></td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: center;">
                        <button id="doInsertpet" class="custom-btn">新增</button>
                        <button id="backToList" class="custom-btn">返回列表</button>
                    </td>
                </tr>
            </table>
        </div>
    `;
    document.getElementById("content").innerHTML = str;
    document.getElementById("doInsertpet").onclick = function(){
        doInsertpet();
    };
    document.getElementById("pet").onclick = function(){
        window.history.back();
    };
}