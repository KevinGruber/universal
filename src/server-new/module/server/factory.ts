import { Container } from 'typedi';
import { IServer } from 'server-new/interfaces/server';

export class Factory {
    public static async create(server: IServer) {
        const instance = Container.get(server);
        await instance.init();
        return instance;
    }
}
