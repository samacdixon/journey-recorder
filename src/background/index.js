import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import {wrapStore, alias} from 'react-chrome-redux';
import { PORT_NAME } from 'config';
import {
  promiseResponder,
  aliases,
  reducers,
} from 'state';

const store = createStore(
  reducers, 
  {},
  applyMiddleware(
    alias(aliases),
    logger,    
  )
);

wrapStore(store, {
  portName: PORT_NAME,
  dispatchResponder: promiseResponder,
});
