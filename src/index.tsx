import { AuthProvider } from './contexts/AuthContext';
import { MediaProvider } from './contexts/MediaContext';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/App';

const rootElem = document.getElementById('root');
render(
  <BrowserRouter>
    <AuthProvider>
      <MediaProvider>
        <App />
      </MediaProvider>
    </AuthProvider>
  </BrowserRouter>,
  rootElem
);
