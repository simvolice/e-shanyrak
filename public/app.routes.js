/**
 * Created by Admin on 29.09.2016.
 */



app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/main');

  $stateProvider


      .state('index', {
        url: '/',
        view: {

          templateUrl: 'index.html'

        }

      })




      .state('main', {
          url: '/main',
          templateUrl: 'main/main.html',


      })

      .state('dynamicpage', {
          url: '/post/:id/:url',
          templateUrl: 'dynamicpage/dynamicView.html'



      })



});