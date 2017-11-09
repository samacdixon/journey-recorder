import React from 'react';
import {render} from 'react-dom';
import 'popup/assets/styles/main.scss';
import { PORT_NAME } from 'config';

import App from './app';

import {Store} from 'react-chrome-redux';
import {Provider} from 'react-redux';

const proxyStore = new Store({
  portName: PORT_NAME,
});

render(
    <Provider store={proxyStore}><App /></Provider>
  , document.getElementById('react-app'));
