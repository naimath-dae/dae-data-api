'use strict';

const getdaeWebData = `

    # Returns the content used to present a dae posts
    getdaeWebData(

    # The document id (e.g. "parent id :h_abc_dae_123")
    dae_id: String,

    # Required to specify the type from where we are recieving data(e.g. dae,..)
    type: String,

    # Required to get the post data from
    uri: String

    ): daeWebData
`;

module.exports = getdaeWebData;