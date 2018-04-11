/**
 * Created by Admin on 29.09.2016.
 */





angular.module('app').factory("SaveMenu", function($resource) {
    return $resource("/savemenu");
});


angular.module('app').factory("Allmenus", function($resource) {
    return $resource("/allmenus");
});

angular.module('app').factory("Addpost", function($resource) {
    return $resource("/addpost");
});



angular.module('app').factory("Deleteonepost", function($resource) {
    return $resource("/deleteonepost");
});


angular.module('app').factory("GetAllpost", function($resource) {
    return $resource("/getallpost");
});
