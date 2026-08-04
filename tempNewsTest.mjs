const url = new URL('https://api.apitube.io/v1/news/everything');
url.searchParams.set('api_key', 'api_live_TqPpk1nyVt44wpdm0KBVxGyraeOH9Plg7Xz3O2h1j');
url.searchParams.set('q', 'gaming OR esports OR "video games" OR "game releases"');
url.searchParams.set('title', 'video games');
url.searchParams.set('language.code', 'en');
url.searchParams.set('per_page', '6');
url.searchParams.set('page', '1');
const res = await fetch(url.toString(), { headers: { Accept: 'application/json' } });
const data = await res.json();
for (const [i, r] of data.results.entries()) {
  const href = String(r.href || '');
  const img = String(r.image || '');
  console.log(`INDEX ${i}`);
  console.log('href len', href.length, 'starts', href.slice(0, 80), 'ends', href.slice(-80));
  console.log('href includes Upgrade', href.includes('[Upgrade subscription plan]'));
  console.log('href valid', (() => { try { new URL(href); return true; } catch { return false; } })());
  console.log('image len', img.length, 'starts', img.slice(0, 80), 'ends', img.slice(-80));
  console.log('image includes Upgrade', img.includes('[Upgrade subscription plan]'));
  console.log('image valid', (() => { try { new URL(img); return true; } catch { return false; } })());
  console.log('media count', Array.isArray(r.media)?r.media.length:0);
  if (Array.isArray(r.media)) {
    for (const [j,m] of r.media.entries()) {
      const u = String(m.url || '');
      console.log(`  media[${j}] len ${u.length} valid ${(() => { try { new URL(u); return true; } catch { return false; } })()} includesUpgrade ${u.includes('[Upgrade subscription plan]')} start ${u.slice(0,80)} end ${u.slice(-80)}`);
    }
  }
  console.log('links count', Array.isArray(r.links)?r.links.length:0);
  if (Array.isArray(r.links)) {
    for (const [j,l] of r.links.entries()) {
      const u = String(l.url || '');
      console.log(`  links[${j}] len ${u.length} valid ${(() => { try { new URL(u); return true; } catch { return false; } })()} includesUpgrade ${u.includes('[Upgrade subscription plan]')} start ${u.slice(0,80)} end ${u.slice(-80)}`);
    }
  }
  console.log('---');
}
