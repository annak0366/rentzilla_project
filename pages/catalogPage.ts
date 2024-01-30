import { Page} from "playwright/test";
const catalogBtn = 'div[class="NavbarCatalog_label__s1meA"]';
const specTechniq = '//div[@class="Catalog_parents__ThIGP"]/div[1]';
const services = '//div[@class="Catalog_parents__ThIGP"]/div[2]';
const budivelniServices = '//div[@class="Catalog_list__sVdCj"]/div[1]';
const othersServices = '//div[@class="Catalog_list__sVdCj"]/div[2]';
const agriculturalServices = '//div[@class="Catalog_list__sVdCj"]/div[3]';
const clearTheTeritoryService = '//div[@class="Catalog_list__sVdCj Catalog_listSecond__awZH7"]/div[4]';
const dobrivaService = '//div[@class="Catalog_list__sVdCj Catalog_listSecond__awZH7"]/div[3]';
const clearTreesService = '//div[@class="Catalog_list__sVdCj Catalog_listSecond__awZH7"]/div[5]';

export default class HomePage {
    constructor(public page: Page) {}
    async getCatalogBtn(){
        return this.page.locator(catalogBtn);
    }
    async clickCatalogBtn(){
        await this.page.locator(catalogBtn).click();
    }
    async hoverSpecTechniq(){
        await this.page.locator(specTechniq).hover();
    }
    async hoverServices(){
        await this.page.locator(services).hover();
    }
    async getSpecTechniqLabels(i: number){
        const label = `//div[@class="Catalog_list__sVdCj"]/div[${i+1}]`;
        return await this.page.locator(label).innerText();
    }
    async getServicesLabels(i){
        const label = `//div[@class="Catalog_list__sVdCj"]/div[${i+1}]`;
        return await this.page.locator(label).innerText();
    }
    async clickLabel(i: number){
        const label = `//div[@class="Catalog_list__sVdCj"]/div[${i+1}]`;
        await this.page.locator(label).click();
    }
    async hoverSpecTecniqItemsLabel(i: number){
        const label = `//div[@class="Catalog_list__sVdCj"]/div[${i+1}]`;
        await this.page.locator(label).hover();
    }
    async getBudivelniItemsText(i){
        const item = `//div[@class="Catalog_list__sVdCj Catalog_listSecond__awZH7"]/div[${i+1}]`;
        return await this.page.locator(item).innerText();
    }
    async hoverServicesItems(i){
        const label = `//div[@class="Catalog_list__sVdCj"]/div[${i+1}]`;
        return await this.page.locator(label).hover();
    }
    async clickClearTeritoryService(){
        await this.page.locator(budivelniServices).hover();
        await this.page.locator(clearTheTeritoryService).click();    
    }
    async clickClearTreesService(){
        await this.page.locator(othersServices).hover();
        await this.page.locator(clearTreesService).click();
    }
    async clickDobrivaService(){
        await this.page.locator(agriculturalServices).hover();
        await this.page.locator(dobrivaService).click();
    }

}