# Crypto Price Tracker

Full-stack project showcasing the latest and greatest in Web technologies.

- [koa](http://koajs.com) a minimal web framework relying heavily on async/await
  - [koa-router](https://www.npmjs.com/package/koa-router) for handling API routes.
  - [koa-static](https://www.npmjs.com/package/koa-static) for serving the JS/CSS/Asset folder.
  
- [redis](https://www.npmjs.com/package/redis) for caching of data/sharing it between instances and to prevent overfetching.
- [redux](https://www.npmjs.com/package/redux) for state management on the client side.
  - [redux-saga](https://www.npmjs.com/package/redux-saga) for a synchronous approach to async data fetching.
  - [redux-persist](https://www.npmjs.com/package/redux-persist) and [localforage](https://www.npmjs.com/package/localforage) for persistent data on the clientside using redux store rehydration.
  - [reduxsauce](https://www.npmjs.com/package/reduxsauce) to minimise boilerplate code.
  