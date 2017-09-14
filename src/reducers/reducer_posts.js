import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';


//state object with keys = id of individual posts, values = actual posts themselves
export default function(state={}, action) { //initial (blank) state object

    switch (action.type) {
        case DELETE_POST:
            //The action's payload contains the ID of the post we just deleted
            //Go to state and get rid of the key and value that match that ID
            return _.omit(state, action.payload); //If the state object has a key of ID (action.payload),
            //get rid of it and return a NEW object

        case FETCH_POST:
            //the "...state" is so we don't throw away the previous posts we've fetched
            //we're going to take stuff from the old state, and add it to the new one
            //console.log("action:", action);
            return { ...state, [action.payload.data.id]: action.payload.data };

        /*
            Square braces for key interpolation (make a new key using value of action.payload.data.id)
            This line is the same as:
            const post = action.payload.data;
            const newState = { ...state, };
            newState[post.id] = post;
            return newState;
        */

        case FETCH_POSTS:
            //console.log(action.payload.data);
            //use lodash to make our array of records into an object
            //console.log("action:", _.mapKeys(action.payload.data, 'id'));
            return _.mapKeys(action.payload.data, 'id');

        default:
            return state; //do nothing

    }
}