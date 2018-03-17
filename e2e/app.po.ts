import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get('/');
    }

    getMessageText() {
        return element(by.css('rlt-root h3')).getText();
    }

    getProductText() {
        return element(by.css('rlt-root h1')).getText();
    }
}
