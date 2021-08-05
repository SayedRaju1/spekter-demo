import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const PostInfoPage = () => {
    let { idPost } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        const url = `https://jsonplaceholder.typicode.com/posts/${idPost}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [])

    return (
        <div className="container p-0">
            <div className="d-flex justify-content-between bg-light p-3 px-5">
                <h4 className="mt-2">Post: {idPost}</h4>
                <h4 className="mt-2">User Id: {post.userId}</h4>
            </div>
            <h3 className="bg-danger text-white p-3 px-5 text-capitalize">Title: {post.title}</h3>
            <h4 className="bg-light text-dark border-bottom p-5">Body: {post.body}</h4>
        </div>
    );
};

export default PostInfoPage;