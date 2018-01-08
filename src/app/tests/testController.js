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
            MaxNumberOfFiles: 2,
            AllowedFileExtensions: "png,jpg,doc,docx,xls,xlsx,pdf",
            Button: {
                Style: "btn-danger"
            }
        };

        $scope.upload = function() {

            var fd = new FormData();

            if ($scope.watgFileuploadConfig.Files) {
                for (var iii = 0; iii < $scope.watgFileuploadConfig.Files.length; iii++) {
                    fd.append('Files[' + iii + ']', $scope.watgFileuploadConfig.Files[iii]);
                }
                var fileDescriptions = [];
                for (var ii = 0; ii < $scope.watgFileuploadConfig.Files.length; ii++) {
                    var fileDescription = {
                        name: $scope.watgFileuploadConfig.Files[ii].name,
                        description: $scope.watgFileuploadConfig.Files[ii].description
                    };
                    fileDescriptions.push(fileDescription);
                }
                fd.append('FileDescriptions', angular.toJson(fileDescriptions));
            }

            console.log(fd);

        };
    }
})();