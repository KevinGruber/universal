import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'app/core/core.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CoreModule, RouterTestingModule, HttpClientModule],
            declarations: [
                AppComponent
            ]
        }).compileComponents();
    }));
    it('should create the shop', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it('should show 5 Nav Buttons', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const compiled = fixture.debugElement.nativeElement;
        const navContainer = compiled.querySelector('.nav-buttons');
        const aTags = navContainer.querySelectorAll('a');
        expect(aTags.length).toBe(5);
    }));
    it('should have a Home Link', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const compiled = fixture.debugElement.nativeElement;
        const navContainer = compiled.querySelector('.nav-buttons');
        const aTags = navContainer.querySelectorAll('a');
        const homeLink = Array.from(aTags).find((t: Node) => t.textContent === 'Home');
        expect(homeLink).not.toBeNull();
    }));
});
