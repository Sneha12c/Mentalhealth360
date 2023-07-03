import "./main.css" 
import data from "./data.js";
import React from 'react'
import { BrowserRouter as Router,
  Routes,
  Route,Link } from "react-router-dom";

export default function main() {
  return (
    <div>
      <main>
      <div className='mentalinfo'>
         <img src="/images/p6.jpg" className='mainimg'/>
         <div className='morinfo'>
          <h1>MENTALHEALTH 360</h1>
         <h1>Happiness can be found even in the darkest of times, if one only remembers to turn on the light. 
          Mental health isn't a choice; recovery is .</h1>
         </div>
        </div>
        <h1 className="centered"> FEATURES  </h1>
        <div className='products'>
        {
          data.product.map((product) =>(
          <div className='product'>
            <img src={product.image} alt = {product.name} />
            <div className='product-info'>
            <h1>
              {product.name}
            </h1>
            <p>
              {product.description}
            </p>
            <Link to={"/publish"}>
            <button className="explore">
              Explore More
            </button>
            </Link>
            </div>
          </div>))
        }
        </div>
        </main>
    </div>
  )
}


