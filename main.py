import asyncio
from pyppeteer import launch


async def main():
    browser = await launch(headless=False)
    page = await browser.newPage()
    await page.goto('https://itemscout.io/keyword')
    site_modal = await page.querySelector(
        '#app > div > div:nth-child(5) > div > div.v--modal-box.v--modal > div.actions > a')

    if site_modal is not None:
        await site_modal.click()

    await page.screenshot({'path': './example.png'})

    search_input = await page.querySelector(
        '#app > div > main > div > div > div > div > div.keyword-main-container > div > div > '
        'div.keyword-search-header-wrapper > div.keyword_guide_main_page_step1.keyword_guide_main_page_step6 > div > '
        'div > input')
    await search_input.click()
    await browser.close()


asyncio.get_event_loop().run_until_complete(main())
