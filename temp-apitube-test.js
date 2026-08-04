const https = require('https');
const url = new URL('https://api.apitube.io/v1/news/everything');
url.searchParams.set('api_key', 'api_live_TqPpk1nyVt44wpdm0KBVxGyraeOH9Plg7Xz3O2h1j');
url.searchParams.set('q', 'gaming OR esports OR video games OR game releases');
url.searchParams.set('language', 'en');
url.searchParams.set('limit', '6');
url.searchParams.set('page', '1');
console.log('URL', url.toString());
https.get(url, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    try {
      const json = JSON.parse(data);
      console.log(JSON.stringify(json, null, 2).slice(0, 3000));
    } catch (e) {
      console.error('PARSE', e);
      console.log(data.slice(0, 1000));
    }
  });
}).on('error', err => console.error('ERR', err));
