class ServerError extends Error {
    name = 'ServerError';
    url = '';
    markup = '';

    constructor(markup: string, url?: string) {
        super(markup);
        if (url) {
            this.url = url;
        }
        this.markup = markup;
    }
}

export default ServerError;
