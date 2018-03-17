import * as expect from 'expect';
import { Server } from '../../../module/server';
import { CMSService } from './cms.service';

const CMS_CONTENT_PAGE1 = {
    id: 'content1',
    slots: [
        {
            type: 'text_image',
            visible: true,
            text: 'Ich bin ein Beispiel Text',
            image: {
                url: 'http://via.placeholder.com/350x150'
            }
        },
        {

            type: 'text_image',
            visible: true,
            text: 'Ich bin ein Beispiel 2 er Text',
            image: {
                url: 'http://via.placeholder.com/350x150'
            },
            slots: [
                {
                    type: 'text_image',
                    visible: true,
                    text: 'Ich bin ein verschachteleter text wuhu',
                    image: {
                        url: 'http://via.placeholder.com/350x150'
                    }
                },
                {
                    type: 'text_image',
                    visible: false,
                    text: 'Ich bin ein unsichtbarer text',
                    image: {
                        url: 'http://via.placeholder.com/350x150'
                    }
                }
            ]
        }
    ]
};
const CMS_CONTENT_PAGE2 = {
    id: 'content2',
    slots: [
        {
            type: 'text_image',
            visible: true,
            text: 'Ich bin ein einzelner text',
            image: {
                url: 'http://via.placeholder.com/350x150'
            }
        }
    ]
};
const CMS_EMPTY = {
    id: '-1',
    slots: []
};

describe('CMS Service Testing', () => {
    let cmsService;

    before(() => {
        cmsService = new CMSService(new Server());
    });

    describe('findByPageId', () => {


        it('returns content1', () => {
            const page = cmsService.findByPageId('content1');
            expect(page).toEqual(CMS_CONTENT_PAGE1);
        });

        it('returns content2', () => {
            const page = cmsService.findByPageId('content2');
            expect(page).toEqual(CMS_CONTENT_PAGE2);
        });

        it('returns empty', () => {
            const page = cmsService.findByPageId('empty');
            expect(page).toEqual(CMS_EMPTY);
        });
    });
});
