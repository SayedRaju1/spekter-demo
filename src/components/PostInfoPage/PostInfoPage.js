import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostContext } from '../../App';


const PostInfoPage = () => {
    let { idPost } = useParams();
    const [allPost] = useContext(PostContext)
    const [post, setPost] = useState({});

    useEffect(() => {
        setPost((allPost.filter(item => item.id == idPost))[0])
    }, [allPost, idPost])

    return (
        <div className="container shadow p-0 ">
            <div className="d-flex justify-content-between bg-light p-3 px-5">
                <h4 className="mt-2">Post: {idPost}</h4>
                <h4 className="mt-2">User Id: {post.userId}</h4>
            </div>
            <h3 className="bg-danger text-white p-3  px-5 text-capitalize">Title: {post.title}</h3>
            <h4 className="bg-light text-dark shadow  p-5 rounded">Body: {post.body}</h4>
        </div>
    );
};

export default PostInfoPage;