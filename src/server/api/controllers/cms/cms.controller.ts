import { Request, Response } from 'express';
import { Controller } from '../../../module/classes/controller';
import { CMSService } from '../../services';

export class CMSController extends Controller {
    private cmsService: CMSService;

    constructor(app) {
        super(app);

        // Because of laking dependency injection
        this.cmsService = this.services.CMSService as CMSService;
    }

    index(req: Request, res: Response) {
        const {cmsPageId} = req.params;
        const cmsPage = this.cmsService.findByPageId(cmsPageId);
        return res.json(cmsPage);

    }
}
