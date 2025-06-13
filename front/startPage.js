export default function startPage() {
  // 1. 生成選單按鈕 + 內容區
  const sp = `
    <button id="user"  class="custom-btn">領養者基本資料</button>
    <button id="pet"   class="custom-btn">寵物資料</button>
    <button id="adopt" class="custom-btn">領養單</button>    
    <div id="content"></div>
  `;
    return sp;
}
