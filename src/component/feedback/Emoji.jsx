import './emoji.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Emoji() {


     
  const [data, setData] = useState(0);
  const [emoji, setEmoji] = useState('');
  const [otp, setOTP] = useState('');

  useEffect(() => {
    if (data == 0) {
      setEmoji("😔");
    } else if (data == 10) {
      setEmoji("🙂");
    } else if (data == 20) {
      setEmoji("😆");
    } else if (data == 30) {
      setEmoji("🤣");
    } else if (data == 40) {
      setEmoji("😉");
    } else if (data == 50) {
      setEmoji("😊");
    } else if (data == 60) {
      setEmoji("😇");
    } else if (data == 70) {
      setEmoji("🥰");
    } else if (data == 80) {
      setEmoji("🤩");
    } else if (data == 90) {
      setEmoji("😇");
    } else if (data == 100) {
      setEmoji("😇");
    }
  }, [data]);
 
  const handleSubmit = () => {
    // Make an HTTP request to your backend endpoint to store the data
    axios.post("/api/storeData", { otp, data })
      .then(response => {
        console.log("Data stored successfully!");
        // Do something with the response if needed
      })
      .catch(error => {
        console.error("Error storing data:", error);
        // Handle the error
      });
  };

  return (
    <div className='mainBox'>
      {/* <div className='emojiContainer' style={{display:'flex'}}>
        <h1 className='emoji1' style={{ fontSize: '100px' }}>{emoji}</h1>
        <h1 className='emoji2' style={{ fontSize: '50px' }}>{emoji}</h1>
        <h1 className='emoji3' style={{ fontSize: '40px' }}>{emoji}</h1>
        <h1 className='emoji4' style={{ fontSize: '60px' }}>{emoji}</h1>
        <h1 className='emoji5' style={{ fontSize: '30px' }}>{emoji}</h1>
        <h1 className='emoji6' style={{ fontSize: '40px' }}>{emoji}</h1>
        <h1 className='emoji7' style={{ fontSize: '70px' }}>{emoji}</h1>
        <h1 className='emoji8' style={{ fontSize: '50px' }}>{emoji}</h1>
        <h1 className='emoji9' style={{ fontSize: '40px' }}>{emoji}</h1>
        <h1 className='emoji10' style={{ fontSize: '30px' }}>{emoji}</h1>
      </div> */}

      <div className='content'>
        <input  className="i nput1" type="text" placeholder="Enter OTP" value={otp} onChange={e => setOTP(e.target.value)} />
        <button  onClick={handleSubmit}>Submit</button>
        <h1>{emoji}</h1>
        <input
          className={data > 50 ? 'high' : 'less'}
          type="range"
          min="0"
          max="100"
          step="10"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <h1>{data}</h1>
      </div>
    </div>
  );
}
