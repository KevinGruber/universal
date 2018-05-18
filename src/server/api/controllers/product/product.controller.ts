import { Request, Response } from 'express';
import { Controller } from 'module/classes';
import { ProductService } from 'api/services';

export class ProductController extends Controller {
    private productService: ProductService;

    constructor(app) {
        super(app);

        // Because of laking dependency injection
        this.productService = this.services.ProductService as ProductService;
    }

    index(req: Request, res: Response) {
        const {code} = req.params;

        const product = this.productService.findById(code);
        return res.json(product);
    }
}
