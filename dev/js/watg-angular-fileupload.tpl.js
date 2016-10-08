angular.module('watgFileupload.templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("app/directives/templates/watgFileuploadTemplate.html",
    "<h4>Add {{config.Title}}</h4><span class=\"btn btn-primary btn-file\"><i class=\"fa fa-plus\" ng-hide=config.IsBusy></i> <i class=\"fa fa-refresh fa-spin\" ng-show=config.IsBusy></i> Add <input type=file id=file name=file multiple></span><br><br><div class=\"alert alert-danger\" ng-show=\"fileSelectMessages.length > 0\"><div ng-repeat=\"m in fileSelectMessages\">{{m}}</div></div><div ng-show=\"config.Files.length > 0\"><label>New {{config.Title}} ({{config.Files.length}})</label><div ng-repeat=\"f in config.Files\" class=row><div class=col-sm-5><div class=input-group><input name=fileName class=\"form-control input-sm\" ng-model=f.name ng-disabled=\"true\"> <span class=input-group-btn><button type=button class=\"btn btn-danger btn-sm\" title=remove ng-click=\"config.Files.splice($index, 1)\"><i class=\"fa fa-remove\"></i></button></span></div></div></div></div><div class=\"alert alert-danger\" ng-show=\"messages.length > 0\"><div ng-repeat=\"m in messages\">{{m}}</div></div>");
}]);
