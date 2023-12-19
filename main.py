import asyncio
from pyppeteer import launch
from dotenv import load_dotenv
import os
import pandas as pd

load_dotenv()
URL = os.getenv('ITEMSCOUT_URL')

file_path = 'files/keyword/sample.xlsx'
df = pd.read_excel(file_path)
product_names = df['상품명']

print(product_names)


async def main():
    user_id = input("items count ID: ")
    password = input("items count PASSWORD: ")

    print("user id:", user_id)
    print("password:", password)

    browser = await launch(headless=True)
    print('Running Program...')
    page = await browser.newPage()
    await page.goto(URL)
    print(f'Access {URL}')
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
    print('Finished Program')
    await browser.close()


asyncio.get_event_loop().run_until_complete(main())
