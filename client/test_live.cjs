const https = require('https');
const vm = require('vm');
const { JSDOM } = require('jsdom');

https.get('https://www.webifypro.live/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const dom = new JSDOM(data, { runScripts: "outside-only", url: 'https://www.webifypro.live/' });
        const scriptMatch = data.match(/src="(\/assets\/index-[^"]+\.js)"/);
        if (scriptMatch) {
            console.log("Found JS:", scriptMatch[1]);
            https.get('https://www.webifypro.live' + scriptMatch[1], (jsRes) => {
                let jsData = '';
                jsRes.on('data', chunk => jsData += chunk);
                jsRes.on('end', () => {
                    console.log("Downloaded JS, evaluating...");
                    try {
                        dom.window.eval(jsData);
                        console.log("Evaluated successfully. Root HTML:");
                        console.log(dom.window.document.getElementById('root').innerHTML);
                    } catch (e) {
                        console.error("Runtime Error in JS:", e);
                    }
                });
            });
        }
    });
});
