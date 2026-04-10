"use strict";

browser.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "CAPTURE_REF")  { saveReference(msg.data); return Promise.resolve({ status: "saved" }); }
  if (msg.type === "GET_REFS")     { return getReferences(); }
  if (msg.type === "OPEN_SIDEBAR") { browser.sidebarAction.open(); return Promise.resolve({ status: "opened" }); }
  if (msg.type === "DELETE_REF")   { return deleteReference(msg.id); }
  if (msg.type === "UPDATE_REF")   { return updateReference(msg.id, msg.data); }
});

async function getReferences() {
  const result = await browser.storage.local.get("gw_refs");
  return result.gw_refs || [];
}

async function saveReference(data) {
  const refs = await getReferences();
  if (data.doi && refs.find(r => r.doi === data.doi)) {
    browser.notifications.create({
      type: "basic",
      iconUrl: browser.runtime.getURL("icons/icon-48.png"),
      title: "Grantura Write",
      message: "This paper is already in your library."
    });
    return;
  }
  const newRef = {
    id: Date.now().toString(),
    num: refs.length + 1,
    title:   data.title   || "Untitled",
    authors: data.authors || "",
    journal: data.journal || "",
    year:    data.year    || "",
    volume:  data.volume  || "",
    issue:   data.issue   || "",
    pages:   data.pages   || "",
    doi:     data.doi     || "",
    issn:    data.issn    || "",
    url:     data.url     || "",
    abstract:data.abstract|| "",
    flagged: false,
    note:    "",
    used:    false,
    added:   new Date().toISOString()
  };
  refs.push(newRef);
  await browser.storage.local.set({ gw_refs: refs });
  browser.notifications.create({
    type: "basic",
    iconUrl: browser.runtime.getURL("icons/icon-48.png"),
    title: "Grantura Write — Reference saved!",
    message: newRef.title.substring(0, 80)
  });
  // Tell sidebar to refresh
  browser.runtime.sendMessage({ type: "REFS_UPDATED" }).catch(() => {});
}

async function deleteReference(id) {
  let refs = await getReferences();
  refs = refs.filter(r => r.id !== id);
  refs.forEach((r, i) => r.num = i + 1);
  await browser.storage.local.set({ gw_refs: refs });
  return refs;
}

async function updateReference(id, data) {
  let refs = await getReferences();
  const idx = refs.findIndex(r => r.id === id);
  if (idx !== -1) refs[idx] = { ...refs[idx], ...data };
  await browser.storage.local.set({ gw_refs: refs });
  return refs[idx];
}
