import { Factory } from 'shop/server/module/server/factory';
import { Server } from 'shop/server/module/server';

async function bootstrap() {
    const app = await Factory.create(Server);
    await app.start();
}

bootstrap();
