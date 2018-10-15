import { Languages } from 'shop/client/interfaces/base/Language';
import LanguageImported from 'shop/server/utils/Language';

const Language = jest.genMockFromModule<typeof LanguageImported>('../Language');

let preferredLanguage = Languages.DE;

Language.getPreferredLanguage = () => {
    return preferredLanguage;
};

Language.__setPreferredLanguage = (language: Languages) => {
    preferredLanguage = language;
    return preferredLanguage;
};

export default Language;
