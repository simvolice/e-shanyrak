/**
 * Created by Admin on 29.09.2016.
 */






angular.module('app').factory("AddTransactionHash", function($resource) {
    return $resource("/addtransactionhash");
});




angular.module('app').factory("GetAllTransactionHash", function($resource) {
    return $resource("/getalltransactionhash");
});