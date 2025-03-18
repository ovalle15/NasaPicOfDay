import path from 'path';
import cors from 'cors';
import express from 'express';
import { engine } from 'express-handlebars';

import { mainRouter } from './routers';

const __dirname = path.resolve();

const expressApp = express();

expressApp.set('view engine', 'handlebars');
expressApp.engine(
    'handlebars',
    engine({
        layoutsDir: `${__dirname}/src/server/views`,
    }),
);
expressApp.set('views', path.join(__dirname, 'src/server/views'));

expressApp.use(cors());
expressApp.use(express.json());

expressApp.use(manifestMiddleware);

if (process.env.ENV !== 'production') {
    // res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    // res.header('Expires', '-1');
    // res.header('Pragma', 'no-cache');
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
    expressApp.use('/dist', express.static(path.join(__dirname, 'dist')));
}

expressApp.use('', mainRouter);

export default expressApp;