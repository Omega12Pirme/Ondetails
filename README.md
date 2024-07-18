![Screenshot from 2024-07-18 23-49-51](https://github.com/user-attachments/assets/657ecdb6-6784-46da-88c8-df15410c31f3)


![Screenshot from 2024-06-23 06-25-07](https://github.com/Vikash-8090-Yadav/Finder/assets/85225156/46d68b83-d9b9-4a8b-b969-b6e875472172)




Ondetails is an One place platform to get all the details of the scroll  domaains like balance, address, internal & normal txn using the Frames with the help of subgrph


# Frontend : https://ondetails.vercel.app/

# Frame: 


## The  Graph integeration 

### exsisting subgraph url:  https://thegraph.com/explorer/subgraphs/AYMzWnwmKdU7qXswBtCBKCUUTTCGLBCuurTkbDMsahUc?view=Query&chain=arbitrum-one#query-subgraph

## Query 

```
  const query = `
  {
    domains(where: {name: "${inputText}"}) {
      resolvedAddress {
        id
      }
    }
  }
  `;

```

#### The above query can be found here for the Frames : https://github.com/Omega12Pirme/Ondetails/blob/main/api/index.tsx#L109


## Frame

- Login page : Anyone can put their scroll  domain  name and get the details


![Screenshot from 2024-06-23 06-27-24](https://github.com/Vikash-8090-Yadav/Finder/assets/85225156/70945d3e-a78e-471a-aeb2-1675a27bd39e)


- Domain Name & Address: AFter Login the user will get the domain name and address associated with this with the help of subgraph


![Screenshot from 2024-06-23 06-27-55](https://github.com/Vikash-8090-Yadav/Finder/assets/85225156/b1c5a7a0-3fdd-432b-8295-c59db6f10f54)




- Balance in the frame: Any user can get the balance of the domain name

  
![Screenshot from 2024-06-23 06-28-59](https://github.com/Vikash-8090-Yadav/Finder/assets/85225156/1995cf31-9455-46db-9202-9d5676637a23)



- Normal txn hash : Any user can get the txn hash of the normal txn



![Screenshot from 2024-06-23 06-30-09](https://github.com/Vikash-8090-Yadav/Finder/assets/85225156/e239354e-2ba7-4c28-a899-68a092637866)



## Finder Dapp (webiste)

- Login page : User have to enter the domain name to enter the website

![Screenshot from 2024-06-23 06-33-59](https://github.com/Vikash-8090-Yadav/Finder/assets/85225156/2d81befa-f91e-418a-85fc-1131e83bb25e)


- Home page : This is the home page  shown after the Login

![Screenshot from 2024-06-23 06-34-46](https://github.com/Vikash-8090-Yadav/Finder/assets/85225156/e12e3932-c41b-40cb-ae22-a4489f202050)


- Normal transacttion: User can get the normal txn for this domain

![Screenshot from 2024-06-23 06-35-41](https://github.com/Vikash-8090-Yadav/Finder/assets/85225156/834de86b-edae-41e5-84f3-5363770efeac)

- User Profile: IN this section user can get the info like balance, domain name, and Logout option

![Screenshot from 2024-07-18 23-51-46](https://github.com/user-attachments/assets/a1fdd878-200a-450a-b6bf-ad3cbf97f002)


## Graph query 

```
  const query = `
  {
    domains(where: {name: "${inputValue}"}) {
      resolvedAddress {
        id
      }
    }
  }
  `;
```

You can find the above Query code here: https://github.com/Omega12Pirme/Ondetails/blob/main/nextjs/src/pages/Login.jsx#L31
