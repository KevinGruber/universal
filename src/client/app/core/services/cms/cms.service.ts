import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CMSData } from 'app/shared/cms';
import { environment } from 'environments/environment';

@Injectable()
export class CMSService {

    constructor(private http: HttpClient) { }

    getCMSData(cmsID: string) {
        return this.http.get<CMSData>(`${environment.server}/v1/cms/${cmsID}`);
    }

}
