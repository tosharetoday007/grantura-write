"use strict";

// Grantura Write — Content Script
// Runs on every page. Extracts metadata when user clicks the browser action.

browser.runtime.onMessage.addListener((msg) => {
  if (msg.type === "EXTRACT_META") {
    const data = extractMetadata();
    return Promise.resolve(data);
  }
});

function extractMetadata() {
  const meta = (name) =>
    document.querySelector(`meta[name="${name}"]`)?.content ||
    document.querySelector(`meta[property="${name}"]`)?.content || "";

  // Try structured metadata first (most journals support these)
  const doi =
    meta("citation_doi") ||
    meta("dc.identifier") ||
    meta("prism.doi") ||
    extractDoiFromUrl(location.href) || "";

  const title =
    meta("citation_title") ||
    meta("dc.title") ||
    meta("og:title") ||
    document.title || "";

  const authorsRaw =
    [...document.querySelectorAll('meta[name="citation_author"]')]
      .map(m => m.content).join(", ") ||
    meta("dc.creator") || "";

  const journal =
    meta("citation_journal_title") ||
    meta("prism.publicationName") ||
    meta("og:site_name") || "";

  const year =
    meta("citation_publication_date")?.substring(0, 4) ||
    meta("citation_date")?.substring(0, 4) ||
    meta("dc.date")?.substring(0, 4) || "";

  const volume  = meta("citation_volume")  || meta("prism.volume")  || "";
  const issue   = meta("citation_issue")   || meta("prism.number")  || "";
  const pages   = meta("citation_firstpage") ?
    meta("citation_firstpage") + (meta("citation_lastpage") ? "–" + meta("citation_lastpage") : "") : "";
  const issn    = meta("citation_issn")    || meta("prism.issn")    || "";
  const abstract= meta("citation_abstract")|| meta("dc.description")|| meta("og:description") || "";

  return {
    title:    cleanText(title),
    authors:  cleanText(authorsRaw),
    journal:  cleanText(journal),
    year,
    volume,
    issue,
    pages,
    doi:      cleanDoi(doi),
    issn,
    abstract: cleanText(abstract).substring(0, 800),
    url:      location.href
  };
}

function extractDoiFromUrl(url) {
  const match = url.match(/10\.\d{4,}\/[^\s&?#]+/);
  return match ? match[0] : "";
}

function cleanText(t) {
  return (t || "").replace(/\s+/g, " ").trim();
}

function cleanDoi(doi) {
  return doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").trim();
}
