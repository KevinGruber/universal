// noinspection TypeScriptPreferShortImport
import { AppPage } from './app.po';

describe('rlt-test App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getMessageText()).toEqual('Hello');
    });

    it('should display product heading', () => {
        page.navigateTo();
        expect(page.getProductText()).toEqual('Product 2');
    });
});
