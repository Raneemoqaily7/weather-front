import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBInput, 
  MDBInputGroup,
} from 'mdb-react-ui-kit';


function MapComponent() {
  const [mapHtml, setMapHtml] = useState('');
  const [tem ,setTemp] = useState('')
  const [showCard ,setShowCard] =useState(false)
  const [inputValue ,setInputValue] =useState('')
  const[text ,setText] =useState('')
  const [options,setOptions] =useState([])
  


  axios.get ("http://127.0.0.1:8000/api/countries/")
  .then((res)=>{
    console.log(res.data,"ressssssssssssssss")
    setOptions(res.data)
    // setOptions(res)
  }).catch((err)=>{
    console.log(err)
  })


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/index/')
      .then((res)=>{
//         console.log(res.data ,"dataaaaaa"); // Check the entire response data
//         console.log(res.data.res,"darasss");
//         console.log(res.data.res.current,"current");
//         console.log(res.data.res.current.temp_c,"temp_c before");
      
// console.log(res.data.map ,"resss")
setMapHtml(res.data.map)


// console.log(res.data.res.current.temp_c,"after")
// setTemp(res.data.res.current.temp_c)

      })
      
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
const handleInputChange =(e)=>{
  setInputValue(e.target.value)

}
  const searchHandler =()=>{
    
    
   
    // const body = {
    //   data: {
    //     "address": inputValue
    //   }
    // }

    axios.post("http://127.0.0.1:8000/api/add/",{"address":inputValue})
  
    .then ((res) =>{

      axios.get ("http://127.0.0.1:8000/api/index/")
      .then((res)=>{
       
        setTemp(res.data.res.current.temp_c)
        setText(res.data.res.current.condition.text)
        setShowCard(true)
  
         }).catch((err)=>{
        console.log(err ,"errror")
      })
      
      



    })
   
   

      
  }
  

  return(
    <>
 
    <div dangerouslySetInnerHTML={{ __html: mapHtml }}></div>
    <div></div>
    <select value={inputValue} onChange={handleInputChange} on>
    <option value="">Select Country</option>
        {options.map((country, index) => (
          <option key={index} value={country}>{country}</option>
        ))}
      </select>
    
    <div className="d-flex">
    <MDBInput
        label="Search"
        value={inputValue}
        onChange={handleInputChange}
        className="me-2"
      />
      <MDBBtn onClick={searchHandler}>Search</MDBBtn>
    </div>


    {showCard && (
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>Card title</MDBCardTitle>
            <MDBCardText>
              {tem} {text}
            </MDBCardText>
            <MDBBtn>Button</MDBBtn>
          </MDBCardBody>
        </MDBCard>)}
   

  
    </>
  );
}

export default MapComponent;
