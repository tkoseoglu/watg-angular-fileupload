(function () {
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
            MaxNumberOfFiles: 2,
            AllowedFileExtensions: "png,jpg,doc,docx,xls,xlsx",
            Button: {
                Style: "btn-danger"
            }
        };
    }
})();
