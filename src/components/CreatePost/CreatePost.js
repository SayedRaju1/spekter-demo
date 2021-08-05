import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PostContext } from '../../App';

const CreatePost = () => {
    const history = useHistory()
    const [allPost, setAllPost] = useContext(PostContext)
    const [newPostData, setNewPostData] = useState({
        title: '',
        body: '',
        userId: '',
    })

    const handleSubmit = (e) => {

        e.preventDefault();
        if (newPostData.title === '' || newPostData.body === '' || newPostData.userId <= 0) {
            alert("Please, Fill The Full Form")
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

                    console.log("Response from JSONPlaceholder Server ", json);
                    console.log(allPost)
                    alert(
                        `ADDED !!    Post Title: ${json.title},    Post ID: ${json.id}
                    `)
                    history.push("/")
                })


        }

    }
    return (
        <div>
            <form>
                <label className="form-label">Post Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={newPostData.title}
                    onChange={(e) => { setNewPostData({ ...newPostData, title: e.target.value }) }}
                />
                <label className="form-label">Post Body</label>
                <input
                    type="text"
                    className="form-control"
                    value={newPostData.body}
                    required
                    onChange={(e) => { setNewPostData({ ...newPostData, body: e.target.value }) }}
                />
                <label className="form-label">User ID</label>
                <input
                    type="number"
                    className="form-control"
                    value={newPostData.userId}
                    onChange={(e) => { setNewPostData({ ...newPostData, userId: e.target.value }) }}
                />
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                <button className="btn">Cancel</button>
            </form>
        </div>
    );
};

export default CreatePost;