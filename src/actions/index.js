import axios from 'axios';

export const FETCH_POSTS = "fetch_posts";

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