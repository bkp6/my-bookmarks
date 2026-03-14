const LIST_KEY = "my_links_all";

const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
const addBtn = document.getElementById("addBtn");
const listEl = document.getElementById("list");

// 讀取網址
function loadLinks() {
    const raw = localStorage.getItem(LIST_KEY);
    if (!raw) return [];
    try { return JSON.parse(raw); } catch { return []; }
}

// 儲存網址
function saveLinks(links) {
    localStorage.setItem(LIST_KEY, JSON.stringify(links));
}

// 渲染網址列表
function renderLinks() {
    const links = loadLinks();
    listEl.innerHTML = "";

    links.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "item";

        const a = document.createElement("a");
        a.href = item.url;
        a.target = "_blank";
        a.textContent = item.name || item.url;

        const delBtn = document.createElement("button");
        delBtn.textContent = "刪除";
        delBtn.onclick = () => {
            const updated = loadLinks();
            updated.splice(index, 1);
            saveLinks(updated);
            renderLinks();
        };

        li.appendChild(a);
        li.appendChild(delBtn);
        listEl.appendChild(li);
    });
}

// 新增網址
addBtn.onclick = () => {
    let name = nameInput.value.trim();
    let url = urlInput.value.trim();

    if (!url) return alert("請輸入網址");
    if (!url.startsWith("http")) url = "https://" + url;

    const links = loadLinks();

    if (links.some(item => item.name === name)) {
        return alert("名稱重複");
    }

    links.push({ name: name || url, url });
    saveLinks(links);

    nameInput.value = "";
    urlInput.value = "";

    renderLinks();
};

// 初始化
renderLinks();
