"use strict";

// Grantura Write — Content Script v1.1
// Fixed: PubMed, Google Scholar, Europe PMC, and general journal detection

browser.runtime.onMessage.addListener((msg) => {
  if (msg.type === "EXTRACT_META") {
    return Promise.resolve(extractMetadata());
  }
});

function extractMetadata() {
  const url = location.href;
  if (url.includes("pubmed.ncbi.nlm.nih.gov")) return extractPubMed();
  if (url.includes("scholar.google.com"))      return extractScholar();
  if (url.includes("europepmc.org"))           return extractEuropePMC();
  return extractGeneric();
}

function extractPubMed() {
  const title =
    document.querySelector(".heading-title")?.textContent ||
    document.querySelector("h1.heading-title")?.textContent ||
    meta("citation_title") || "";

  const authorEls = document.querySelectorAll(".authors-list .authors-list-item .author-span");
  let authors = [...authorEls].map(a => a.textContent.trim()).join(", ");
  if (!authors) authors = [...document.querySelectorAll('meta[name="citation_author"]')].map(m=>m.content).join(", ");

  const journal =
    document.querySelector(".journal-actions .ellipsis")?.textContent ||
    document.querySelector("#full-view-journal-trigger")?.textContent ||
    meta("citation_journal_title") || "";

  const year =
    document.querySelector(".cit")?.textContent?.match(/\b(19|20)\d{2}\b/)?.[0] ||
    meta("citation_publication_date")?.substring(0,4) || "";

  const doi =
    [...document.querySelectorAll(".id-link")].find(a => a.href?.includes("doi.org"))?.href?.replace(/.*doi\.org\//,"") ||
    meta("citation_doi") ||
    extractDoiFromUrl(location.href) || "";

  const abstract =
    document.querySelector("#abstract .abstract-content")?.textContent ||
    document.querySelector(".abstract-content")?.textContent ||
    meta("citation_abstract") || "";

  return clean({ title, authors, journal, year, doi, abstract: abstract.substring(0,800), url: location.href });
}

function extractEuropePMC() {
  const title   = document.querySelector("h1.title")?.textContent || meta("citation_title") || "";
  const authors = [...document.querySelectorAll('meta[name="citation_author"]')].map(m=>m.content).join(", ");
  const journal = meta("citation_journal_title") || "";
  const year    = meta("citation_publication_date")?.substring(0,4) || "";
  const doi     = meta("citation_doi") || extractDoiFromUrl(location.href) || "";
  const abstract= document.querySelector("#free-abstract")?.textContent || meta("citation_abstract") || "";
  return clean({ title, authors, journal, year, doi, abstract: abstract.substring(0,800), url: location.href });
}

function extractScholar() {
  const title   = document.querySelector("h3.gs_rt a")?.textContent || "";
  const byline  = document.querySelector(".gs_a")?.textContent || "";
  const parts   = byline.split(" - ");
  const authors = parts[0]?.trim() || "";
  const journalYear = parts[1] || "";
  const journal = journalYear.replace(/,\s*\d{4}.*/, "").trim();
  const year    = journalYear.match(/\b(19|20)\d{2}\b/)?.[0] || "";
  return clean({ title, authors, journal, year, doi: "", url: location.href });
}

function extractGeneric() {
  const doi =
    meta("citation_doi") || meta("dc.identifier") || meta("prism.doi") ||
    [...document.querySelectorAll("a[href*='doi.org']")]
      .map(a => a.href.match(/10\.\d{4,}\/[^\s&?#"]+/)?.[0]).find(Boolean) ||
    extractDoiFromUrl(location.href) || "";

  const title =
    meta("citation_title") || meta("dc.title") || meta("og:title") ||
    document.querySelector("h1")?.textContent || document.title || "";

  const authors =
    [...document.querySelectorAll('meta[name="citation_author"]')].map(m=>m.content).join(", ") ||
    meta("dc.creator") || meta("author") || "";

  const journal =
    meta("citation_journal_title") || meta("prism.publicationName") || meta("og:site_name") || "";

  const year =
    meta("citation_publication_date")?.substring(0,4) ||
    meta("citation_date")?.substring(0,4) ||
    meta("dc.date")?.substring(0,4) || "";

  const volume   = meta("citation_volume")    || meta("prism.volume")  || "";
  const issue    = meta("citation_issue")     || meta("prism.number")  || "";
  const fp       = meta("citation_firstpage") || "";
  const lp       = meta("citation_lastpage")  || "";
  const pages    = fp ? fp + (lp ? "–"+lp : "") : "";
  const issn     = meta("citation_issn")      || meta("prism.issn")    || "";
  const abstract =
    meta("citation_abstract") || meta("dc.description") || meta("og:description") || "";

  return clean({ title, authors, journal, year, volume, issue, pages, doi, issn, abstract: abstract.substring(0,800), url: location.href });
}

function meta(name) {
  return (
    document.querySelector(`meta[name="${name}"]`)?.content ||
    document.querySelector(`meta[property="${name}"]`)?.content || ""
  );
}

function extractDoiFromUrl(url) {
  const m = url.match(/10\.\d{4,}\/[^\s&?#"]+/);
  return m ? m[0] : "";
}

function clean(obj) {
  const out = {};
  for (const k in obj) out[k] = typeof obj[k]==="string" ? obj[k].replace(/\s+/g," ").trim() : (obj[k]||"");
  return out;
}
