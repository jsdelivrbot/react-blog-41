//Takes a list of posts and post IDs, picks out the selected Posts

import { createSelector } from 'reselect';


// Create select functions to pick off pieces of state we care about
// for this calculation
const postsSelector = state => state.posts;
const selectedPostsSelector = state => state.selectedPostIds;


//first arg is what comes out of the postsSelector function
//second is the list of selected post IDs
const getPosts = (posts, selectedPostIds) => {
    console.log("getting posts");

/*    const selectedPosts = _.filter(
        posts,
        post => _.contains(selectedPostIds, post.id)
    );*/
    return _.filter(
        posts,
        post => _.contains(selectedPostIds, post.id)
    );
};


// We pass in some number of state selecting functions
// Whenever our global redux state changes, each of these
// selectors are going to be executed
// if the selectors produce a new piece of state, getPosts is going to run and find the currently selected posts
export default createSelector(
    postsSelector, //pick off a piece of state
    selectedPostsSelector, //pick off a piece of state
    getPosts // last arg is the function that has our select logic
)