(function() {
    "use strict";
    angular.module("watgFileuploadModule").directive("watgFileupload", watgFileupload);

    function watgFileupload() {
        return {
            restrict: "E",
            //templateUrl: 'src/app/directives/templates/watgFileuploadTemplate.html',
            templateUrl: 'app/directives/templates/watgFileuploadTemplate.html',
            scope: {
                config: "="
            },
            link: link
        };

        function link(scope, element) {
            try {
                scope.messages = [];
                scope.imageSrc = "";
                if (scope.config !== null && scope.config !== undefined) {
                    function validateFile(theFile) {
                        return function(e) {
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
                                if (scope.config.Files.length <= scope.config.MaxNumberOfFiles) {
                                    scope.config.Files.push(theFile);
                                } else {
                                    scope.messages.push("Maximum number of files reached. (" + scope.config.MaxNumberOfFiles + ")");
                                }
                            }
                            scope.isBusy = false;
                            scope.$apply();
                        };
                    }
                    element.bind("change", function(e) {
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
                } else {
                    console.error("watg-angular-fileupload: No configuration found");
                }
            } catch (e) {
                console.error("watg-angular-fileupload: error " + e);
            }
        }
    }
}());
