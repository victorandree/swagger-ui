#!/usr/bin/env node

var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var livereload = require('livereload');

var app = express();

var apiFolder = process.cwd();
var apiFolderName = path.basename(apiFolder);

// Serve up API specification under cwd basename
app.use('/' + apiFolderName,
    serveStatic(apiFolder, {
        'cacheControl': false,
        'extensions': ['json', 'yaml'],
        'index': [
            'swagger.json',
            'swagger.yaml'
        ]
    })
);

// Serve up Swagger UI from root and add the LiveReload middleware
app.use(require('connect-livereload')({
    port: 35729
}));
app.use(serveStatic(__dirname + '/../dist'));
app.listen(3000);

var livereloadServer = livereload.createServer({
    exts: ['yaml', 'json']
});
livereloadServer.watch(apiFolder);
