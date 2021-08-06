import React from 'react';
import './PostCard.css'
import { Link } from 'react-router-dom';

const PostCard = ({ post, dummyImg, handleDelete }) => {
    return (
        <div className="col-md-4 col-lg-3 col-sm-6 my-2 p-3 ">
            <Link className="text-decoration-none text-reset " to={"/post/" + post.id}>
                <img className="w-100 rounded-top" src={dummyImg}
                    alt="Avatar" ></img>
                <div className="post-card p-2 rounded-bottom">
                    <div className="container" style={{ overflow: "hidden" }}>
                        <h6 className="text-capitalize">#{post.id}<br />{post.title}</h6>
                    </div>
                </div>
            </Link>
            <button
                onClick={() => handleDelete(post.id)}
                className="btn w-100 my-3 btn-danger"
            >
                Delete
            </button>
        </div>
    );
};

export default PostCard;