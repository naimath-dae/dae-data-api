'use strict';

const rp = require('request-promise'),
    // data = require('./mockdata.js') We are getting this data from mock  server server
    daeHost = process.env.server_dae_HOST;
// daeTimeout = process.env.dae_TIMEOUT ? parseInt(process.env.dae_TIMEOUT, 10) : 15000,
// daeApiVersion = process.env.dae_API_VERSION || 'v1';

module.exports = {
    getdaeWebData(obj, args, context, info) {
        let dae_id = args.dae_id,
            type = args.type || 'dae',
            uri,
            fullPath,
            options;

        console.log('dae_args', args);

        //we will get this later once we know the place from where we are geting  data from  server
        fullPath = `${daeHost}/${type}`;
        options = {
            uri: fullPath,
            json: true
        }

        return rp(options)
            .then((body) => {
                let data = body;
                // Returns doc which matchs the dae_id;
                const doc = data.doc.find(document => (document.id === dae_id));
                return doc;

            })
            .catch((err) => {
                console.log('error', err);
                return err;
            });
    }

}