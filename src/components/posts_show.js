import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from "../actions/index";
import { Link } from 'react-router-dom';


class PostsShow extends Component {

    componentDidMount(){
        if (!this.props.post) { //to avoid re-fetching posts (optional)
            console.log("componentDidMount");
            //match is provided by reactRouter, params is an obj that lists the wildcard tokens in the URL (:id in this case)
            const {id} = this.props.match.params; // same as this.props.match.params.id
            this.props.fetchPost(id);
        }
    }


    onDeleteClick(){
        const {id} = this.props.match.params;//Alternatively: this.props.post.id, but this is bad because it assumes we fetched the post already

        //call an action creator! (since we're making an AJAX request to the backend API)
        this.props.deletePost(id, ()=>{
            this.props.history.push('/');
        });
    }


    render() {

        //this.props == ownProps in mapStateToProps
        const { post } = this.props;


        console.log("rendering post:", post);


        if (!post){
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">Back to index</Link>
                <button
                    className = "btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}

                >
                    Delete post
                </button>
                <h3>{post.title}</h3>
                <h6><label>Categories: </label> {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        )
    }
}


function mapStateToProps({ posts }, ownProps){ //same as state.posts - the big list of posts
    //ownProps is the props object that is going to the PostsShow component
    //instead of returning the BIG LIST of posts, we can return just the single post we need (no more data dependency)
    //console.log("posts in mapStateToProps:", posts);
    return { post: posts[ownProps.match.params.id] };
    //in many large apps, mapStateToProps can be in a different file separate from the actual component
    //helper function can use this.props.post instead of this.props.posts[this.props.match.params.id]
}


export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);