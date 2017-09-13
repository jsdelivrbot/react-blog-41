import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPost } from "../actions/index";

class PostsShow extends Component {
    componentDidMount(){
        //match is provided by reactRouter, params is an obj that lists the wildcard tokens in the URL (:id in this case)
        const {id} = this.props.match.params; // same as this.props.match.params.id
        this.props.fetchPost(id);

    }


    render() {
        //this.props == ownProps in mapStateToProps
        const { post } = this.props;

        if (!post){
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h3>{post.title}</h3>
                <h6><label>Categories: </label> {post.categories}</h6>
                <p>post.content}</p>
            </div>
        )
    }
}


function mapStateToProps({ posts }, ownProps){ //same as state.posts - the big list of posts
    //ownProps is the props object that is going to the PostsShow component
    //instead of returning the BIG LIST of posts, we can return just the single post we need (no more data dependency)
    console.log("posts:", posts);
    return { post: posts[ownProps.match.params.id] };
    //in many large apps, mapStateToProps can be in a different file separate from the actual component
    //helper function can use this.props.post instead of this.props.posts[this.props.match.params.id]
}


export default connect(null, { fetchPost })(PostsShow);