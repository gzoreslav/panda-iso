import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import Router from 'react-router';
import FluxComponent from 'flummox/component';
import Flux from '../shared/Flux';
import routes from '../client/routes';
import performRouteHandlerStaticMethod from '../utils/performRouteHandlerStaticMethod';

let app = express();

function log(err) {
    process.stdout.write(err.stack);
    process.stdout.write('\n\n');
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

//app.use('/api', api);

app.use(async function (req, res, next) {
    let flux = new Flux();

    try {
        var router = Router.create({
            routes: routes,
            location: req.url
        });
    } catch(e) {
        log(e);
    }

    try {
        var {Handler, state} = await new Promise((resolve, reject) => {
            router.run((Handler, state) =>
                resolve({Handler, state})
            );
        });
    } catch(e) {
        log(e);
    }

    try {
        await performRouteHandlerStaticMethod(state.routes, 'routerWillRun', {state, flux});
    } catch (e) {
        log(e);
    }

    try {
        var html = React.renderToString(
            <FluxComponent flux={flux}>
                <Handler {...state} />
            </FluxComponent>
        );
    } catch(e) {
        log(e);
    }

    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>PandaRUN v.0.1.0 - Каталог результатів змагань</title>
                <link rel="stylesheet" href="/css/index.css" />
                <link rel="shortcut icon" href="/img/favicon.png" type="image/png" />
                <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500&subset=latin,cyrillic,cyrillic-ext' rel='stylesheet' type='text/css' />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <meta name="keywords" content="competitions, sport, run, running, cycle, bicycle, marathon,
                halfmarathon, brevet, спорт, змагання, результати, марафон, півмарафон, бревет, велосипед, біг, МТБ" >
                <meta name="description" content="PandaRUN | каталог результатів змагань - біг, велосипед та інші види
                змагань на час. Реєстрація, профайл учасника, можливість ділитись результатами в соцмережах, тощо.">
                <meta name="google-site-verification" content="QoOlWVXlQSt1cWg66STcs6J1cOfcUOOVPSs92hktAL4" />
            </head>
            <body>
                <div id="app">${html}</div>
                <script type="text/javascript" src="/js/bundle.min.js"></script>
            </body>
        </html>`
    );
});

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    log(err);
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

export default app;
