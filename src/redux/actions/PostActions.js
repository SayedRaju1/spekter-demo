import axios from "axios"
import {
    FETCH_POST_FAILURE,
    FETCH_POST_REQUEST,
    FETCH_POST_SUCCESS
} from "./PostTypes"



export const fetchPostRequest = () => {
    return {
        type: FETCH_POST_REQUEST
    }
}

export const fetchPostSuccess = (posts) => {
    return {
        type: FETCH_POST_SUCCESS,
        payload: posts
    }
}

export const fetchPostFailure = (error) => {
    return {
        type: FETCH_POST_FAILURE,
        payload: error
    }
}

export const fetchPost = () => {
    return (dispatch) => {
        dispatch(fetchPostRequest)
        console.log('Redux API Call');
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data
                dispatch(fetchPostSuccess(posts))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchPostFailure(errorMsg))
            })
    }
}