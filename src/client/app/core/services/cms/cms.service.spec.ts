import { inject, TestBed } from '@angular/core/testing';
import 'jasmine';

import { CMSService } from './cms.service';

describe('CMSService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CMSService]
        });
    });

    it('should be created', inject([CMSService], (service: CMSService) => {
        expect(service).toBeTruthy();
    }));
});
