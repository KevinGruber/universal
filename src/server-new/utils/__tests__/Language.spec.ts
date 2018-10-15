import Language from '../Language';
import { Request } from 'hapi';
import { Languages } from 'shop/client/interfaces/base/Language';
import { IMockRequest } from 'shop/server/interfaces/request';

jest.unmock('accept');
jest.unmock('../Language');

describe('Language', () => {
    let request: IMockRequest;

    beforeEach(() => {
        request = {
            params: {},
            url: {
                pathname: '',
                search: ''
            },
            info: {
                hostname: 'netconomy.net'
            }
        };
    });

    describe('__setPreferredLanguage', () => {
        it('should return the same as fead in', () => {
            const preferredLanguage = Language.__setPreferredLanguage(Languages.DE);
            expect(preferredLanguage).toBe(Languages.DE);
        });
    });

    describe('getPreferredLanguage', () => {
        it('should return users preferred language if available', () => {
            const supportedLanguages = [Languages.DE, Languages.IT];
            request = {
                ...request,
                headers: {
                    'accept-language': 'it'
                }
            };

            const preferredLanguage = Language.getPreferredLanguage(request as Request, supportedLanguages);

            expect(preferredLanguage).toBe(Languages.IT);
        });

        it('should return users highest weighted language', () => {
            const supportedLanguages = [Languages.DE, Languages.IT];
            request = {
                ...request,
                headers: {
                    'accept-language': 'en;q=0.8, it;q=0.6, de;q=0.4'
                }
            };

            const preferredLanguage = Language.getPreferredLanguage(request as Request, supportedLanguages);

            expect(preferredLanguage).toBe(Languages.IT);
        });

        it('should return first provided language of no user preferred languages are supported', () => {
            const supportedLanguages = [Languages.DE, Languages.IT];
            request = {
                ...request,
                headers: {
                    'accept-language': 'en;q=0.8, fr;q=0.6'
                }
            };

            const preferredLanguage = Language.getPreferredLanguage(request as Request, supportedLanguages);

            expect(preferredLanguage).toBe(Languages.DE);
        });
    });
});
