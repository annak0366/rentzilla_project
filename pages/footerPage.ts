import { Page, Locator, expect } from "playwright/test";

const footer = 'div[class="Footer_footer__Dhw_9"]';
const aboutUsLabel = '[data-testid="content"]';
const usersLabel = 'div[class="RentzilaForBuyers_title__k3tHn"]';
const footerLogo = 'div[class="Footer_container__5d2_x"] div[data-testid="logo"]';
const copywrightLabel = 'div[data-testid="copyright"]';
const privacyPolicyLink = '[data-testid="politika-konfidenciinosti"]';
const privacyPolicyHeader = 'h1[class="PrivacyPolicy_title__FEiRV"]';
const rulesOfUsingLink = 'div[data-testid="pravila-vikoristannya-failiv-cookie"]';
const rulesOfUsingHeader = 'h1[class="Cookies_title__BVLFo"]';
const termsOfUsingLink = 'div[data-testid="umovi-dostupu-ta-koristuvannya"]';
const termsOfUsingHeader = 'h1[class="TermsConditions_title__haW1D"]';
const linkPageHeader = '//div/h1';
const advertLink = 'div[data-testid="ogoloshennya"]';
const tendersLink = 'div[class="RentzilaForBuyers_link__ynhYc"] a[href="/tenders-map/"]';


export default class LinkPage {
    constructor(public page: Page) {}
    async getFooterLocator() {
        return this.page.locator(footer);
    }
    async getAboutUsLabel(){
        return this.page.locator(aboutUsLabel);
    }
    async getAboutUsDivLinks(i: number) {
        const aboutUsDivLinks = `div[class="RentzilaAbout_link__n4OmK"]:nth-child(${i+1})`;
        return this.page.locator(aboutUsDivLinks);
    }
    async getAboutUsDivLinkNames(i: number){
        return this.page.locator(`div[class="RentzilaAbout_link__n4OmK"]:nth-child(${i+1})`).innerText();
    }
    async clickAboutUsDivLinks(linkName){
        await this.page.locator(`//div[@class="RentzilaAbout_link__n4OmK"]//a[text()="${linkName}"]`).click();
    }
    async getLinkPagesHeader(){
        return this.page.locator(linkPageHeader).innerText()
    }
    async getUsersLabel(){
        return this.page.locator(usersLabel);
    }
    async getUsersDivLinks(i) {
        const usersDivLinks = `div[class="RentzilaForBuyers_link__ynhYc"]:nth-child(${i + 1})`;
        const link = this.page.locator(usersDivLinks);
        const text = await link.innerText();
        return { link, text };
    }
    async getFooterLogo(){
        return this.page.locator(footerLogo);
    }
    async getCopywrightLabel(){
        return this.page.locator(copywrightLabel);
    }
    async clickPrivacyPolicyLink(){
        await this.page.locator(privacyPolicyLink).click();
    }
    async getPrivacyPolicyHeader(){
        return this.page.locator(privacyPolicyHeader).innerText();
    }
    async scrollToFooter(){
        await this.page.locator(footer).scrollIntoViewIfNeeded();
    }
    async clickRulesOfUsingLink(){
        await this.page.locator(rulesOfUsingLink).click();
    }
    async getRulesOfUsingHeader(){
        return this.page.locator(rulesOfUsingHeader).innerText();
    }
    async clickTermsOfUseLink(){
        await this.page.locator(termsOfUsingLink).click();
    }
    async getTermsOfUsingHeader(){
        return this.page.locator(termsOfUsingHeader).innerText();
    }
    async clickAdvertLink(){
        await this.page.locator(advertLink).click();
    }
    async clickTendersLink(){
        await this.page.locator(tendersLink).click();
    }
    

}