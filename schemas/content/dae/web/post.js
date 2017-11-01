'use strict';

const Post = `
  
  type Post {
      id: String
      parent: String
      firstPublishedDate: String
      lastPublishedDate: String
      createdDate: String 
      pinned: Boolean
      byline: JSON
      headline: JSON
      content: JSON
}
`;

module.exports = Post;