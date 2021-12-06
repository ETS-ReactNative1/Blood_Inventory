# Blood_Inventory
Blood_Inventory is a mobile React native application that allow it's user to manages his stock per city.

## Pre-requisites

- docker
- docker-compose

You don’t need to install NPM or any other package, as both are provided by Docker images.

## Steps To Run The Application Using Docker

- clone this repository using :

```
git clone https://github.com/Nabilbentamer/Blood_Inventory.git
cd Blood_Inventory
```

- Make sure Your are in the root folder which look like this: 

![Root-folder](https://i.imgur.com/QM1FhQv.png)

- Now Let's Setup Our Environnement Variable: (Go to Blood-inventory-frontEnd)

```
cd Blood-inventory-frontEnd 
code . 
```

Note: I'm using Visual Studio Code that's why i used 'code .' though you can open this folder with any editor. 

- Go to env.js file and change the base_url to you local Address:

```
export const BASE_URL='http://192.168.43.221:3000'; <== This is 'http://MyLocalAddress:3000'

```
The env.js should look Like this for your Case: 

```
export const BASE_URL='http://YourLocalAddress:3000'; <== This is your file should look like. 

```

### How To find your Local Address ip: 

- Type ipconfig into the Command prompt:  

```
ipconfig 

```
- Find your IP address by finding 'IPv4' inside The network you're connected to, Here is an example: 

![LocalAddressIp](https://i.imgur.com/KTgpCRx.png)

I'm conneced to the Network Wifi-3 that has as IPv4 the following ip: 192.168.43.221.(copy your LocalAddress Now) 

- Grab Your LocalAddress ip and go Back to env.js  file (inside Blood-inventory-frontEnd folder) and changed to Your Address.
- Go to Dockerfile (inside Blood-inventory-frontEnd folder) and change the REACT_NATIVE_PACKAGER_HOSTNAME env to your Address
 
 From: 
 
 ```
ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.168.43.221"

```

To: 

 ```
ENV REACT_NATIVE_PACKAGER_HOSTNAME="YourLocalAddress"

```

Now Your are All set, Run the following commande insde the root directory (inside Blood_Inventory that has docker-compose.yml)

 ```
docker-compose up

```
And Voilà. We're currenly running our Application inside Container using Docker. 


