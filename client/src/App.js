import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


var containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 24,
  height: '100vh',
}

var divStyle = {
  margin: 24,
}

var imgStyle = {
  maxHeight: 200,
}

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/frames')//2
      .then(res => res.json())//3
      .then(data => setImages(data))//4
      .catch(error => console.log(error));
  }, [])

  return (
    <div className="App" style={containerStyle}>
      <div>test</div>
      {
        !images ? null : images.map((image, i) => {
          return (
            <div key={i} style={divStyle}>
              <img src={image.url} style={imgStyle} />
              <p>{image.name}</p>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
