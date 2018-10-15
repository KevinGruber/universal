import { Service } from 'typedi';
import * as Selectors from 'shop/client/reducers/selectors';
import { IState } from 'shop/client/reducers';

@Service()
export class TranslationService {

    private _objectify = (obj: any, [k, v]: any) => ({...obj, [k]: v});

    private _extractMessages(messages: string[], state: IState) {
        const currentMessages = Selectors.selectMessages(state);
        return Object.entries(currentMessages).filter(([key]) => messages.includes(key)).reduce(this._objectify, {});
    }

    optimizeMessages(messages: string[], state: IState): IState {
        const optimizedMessages = this._extractMessages(messages, state);
        return {
            ...state,
            coredata: {
                ...state.coredata,
                translations: {
                    messages: optimizedMessages,
                    full: false
                }
            }
        };
    }
}
