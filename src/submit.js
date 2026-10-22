// Куда уходят заявки. Задайте VITE_LEAD_ENDPOINT (см. README). Токены и пароли в браузере хранить нельзя.
const endpoint = import.meta.env.VITE_LEAD_ENDPOINT;
const metrikaId = import.meta.env.VITE_METRIKA_ID;

export function initLeads() {
  window.VR_SUBMIT = (payload) => {
    try { if (metrikaId && window.ym) window.ym(Number(metrikaId), "reachGoal", "lead_" + (payload.source || "form")); } catch (e) {}
    if (!endpoint) { console.info("[lead] VITE_LEAD_ENDPOINT не задан, заявка не отправлена:", payload); return; }
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, page: location.href, ts: new Date().toISOString() }),
      keepalive: true,
    }).catch(() => {});
  };
}

export function initMetrika() {
  if (!metrikaId) return;
  window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
  window.ym.l = Date.now();
  const s = document.createElement("script");
  s.async = true; s.src = "https://mc.yandex.ru/metrika/tag.js";
  document.head.appendChild(s);
  window.ym(Number(metrikaId), "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true });
}
