const STORAGE_KEY = "my_links";

const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
const addBtn = document.getElementById("addBtn");
const listEl = document.getElementById("list");

function loadLinks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLinks(links) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

function render() {
  const links = loadLinks();
  listEl.innerHTML = "";

  links.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "item";

    const a = document.createElement("a");
    a.href = item.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = item.name || item.url;

    const delBtn = document.createElement("button");
    delBtn.textContent = "刪除";
    delBtn.onclick = () => {
      const updated = loadLinks();
      updated.splice(index, 1);
      saveLinks(updated);
      render();
    };

    li.appendChild(a);
    li.appendChild(delBtn);
    listEl.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  let url = urlInput.value.trim();

  if (!url) {
    alert("請輸入網址");
    return;
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  const links = loadLinks();
  links.push({ name: name || url, url });
  saveLinks(links);

  nameInput.value = "";
  urlInput.value = "";
  render();
});

render();
