import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import PostInfoPage from './components/PostInfoPage/PostInfoPage';
import NoMatch from './components/NoMatch/NoMatch';
import { createContext, useEffect, useState } from 'react';
import { fetchPost } from './redux/actions';
import { connect } from 'react-redux';

export const PostContext = createContext();


function App({ postData, fetchPost }) {
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  useEffect(() => {
    setAllPost(postData.posts)
  }, [postData])

  return (
    <PostContext.Provider value={[allPost, setAllPost]}>
      <Router>
        <Switch>
          <Route path="/post/:idPost" component={PostInfoPage} />
          <Route path="/home" component={Home} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    </PostContext.Provider>
  );
}

const mapStateToProps = state => {
  return {
    postData: state.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: () => dispatch(fetchPost())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
