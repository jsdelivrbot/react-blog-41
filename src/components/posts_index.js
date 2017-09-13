import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from "../actions/index";
import _ from 'lodash';
import { Link } from 'react-router-dom';


class PostsIndex extends Component {

    //componentDidMount Method is called automatically by React after it shows up in DOM
    //lifecycle method - function on React component class that is automatically called by React
    //good place for fetching data and stuff that needs to happen 1 time when this component shows up on the screen
    //fetching data is an asynchronous operation - it takes some time to fetch the data and return it to our browser
    //react doesn't have a way to wait for this to finish
    //componentWillMount is another lifecycle method that gets called BEFORE the component shows up in the DOM
    componentDidMount(){ //<--it needs to be called this for React to call it automatically!
        this.props.fetchPosts();
    }

    renderPosts(){
        console.log("Posts:",this.props.posts);
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    {post.title}
                </li>
            )
        }); //lodash map to use on objects
    }

    render(){
        //console.log(this.props.posts);
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        New Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
//rather than defining a separate function (mapDispatchToProps), we'll pass fetchPosts as an object
// i.e. {fetchPosts: fetchPosts } which is == { fetchPosts }
// this is a shortcut
// but sometimes we want an actual separate function
