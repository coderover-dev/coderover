const PROJECT_METADATA_JSON_TEMPLATE = `{
    "schemaVersion": "1.0",
    "name": "{{name}}",
    "type": "{{type}}",
    "platform": "{{platform}}",
    "framework": "{{framework}}"
}
`
const DATA_MODEL_METADATA_JSON_TEMPLATE = `{
    "dataModelName":"{{dataModelName}}",
    "transient":{{transient}},
    "dbTableName":"{{dbTableName}}",
    "fields":[
      {{#each fieldList}}
      {
        "fieldId":"{{fieldId}}",
        "fieldName":"{{fieldName}}",
        "fieldDataType":"{{fieldDataType}}",
        "dbColumnName":"{{dbColumnName}}",
        "defaultValue":"{{defaultValue}}",
        "transient":{{transient}},
        "nullable":{{nullable}},
        "unique":{{unique}}
      }{{#if @last}}{{else}},{{/if}}
     {{/each}}
    ]
}
`
const PACKAGE_JSON_TEMPLATE = `{
    "name": "{{projectName}}",
    "version": "0.0.0",
    "private": true,
    "scripts": {
    },
    "dependencies": {
        "cookie-parser": "~1.4.4",
        "debug": "~2.6.9",
        "express": "~4.16.1",
        "http-errors": "~1.6.3",
        "jade": "~1.11.0",
        "morgan": "~1.9.1"
    }
}
`

const APP_JS_TEMPLATE = `
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// express app & routes
var app = express();
var routes = require('./routes/routes.js');

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// listen on the configured port
let bindPort = 9020;
app.listen(bindPort, () =>
  console.log(\`{{projectName}} listening on port \${bindPort}!\`),
);
`

const ROUTE_JS_TEMPLATE = `
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
`

module.exports = {
  PACKAGE_JSON_TEMPLATE,
  APP_JS_TEMPLATE,
  ROUTE_JS_TEMPLATE,
  PROJECT_METADATA_JSON_TEMPLATE,
  DATA_MODEL_METADATA_JSON_TEMPLATE
}