'use strict';

const dae = require('./dae'),
    GraphQLJSON = require('graphql-type-json'),
    resolverMap = {
        Query: {
            /**
                @param {obj}: The object that contains the result returned from the
                    resolver on the parent field, or, in the case of a top-level Query field,
                    the rootValue passed from the server configuration. This argument
                    enables the nested nature of GraphQL queries.
                @param {args}: An object with the arguments passed into the field in the query.
                    For example, if the field was called with author(name: "Ada"),
                    the args object would be: { "name": "Ada" }
                @param {context}: This is an object shared by all resolvers in a particular query,
                    and is used to contain per-request state, including authentication information,
                    dataloader instances, and anything else that should be taken into account
                    when resolving the query.
                @param {info}: This argument should only be used in advanced cases,
                    but it contains information about the execution state of the query,
                    including the field name, path to the field from the root, and more.
            */
            getdaeWebData(obj, args, context, info) {
                return dae.getdaeWebData(obj, args, context, info);
            }
        },

        JSON: GraphQLJSON,

        daeWebData: {
            pinnedPostCount(root) {
                return root.pinnedPosts.length;
            },

            unpinnedPostCount(root) {
                return root.unpinnedPosts.length;
            },

            unpinnedPosts(root, args) {
                const { start, startId, later, earlier, ids, take } = args;
                // ids takes precedence over everything
                // Returns post related to ids(given)
                if (ids) {
                    const postsByIds = ids.length > 0
                        ? (root.unpinnedPosts)
                            .filter(
                            post => (ids.indexOf(post.id) != -1)
                            )
                        : [];
                    return postsByIds;
                }

                // otherwise, other ways to select a page of posts
                let findStartIndex = (id) => {
                    const filter = root.unpinnedPosts.find(filters => (filters.id === id));
                    return root.unpinnedPosts.indexOf(filter);
                }

                // startId has precedence over start
                if (startId) {
                    start = findStartIndex(startId)
                }

                // take has precedence over later/earlier
                if (take) {
                    return root.unpinnedPosts.slice(start, start + take);
                }

                // special window selection
                else if (later || earlier) {
                    // TODO guard against edge cases
                    return root.unpinnedPosts.slice(start - earlier, start + later + 1);
                }

                // Return all unpinnedPosts if none of the params are given
                else {
                    return root.unpinnedPosts.slice(start);
                }
            }
        }
    };

module.exports = resolverMap;
