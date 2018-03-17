import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [CartService]
        });
    });

    it('should be created', inject([CartService], (service: CartService) => {
        expect(service).toBeTruthy();
    }));
});
