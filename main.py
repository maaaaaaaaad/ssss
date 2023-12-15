import asyncio
from pyppeteer import launch

URL = 'https://itemscout.io/keyword'


async def main():
    browser = await launch(headless=False)
    page = await browser.newPage()
    await page.goto(URL)

    await page.waitForSelector('#app > div > div:nth-child(5) > div > div.v--modal-box.v--modal > div.actions > a')
    site_modal = await page.querySelector(
        '#app > div > div:nth-child(5) > div > div.v--modal-box.v--modal > div.actions > a')

    if site_modal is not None:
        await site_modal.click()

    await page.type('#app > div > main > div > div > div > div > div.keyword-main-container > div > div > '
                    'div.keyword-search-header-wrapper > '
                    'div.keyword_guide_main_page_step1.keyword_guide_main_page_step6 > div >'
                    'div > input', 'Test Search Keyword')
    await page.waitFor(1000)
    await page.click(
        '#app > div > main > div > div > div > div > div.keyword-main-container > div > div > '
        'div.keyword-search-header-wrapper > div.keyword_guide_main_page_step1.keyword_guide_main_page_step6 > div > '
        'button')
    await page.waitForNavigation()
    if page.url != URL:
        print(f'change url {URL} to LOGIN url')
    await page.screenshot({'path': './example.png'})
    await browser.close()


asyncio.get_event_loop().run_until_complete(main())
