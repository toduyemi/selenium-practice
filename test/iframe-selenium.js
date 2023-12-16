import { By, until, Builder } from 'selenium-webdriver';
import * as fs from 'fs';
// import * as chrome from 'chrom'
// import { suite } from 'selenium-webdriver/testing'
// import { Chrome } from 'selenium-webdriver/chrome'
// import assert from 'assert';

(async function firstTest() {
    let driver;


    try {
        driver = await new Builder().forBrowser('chrome').build();

        // let options = WebDriver.
        await driver.get('https://eviltester.github.io/TestingApp/apps/iframe-search/iframe-search.html');

        await driver.findElement(By.css('#search-term')).sendKeys('selenium iframes docs');
        await driver.findElement(By.css('button.trigger-url-change')).click();

        await driver.manage().setTimeouts({ implicit: 6000 });
        const iframe = await driver.findElement(By.css('iframe.viewport-container'));

        await driver.switchTo().frame(iframe);

        await driver.manage().setTimeouts({ implicit: 6000 })
        await driver.findElement(By.css('#sb_form_q.b_searchbox')).sendKeys('element intercepted error');

        driver.takeScreenshot().then((image) => {
            fs.writeFileSync('iframe_screenshot', image, 'base64')
        })


        setInterval(() => {
            driver.quit();
        }, 10000);

    }

    catch (e) {
        console.log(e)
    }


})();