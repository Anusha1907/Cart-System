var showcart = angular.module("showcartCtrl", []);
showcart.controller('showcartController', function($scope, $rootScope, $http) {

    $scope.mycart = function() {
        $http({
            url: "/mycart",
            method: "POST",
            data: { userid: $rootScope.currentUser._id }
        }).then(function(response) {
            if (response.data.success) {
                if (response.data.result != null) {
                    $scope.myitems = response.data.result[0].items;
                    $scope.totalquantity = response.data.result[0].totalquantity;
                    $scope.totalcost = response.data.result[0].totalcost;
                    $scope.show = function() {
                        return false;
                    }
                } else {
                    $scope.show = function() {
                        return true;
                    }
                }
            } else {
                console.log(response);
            }
        })

    }
    $scope.mycart();
    $scope.remove = function(i) {
        $http({
            url: "/removeitems",
            method: "POST",
            data: { userid: $rootScope.currentUser._id, itemid: i }
        }).then(function(response) {
            if (response.data.success) {
                $scope.mycart();
            } else {
                console.log(response);
            }
        })
    }

    $scope.change = function(a, i) {
        $scope.id = i.id;
        if (a == '-') {
            $scope.b = i.quantity;
            $scope.b = $scope.b - 1;
            if ($scope.b == 0) {
                alert("least number reached");
            } else {
                $rootScope.addtocart($scope.id, $scope.b, function(respon) {
                    $scope.mycart();
                });
            }
        }
        if (a == '+') {
            var b;
            $scope.b = i.quantity;
            console.log($scope.b)
            console.log(i.max)
            if ($scope.b == i.max) {

                alert("max number reached");

            } else {
                $scope.b = $scope.b + 1;
                console.log($scope.id);
                $rootScope.addtocart($scope.id, $scope.b, function(respon) {
                    $scope.mycart();
                });

            }
        }


    }

})