# Crypto Price Tracker

Full-stack project showcasing the latest and greatest in Web technologies. 

Server-side rendered React application that is pre-populated with data on the server, and rehydrates on the client-side using localstorage/WebSQL/IndexedDB. Price updates are pushed to the frontend using websockets and clients are assigned to their own node cluster using IP mapping.

- [koa](http://koajs.com) a minimal web framework relying heavily on async/await
  - [koa-router](https://www.npmjs.com/package/koa-router) for handling API routes.
  - [koa-static](https://www.npmjs.com/package/koa-static) for serving the JS/CSS/Asset folder.
  
- [redis](https://www.npmjs.com/package/redis) for caching of data/sharing it between instances and to prevent overfetching.
- [redux](https://www.npmjs.com/package/redux) for state management on the client side. also uses [seamless-immutable](https://www.npmjs.com/package/seamless-immutable) to ensure immutability
  - [redux-saga](https://www.npmjs.com/package/redux-saga) for an synchronous approach to async data fetching using generators.
  - [redux-persist](https://www.npmjs.com/package/redux-persist) and [localforage](https://www.npmjs.com/package/localforage) for persistent data on the clientside using redux store rehydration.
  - [reduxsauce](https://www.npmjs.com/package/reduxsauce) to minimise boilerplate code.
  
- [react-dom/server](https://www.npmjs.com/package/react-dom) for server-side rendering.
- [styled-components](https://www.npmjs.com/package/styled-components) reusable CSS-in-JS with easy integration for SSR.
- [socket.io](https://www.npmjs.com/package/socket.io) real-time pushing of the latest prices to the frontend using websockets.