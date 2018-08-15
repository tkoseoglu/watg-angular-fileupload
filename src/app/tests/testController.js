(function () {
   "use strict";
   angular.module("watgFileuploadModule").controller("testController", ['$scope', testController]);

   function testController($scope) {
      
      $scope.watgFileuploadConfig = {
         Title: "Attachments",
         id: 'myFile1',
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

      $scope.watgFileuploadConfig2 = {
         Title: "Notes",
         id: 'myFile2',
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

      $scope.upload = function () {

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

         $scope.watgFileuploadConfig.Files = [];

      };

      $scope.upload2 = function () {

         var fd = new FormData();

         if ($scope.watgFileuploadConfig2.Files) {
            for (var iii = 0; iii < $scope.watgFileuploadConfig2.Files.length; iii++) {
               fd.append('Files[' + iii + ']', $scope.watgFileuploadConfig2.Files[iii]);
            }
            var fileDescriptions = [];
            for (var ii = 0; ii < $scope.watgFileuploadConfig2.Files.length; ii++) {
               var fileDescription = {
                  name: $scope.watgFileuploadConfig2.Files[ii].name,
                  description: $scope.watgFileuploadConfig2.Files[ii].description
               };
               fileDescriptions.push(fileDescription);
            }
            fd.append('FileDescriptions', angular.toJson(fileDescriptions));
         }

         console.log(fd);

         $scope.watgFileuploadConfig2.Files = [];

      };
   }
})();