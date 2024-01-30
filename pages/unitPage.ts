import { Page} from "playwright/test";
const logo: string = 'a[class="Navbar_logo__RsJHS"]';
const unitHeader = 'h1[class="UnitName_name__oM_YV"]';
export default class UnitPage {
    constructor(public page: Page) {}
    async clickLogoBtn(){
        await this.page.locator(logo).click();
    }
    async getUnitHeader(){
        return (await this.page.locator(unitHeader).innerText()).toLowerCase();
    }
}