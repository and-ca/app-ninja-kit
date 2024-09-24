import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

//component
import ContentProvider from '@renderer/content/ContentProvider';
import App from '@renderer/App';

//state
import store from '@renderer/store/index';

//css
import '@renderer/assets/index.css';
import '@renderer/assets/main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContentProvider>
        <App />
      </ContentProvider>
    </Provider>
  </React.StrictMode>
);
