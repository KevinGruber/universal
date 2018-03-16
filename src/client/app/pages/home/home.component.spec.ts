import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'app/core/core.module';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CoreModule, RouterTestingModule, HttpClientModule],
            declarations: [
                HomeComponent
            ]
        }).compileComponents();
    }));
    it('should create the shop', async(() => {
        const fixture = TestBed.createComponent(HomeComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it('should render Welcome message in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(HomeComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Product 2');
    }));
});
