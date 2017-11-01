'use strict';

const post = require('./post'),
    daeWeb = `
    ${post}
    
    type doc {
        id: String
        firstPublishedDate: String
        lastPublishedDate: String
        name: String
        pinnedPosts: [Post]
        unpinnedPosts: [Post]
    }
    
    type daeWebData {
        id: String
        firstPublishedDate: String
        lastPublishedDate: String
        name: String
        pinnedPostCount: Int
        pinnedPosts: [Post]
        unpinnedPostCount: Int
        unpinnedPosts( 
            # Can be used to display start position (e.g: 1,2,3...) in latest post, default: 0
            start: Int=0,
            
            # Number of post you want to display (e.g. 1, 2, 3, ...), optional can use starts:Int to choose the starting position in latestpost or default it is 0
            take: Int,
   
            # Post id that you want to display (e.g. id: "h_def_lspost_987") can use earlier and later field along with it
            startId: String,
 
            # Number of earlier posts before mentioned post_id(e.g. 1,2,3..), default: 0
            earlier: Int=0,

            # Required a number of later posts after mentioned post_id (e.g. 1,2,3..), default: 0
            later: Int=0,

            # The array of ids string request to display (e.g. ["h_def_lspost_987","h_def_lspost_4567"])
            ids: [String]
        ): [Post]
    }
    
`;


module.exports = daeWeb;

