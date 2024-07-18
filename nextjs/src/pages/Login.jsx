import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { createClient, cacheExchange, fetchExchange } from '@urql/core';
import { RiAccountPinBoxFill } from "react-icons/ri";
import { FaCopy } from "react-icons/fa";



function Login(props) {

  const [copied,setCopied]=useState(false)
  const [inputValue, setInputValue] = useState('');
  const [domains, setDomains] = useState([]);

  
  var accountAddress = localStorage.getItem("Address");

  const QueryURL="https://gateway-arbitrum.network.thegraph.com/api/120dfe3edd99b1e4c4ad181c441524e4/subgraphs/id/Fq3tBZDWJ27FM1LpKWvyP9cwuzcXPmoAimTybhVfhf76";



  const client = createClient({
    url: QueryURL,
    exchanges: [cacheExchange, fetchExchange],
  });

  const query = `
  {
    domains(where: {name: "${inputValue}"}) {
      resolvedAddress {
        id
      }
    }
  }
  `;



  let navigate = useNavigate();


  useEffect(() => {
    if(accountAddress){
      navigate('/home');
      return;
    }
   // getBalances();
 }, []);

  const getDomains = async () => {
    console.log(query)
    const { data } = await client.query(query).toPromise();

    setDomains(data.domains);
    console.log(data)

    try {
       const address  = data.domains[0].resolvedAddress.id;
       localStorage.setItem("Address",address);
      
    } catch (error) {
      alert("Incorrect Domain Name!!")
      return;
    }



    // const address  = data.domains[0].resolvedAddress.id;
    // console.log(address);
    
    navigate('/home');
  };


  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    localStorage.setItem("Name",e.target.value)

  };

  const handleSearch = () => {

    console.log('Search clicked with value:', inputValue);

    if(inputValue == ''){
      alert("Please fill the domain name!")
      return;
    }
    getDomains(); 
  };

  const handleCopy=(text)=>{
    setCopied(true)

    setTimeout(()=>{
      setCopied(false);
    },2000)
  }

  return (
    <>
  <div className='flex flex-col items-center justify-center h-screen'>
    <div className='mb-6'>
      <div className='relative flex rounded-xl border-2 border-transparent h-20 p-2 w-80 bg-slate-300 shadow-2xl bg-gradient-to-l from-purple-300 via-purple-300 to-purple-400'>
        <input
          className='flex-1 h-full px-4 text-xl  text-gray-900 bg-transparent focus:outline-none'
          type='text'
          id='myInput'
          value={inputValue}
          placeholder='Type- name.base'
          onChange={handleInputChange}
        />
        
      </div>
    </div>
    
    <button className='py-2 px-6 bg-blue-500 text-white rounded-lg shadow-lg'   onClick={handleSearch}>
      LOGIN
    </button>
  </div>
</>

  );
}

export default Login;



  


  