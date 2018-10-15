import { TranslationService } from 'shop/server/api/services/translation/translation.service';
import * as Selectors from 'shop/client/reducers/selectors';
import { Languages } from 'shop/client/interfaces/base/Language';
import { Server } from 'shop/server/module/server';
import { IState } from 'shop/client/reducers';

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

describe('Translation Service Testing', () => {
    let translationService: TranslationService;

    beforeAll(() => {
        translationService = new TranslationService();
    });

    describe('optimize messages', () => {

        it('should return only test.page.button', () => {
            const messages = ['test.page.button'];
            const optimizedState = translationService.optimizeMessages(messages, state as IState);
            expect(Selectors.selectMessages(optimizedState)).toHaveProperty(['test.page.button']);
        });

        it('should return only test.page.button2', () => {
            const messages = ['test.page.button2'];
            const optimizedState = translationService.optimizeMessages(messages, state as IState);
            expect(Selectors.selectMessages(optimizedState)).toHaveProperty(['test.page.button2']);
        });

        it('should return all', () => {
            const messages = ['test.page.button', 'test.page.button2'];
            const optimizedState = translationService.optimizeMessages(messages, state as IState);
            expect(Selectors.selectMessages(optimizedState)).toHaveProperty(['test.page.button']);
            expect(Selectors.selectMessages(optimizedState)).toHaveProperty(['test.page.button2']);
        });
    });
});
