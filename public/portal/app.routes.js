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
          templateUrl: 'components/main/mainView.html',


      })



      .state('myhouse', {
          url: '/myhouse',
          templateUrl: 'components/myhouse/myHouseView.html',


      })


      .state('myflat', {
          url: '/myflat',
          templateUrl: 'components/myflat/myFlatView.html',


      })



      .state('greencontract', {
          url: '/greencontract',
          templateUrl: 'components/greencontract/greencontractView.html',


      })

      .state('myprofile', {
          url: '/myprofile',
          templateUrl: 'components/myprofile/myProfileView.html',


      })

      .state('controlksk', {
          url: '/controlksk',
          templateUrl: 'components/controlksk/controlKSKView.html',


      })

      .state('controlsem', {
          url: '/controlsem',
          templateUrl: 'components/controlsem/controlsemView.html',


      })


      .state('analyticssem', {
          url: '/analyticssem',
          templateUrl: 'components/analyticssem/analyticssemView.html',


      })

      .state('maingos', {
          url: '/maingos',
          templateUrl: 'components/maingos/maingosView.html',


      })
});