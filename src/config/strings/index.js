import I18n from 'react-native-i18n';

// Strings by language
import ES from './strings.es';
import EN from './strings.en';

export default () => {
  I18n.locale = 'EN';
  I18n.fallbacks = true;

  I18n.translations = {
    EN,
    ES,
  };
};
