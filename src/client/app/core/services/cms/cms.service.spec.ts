import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { CMSService } from './cms.service';

describe('CMSService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [CMSService]
        });
    });

    it('should be created', inject([CMSService], (service: CMSService) => {
        expect(service).toBeTruthy();
    }));
});
