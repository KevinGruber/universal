import { Request, Response } from 'express';
import { Controller } from 'module/classes/controller';

export class HomeController extends Controller {

    index(req: Request, res: Response) {
        return res.send('UP and Running');
    }
}
