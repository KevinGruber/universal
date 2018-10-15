import { ConfigService } from 'shop/server/api/services/config/config.service';

describe('Config Service Testing', () => {
    let configService: ConfigService;

    beforeAll(() => {
        configService = new ConfigService();
    });

    describe('optimize messages', () => {

        it('should return set config', () => {
            const testConfig: any = {
                general: {
                    port: 9001
                },
                server: {
                    url: 'http://localhost:3100',
                    routes: [],
                    staticDir: ''
                }
            };
            configService.config = testConfig;
            expect(configService.config.server.url).toEqual('http://localhost:3100');
            expect(configService.config.general.port).toEqual(9001);
        });
    });
});
