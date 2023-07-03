import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import ReactQuill from "react-quill";
import React from 'react';
import "./edit.css";

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);
  const [cover , setCover] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
        });
      });
  }, []);
  async function editPost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('content', content);
    data.set('id', id);
    if (files && files.length>0) {
      data.set('file', files[0]);
    }
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  const handleChange = (value) => {
    setContent(value);
  };
  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (
    <form onSubmit={editPost} className="edit_post">
      <input type="title" className="writeinput"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="file" className="writeinput"
             onChange={ev => setFiles(ev.target.files)} />
       <ReactQuill value={content}
          style={{marginleft: '150px', width : '90%' , height : '60%'}}
          onChange={handleChange}
          modules={modules}
          />
      <button className="editpart" >Update post</button>
    </form>
  );
}