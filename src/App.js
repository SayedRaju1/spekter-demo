import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import PostInfoPage from './components/PostInfoPage/PostInfoPage';
import NoMatch from './components/NoMatch/NoMatch';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export const PostContext = createContext();

function App() {
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    if (allPost.length === 0) {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => {
          setAllPost(data)
          console.log(data);
        })
    }
  }, [])

  return (
    <PostContext.Provider value={[allPost, setAllPost]}>
      <Router>
        <Switch>
          <Route path="/post/:idPost" component={PostInfoPage} />
          <Route path="/home" component={Home} />
          <Route expect path="/" component={Home} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    </PostContext.Provider>
  );
}

export default App;
