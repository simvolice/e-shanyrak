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

      .state('maincms', {
          url: '/maincms',
          templateUrl: 'components/maincms/maincmsView.html',


      })

      .state('housemanage', {
          url: '/housemanage',
          templateUrl: 'components/housemanage/housemanageView.html',


      })

      .state('home', {
          url: '/home',
          templateUrl: 'components/home/homeView.html',


      })


      .state('mainksk', {
          url: '/mainksk',
          templateUrl: 'components/mainksk/mainkskView.html',


      })


      .state('budgetksk', {
          url: '/budgetksk',
          templateUrl: 'components/budgetksk/budgetkskView.html',


      })


      .state('planksk', {
          url: '/planksk',
          templateUrl: 'components/planksk/plankskView.html',


      })

      .state('messageksk', {
          url: '/messageksk',
          templateUrl: 'components/messageksk/messagekskView.html',


      })
      .state('serviceksk', {
          url: '/serviceksk',
          templateUrl: 'components/serviceksk/servicekskView.html',


      })

      .state('mainsem', {
          url: '/mainsem',
          templateUrl: 'components/mainsem/mainsemView.html',


      })

      .state('financesem', {
          url: '/financesem',
          templateUrl: 'components/financesem/financesemView.html',


      })

      .state('powersem', {
          url: '/powersem',
          templateUrl: 'components/powersem/powersemView.html',


      })

      .state('datasem', {
          url: '/datasem',
          templateUrl: 'components/datasem/datasemView.html',


      })

      .state('notifsem', {
          url: '/notifsem',
          templateUrl: 'components/notifsem/notifsemView.html',


      })
});