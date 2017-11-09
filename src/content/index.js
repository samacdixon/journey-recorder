import React from 'react';
import { render } from 'react-dom';
import ShadowDOM from 'react-shadow';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import { PORT_NAME } from 'config';

import App from './app/';

const proxyStore = new Store({ portName: PORT_NAME });
const assets = [
  chrome.extension.getURL('assets/styles/content.css'),
];

const anchor = document.createElement('div');
anchor.id = 'jr-anchor';
anchor.className = 'extension-widget-' + chrome.runtime.id;
document.body.insertBefore(anchor, document.body.childNodes[0]);

render(
    <ShadowDOM include={assets}>
      <div id='jr-shadow-dom'>
        <Provider store={proxyStore}>
          <App />
        </Provider>
      </div>
    </ShadowDOM>
  , anchor);
