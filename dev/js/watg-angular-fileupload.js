(function() {
    "use strict";
    angular.module("watgFileuploadModule", [
        "ngRoute",
        "ngSanitize",
        'watgFileuploadModule.const'
    ]);
})();
(function() {
    var app = angular.module('watgFileuploadModule');
    app.config(["$httpProvider", "$routeProvider", appConfig]);
    app.run(appRun);

    function appConfig($httpProvider, $routeProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        $httpProvider.defaults.headers.common['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.common['Pragma'] = 'no-cache';

        $routeProvider.when('/test', {
            templateUrl: 'src/app/tests/testView.html',
            controller: 'testController'
        }).otherwise({
            redirectTo: '/test'
        });
    }

    function appRun() {}
})();
angular.module('watgFileuploadModule.const', [])

.constant('CONST_FILEUPLOAD_TEMPLATE_URL', 'src/app/directives/templates/watgFileuploadTemplate.html')

;
(function () {
   "use strict";
   angular.module("watgFileuploadModule").directive("watgFileupload", ["CONST_FILEUPLOAD_TEMPLATE_URL", watgFileupload]);

   function watgFileupload(CONST_FILEUPLOAD_TEMPLATE_URL) {
      return {
         restrict: "E",
         templateUrl: CONST_FILEUPLOAD_TEMPLATE_URL,
         scope: {
            config: "="
         },
         link: link
      };

      function link(scope, element) {

         console.log("Fileupload Template URL %s", CONST_FILEUPLOAD_TEMPLATE_URL);

         function validateFile(theFile) {
            return function (e) {
               var isValid = true;
               var image = new Image();
               image.src = e.target.result;
               scope.imageSrc = image.src;
               if (!scope.config.MaxFileSize) scope.config.MaxFileSize = (1024 * 1024) * 5;
               if (!scope.config.MaxImageHeight) scope.config.MaxImageHeight = 800;
               if (!scope.config.MaxImageWidth) scope.config.MaxImageWidth = 1200;
               if (!scope.config.MinImageHeight) scope.config.MinImageHeight = 15;
               if (!scope.config.MinImageWidth) scope.config.MinImageWidth = 15;
               if (!scope.config.MaxNumberOfFiles) scope.config.MaxNumberOfFiles = 3;
               if (image.height > 0) {
                  if (image.height > scope.config.MaxImageHeight) {
                     isValid = false;
                     scope.messages.push("Image " + theFile.name + " (" + image.height + "px) exceeds the max height limit of " + scope.config.MaxImageHeight + "px.");
                  }
                  if (image.height < scope.config.MinImageHeight) {
                     isValid = false;
                     scope.messages.push("Image " + theFile.name + " (" + image.height + "px) does not meet the minimal height limit of " + scope.config.MinImageHeight + "px.");
                  }
               }
               if (image.width > 0) {
                  if (image.width > scope.config.MaxImageWidth) {
                     isValid = false;
                     scope.messages.push("Image " + theFile.name + " (" + image.width + "px) exceeds the max width limit of " + scope.config.MaxImageHeight + "px.");
                  }
                  if (image.width < scope.config.MinImageWidth) {
                     isValid = false;
                     scope.messages.push("Image " + theFile.name + " (" + image.width + "px) does not meet the minimal width limit of " + scope.config.MinImageWidth + "px.");
                  }
               }
               if (theFile.size > scope.config.MaxFileSize) {
                  isValid = false;
                  scope.messages.push("File " + theFile.name + " (" + (theFile.size / (1024 * 1024)).toFixed(2) + " MB) exceeds the max size limit of " + (scope.config.MaxFileSize / (1024 * 1024)).toFixed(2) + " MB.");
               }
               if (isValid && scope.config.Files) {
                  if (scope.config.Files.length < scope.config.MaxNumberOfFiles) {
                     scope.config.Files.push(theFile);
                  } else {
                     scope.messages.push("Maximum number of files reached. (" + scope.config.MaxNumberOfFiles + ")");
                  }
               }
               scope.isBusy = false;
               scope.$apply();
            };
         }

         scope.$watch("config.id", function (newValue) {
            if (newValue) {
               console.log(newValue);
               try {
                  scope.messages = [];
                  scope.imageSrc = "";

                  $("#" + newValue).bind("change", function (e) {
                     scope.messages = [];
                     var selectedFiles = (e.srcElement || e.target).files;
                     if (selectedFiles) {
                        for (var i = 0; i < selectedFiles.length; i++) {
                           scope.config.IsBusy = true;
                           scope.$apply();
                           var selectedFile = selectedFiles[i];
                           var selectedFileExtension = selectedFile.name.split('.').pop();
                           if (selectedFileExtension) {
                              if (scope.config.AllowedFileExtensions.indexOf(selectedFileExtension.toLowerCase()) >= 0) {
                                 var reader = new FileReader();
                                 reader.readAsDataURL(selectedFile);
                                 reader.onload = validateFile(selectedFile);
                              } else {
                                 scope.messages.push(selectedFile.name + " has an invalid file extension " + selectedFileExtension);
                              }
                           }
                           scope.config.IsBusy = false;
                           scope.$apply();
                        }
                     } else {
                        scope.messages.push("File not found");
                     }
                  });

               } catch (e) {
                  console.error("watg-angular-fileupload: error " + e);
               }
            }
            else {
               console.error("watg-angular-fileupload: No configuration found");
            }
         });


      }
   }
}());
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