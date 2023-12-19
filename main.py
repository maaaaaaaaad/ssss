import asyncio
from pyppeteer import launch
from dotenv import load_dotenv
import pandas as pd
import os
import getpass

load_dotenv()
URL = os.getenv('ITEMSCOUT_URL')
LOGIN_URL = os.getenv('LOGIN_URL')
LOGIN_EMAIL_SELECTOR = os.getenv('LOGIN_EMAIL_SELECTOR')
LOGIN_PASSWORD_SELECTOR = os.getenv('LOGIN_PASSWORD_SELECTOR')

file_path = './sample.xlsx'
df = pd.read_excel(file_path)
product_names = df['상품명']

merchandises = '#app > div > main > div > div > div > div > div.detail-container > div.keyword-detail-header-wrapper > \
        div.keyword-tab-container > div.keyword-tab-wrapper.keyword_guide_market_trend_step0 > \
        div.keyword-tab.keyword_guide_product_list_step0 > div.its-help-container > div:nth-child(1) '
shopping_pay = '#app > div > main > div > div > div > div > div.detail-container > div.content-container > ' \
               'div.product-container > div:nth-child(1) > div > span.type-selector.active'
list_layout = '#app > div > main > div > div > div > div > div.detail-container > div.content-container > ' \
              'div.product-container > div:nth-child(3) > div:nth-child(2)'
product_ul = '.product-card-list'


async def handle_dialog(dialog):
    print(f"dialog message: {dialog.message}")
    await dialog.dismiss()


async def search_product(page, product_name, index, total_products, retries=100):
    print(f'Searching {product_name}...')
    progress = (index / total_products) * 100
    try:
        await page.waitForSelector('.keyword-search-input')
        await page.click('.keyword-search-input')
        await page.keyboard.down('Control')
        await page.keyboard.press('A')
        await page.keyboard.up('Control')
        await page.keyboard.press('Backspace')
        await page.type('.keyword-search-input', product_name)
        await page.keyboard.press('Enter')
        await page.waitForSelector(merchandises)
        await page.click(merchandises)
        await page.waitForSelector(shopping_pay, visible=True)
        await page.click(shopping_pay)
        await page.waitForSelector(list_layout)
        await page.evaluate('''() => {
                    document.querySelector('.keyword-search-input').value = ''
                }''')
        product_list = await page.querySelectorAll(f'{product_ul} > li')
        for product in product_list:
            title_element = await product.querySelector('.title > .text')
            price_element = await product.querySelector('.price')
            category_element = await product.querySelector('.category')

            title_text = await page.evaluate('(element) => element.textContent',
                                             title_element) if title_element else 'No title'
            price_text = await page.evaluate('(element) => element.textContent',
                                             price_element) if price_element else 'No price'
            category_text = await page.evaluate('(element) => element.textContent',
                                                category_element) if category_element else 'No category'
            print(title_text, price_text, category_text)
        print(f'Completed keyword search: {product_name} ({index}/{total_products}, {progress:.2f}%)')
        await page.waitFor(2000)
    except Exception as e:
        if retries > 0:
            print(f"Internet connection is slow: {e}. Retrying ({retries})...")
            await search_product(page, product_name, index, total_products, retries - 1)
        else:
            print(f"Failed to complete search for {product_name} after several retries.")


async def main():
    user_id = input("item scout EMAIL ID ex) mad@gmail.com: ")
    passwd = getpass.getpass("item scout PASSWORD: ")

    browser = await launch(headless=True)
    print('Running Program...')
    page = await browser.newPage()
    await page.goto(LOGIN_URL)
    await page.waitForSelector(
        '#app > div > main > div > div > div > div > span > form > span:nth-child(1) > div > div > div > '
        'div.v-input__slot', visible=True)
    print(f'Approaching the login url...')
    await page.type(f'input[placeholder="{LOGIN_EMAIL_SELECTOR}"]', user_id)
    await page.type(
        f'input[placeholder="{LOGIN_PASSWORD_SELECTOR}"]', passwd)
    await page.waitFor(1000)
    await page.click(
        '#app > div > main > div > div > div > div > button.v-btn.v-btn--has-bg.theme--light.v-size--default.primary')
    await page.waitForNavigation()
    await page.waitForSelector('#explore > div > form > div > input')
    print(f'Success login for email: {user_id}')
    await page.goto(URL)
    page.on('dialog', handle_dialog)
    await page.waitFor(3000)
    await page.waitForSelector('#app > div > div:nth-child(5) > div > div.v--modal-box.v--modal > div.actions > a',
                               visible=True)
    site_modal = await page.querySelector(
        '#app > div > div:nth-child(5) > div > div.v--modal-box.v--modal > div.actions > a')
    if site_modal is not None:
        await site_modal.click()
    await page.waitFor(1000)
    print(f'Approaching the search page...')

    total_products = len(product_names)
    for index, product_name in enumerate(product_names, start=1):
        await search_product(page, product_name, index, total_products)

    await browser.close()


asyncio.get_event_loop().run_until_complete(main())
