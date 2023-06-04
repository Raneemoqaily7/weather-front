import React, { useEffect, useState } from 'react';
import axios from "axios";


function MapComponent() {
  const [mapHtml, setMapHtml] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/index/')
      .then((res)=>{
console.log(res.data.map ,"resss")
setMapHtml(res.data.map)
      })
      
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return(
    <>
    <div dangerouslySetInnerHTML={{ __html: mapHtml }}></div>
  
    </>
  );
}

export default MapComponent;
