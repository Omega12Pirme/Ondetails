import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { pinata } from 'frog/hubs'
import { neynar } from 'frog/middlewares'
import { serveStatic } from 'frog/serve-static'
import { handle } from 'frog/vercel'
import { createClient, cacheExchange, fetchExchange } from '@urql/core';
import React, { useState, useEffect } from 'react';

//  9934f29d58e566ad4831b5b7ce3fa39a -> API key for the   BASE
// Base url https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/Fq3tBZDWJ27FM1LpKWvyP9cwuzcXPmoAimTybhVfhf76



// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }



let address: string | null = null;

let balance: Number | null = null;

export const app = new Frog({
  basePath: '/api',
  // Supply a Hub API URL to enable frame verification.
  hub: pinata(),
}).use(
  neynar({
    apiKey: 'NEYNAR_FROG_FM',
    features: ['interactor', 'cast'],
  })
)

app.frame('/', (c) => {
  
  
  const { buttonValue, inputText, status } = c

  

  // return c.error({ message: "Please like and recast..." });


  const fruit = inputText || buttonValue
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
            : 'Welcome  to Ondetails, Get Domain Activity !'}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Please enter the  .scroll domain" />,
      <Button action='/domain'>Get Started</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
    
  })
})



app.frame('/domain', async(c) => {
  const { buttonValue, inputText, status } = c;

  console.log("The input is ", inputText);

  const QueryURL = "https://gateway-arbitrum.network.thegraph.com/api/120dfe3edd99b1e4c4ad181c441524e4/subgraphs/id/AYMzWnwmKdU7qXswBtCBKCUUTTCGLBCuurTkbDMsahUc";

  const client = createClient({
    url: QueryURL,
  });

  const query = `
  {
    domains(where: {name: "${inputText}"}) {
      resolvedAddress {
        id
      }
    }
  }
  `;


  try {
    const response = await client.query(query).toPromise();
    if (response.error) {
      console.error("Error in query response:", response.error);
      throw new Error("Query failed");
    }
    const { data } = response;
    // console.log(data.domains[0].resolvedAddress.id);

    address  = data.domains[0].resolvedAddress.id;

  } catch (error) {
    console.error("Error during GraphQL query:", error);
  }

  console.log("The address is",address);

  const fruit = inputText || buttonValue;
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `${fruit ? `Name: ${fruit}` : ''}`
            : 'Welcome!'}
        </div>
        {status === 'response' && address && (
          <div
            style={{
              color: 'white',
              fontSize: 40,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              lineHeight: 1.4,
              marginTop: 10,
              padding: '0 120px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {`Address: ${address}`}
          </div>
        )}
      </div>
    ),
    intents: [
      <Button action='/ntxn'>Transaction</Button>,
      <Button action='/balance'>Get Balance</Button>,
      <Button.Link href="https://ondetails.vercel.app/">Visit Dapp</Button.Link>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});


app.frame('/balance', async (c) => {
  const { buttonValue, inputText, status } = c


  console.log("The input is ",inputText);

  

  const response = await fetch(
    `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=XRSB1DE9127BU2S22MC5ZXEWCFZXZKWBD8`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
  if(data.result === 'Max rate limit reached'){
    console.log("here")
    return
  }

  balance = (Number(data.result)/10**18);


  const fruit = inputText || buttonValue
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `The Balance is ${balance ? ` ${balance} ETH ` : ''}`
            : 'Welcome!'}
        </div>
      </div>
    ),
    intents: [
     
      <Button action='/ntxn'>Transaction</Button>,
      <Button.Link href="https://finder-five-beta.vercel.app/">Visit Dapp</Button.Link>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})


app.frame('/ntxn', async (c) => {
  const { buttonValue, inputText, status } = c;


  let transactions;

  try {
    if(address)
    {const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=XRSB1DE9127BU2S22MC5ZXEWCFZXZKWBD8`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);
    transactions = await data.result;

    if(data.result === 'Max rate limit reached'){
      console.log("here")
      return
    }
}
  } catch (error) {
    console.error('Error fetching data:', error);
  }


  transactions.forEach(transaction => {
    console.log('Transaction Hash:', transaction.hash);
  });


  // console.log("The tranasaction is",transactions['hash']);

  // const transactions = [
  //   { id: 1, fruit: 'Apple', eth: 0.25 },
  //   { id: 2, fruit: 'Banana', eth: 0.15 },
  //   { id: 3, fruit: 'Cherry', eth: 0.35 },
  //   { id: 4, fruit: 'Date', eth: 0.45 },
  //   { id: 5, fruit: 'Elderberry', eth: 0.05 }
  // ];

  const fruit = inputText || buttonValue;

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'white',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >

<div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? "NORMAL TXN HASH"
            : 'Welcome!'}
        </div>



       {
  transactions.slice(0, 7).map((transaction, index) => (
    <div
      key={index} // You might need to use a unique key if 'id' is not available
      style={{
        color: 'white',
        fontSize: 40,
        fontStyle: 'normal',
        letterSpacing: '-0.0025em',
        lineHeight: 1.4,
        marginTop: 5,
        padding: '0 10px',
        whiteSpace: 'pre-wrap',
      }}
    >
      {status === 'response'
        ? ` ${transaction.hash.slice(0, 49) || 'No hash available'}`
        : 'Welcome!'}
    </div>
  ))
}
      </div>
    ),
    intents: [
      <Button.Link href="https://finder-five-beta.vercel.app/">Visit Dapp</Button.Link>,
    ].filter(Boolean),
  });
});



// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
