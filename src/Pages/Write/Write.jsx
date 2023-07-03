import "./write.css";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import {useState} from "react";
import {Navigate} from "react-router-dom";

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

export default function Write() {
   const [title , setTitle] = useState('');
   const [content , setContent] = useState('');
   const [files, setFiles] = useState('');
   const [redirect , setRedirect] = useState('false');
   async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    // if (response.ok) {
    //   setRedirect(true);
    // }
  }
  const handleChange = (value) => {
    setContent(value);
  };
  // if (redirect) {
  //   return <Navigate to={'/'} />
  // }

  return (
    <div className="write">
        <img src="./images/p3.png" alt="" className="writeimg"/>
      <form className="writeform" enctype="multipart/form-data" >
        <div className="writegrp">
         <label htmlFor="fileInput">
         <i className="icon fa-solid fa-circle-plus"></i>
         </label>
         <input type="text" placeholder="Title" className="writeinput" autoFocus={true}
         value={title}
         onChange={ev => setTitle(ev.target.value)}/>
            </div>
         <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
        <div style= {{marginleft: '150px', width : '100%' , height : '60%'}}>
          {/* <textarea
          placeholder="Tell your thoughts on mental health ... "
          type="text"
          className="writeinput"
          ></textarea> */}
          <ReactQuill value={content}
          onChange={handleChange}
          modules={modules}
          />
        </div>
        <button className="Submit" onClick={createNewPost}>Publish</button>
      </form>
    </div>
  );
}

