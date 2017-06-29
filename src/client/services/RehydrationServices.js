import ReduxPersist from '../config/ReduxPersist'
import { persistStore } from 'redux-persist'
import localforage from 'localforage';

const updateReducers = (store) => {
  const reducerVersion = ReduxPersist.reducerVersion
  const config = ReduxPersist.storeConfig;

  const startup = () => () => { /*console.log("Time for startup!", store.getState())*/ };

  // Check to ensure latest reducer version
    localforage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      // Purge store
      persistStore(store, config, startup).purge()
        localforage.setItem('reducerVersion', reducerVersion)
    } else {
        // console.log('should be persisting', store.getState());
        persistStore(store, config, startup(store));
    }
  }).catch(() => {
    persistStore(store, config, startup)
      localforage.setItem('reducerVersion', reducerVersion)
  })
}

export default {updateReducers}
