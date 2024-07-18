
![Screenshot from 2024-07-18 23-53-57](https://github.com/user-attachments/assets/70abf732-c796-406b-b442-6186bd0622aa)




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


![Screenshot from 2024-07-18 23-56-42](https://github.com/user-attachments/assets/5178f624-1c4c-4864-bf82-79aebb031d81)


- Domain Name & Address: AFter Login the user will get the domain name and address associated with this with the help of subgraph

![Screenshot from 2024-07-18 23-57-09](https://github.com/user-attachments/assets/2e07a975-adce-4068-a554-e65c98fd43ed)



- Balance in the frame: Any user can get the balance of the domain name

  
![Screenshot from 2024-07-18 23-57-33](https://github.com/user-attachments/assets/8f0285ab-cc3d-4f21-af76-a67b978973ac)



- Normal txn hash : Any user can get the txn hash of the normal txn



![Screenshot from 2024-07-18 23-58-09](https://github.com/user-attachments/assets/9394b5c4-adae-42a6-a4a5-2566f3cb9b9d)



## Finder Dapp (webiste)

- Login page : User have to enter the domain name to enter the website

![Screenshot from 2024-07-18 23-58-29](https://github.com/user-attachments/assets/68859485-6d6a-431e-a351-b78e946b9098)


- Home page : This is the home page  shown after the Login

![Screenshot from 2024-07-18 23-58-50](https://github.com/user-attachments/assets/e6e359bd-8b82-474a-b02c-5fe00642eb79)


- Normal transacttion: User can get the normal txn for this domain

![Screenshot from 2024-07-18 23-59-06](https://github.com/user-attachments/assets/22e3bbb2-da08-4dd3-be1e-a5453fa9059c)

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
