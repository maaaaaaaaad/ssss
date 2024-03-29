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
original_product_names_count = len(df['상품명'])
df = df.drop_duplicates(subset='상품명')
unique_product_names_count = len(df)
product_names = df['상품명'].tolist()
duplicate_words_count = original_product_names_count - unique_product_names_count

is_sorted = False

site_modal_box = '#app > div > div:nth-child(5) > div > div.v--modal-box.v--modal > div.actions > a'
merchandises = '#app > div > main > div > div > div > div > div.detail-container > div.keyword-detail-header-wrapper > \
        div.keyword-tab-container > div.keyword-tab-wrapper.keyword_guide_market_trend_step0 > \
        div.keyword-tab.keyword_guide_product_list_step0 > div.its-help-container > div:nth-child(1) '
shopping_pay = '#app > div > main > div > div > div > div > div.detail-container > div.content-container > ' \
               'div.product-container > div:nth-child(1) > div > span.type-selector.active'
list_layout = '#app > div > main > div > div > div > div > div.detail-container > div.content-container > ' \
              'div.product-container > div:nth-child(3) > div:nth-child(2)'
product_ul = '.product-card-list'
related_search_terms = '#app > div > main > div > div > div > div > div.detail-container > ' \
                       'div.keyword-detail-header-wrapper > div.keyword-tab-container > ' \
                       'div.keyword-tab-wrapper.keyword_guide_market_trend_step0 > ' \
                       'div.keyword-tab.keyword_guide_related_keyword_step0 > div > div:nth-child(1)'
speedy_modal = '#app > div > main > div > div > div > div > div.detail-container > div.content-container > div > ' \
               'div:nth-child(5) > div.multi-chart-view-container.gutter.keyword_guide_market_trend_step13 > ' \
               'div.extension-modal.v--modal-overlay > div > div.v--modal-box.v--modal'
radio = '#app > div > main > div > div > div > div > div.detail-container > div.content-container > ' \
        'div.keyword-tab-wrapper > div:nth-child(1) > div.table-filter-wrapper > div.filter-options.mb-4 > div > div ' \
        '> div:nth-child(1) > div.options-toggle-wrapper > div > div > div > div > div:nth-child(2) > label'
dropdown = '#app > div.v-application--wrap > main > div > div > div > div > div.detail-container > ' \
           'div.content-container > div.keyword-tab-wrapper > div:nth-child(1) > div.table-filter-wrapper > ' \
           'div.filter-options.mb-4 > div > div > div:nth-child(1) > div.row > div > ' \
           'div.its-dropdown.category-option-dropdown'
sort_button = '#app > div.v-application--wrap > main > div > div > div > div > div.detail-container > ' \
              'div.content-container > div.keyword-tab-wrapper > div:nth-child(2) > ' \
              'div.its-data-table.keyword_guide_related_keyword_table > div.its-table-header-container.is-sticky > ' \
              'div > div > div.simplebar-wrapper > div.simplebar-mask > div > div > div > table > thead > tr > ' \
              'th.header-th.text-center.is-draggable.its-column-3.keyword_guide_related_keyword_step3 > div > ' \
              'div.table-header > div'
dropdown_list = '#app > div.v-menu__content.theme--light.menuable__content__active.dropdown-menu > div > div'
search_count_input = '#inputstartundefined'
keyword_table = '#app > div.v-application--wrap > main > div > div > div > div > div.detail-container > ' \
                'div.content-container > div.keyword-tab-wrapper > div:nth-child(2) > ' \
                'div.its-data-table.keyword_guide_related_keyword_table > div.its-table-body-wrapper > div > ' \
                'div.simplebar-wrapper > div.simplebar-mask > div > div > div > table'
product_data = []
processed_titles = set()


async def handle_dialog(dialog):
    print(f"dialog message: {dialog.message}")
    await dialog.dismiss()


async def login(page, email, password, retries=100):
    try:
        await page.waitForSelector(
            '#app > div > main > div > div > div > div > span > form > span:nth-child(1) > div > div > div > '
            'div.v-input__slot')
        print(f'Approaching the login url...')
        await page.type(f'input[placeholder="{LOGIN_EMAIL_SELECTOR}"]', email)
        await page.type(
            f'input[placeholder="{LOGIN_PASSWORD_SELECTOR}"]', password)
        await page.waitFor(1000)
        await page.click(
            '#app > div > main > div > div > div > div > '
            'button.v-btn.v-btn--has-bg.theme--light.v-size--default.primary')
        await page.waitForNavigation()
        await page.waitForSelector('#explore > div > form > div > input')
        print(f'Success login for email: {email}')
    except Exception as e:
        if retries > 0:
            print(f"Internet connection is slow: {e}. Retrying ({retries})...")
            await login(page, email, password, retries - 1)
        else:
            print(f"Failed to complete login for {email} after several retries.")


async def search_product(page, product_name, search_count, index, total_products, retries=100):
    print(f'Searching {product_name}...')
    global is_sorted
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
        await page.waitForSelector(shopping_pay)
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

            if title_element:
                raw_title_text = await page.evaluate('(element) => element.textContent', title_element)
                title_text = raw_title_text.replace(' ', ',')
                if title_text not in processed_titles:
                    processed_titles.add(title_text)
                    price_text = await page.evaluate('(element) => element.textContent',
                                                     price_element) if price_element else 'No price'
                    category_text = await page.evaluate('(element) => element.textContent',
                                                        category_element) if category_element else 'No category'
                    product_data.append({
                        'Title': title_text,
                        'Price': price_text,
                        'Category': category_text
                    })

        await page.waitForSelector(related_search_terms)
        await page.click(related_search_terms)
        await page.waitForSelector(radio)
        await page.querySelector(radio)
        await page.click(radio)
        await page.querySelector(dropdown)
        await page.click(dropdown)
        await page.waitForSelector(dropdown_list)

        children = await page.querySelectorAll(f'{dropdown_list} > div')
        if children:
            first_child = children[0]
            await first_child.click()
        if not is_sorted:
            await page.click(sort_button)
            await page.type(search_count_input, search_count)
            is_sorted = True

        await page.waitForSelector(keyword_table)

        keywords = await page.querySelectorAll('.keyword-label')
        expose_counts = await page.querySelectorAll('.table-content > div')

        for keyword in keywords[:20]:
            keyword_text = await page.evaluate('(element) => element.textContent', keyword)
            print(keyword_text)

        print(f'Completed keyword search: {product_name} ({index}/{total_products}, {progress:.2f}%)')
        page.waitFor(1000)
    except Exception as e:
        if retries > 0:
            print(f"Internet connection is slow: {e}. Retrying ({retries})...")
            await page.reload()
            await search_product(page, product_name, index, total_products, retries - 1)
        else:
            print(f"Failed to complete search for {product_name} after several retries.")


async def main():
    user_id = input("item scout email: ")
    passwd = getpass.getpass("item scout password: ")
    search_count = input("search count: ")

    if int(search_count) <= 0 or int(search_count) > 100:
        raise Exception('the number range incorrect')

    browser = await launch(headless=True)
    print('Running Program...')
    print(f"총 상품명 수: {original_product_names_count}")
    print(f"중복 단어 수: {duplicate_words_count}")
    print(f"중복 제거 후 상품명 수: {unique_product_names_count}")
    page = await browser.newPage()
    await page.goto(LOGIN_URL)
    await login(page, user_id, passwd)
    await page.goto(URL)
    page.on('dialog', handle_dialog)
    await page.waitForSelector(site_modal_box, visible=True)
    site_modal = await page.querySelector(site_modal_box)
    if site_modal is not None:
        await site_modal.click()
    await page.waitFor(1000)
    total_products = len(product_names)
    print(f'Approaching the search page...')
    print(f'Setup the number range is {search_count}')
    for index, product_name in enumerate(product_names, start=1):
        await search_product(page, product_name, search_count, index, total_products)

    data_frame = pd.DataFrame(product_data)
    data_frame.to_excel('./output.xlsx', index=False)

    await browser.close()


asyncio.get_event_loop().run_until_complete(main())
