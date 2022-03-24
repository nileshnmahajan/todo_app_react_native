import LocalizedStrings from 'react-native-localization';

let strings = new LocalizedStrings({
  en: {
    welcomeBack: 'App Name',
    appName: 'ToDo App',
    splashText: 'ToDo App',
    homeScreenText: 'Home Screen',
    internetReq: 'internet required',
    selectLang: 'Select Language',
    saveLang: 'Save Language',
    save: 'Save',
    changeLanguage: 'Change language',
    /*---------   ok dialog  ----------------*/
    okdialogHeader: 'ToDo App',
    okdialogOkText: 'Ok',

    /************************************** */
  },
  mr: {
    welcomeBack: 'Welcome Back',
    appName: 'ToDo App',
    splashText: 'ToDo App',
    homeScreenText: 'Home Screen',
    internetReq: 'Internet is required',
    selectLang: 'भाषा निवडा',
    saveLang: 'भाषा जतन करा',
    changeLanguage: 'भाषा बदला',
    /*---------   ok dialog  ----------------*/
    okdialogHeader: 'ToDo App',
    okdialogOkText: 'ठिक आहे',
    save: 'जतन करा',
    /************************************** */
  },
});

export default strings;
