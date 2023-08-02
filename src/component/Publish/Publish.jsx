import "./Publish.css"
import { Link } from "react-router-dom"
import React from 'react'
import {useEffect, useState} from "react";
import Post from "../Post/Post"

export default function Publish() {
  const [posts,setPosts] = useState([]);
  const [firstPostId, setFirstPostId] = useState('');
  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
        if (posts.length > 0) {
          setFirstPostId(posts[0]._id);
        }
      });
    });
  }, []);
  return (
    <div className="poster">
      <div className="buttons">
      <Link to={`/post/${firstPostId}`}>
      <button className="special">Let's read a single post</button>
     </Link>
     <Link to="/write">
      <button className="special">Want to share your thoughts</button>
     </Link>
      </div>
     <div className="posts">
     {posts.length > 0 && posts.map(post => (
        <Post {...post} />
     ))}
     </div>
    </div>
  )
}
