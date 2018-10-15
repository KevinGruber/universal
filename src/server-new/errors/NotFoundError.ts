class NotFoundError extends Error {
    name = 'NotFoundError';
    url = '';
    markup = '';

    constructor(markup: string, url: string) {
        super(markup);
        this.url = url;
        this.markup = markup;
    }
}

export default NotFoundError;
