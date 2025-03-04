var express = require('express');
var path    = require('path');
var next    = require('next');

const TEST_RESOURCES_PORT = 1355;

module.exports = function () {
    var nextjsApp = null;
    var handle    = null;

    function serverRenderHandler (req, res) {
        if (!nextjsApp) {
            nextjsApp = next({ dir: path.join(__dirname, './data/server-render') });
            handle    = nextjsApp.getRequestHandler();
        }

        nextjsApp.render(req, res, '/');
    }

    return new Promise(resolve => {
        express()
            .use(express.static(path.join(__dirname, './data')))
            .disable('view cache')
            .get('/serverRender', serverRenderHandler)
            .get('*', (req, res) => handle(req, res))
            .listen(TEST_RESOURCES_PORT, resolve);
    });
};
