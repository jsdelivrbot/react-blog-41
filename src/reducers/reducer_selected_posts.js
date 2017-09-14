import _ from 'lodash';
import { SELECT_POST, DESELECT_POST } from '../actions';


export default function(state={}, action) {
    //let newState = state; //remove this?
    //console.log("the state:", state);


    switch (action.type) {
        case SELECT_POST:
            console.log("select action", action);

            return {
                ...state,
                [action.payload]: action.payload
            };
        case DESELECT_POST:
            return _.omit(state, action.payload);
            // If the state object has a key of ID (action.payload),
            // get rid of it and return a NEW object
    }

    return state;
}