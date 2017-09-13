import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST } from '../actions';


//state object with keys = id of individual posts, values = actual posts themselves
export default function(state={}, action) { //initial (blank) state object

    switch (action.type) {
        case FETCH_POST:
            //the "...state" is so we don't throw away the previous posts we've fetched
            //we're going to take stuff from the old state, and add it to the new one
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
            console.log("action:", _.mapKeys(action.payload.data, 'id'));
            return _.mapKeys(action.payload.data, 'id');

        default:
            return state; //do nothing

    }
}