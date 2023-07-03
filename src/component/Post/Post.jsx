import "./Post.css"
import {formatISO9075} from "date-fns";
import React from 'react'
import { Link } from "react-router-dom"

export default function Post({ _id , title,cover,content , createdAt , author}) {
  return (
    <div className="post">
      <Link to = {`/post/${_id}`}>
      <img src={'http://localhost:4000/'+cover} alt=""/>
      </Link>
     <div className="postInfo">
     <Link to = {`/post/${_id}`}>
        <span className="Tittle">{title}</span>
        </Link>
        <hr/>
        <div className="Cards">
        <a >
          {author.username}
        </a>
          <time>{formatISO9075(new Date(createdAt) , 'MMM d, yyyy HH:mm')}</time>
        </div>
     </div>
     <div className="contentpart" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
  )
}



