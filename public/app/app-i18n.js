angular.module('app.i18n', [
    'ngCookies',
    'ngLocalize',
    'ngLocalize.Config',
    'ngLocalize.InstalledLanguages'
])
.value('localeConf', {
    basePath: 'assets/languages',
    defaultLocale: 'en-CA',
    sharedDictionary: 'common',
    fileExtension: '.lang.json',
    persistSelection: true,
    cookieName: 'COOKIE_LOCALE_LANG',
    observableAttrs: new RegExp('^data-(?!ng-|i18n)'),
    delimiter: '::'
})
.value('localeSupported', [
    'en-CA',
    'fr-FR',
    'es-ES'
])
.value('localeFallbacks', {
    'en': 'en-CA',
    'fr': 'fr-FR',
    'es': 'es-ES'
});