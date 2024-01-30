import { Page} from "playwright/test";
const firstItem = "//div[3]/a[1]/div[1]/span[1]/img[1]";
const searchInput = "div[class='Navbar_searchWrapper__LN_Qm'] input[placeholder='Пошук оголошень або послуг']";
const numberOfItemsHeader = 'h1[class="MapPagination_count__c_dzg"]';
const filterCheckbox = "div[class='ResetFilters_selectedCategory___D1E6'] p";

export default class ProductsPage {
    constructor(public page: Page) {}
    async clickFirstUnit(){
        await this.page.locator(firstItem).click();
    }
    async getSearchFieldValue(){
        return this.page.locator(searchInput);
    }
    async getUnitName(i){
        const unitName = `div:nth-child(${i+3}) > a:nth-child(1)`;
        return this.page.locator(unitName).innerText();
    }
    async getNumberOfUnitsHeaderText(){
        return this.page.locator(numberOfItemsHeader).innerText();
    }
    async getNumberOfUnitsHeader(){
        return this.page.locator(numberOfItemsHeader);
    }
    async getSearchFieldText(){
        return this.page.locator(searchInput).innerText();
    }
    async getFilterCheckboxText(){
        return this.page.locator(filterCheckbox).innerText();
    }
}