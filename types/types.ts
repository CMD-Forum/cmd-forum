/**
 * This is a file for all the types.
 */

/**
 * PostAuthor
 * @memberof Post
 * @alias PostAuthor
 */

export interface PostAuthor {

    /**
     * ID of the author.
     */
    id: string;

    /**
     * Username of the author.
     */
    username: string;

    /**
     * When the authors account was created.
     */
    createdAt: Date;

    /**
     * When the authors account was last updated in the database.
     */
    updatedAt: Date;

    /**
     * The authors profile image source.
     */
    image: string | undefined;

    /**
     * The authors profile description.
     */
    description: string;

}

/**
 * PostCommunity
 * @memberof Post
 * @alias PostCommunity
 */
  
export interface PostCommunity {

    /**
     * The ID of the community.
     */
    id: string;

    /**
     * The name of the community.
     */
    name: string;

    /**
     * The display name of the community.
     */
    display_name: string;

    /**
     * The image of the community.
     */
    image: string;

    /**
     * Whether the community is public or not.
     */
    public: boolean;

}
  
// ---------------------------------------------------------------------------------------------------------------------------

/**
 * @namespace typedefs
 */

/**
 * 
 * @typedef Post
 * @memberof typedefs
 * 
 * @param {string} id ID of the post.
 * @param {Date} createdAt When the post was created.
 * @param {Date} updatedAt When the post was updated in the database.
 * @param {string} title Title of the post.
 * @param {string} content Main content of the post.
 * @param {string} tagline Tagline of the post.
 * @param {string} imageurl URL of the posts image, may be undefined or null.
 * @param {string} imagealt Alt tag of the posts image, may be undefined or null.
 * @param {boolean} public Whether the post is public or not.
 * @param {string} authorId The ID of the posts author.
 * @param {number} downvotes How many downvotes the post has.
 * @param {number} upvotes How many upvotes the post has.
 * @param {string} communityId The ID of the posts community.
 * @param {PostAuthor} author The author data of the post.
 * @param {PostCommunity} community The community data of the post.
 * 
 */

/**
 * Post
 * @alias Post
 */

export interface Post {

    /**
     * ID of the post.
     */
    id: string;

    /**
     * When the post was created.
     */
    createdAt: Date;

    /**
     * When the post was last updated in the database.
     */
    updatedAt: Date;

    /**
     * The title of the post.
     */
    title: string;

    /**
     * The main content (or body) of the post.
     */
    content: string;

    /**
     * The tagline of the post.
     */
    tagline: string;

    /**
     * The URL of the posts image, may be undefined or null.
     */
    imageurl: string | undefined | null;

    /**
     * The alt text of the posts image, may be undefined or null.
     */
    imagealt: string | undefined | null;

    /**
     * Whether the post is public or not.
     */
    public: boolean;

    /**
     * The ID of the posts author, used for relations in the database.
     */
    authorId?: string;

    /**
     * The number of downvotes the post has.
     */
    //downvotes: number;

    /**
     * The number of upvotes the post has.
     */
    //upvotes: number;

    /**
     * The ID of the posts community, used for relations in the database.
     */
    communityId?: string;

    /**
     * Data about the posts author, see PostAuthor.
     */
    author: PostAuthor;

    /**
     * Data about the posts community, see PostCommunity.
     */
    community: PostCommunity;

}