import React from 'react';
import KeyGen1 from './KeyGen1';
import KeyGen2 from './KeyGen2';
import KeyGen3 from './KeyGen3';
import Sign1 from './Sign1';
import Sign2 from './Sign2';
import { useState } from 'react';
import Routing from './routes';

function App() {
    const [res, setres] = useState("")
    const [res1, setres1] = useState("")
    const [inputValue, setInputValue] = useState('');
    const [inputValue1, setInputValue1] = useState('');

//   const nextApiFunc = async () => {
//     fetch('http://localhost:3001/getKeyFile', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         "Access-Control-Allow-Headers": "*",
//         "Access-Control-Allow-Origin": "*",
//       }
//     })
//       .then(response => response.json()).then(data => {
//         // Do something with the response data
//         setres(data)
//         console.log(data);
//       });
//   }

//   const handleButtonClick = () => {
//     fetch('http://localhost:3001/keygen3', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         "Access-Control-Allow-Headers": "*",
//         "Access-Control-Allow-Origin": "*",
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         // Do something with the response data
//         console.log(data);
//         setTimeout(() => {
//             nextApiFunc()
//         }, 5000);
//       })
//       .catch(error => {
//         // Handle any errors that occur during the API request
//         console.error(error);
//       });
//   };
  // const handleButtonClick1 = () => {
  //   fetch('http://localhost:3001/Sign2', {
  //     method: 'POST',
  //     body: JSON.stringify({message:inputValue1}),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "Access-Control-Allow-Headers": "*",
  //       "Access-Control-Allow-Origin": "*",
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       // Do something with the response data
  //       setres1(data);
  //       console.log(data);
  //     })
  //     .catch(error => {
  //       // Handle any errors that occur during the API request
  //       console.error(error);
  //     });
  // };
  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };
  // const handleInputChange1 = (event) => {
  //   setInputValue1(event.target.value);
  // };
    return (
//     <><div style={{display: "flex", gap:"100px", margin:"20px"}}>
//       <KeyGen1 res={res} />
//       {/* <KeyGen2 res={res} /> */}
//       {/* <KeyGen3 res={res} handleButtonClick={handleButtonClick} /> */}
//     </div>
//     <div style={{display: "flex", gap:"100px", margin:"20px"}}>
//     <Sign1 res={res1} inputValue={inputValue} handleInputChange={handleInputChange} />
//     {/* <Sign2 res={res1} inputValue={inputValue1} handleInputChange={handleInputChange1} handleButtonClick={handleButtonClick1}/> */}
//   </div></>
<>
<Routing/></>
  );
}
export default App;