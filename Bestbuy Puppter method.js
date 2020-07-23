const puppeteer = require("puppeteer");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWritter = createCsvWriter({
    path: 'products.csv',
    header: [
        { id: 'name', title: 'Name' },
        { id: 'price', title: 'Price' },
        { id: 'regularPrice', title: 'Regular Price' },
        { id: 'sku', title: 'SKU' },

    ]
});
(async () => {
    try {
        // open the headless browser
        var browser = await puppeteer.launch({ headless: false });
        // open a new page
        var page = await browser.newPage();
        // enter url in page
        await page.goto(`https://bestbuy.com/`);
        await page.waitForSelector('.country-selection');
        const countrySelection = await page.$('.country-selection')
        const country = await countrySelection.$$('a')
        await country[1].click()

        try {
            await page.waitForSelector('.modal-content')
            console.log('loaded')
            await page.waitFor(3000)
            await page.mouse.click(10, 10)
        } catch (err) {
            console.log(err)
        }
        // const isModal = await page.$('.modal-content .modal-header .close')
        // await isModal.click()
        const textBox = await page.$('#gh-search-input')
        await textBox.type('macbook pro')
        await textBox.type(String.fromCharCode(13));

        await page.waitForSelector('.paging-list li')
        const paging = await page.$$('.paging-list li')

        const lastPage = await paging[paging.length - 1].$('a')
        const noOfPages = await lastPage.evaluate((res) => res.innerHTML)
        await console.log(parseInt(noOfPages))
        currentPage = 0

        function scrapData() {
            return new Promise(async (resolve, reject) => {
                try {
                    const requiredData = await page.evaluate((selector) => {
                        const node_list = document.querySelectorAll(selector);
                        items = []
                        node_list.forEach((mainElement) => {
                            let name = mainElement.querySelector('.sku-title h4 a').innerHTML;
                            let price = mainElement.querySelector('.priceView-customer-price span').innerText;
                            let regularPrice = "empty";
                            let sku = "empty"
                            try {
                                regularPrice = mainElement.querySelector('.pricing-price__regular-price').innerHTML
                            } catch (err) {
                                regularPrice = "empty"
                             }

                            try {
                                sku = mainElement.querySelector('.sku-value').innerText
                            } catch (err) { 
                                sku="empty"
                            }

                            items.push({
                                name,
                                price,
                                regularPrice,
                                sku
                            })
                        })
                        return items
                    }, '.sku-item');
                    await console.log(requiredData.length)
                    currentPage++
                    resolve(requiredData)
                } catch (err) {
                    currentPage++
                    reject()
                }
            })

        }

        while (currentPage < noOfPages) {
            try {
                //  await page.click('.paging-list li a')
                try {
                    console.log("out",currentPage)
                    await page.evaluate((currentPage) => {
                        let scripts = document.querySelectorAll('.paging-list li');
                        // console.log(scripts[currentPage].parentElement.querySelector('a'))
                        scripts[currentPage].querySelector('a').click()
                        // scripts.forEach(script => {
                        //     let el = script.parentElement.querySelector('a');
                        //     console.log(el) // it won't show on your node console, but on your actual browser when it is running;
                        //     el.click();
                        // })
                    },currentPage)
                    await page.waitFor(20000)

                } catch (err) {
                    console.log(err)
                }
                const res = await scrapData()
                csvWritter.writeRecords(res).then(() => {
                    console.log(i + ' written successfully')
                })

                // await page.$$('.paging-list li a')[currentPage].click()
                // console.log(currentPage)
            } catch (err) {
                console.log(err)
            }
        }


        await browser.close();

        console.log("Browser Closed");
    } catch (err) {
        await browser.close();
        console.log(err)
        console.log("error: Browser Closed");
    }
})();


    //write excel
    // csvWritter.writeRecords(products).then(() => {
    //     console.log(i + ' written successfully')
    // })
    //write Json
    // fs.appendFile("product.json", JSON.stringify(products), function (err) {
    //     if (err) throw err;
    //     console.log("Saved!");
    // });
    