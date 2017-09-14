import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; //they recommend importing it with this alias
import PostReducer from './reducer_posts';
import SelectedPostReducer from './reducer_selected_posts';


const rootReducer = combineReducers({ //the global state!
  posts: PostReducer,
  form: formReducer,
  selectedPostIds: SelectedPostReducer //named this selectedPosts by accident UGHHHHh
});

export default rootReducer;
