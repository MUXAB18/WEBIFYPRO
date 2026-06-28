const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        console.log(`[CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
    });
    
    page.on('pageerror', error => {
        console.log(`[PAGE ERROR]: ${error.message}`);
    });

    page.on('requestfailed', request => {
        console.log(`[REQUEST FAILED]: ${request.url()} - ${request.failure().errorText}`);
    });

    await page.goto('https://www.webifypro.live/', { waitUntil: 'networkidle2' });
    
    await browser.close();
})();
