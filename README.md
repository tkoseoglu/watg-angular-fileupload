# watg-angular-fileupload
WATG auto-complete fileupload for angularjs web applications. A simple angularjs module/directive to upload files

## Getting Started

```shell
bower install watg-angular-fileupload --save
```

### Required Files

```js
bower_components/watg-angular-fileupload/dist/js/watg-angular-fileupload.min.js
bower_components/watg-angular-fileupload/dist/js/watg-angular-fileupload.tpl.min.js
```

```css
bower_components/watg-angular-fileupload/dist/css/watg-angular-fileupload.min.css
```

### Inject module in your app

```js
angular.module('myApp', ['...','watgFileuploadModule']);
```

## Example

### Step 1. Directive Set-up

```html
<watg-fileupload config="watgFileuploadConfig"></watg-fileupload>
```

### Step 2. Configuration

```js
$scope.watgFileuploadConfig = {
    Title: "Attachments",
    Files: [],
    MaxFileSize: "",
    MaxImageHeight: "",
    MaxImageWidth: "",
    MinImageHeight: "",
    MinImageWidth: "",
    AllowedFileExtensions: "png,jpg"
};
```