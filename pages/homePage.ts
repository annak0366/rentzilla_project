import { Page} from "playwright/test";
const names = ['Комплекс робіт', 'Навантаження та розвантаження', 'Асфальтування', 'Дорожні роботи', 'Орання землі', 'Підйомні роботи', 'Перевезення матеріалів'];
const servicesHeaderLocator: string  = "section[data-testid='services'] h2";
const popularsTab: string = '[data-testid="services__populyarni"]';
const serviceItemsSelector: string = 'section[data-testid="services"] div[class="RentzilaProposes_proposes_item__sY_h2"]';
const specEquipmentTab = 'section[data-testid="specialEquipment"] h2';
const logo = 'header div[data-testid="logo"]';
const searchInput = "div[class='Navbar_searchWrapper__LN_Qm'] input[placeholder='Пошук оголошень або послуг']";
const searchDropdown = '[data-testid="searchDropdown"]';
const searchHistoryFirstItem = "//div[@class='SearchResultItem_item_name__SXnXJ'][contains(text(),'Трактор')]";
const searchDropdownFirstUnit = "//div[@class='RightsideSearch_units__cojjw']/div[1]";
const asphaltSearchDropdownItem = "//div[@data-testid='services']/div[2]";
const draglainsSearchDropdownItem = "//div[@class='LeftsideSearch_container__XgEkO']//div[3]//div[1]";
const deleteSearchBtn = "//div[@class='Navbar_searchWrapper__LN_Qm']//div[@class='MainSearch_clearSearch__BW_03']//*[name()='svg']";
const doYouHaveQuestionsForm = 'section[class="Layouts_consultation__JUU1R"]';
const orderConsultationBtn = 'button[class="ItemButtons_darkBlueRoundBtn___4GDw ItemButtons_fullWidth__3HqA0"]';
const nameErrorQuestionsForm = "//div[@class='ConsultationForm_name__3bVcz']//p[@role='alert'][contains(text(),'Поле не може бути порожнім')]";
const phoneErrorQuestionsForm = "//div[@class='ConsultationForm_phone__vEOS9']//p[@role='alert'][contains(text(),'Поле не може бути порожнім')]";
const nameInputQuestionsForm = 'input[name="name"]';
const phoneInputQuestionsForm = '[id="mobile"]';
const phoneValidationError = "//p[contains(text(),'Телефон не пройшов валідацію')]";
const avatar = 'div[class="AvatarCircle_wrapper__gpAIS"]';
const logOutBtn = 'div[data-testid="logout"]';
const loginBtn = 'div[class="NavbarAuthBlock_buttonEnter__c9siH"]';
const loginEmailInput = '#email';
const loginPasswordInput = '#password';
const loginSubmitBtn = "form[class='LoginForm_form__7G3Zk'] button:nth-child(1)";

export default class HomePage {
    constructor(public page: Page) {}
    async scrollToServices() {
        await this.page.locator(servicesHeaderLocator).scrollIntoViewIfNeeded();
    }
    async scrollToSpecialEquipment(){
        await this.page.locator(specEquipmentTab).scrollIntoViewIfNeeded();
    }
    async getPopularsTabLocator(){
        return popularsTab;
    }
    async getServiceItemsSelector() {
        return serviceItemsSelector;
    }
    async clickServiceName(i: number){
        const serviceName = `//div[@class="RentzilaProposes_name__DTnwr" and text()="${names[i]}"]`;
        await this.page.locator(serviceName).click();
    }
    async clickLogo(){
        await this.page.locator(logo).click();
    }
    async clickSearchField(){
        await this.page.locator(searchInput).click();
    }
    async getDropdownSearchLabel(i: number){
        const searchDropdownLabel = `[class="LeftsideSearch_title__FkeCp"]:nth-child(${i})`;
        return await this.page.locator(searchDropdownLabel);
    }
    async getSearchDropdown(){
        return this.page.locator(searchDropdown);
    }
    async fillSearchInput(word){
        await this.page.locator(searchInput).fill(word);
    }
    async getSearchHistoryItem(){
        return await this.page.locator(searchHistoryFirstItem).innerText();
    }
    async clickFirstUnitSearchDropdown(){
        await this.page.locator(searchDropdownFirstUnit).click();
    }
    async getAsphaltSearchDropdownItem(){
        return await this.page.locator(asphaltSearchDropdownItem).innerText();
    }
    async clickAsphaltBtn(){
        await this.page.locator(asphaltSearchDropdownItem).click();
    }
    async getDraglainsSearchDropdownText(){
        return await this.page.locator(draglainsSearchDropdownItem).innerText();
    }
    async clickDraglainsBtn(){
        await this.page.locator(draglainsSearchDropdownItem).click();
    }
    async getSearchUnitName(i){
        const unit = `//div[@class="RightsideSearch_units__cojjw"]/div[${i+1}]`;
        return await this.page.locator(unit).innerText();
    }
    async clickDeleteSearchBtn(){
        await this.page.locator(deleteSearchBtn).click();
    }
    async scrollToQuestionsForm() {
        await this.page.locator(doYouHaveQuestionsForm).scrollIntoViewIfNeeded();
    }
    async getQuestionForm(){
        return await this.page.locator(doYouHaveQuestionsForm);
    }
    async clickOrderConsultationBtn(){
        await this.page.locator(orderConsultationBtn).click();
    }
    async getNameErrorQuestionsForm(){
        return this.page.locator(nameErrorQuestionsForm);
    }
    async getPhoneErrorQuestionsForm(){
        return this.page.locator(phoneErrorQuestionsForm);
    }
    async fillNameQuestionsForm(word){
        await this.page.locator(nameInputQuestionsForm).fill(word);
    }
    async fillPhoneQuestionsForm(word){
        await this.page.locator(phoneInputQuestionsForm).fill(word);
    }
    async clickPhoneQuestionsForm(){
        await this.page.locator(phoneInputQuestionsForm).click();
    }
    async getPhoneFormValue(){
        return this.page.locator(phoneInputQuestionsForm).inputValue();
    }
    async getNameFormLocator(){
        return this.page.locator(nameInputQuestionsForm);
    }
    async getPhoneValidationError(){
        return this.page.locator(phoneValidationError);
    }
    async loginAsAdmin(){
        await this.page.locator(avatar).click();
        await this.page.locator(logOutBtn).click();
        await this.page.locator(loginBtn).click();
        await this.page.locator(loginEmailInput).fill('123@gmail.com');
        await this.page.locator(loginPasswordInput).fill('12345Qwerty!');
        await this.page.locator(loginSubmitBtn).click();
    }
}