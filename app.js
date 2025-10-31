/* Crush Closet — minimal JS for filtering and rendering cards */
const state = {
  items: [],
  filters: { season: "", occasion: "", budget: "", search: "" },
  saved: new Set(JSON.parse(localStorage.getItem("saved") || "[]")),
  theme: localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
};

const els = {
  grid: document.getElementById("grid"),
  empty: document.getElementById("empty"),
  season: document.getElementById("season"),
  occasion: document.getElementById("occasion"),
  budget: document.getElementById("budget"),
  search: document.getElementById("search"),
  cardTpl: document.getElementById("card-tpl"),
  year: document.getElementById("year"),
  modeToggle: document.querySelector(".mode-toggle")
};

document.documentElement.classList.toggle("light", state.theme === "light");
els.year.textContent = new Date().getFullYear();

['season','occasion','budget'].forEach(id => {
  els[id].addEventListener('change', () => {
    state.filters[id] = els[id].value;
    render();
  });
});
els.search.addEventListener('input', e => {
  state.filters.search = e.target.value.trim().toLowerCase();
  render();
});
els.modeToggle.addEventListener('click', () => {
  state.theme = state.theme === "light" ? "dark" : "light";
  document.documentElement.classList.toggle("light", state.theme === "light");
  localStorage.setItem("theme", state.theme);
});

fetch("./content/picks.json")
  .then(r => r.json())
  .then(data => {
    state.items = data.items || [];
    render();
  })
  .catch(err => {
    console.error("Failed to load picks.json", err);
    els.empty.classList.remove("hidden");
    els.empty.textContent = "Couldn't load this week's crushes. Try refreshing.";
  });

function matchesFilters(item){
  const { season, occasion, budget, search } = state.filters;
  const hay = (item.title + " " + item.desc + " " + (item.tags||[]).join(" ") + " " + (item.brand||"")).toLowerCase();
  if (season && item.season !== season) return false;
  if (occasion && !(item.occasions||[]).includes(occasion)) return false;
  if (budget && item.budget !== budget) return false;
  if (search && !hay.includes(search)) return false;
  return true;
}

function render(){
  const items = state.items.filter(matchesFilters);
  els.grid.innerHTML = "";
  if (!items.length){
    els.empty.classList.remove("hidden");
    return;
  }
  els.empty.classList.add("hidden");

  for (const it of items){
    const node = els.cardTpl.content.firstElementChild.cloneNode(true);
    node.querySelector(".card-img").src = it.image;
    node.querySelector(".card-img").alt = it.title + " product image";
    node.querySelector(".eyebrow").textContent = `${it.season} • ${it.budget}`;
    node.querySelector(".card-title").textContent = it.title;
    node.querySelector(".card-meta").textContent = it.brand ? `${it.brand} • ${it.color || ""}`.trim() : (it.color || "");
    node.querySelector(".card-desc").textContent = it.desc || "";
    const buy = node.querySelector(".buy");
    buy.href = it.link;
    buy.textContent = it.price ? `Shop — ${it.price}` : "Shop";
    const alt = node.querySelector(".alt");
    if (it.alt){
      alt.href = it.alt;
      alt.textContent = "Alt";
      alt.style.display = "inline-flex";
    }

    // Save toggle
    const saveBtn = node.querySelector(".save");
    const id = it.id || it.link;
    if (state.saved.has(id)) saveBtn.textContent = "♥";
    saveBtn.addEventListener("click", () => {
      if (state.saved.has(id)){
        state.saved.delete(id);
        saveBtn.textContent = "♡";
      } else {
        state.saved.add(id);
        saveBtn.textContent = "♥";
      }
      localStorage.setItem("saved", JSON.stringify([...state.saved]));
    });

    els.grid.appendChild(node);
  }
}
