import _ from 'lodash';
import { FETCH_POSTS } from '../actions';


//state object with keys = id of individual posts, values = actual posts themselves
export default function(state={}, action) { //initial (blank) state object
    switch (action.type) {
        case FETCH_POSTS:
            //console.log(action.payload.data);
            //use lodash to make our array of records into an object
            return _.mapKeys(action.payload.data);

        default:
            return state; //do nothing

    }
}