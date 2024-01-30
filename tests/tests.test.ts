import { test, expect } from '@playwright/test';
import HomePage from "../pages/homePage"
import ProductsPage from "../pages/productsPage"
import UnitPage from "../pages/unitPage"
import LinkPage from '../pages/footerPage';
import CatalogPage from '../pages/catalogPage';
import { aboutUsLinks, usersLinks, specTechniqLabels, specTecniqUrls, catalogServicesLabels, footerLinks, allowedSymbols, prohibitedSymbols, items, servicesItems } from '../data/data';

test('C212 Checking ""Послуги"" section on the main page', async ({ page, baseURL }) => {
    const homePage = new HomePage(page); 
    const productsPage = new ProductsPage(page);
    const unitPage = new UnitPage(page);
    await page.goto(`${baseURL}`);
    await homePage.scrollToServices();
    const popularsTab = await page.$(await homePage.getPopularsTabLocator());
    expect(await popularsTab?.isVisible()).toBe(true);
    const elements = await page.$$(await homePage.getServiceItemsSelector());
    expect(elements.length).toBe(7);
    for (let i = 0; i <= 6; i++) {
        await homePage.clickServiceName(i);
        await productsPage.clickFirstUnit();
        await page.waitForNavigation();
        expect(page.url()).toMatch(/unit/);
        unitPage.clickLogoBtn();
        await page.waitForNavigation();
        expect(page.url()).toBe('https://stage.rentzila.com.ua/');
    }
});
test('C213 Checking ""Спецтехніка"" section on the main page', async ({page, baseURL}) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const unitPage = new UnitPage(page);
    await page.goto(`${baseURL}`);
    await homePage.scrollToSpecialEquipment();
    const popularsTab = await page.$(await homePage.getPopularsTabLocator());
    expect(await popularsTab?.isVisible()).toBe(true);
    const elements = await page.$$(await homePage.getServiceItemsSelector());
    expect(elements.length).toBe(7);
    for (let i = 0; i <= 6; i++) {
        await homePage.clickServiceName(i);
        await productsPage.clickFirstUnit();
        await page.waitForNavigation();
        expect(page.url()).toMatch(/unit/);
        unitPage.clickLogoBtn();
        await page.waitForNavigation();
        expect(page.url()).toBe('https://stage.rentzila.com.ua/');
    }
});
test('C214 Verify that all elements on the footer are displayed and all links are clickable', async({page, baseURL}) => {
    const homePage = new HomePage(page);
    const footer = new LinkPage(page);
    await page.goto(`${baseURL}`);
    await footer.scrollToFooter();
    await expect(await footer.getFooterLocator()).toBeVisible();
    await expect(await footer.getAboutUsLabel()).toBeVisible();
    for (let i = 0; i <= 2; i++){
        let link = await footer.getAboutUsDivLinks(i);
        let text = await footer.getAboutUsDivLinkNames(i);
        await expect(link).toBeVisible();
        expect(text).toContain(aboutUsLinks[i]);
    }
    await expect(await footer.getUsersLabel()).toBeVisible();
    for (let i = 0; i <= 2; i++){
        let locator = await footer.getUsersDivLinks(i);
        await expect(locator.link).toBeVisible();
        expect(locator.text).toContain(usersLinks[i]);
    }
    await expect(await footer.getFooterLogo()).toBeVisible();
    await expect(await footer.getCopywrightLabel()).toBeVisible();
    for(let i = 0; i <= 2; i ++){
        await footer.scrollToFooter();
        await footer.clickAboutUsDivLinks(footerLinks[i].linkText);
        await page.waitForLoadState('load');
        let url = await page.url();
        expect(url).toMatch(footerLinks[i].urlFragment);
        expect(await footer.getLinkPagesHeader()).toBe(footerLinks[i].headerText);
    }
    await footer.clickAdvertLink();
    expect(await page.url()).toMatch(/products/);
    await homePage.clickLogo();
    expect(await page.url()).toBe('https://stage.rentzila.com.ua/');
    await footer.scrollToFooter();
    await footer.clickTendersLink();
    expect(await page.url()).toMatch(/tenders-map/);
    await homePage.clickLogo();
    await page.waitForNavigation();
    expect(await page.url()).toBe('https://stage.rentzila.com.ua/');
});
test('C530 Verify Search Input', async({page, baseURL}) =>{
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const unitPage = new UnitPage(page);
    await page.goto(`${baseURL}`);
    await homePage.clickSearchField();
    expect(await homePage.getSearchDropdown()).toBeVisible();
    const indexes = [1, 2, 4];
    for(const index of indexes){
        const locator = await homePage.getDropdownSearchLabel(index);
        await expect(locator).toBeVisible();
    }
    await page.keyboard.press('Enter');
    await page.waitForLoadState('load');
    expect(await page.url()).toMatch(/products/);
    await expect(await productsPage.getSearchFieldValue()).toHaveAttribute('value', '');
    await page.goBack();
    await homePage.fillSearchInput('Трактор');
    await page.keyboard.press('Enter');
    let url = await page.url();
    expect(url).toMatch(/products/);
    await productsPage.clickFirstUnit();
    await page.waitForNavigation();
    expect(await page.url()).toMatch(/unit/);
    await homePage.clickLogo();
    await homePage.clickSearchField();
    expect(await homePage.getSearchHistoryItem()).toBe('Трактор');
    await homePage.clickLogo();
    await homePage.fillSearchInput('Ремонт гидравлики');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    let url1 = await page.url();
    expect(url1).toMatch(/products/);
     for(let i = 0; i < 10; i ++){
        expect(await productsPage.getUnitName(i)).toMatch('Ремонт гидравлики');
    }
    await productsPage.clickFirstUnit();
    await page.waitForNavigation(); 
    expect(await page.url()).toMatch(/unit/);
    await homePage.clickLogo();
    await homePage.clickSearchField();
    await page.waitForTimeout(1000);
    await homePage.fillSearchInput('Ремонт');
    await page.waitForTimeout(1000);
    await homePage.clickFirstUnitSearchDropdown();
    await page.waitForNavigation();
    expect(await page.url()).toMatch(/unit/);
    expect(await unitPage.getUnitHeader()).toMatch('ремонт');
    await homePage.clickLogo();
    await homePage.fillSearchInput('    ');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    await expect(await page.url()).toMatch(/products/);
    await expect(await productsPage.getNumberOfUnitsHeaderText()).toContain('0');
    await page.goBack();
    await homePage.fillSearchInput('123');
    await page.keyboard.press('Enter');
    expect(await productsPage.getNumberOfUnitsHeaderText()).toContain('123');
    await productsPage.clickFirstUnit();
    await page.waitForTimeout(1000); 
    expect(await page.url()).toMatch(/unit/);
    await homePage.clickSearchField();
    for (let i in allowedSymbols){
        let symbol = allowedSymbols[i];
        await homePage.fillSearchInput(symbol);
        await page.keyboard.press('Enter');
        await expect(await page.url()).toMatch(/products/);
        let actualInput = await productsPage.getSearchFieldValue();
        let value = await actualInput.getAttribute('value');
        await expect(value).toBe(symbol);
        expect(await productsPage.getNumberOfUnitsHeaderText()).toContain(symbol);
    }
    for (let i in prohibitedSymbols){
        let symbol = prohibitedSymbols[i];
        await homePage.fillSearchInput(symbol);
        await page.keyboard.press('Enter');
        await expect(await page.url()).toMatch(/products/);
        let actualInput = await productsPage.getSearchFieldText();
        expect(actualInput).toBe('');
    }
    await homePage.clickLogo();
    const name = 'тест1234567890';
    await homePage.fillSearchInput(name);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    expect(await page.url()).toMatch(/products/);
    const headerLocator = await productsPage.getNumberOfUnitsHeader();
    await page.waitForTimeout(2000);
    const textContent = await headerLocator.innerText();
    await expect(await textContent).toBe(`Знайдено 0 оголошень на видимій території за запитом \"${name}\"`)
    let actualInput = await productsPage.getSearchFieldValue();
    let value = await actualInput.getAttribute('value');
    expect(value).toBe(name);
    await homePage.clickLogo();
    await homePage.clickSearchField();
    await page.waitForTimeout(1000);
    await homePage.fillSearchInput("Асфальтування");
    let searchDropdown = await homePage.getSearchDropdown();
    expect(searchDropdown).toBeVisible();
    await page.waitForTimeout(1000);
    await homePage.clickAsphaltBtn();
    await page.waitForSelector('div[data-testid="asfaltuvannya"]');
    expect(await page.url()).toMatch(/products/);
    expect(await productsPage.getFilterCheckboxText()).toBe('Асфальтування');
    expect(await productsPage.getNumberOfUnitsHeaderText()).toContain('Знайдено');
    expect(await productsPage.getNumberOfUnitsHeaderText()).toContain('на видимій території');
    await homePage.clickLogo();
    await homePage.clickSearchField();
    await page.waitForTimeout(1000);
    await homePage.fillSearchInput('Драглайн');
    await page.waitForTimeout(1000);
    expect(await homePage.getSearchDropdown()).toBeVisible();
    expect(await homePage.getDraglainsSearchDropdownText()).toBe('драглайни');
    await homePage.clickDraglainsBtn();
    await page.waitForTimeout(1000);
    expect(await page.url()).toMatch(/products/);
    expect(await productsPage.getFilterCheckboxText()).toBe('Драглайни');
    expect(await productsPage.getNumberOfUnitsHeaderText()).toContain('Знайдено');
    expect(await productsPage.getNumberOfUnitsHeaderText()).toContain('на видимій території');
    await page.goBack();
    await homePage.clickSearchField();
    await page.waitForTimeout(1000);
    await homePage.fillSearchInput('Ремонт');
    await page.waitForTimeout(1000);
    expect(await homePage.getSearchDropdown()).toBeVisible();
    for(let i = 0; i < 4; i ++){
        expect(await homePage.getSearchUnitName(i)).toMatch('Ремонт');
    }
    await homePage.clickDeleteSearchBtn();
    await expect(await homePage.getSearchDropdown()).toBeHidden();
    expect(await productsPage.getSearchFieldText()).toBe('');
});
test('Verify ""У Вас залишилися питання?"" form', async({page, baseURL}) =>{
    const homePage = new HomePage(page);
    await page.goto(`${baseURL}`);
    await homePage.scrollToQuestionsForm();
    expect(await homePage.getQuestionForm()).toBeVisible();
    await homePage.clickOrderConsultationBtn();
    expect(await homePage.getNameErrorQuestionsForm()).toBeVisible();
    expect(await homePage.getPhoneErrorQuestionsForm()).toBeVisible();
    await homePage.fillNameQuestionsForm('Test');
    await homePage.clickOrderConsultationBtn();
    expect(await homePage.getPhoneErrorQuestionsForm()).toBeVisible();
    await homePage.clickPhoneQuestionsForm();
    expect(await homePage.getPhoneFormValue()).toBe('+380');
    await homePage.fillPhoneQuestionsForm('+380506743060');
    (await homePage.getNameFormLocator()).clear();
    await homePage.clickOrderConsultationBtn();
    expect(await homePage.getNameErrorQuestionsForm()).toBeVisible();
    await homePage.fillNameQuestionsForm('Test');
    await homePage.fillPhoneQuestionsForm('+11111111111111');
    expect(await homePage.getPhoneValidationError()).toBeVisible();
    await homePage.fillPhoneQuestionsForm('+380506743060');
    await homePage.clickOrderConsultationBtn();
});
test('Verify ""Каталог"" functionality', async({page, baseURL}) =>{
    const homePage = new HomePage(page);
    const catalog = new CatalogPage(page);
    const productPage = new ProductsPage(page);
    await page.goto(`${baseURL}`);
    await page.waitForTimeout(1000);
    expect(await catalog.getCatalogBtn()).toBeVisible();
    for(let i = 0; i < 4; i ++){
        await catalog.clickCatalogBtn();
        await catalog.hoverSpecTechniq();
        let labelText = await catalog.getSpecTechniqLabels(i);
        expect(labelText).toBe(specTechniqLabels[i]);
        await catalog.clickLabel(i);
        await page.waitForTimeout(1000);
        let url = await page.url();
        expect(url).toMatch(specTecniqUrls[i]);
        await page.goBack();
        await page.waitForTimeout(1000);
    }
    for(let i = 0; i < 4; i++){
        await page.goto(`${baseURL}`);
        await catalog.clickCatalogBtn();
        await catalog.hoverSpecTechniq();
        await catalog.hoverSpecTecniqItemsLabel(i);
        let length = items[i].length;
        for(let element = 0; element <= length-1; element ++){
            expect(await catalog.getBudivelniItemsText(element)).toBe(items[i][element]);
        }
    }
    await homePage.clickLogo();
    await catalog.clickCatalogBtn();
    await catalog.hoverServices();
    for(let i = 0; i < 3; i ++){
        await catalog.hoverServices();
        let labelText = await catalog.getServicesLabels(i);
        expect(labelText).toBe(catalogServicesLabels[i]);
        await catalog.hoverServicesItems(i);
        for(let element = 0; element <= servicesItems[i].length-1; element ++){
            expect(await catalog.getBudivelniItemsText(element)).toBe(servicesItems[i][element]);
        }
    }
    await homePage.clickLogo();
    await catalog.clickCatalogBtn();
    await catalog.hoverServices();
    await catalog.clickClearTeritoryService();
    expect(await page.url()).toMatch('/products/');
    expect(await productPage.getFilterCheckboxText()).toBe('Розчищення території');
    await homePage.clickLogo();
    await page.waitForTimeout(1000);
    await catalog.clickCatalogBtn();
    await catalog.hoverServices();
    await catalog.clickClearTreesService();
    expect(await page.url()).toMatch('/products/');
    expect(await productPage.getFilterCheckboxText()).toBe('Обрізання дерев');
    await homePage.clickLogo();
    await page.waitForTimeout(1000);
    await catalog.clickCatalogBtn();
    await catalog.hoverServices();
    await catalog.clickDobrivaService();
    expect(await page.url()).toMatch('/products/');
    expect(await productPage.getFilterCheckboxText()).toBe('Внесення добрив');
});