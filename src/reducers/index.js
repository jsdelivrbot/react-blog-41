import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; //they recommend importing it with this alias
import PostReducer from './reducer_posts';


const rootReducer = combineReducers({ //the global state!
  posts: PostReducer,
  form: formReducer
});

export default rootReducer;
