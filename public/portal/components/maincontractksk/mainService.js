/**
 * Created by Admin on 29.09.2016.
 */






angular.module('app').factory("SetStatusTransactionHash", function($resource) {
    return $resource("/setstatustransactionhash");
});




angular.module('app').factory("GetAllTransactionHash", function($resource) {
    return $resource("/getalltransactionhash");
});