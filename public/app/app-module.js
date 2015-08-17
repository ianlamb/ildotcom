angular.module('app', [
    'ui.bootstrap',
    'ui.router',
    'ngCookies',
    'ngAnimate',
    'ngSanitize',
    'ngLocalize',
    'ngLocalize.InstalledLanguages',
    'infinite-scroll',
    'app.routes',
    'app.auth',
    'app.home',
    'app.about',
    'app.resume',
    'app.blog',
    'app.portfolio',
    'app.adventure',
    'app.games'
])
.value('localeSupported', [
    'en-CA',
    'fr-FR',
])
.value('localeFallbacks', {
    'en': 'en-CA',
    'fr': 'fr-FR',
    'fr-CA': 'fr-FR',
    'fr-BE': 'fr-FR',
    'fr-LU': 'fr-FR',
    'fr-MC': 'fr-FR',
    'fr-CH': 'fr-FR'
});