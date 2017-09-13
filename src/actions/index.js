import axios from 'axios';

export const FETCH_POSTS = "fetch_posts";
export const CREATE_POST = "create_posts";
export const FETCH_POST = "fetch_post";
export const DELETE_POST = "delete_post";

const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=NICEUNIQUEKEY"; //? for query string


//action creator to fetch a list of posts
export function fetchPosts() {
    //new request using axios library
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`); //remember, this is a promise
    //but since it's being assigned to the payload property, redux-promise will automatically resolve it
    return {
        type: FETCH_POSTS,
        payload: request
    };

}


//another action creator
export function createPost(values, callback){ //values has no id
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
        .then(callback); //or (() => callback())


    return {
        type: CREATE_POST,
        payload: request
    }
}


//Action creator that fetches a single post
export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type: FETCH_POST,
        payload: request
    }
}


export function deletePost(id, callback){
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
        .then(callback);

    return {
        type: DELETE_POST,
        payload: id //then in the reducer, we can just delete and get rid of that particular post
    }

}