(function () {
  const GUIDE = window.TREE_GUIDE;

  function compile(guide) {
    const coupletById = {};
    const speciesById = {};
    guide.couplets.forEach((c) => { coupletById[c.id] = c; });
    guide.species.forEach((s) => { speciesById[s.id] = s; });

    const pages = [];
    function add(page) {
      page.n = pages.length + 1;
      pages.push(page);
      return page.n;
    }

    add({ type: "cover" });
    add({ type: "howto" });

    const coupletPage = {};
    guide.couplets.forEach((c) => {
      coupletPage[c.id] = add({ type: "key", couplet: c });
    });

    const speciesOrder = [];
    const seenSp = new Set();
    const seenC = new Set();
    function walk(ref) {
      if (!ref) return;
      if (ref.startsWith("s:")) {
        const id = ref.slice(2);
        if (!speciesById[id]) throw new Error("Unknown species " + id);
        if (!seenSp.has(id)) {
          seenSp.add(id);
          speciesOrder.push(id);
        }
      } else if (ref.startsWith("c:")) {
        const id = ref.slice(2);
        if (!coupletById[id]) throw new Error("Unknown couplet " + id);
        if (seenC.has(id)) return;
        seenC.add(id);
        coupletById[id].choices.forEach((ch) => walk(ch.to));
      }
    }
    walk("c:start");
    guide.species.forEach((s) => {
      if (!seenSp.has(s.id)) speciesOrder.push(s.id);
    });

    const speciesPage = {};
    speciesOrder.forEach((id) => {
      speciesPage[id] = add({ type: "species", species: speciesById[id] });
    });
    const indexN = add({ type: "index" });

    function resolve(to) {
      if (to.startsWith("c:")) return coupletPage[to.slice(2)];
      if (to.startsWith("s:")) return speciesPage[to.slice(2)];
      return null;
    }

    pages.forEach((p) => {
      if (p.type === "key") {
        p.couplet.choices.forEach((ch) => {
          ch.page = resolve(ch.to);
        });
      }
    });

    return { pages, coupletPage, speciesPage, indexN, speciesById, coupletById };
  }

  const book = compile(GUIDE);
  window.FIELD_GUIDE_BOOK = book;

  const sheet = document.getElementById("sheet");
  const folio = document.getElementById("folio");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const homeBtn = document.getElementById("homeBtn");
  const running = document.getElementById("runningTitle");
  const total = book.pages.length;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function pageLink(n, label) {
    return `<button type="button" class="page-link" data-goto="${n}">${label || n}</button>`;
  }

  function renderCover() {
    return `
      <div class="cover">
        <img class="cover-plate" src="assets/cover-wreath.jpg" alt="Pencil wreath of oak, holly and pine">
        <h1>Trees of England</h1>
        <p class="subtitle">A key to trees growing wild,<br>native and long since naturalised</p>
        <hr class="rule">
        <p class="lede">Begin at the first question. At each step choose the line that fits the tree before you, and turn to the page it names.</p>
      </div>`;
  }

  function renderHowto() {
    const keyStart = book.coupletPage.start;
    return `
      <div class="howto">
        <h2>A word to the finder</h2>
        <hr class="rule">
        <p class="prose">This little guide is made in the old way. It does not ask you to leaf through pictures until one looks right. It asks questions, as a botanist’s key does, until the tree is named.</p>
        <ol>
          <li>Stand with the tree. Take several leaves, not one, and look also at bark, buds, fruit, and the ground beneath.</li>
          <li>Begin the key on ${pageLink(keyStart, "page " + keyStart)}. At each page, two or three statements are offered.</li>
          <li>Choose the statement that fits, and tap the page number in the margin — or simply turn the pages as you would a book.</li>
          <li>The acorn at the top always returns you to the title-page.</li>
        </ol>
        <p class="prose">Willows, elms, oaks and limes hybridise, and some planted trees sit awkwardly in a wild key. Where that is so, the notes on the species page will say. The trees treated here are those you may reasonably meet growing wild in England — in wood, hedge, heath, river, dune, roadside and waste ground — not the rarer ornaments of gardens. Each named tree has a graphite plate of the characters most useful in the field.</p>
      </div>`;
  }

  function renderKey(page) {
    const c = page.couplet;
    const choices = c.choices.map((ch) => `
      <li>
        <button type="button" class="choice" data-goto="${ch.page}">
          <span class="choice-text">${escapeHtml(ch.text)}</span>
          <span class="choice-page">${ch.page}</span>
        </button>
      </li>`).join("");
    return `
      <p class="lede">${escapeHtml(c.prompt)}</p>
      <ul class="choice-list">${choices}</ul>`;
  }

  function similarLine(species) {
    if (!species.similar || !species.similar.length) return "";
    const parts = species.similar.map((id) => {
      const s = book.speciesById[id];
      const n = book.speciesPage[id];
      if (!s || !n) return "";
      return `${escapeHtml(s.common)}, ${pageLink(n, "p. " + n)}`;
    }).filter(Boolean);
    return parts.join("; ");
  }

  function renderSpecies(page) {
    const s = page.species;
    const also = s.also && s.also.length ? `<p class="also">also called ${escapeHtml(s.also.join(", "))}</p>` : "";
    const like = similarLine(s);
    return `
      <h2>${escapeHtml(s.common)}</h2>
      <span class="latin">${escapeHtml(s.latin)}</span>
      <p class="meta-line">${escapeHtml(s.status)} · ${escapeHtml(s.height)}</p>
      ${also}
      <hr class="rule">
      <div class="plate-hold" data-plate="${escapeHtml(s.id)}"></div>
      <table class="facts">
        <tr><th>Leaf</th><td>${escapeHtml(s.leaf)}</td></tr>
        <tr><th>Bark</th><td>${escapeHtml(s.bark)}</td></tr>
        <tr><th>Flower</th><td>${escapeHtml(s.flower)}</td></tr>
        <tr><th>Fruit</th><td>${escapeHtml(s.fruit)}</td></tr>
        <tr><th>Where</th><td>${escapeHtml(s.habitat)}</td></tr>
        <tr><th>Notes</th><td>${escapeHtml(s.notes)}</td></tr>
        ${like ? `<tr><th>Like</th><td class="like-list">${like}</td></tr>` : ""}
      </table>`;
  }

  function renderIndex() {
    const items = GUIDE.species.slice().sort((a, b) => a.common.localeCompare(b.common)).map((s) => {
      const n = book.speciesPage[s.id];
      return `<li>
        <button type="button" class="index-name" data-goto="${n}">
          ${escapeHtml(s.common)}
          <small>${escapeHtml(s.latin)}</small>
        </button>
        <button type="button" class="page-link" data-goto="${n}">${n}</button>
      </li>`;
    }).join("");
    return `
      <h2>Index of trees</h2>
      <hr class="rule">
      <p class="lede">Common names, with the Latin for the sure of hand. Numbers are pages.</p>
      <ul class="index-list">${items}</ul>`;
  }

  function roman(n) {
    if (n === 1) return "i";
    if (n === 2) return "ii";
    return String(n);
  }

  function show(n, opts) {
    opts = opts || {};
    n = Math.max(1, Math.min(total, n | 0));
    const page = book.pages[n - 1];
    sheet.classList.remove("flip");
    void sheet.offsetWidth;
    sheet.classList.add("flip");

    if (page.type === "cover") sheet.innerHTML = renderCover();
    else if (page.type === "howto") sheet.innerHTML = renderHowto();
    else if (page.type === "key") sheet.innerHTML = renderKey(page);
    else if (page.type === "species") sheet.innerHTML = renderSpecies(page);
    else sheet.innerHTML = renderIndex();

    if (page.type === "species") {
      const hold = sheet.querySelector(".plate-hold");
      if (hold && window.drawTreePlate) window.drawTreePlate(hold, page.species);
    }

    folio.textContent = "— " + roman(n) + " —";
    running.textContent = page.type === "species" ? page.species.common : "Trees of England";
    prevBtn.disabled = n <= 1;
    nextBtn.disabled = n >= total;
    if (opts.updateHash !== false) {
      const hash = n === 1 ? "" : String(n);
      if ((location.hash.replace("#", "") || "1") !== String(n)) {
        history[opts.replace ? "replaceState" : "pushState"]({ n }, "", hash ? "#" + hash : location.pathname + location.search);
      }
    }
    sheet.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  function current() {
    const h = location.hash.replace("#", "");
    const n = parseInt(h, 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }

  function go(n) {
    show(n);
  }

  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-goto]");
    if (!btn) return;
    e.preventDefault();
    go(parseInt(btn.getAttribute("data-goto"), 10));
  });

  prevBtn.addEventListener("click", () => go(current() - 1));
  nextBtn.addEventListener("click", () => go(current() + 1));
  homeBtn.addEventListener("click", () => go(1));

  let touchX = null;
  sheet.addEventListener("touchstart", (e) => {
    touchX = e.changedTouches[0].screenX;
  }, { passive: true });
  sheet.addEventListener("touchend", (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].screenX - touchX;
    touchX = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) go(current() + 1);
    else go(current() - 1);
  }, { passive: true });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "PageDown") go(current() + 1);
    if (e.key === "ArrowLeft" || e.key === "PageUp") go(current() - 1);
    if (e.key === "Home") go(1);
  });

  window.addEventListener("popstate", () => show(current(), { updateHash: false }));

  show(current(), { replace: true });
})();
