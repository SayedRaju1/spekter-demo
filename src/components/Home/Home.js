import React, { useContext, useState } from 'react';
import PostCard from '../PostCard/PostCard';
import dummyImg from '../../images/Getty.jpg'
import { PostContext } from '../../App';

const Home = () => {
    const [allPost, setAllPost] = useContext(PostContext)
    const [showForm, setShowForm] = useState(false)
    const [newPostData, setNewPostData] = useState({
        title: '',
        body: '',
        userId: 0,
    })

    const handleCreateButton = (e) => {
        e.preventDefault()
        setShowForm(!showForm)
        setNewPostData({
            title: '',
            body: '',
            userId: '',
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPostData.title === '' || newPostData.body === '') {
            alert("Please, Fill The Full Form")
        }
        else if (newPostData.userId <= 0 || !typeof newPostData.userId === 'number') {
            alert("User Id Only Takes Positive Numbers")
        }
        else {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: newPostData.title,
                    body: newPostData.body,
                    userId: newPostData.userId,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    setAllPost([json, ...allPost]);
                    console.log("Response from JSONPlaceholder Server ", json);
                    alert(
                        `ADDED !!    Post Title: ${json.title},    Post ID: ${json.id}
                    `)
                })
            setShowForm(false)

        }
    }

    const handleDelete = (postId) => {
        setAllPost(allPost.filter(post => post.id !== postId));
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'DELETE',
        });
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center p-3 mt-3">
                <h1 className="text-center">POSTS</h1>
                <button onClick={handleCreateButton} className="btn btn-primary">Create New Post</button>
            </div>

            <div className={showForm ? "d-block" : "d-none"}> {/* NEW POST FORM */}
                <form className="bg-light shadow m-2 rounded p-5">
                    <label className="form-label mt-3">Post Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newPostData.title}
                        onChange={(e) => { setNewPostData({ ...newPostData, title: e.target.value }) }}
                    />
                    <label className="form-label mt-3">Post Body</label>
                    <textarea
                        type="text"
                        className="form-control"
                        value={newPostData.body}
                        required
                        onChange={(e) => { setNewPostData({ ...newPostData, body: e.target.value }) }}
                    />
                    <label className="form-label mt-3">User ID</label>
                    <input
                        type="number"
                        className="form-control"
                        value={newPostData.userId}
                        onChange={(e) => { setNewPostData({ ...newPostData, userId: e.target.value }) }}
                    />
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-3">Submit</button>
                    <button onClick={handleCreateButton} className="btn mt-3">Cancel</button>
                </form>
            </div>

            <div className="row">  {/* ALL POST MAP */}
                {
                    allPost.map(post => <PostCard
                        dummyImg={dummyImg}
                        handleDelete={handleDelete}
                        post={post}
                        key={post.id}
                    >
                    </PostCard>)
                }
            </div>
        </div>
    );
};



export default Home;
