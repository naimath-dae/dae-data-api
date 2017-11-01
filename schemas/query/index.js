'use strict';

const daeWeb = require('./dae/web'),
    Query = `
    # Data API for Post content

    type Query {
        
        ${daeWeb.getdaeWebData}
    }
`;

module.exports = Query;
