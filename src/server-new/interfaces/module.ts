import { Server } from 'hapi';

export interface IModule {
    register: (server: Server) => void
}
