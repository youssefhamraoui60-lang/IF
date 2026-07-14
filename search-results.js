(function () {
  "use strict";

  const resultsContainer = document.getElementById("search-results");
  const summary = document.getElementById("search-summary");
  const queryHeading = document.getElementById("search-query");
  const index = Array.isArray(window.IFPESearchIndex) ? window.IFPESearchIndex : [];
  const params = new URLSearchParams(window.location.search);
  const query = (params.get("q") || "").trim();

  function normalize(value) {
    return String(value || "")
      .toLocaleLowerCase("fr")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizedTextWithMap(text) {
    let normalized = "";
    const map = [];

    for (let index = 0; index < text.length; index += 1) {
      const folded = text[index]
        .toLocaleLowerCase("fr")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[’‘]/g, "'");
      for (let foldedIndex = 0; foldedIndex < folded.length; foldedIndex += 1) {
        normalized += folded[foldedIndex];
        map.push(index);
      }
    }

    return { normalized, map };
  }

  function highlight(text, searchedTerm) {
    const source = String(text || "");
    const needle = normalize(searchedTerm);
    if (!needle) return escapeHtml(source);

    const mapped = normalizedTextWithMap(source);
    const matchIndex = mapped.normalized.indexOf(needle);
    if (matchIndex < 0) return escapeHtml(source);

    const start = mapped.map[matchIndex];
    const endMapIndex = Math.min(matchIndex + needle.length - 1, mapped.map.length - 1);
    const end = mapped.map[endMapIndex] + 1;

    return `${escapeHtml(source.slice(0, start))}<mark>${escapeHtml(source.slice(start, end))}</mark>${escapeHtml(source.slice(end))}`;
  }

  function createExcerpt(item, searchedTerm) {
    const term = normalize(searchedTerm);
    let source = item.content || "";
    let normalizedSource = normalize(source);
    let matchIndex = normalizedSource.indexOf(term);

    if (matchIndex < 0 && normalize(item.keywords).includes(term)) {
      source = `${source} Thèmes : ${item.keywords}.`;
      normalizedSource = normalize(source);
      matchIndex = normalizedSource.indexOf(term);
    }

    if (matchIndex < 0) matchIndex = 0;

    const start = Math.max(0, matchIndex - 85);
    const end = Math.min(source.length, matchIndex + term.length + 175);
    let excerpt = source.slice(start, end).trim();
    if (start > 0) excerpt = `… ${excerpt}`;
    if (end < source.length) excerpt = `${excerpt} …`;
    return excerpt;
  }

  function resultUrl(item) {
    if (!item.section) return item.url;
    return `${item.url}#${encodeURIComponent(item.section)}`;
  }

  function renderEmpty(message) {
    resultsContainer.innerHTML = `<div class="search-empty"><p>${message}</p></div>`;
  }

  if (!query) {
    queryHeading.textContent = "Saisissez un terme dans le champ de recherche.";
    summary.textContent = "La recherche ne peut pas être vide.";
    renderEmpty("Saisissez une lettre ou un mot pour rechercher dans les pages publiques d’IFPE Conseil.");
    return;
  }

  const normalizedQuery = normalize(query);
  const results = index
    .map(function (item) {
      const normalizedTitle = normalize(item.title);
      const normalizedContent = normalize(item.content);
      const normalizedKeywords = normalize(item.keywords);
      const titleMatch = normalizedTitle.includes(normalizedQuery);
      const contentMatch = normalizedContent.includes(normalizedQuery);
      const keywordMatch = normalizedKeywords.includes(normalizedQuery);

      return {
        item,
        matches: titleMatch || contentMatch || keywordMatch,
        score: (titleMatch ? 3 : 0) + (contentMatch ? 2 : 0) + (keywordMatch ? 1 : 0)
      };
    })
    .filter(function (entry) { return entry.matches; })
    .sort(function (first, second) {
      return second.score - first.score || first.item.title.localeCompare(second.item.title, "fr");
    });

  document.title = `Recherche “${query}” | IFPE Conseil`;
  queryHeading.textContent = `Résultats pour « ${query} »`;

  if (!results.length) {
    summary.textContent = `0 résultat trouvé pour la recherche « ${query} »`;
    renderEmpty(`Aucun résultat trouvé pour « ${escapeHtml(query)} ». Essayez avec un autre terme.`);
    return;
  }

  const resultLabel = results.length > 1 ? "résultats trouvés" : "résultat trouvé";
  summary.textContent = `${results.length} ${resultLabel} pour la recherche « ${query} »`;

  resultsContainer.innerHTML = results.map(function (entry) {
    const item = entry.item;
    const excerpt = createExcerpt(item, query);
    return `
      <article class="search-result-card">
        <h2><a href="${escapeHtml(resultUrl(item))}">${highlight(item.title, query)}</a></h2>
        <p>${highlight(excerpt, query)}</p>
        <a class="search-result-link" href="${escapeHtml(resultUrl(item))}">
          Consulter la page <span aria-hidden="true">→</span>
        </a>
      </article>`;
  }).join("");
})();
