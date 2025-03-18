import express from 'express';

import { asyncWrapper } from '../utils';

const router = express.Router();

router.use(
    asyncWrapper(async (req, res, next) => {
        // let initialPageData = {};
        // try {
        //     // TODO: add some user-specific thing to request?
        //     const pageDataResponse = await global.fetch('https://localhost:whatever/api/your/resource');
        //     initialPageData = await pageDataResponse.json();
        // } catch (e) {
        //     console.warn(`[home route] - caught exception: ${e}`);
        // }

        try {
            return res.render('index', {
                layout: 'index',
                // initialPageData: JSON.stringify(initialPageData),
                ...(res.locals?.manifest?.['common'] || {}),
                ...(res.locals?.manifest?.['home'] || {}),
            });
        } catch (e) {
            return next(e);
        }
    }),
);

export { router as mainRouter };
