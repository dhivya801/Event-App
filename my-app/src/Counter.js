import React from 'react';
import { useState } from 'react';
import './Counter.css';
function Counter(props){
  return(
    <div>
      <h3>Subjects Array:</h3>
      <div style={{ 
        border: "2px solid #333", 
        borderRadius: "8px", 
        padding: "20px",
        backgroundColor: "#f9f9f9",
        marginBottom: "20px"
      }}>
        <ul style={{ fontSize: "16px", lineHeight: "1.8", margin: "0", paddingLeft: "20px" }}>
          {props.data.map((item,index)=>(
            <li key={index} style={{ marginBottom: "10px" }}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Counter;