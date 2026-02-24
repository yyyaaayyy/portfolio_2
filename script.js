// script.js
const $ = (id) => document.getElementById(id);

function escapeHtml(s){
  return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

function renderNav(list){
  const nav = $("nav");
  nav.innerHTML = "";
  list.forEach(item=>{
    const a = document.createElement("a");
    a.href = `#/${item.id}`;
    a.dataset.id = item.id;
    a.innerHTML = `<span>${item.title}</span><span class="badge">${item.badge}</span>`;
    nav.appendChild(a);
  });
}

function setActive(id){
  document.querySelectorAll(".nav a").forEach(a=>{
    a.classList.toggle("active", a.dataset.id === id);
  });
}

function renderView(note){
  const view = $("view");
  if(!note){
    view.innerHTML = `<h2>Not found</h2><p class="muted">章が見つからない。</p>`;
    return;
  }
  const tags = note.tags?.map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join("") ?? "";
  const points = note.points?.map(p=>`<li>${escapeHtml(p)}</li>`).join("") ?? "";
  const code = note.code ? `<pre><code>${escapeHtml(note.code)}</code></pre>` : "";
  view.innerHTML = `
    <h2>${escapeHtml(note.title)}</h2>
    <div class="meta">${tags}</div>
    <p class="lead">${escapeHtml(note.lead ?? "")}</p>
    <ul>${points}</ul>
    ${code}
  `;
}

function getRoute(){
  const h = location.hash || "#/intro";
  const m = h.match(/^#\/([^?]+)/);
  return m ? m[1] : "intro";
}

function applyFilter(){
  const q = $("q").value.trim().toLowerCase();
  const filtered = window.NOTES.filter(n=>{
    const hay = (n.title+" "+(n.badge||"")+" "+(n.lead||"")+" "+(n.tags||[]).join(" ")+" "+(n.points||[]).join(" ")).toLowerCase();
    return hay.includes(q);
  });
  renderNav(filtered);
  // フィルタ後に現在章が消えると困るので、introへ戻す
  const current = getRoute();
  const exists = filtered.some(x=>x.id===current);
  if(!exists && filtered.length){
    location.hash = `#/${filtered[0].id}`;
  }else{
    setActive(current);
  }
}

function boot(){
  $("y").textContent = new Date().getFullYear();

  renderNav(window.NOTES);

  window.addEventListener("hashchange", ()=>{
    const id = getRoute();
    const note = window.NOTES.find(n=>n.id===id);
    setActive(id);
    renderView(note);
  });

  $("q").addEventListener("input", applyFilter);

  const id = getRoute();
  const note = window.NOTES.find(n=>n.id===id) || window.NOTES[0];
  location.hash = `#/${note.id}`;
}

boot();