import RenderService from 'shop/server/api/services/render/render.service';
import { Languages } from 'shop/client/interfaces/base/Language';
import { HelmetData } from 'react-helmet';
import { IState } from 'shop/client/reducers';
import { Request } from 'hapi';
import { IMockRequest } from 'shop/server/interfaces/request';

jest.mock('shop/server/utils/ResourceHelper');

const state: Partial<IState> = {
    coredata: {
        userAgent: '',
        lastHttpStatus: 200,
        pageDataLoaded: true,
        language: Languages.DE,
        languages: [Languages.DE],
        media: {
            isMobileXs: false,
            isDesktop: true,
            orientation: 'protrait',
            screenName: 'xl',
            resolution: '1280x768',
            screen: 5
        },
        translations: {
            messages: {
                'test.page.button': 'Ich bin eine Übersetzung',
                'test.page.button2': 'Ich bin eine Übersetzung2'
            },
            full: false
        }
    }
};

const request: IMockRequest = {
    params: {},
    path: '/de',
    url: {
        pathname: '',
        search: ''
    },
    info: {
        hostname: 'netconomy.net'
    }
};

// noinspection JSUnusedLocalSymbols
export const apiMock = (store: any) => (next: any) => (action: any) => null;

describe('Render Service Testing', () => {
    let renderService: RenderService;

    beforeAll(() => {
        renderService = new RenderService();
    });

    describe('Javascript Bundleing Testing', () => {

        it('should return concatinated bundles and chunks', () => {
            const bundles: any = [];
            const filteredBundles = renderService.getScripts(bundles, 'js');
            expect(filteredBundles).toContain('http://127.0.0.1:3101/js/bundle.js');
        });

        it('should return concatinated bundles and chunks', () => {
            const bundles: any = [];
            const filteredBundles = renderService.getScripts(bundles, 'js');
            expect(filteredBundles).toContain('http://127.0.0.1:3101/js/bundle.js');
        });
    });

    describe('Markup Building', () => {

        it('should return markup', () => {
            const helmet = {
                title: {
                    toString: () => '<title>Test App</title>'
                }
            };
            const markup = `
                <Application>
                </Application>
            `;
            const rendered = renderService.getMarkup(Languages.DE, helmet as HelmetData, markup, state as IState, request as Request, {});
            expect(rendered).toContain('<html>');
            expect(rendered).toContain(`<head lang="${Languages.DE}">`);
            expect(rendered).toContain('<body>');
            expect(rendered).toContain('<title>Test App</title>');
            expect(rendered).toContain('<Application>');
        });
    });
});
