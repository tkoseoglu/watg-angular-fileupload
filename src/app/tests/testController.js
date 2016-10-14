(function() {
    "use strict";
    angular.module("watgFileuploadModule").controller("testController", ['$scope', testController]);

    function testController($scope) {
        $scope.watgFileuploadConfig = {
            Title: "Attachments",
            Files: [],
            MaxFileSize: "",
            MaxImageHeight: "",
            MaxImageWidth: "",
            MinImageHeight: "",
            MinImageWidth: "",
            AllowedFileExtensions: "png,jpg",
            Button: {
                Style: "btn-danger"
            }
        };
    }
})();
