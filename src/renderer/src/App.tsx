import { HelmetProvider } from 'react-helmet-async';
import { HashRouter as Router } from 'react-router-dom';

import RenderRoutes from '@renderer/config/routes';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Router>
        <RenderRoutes />
      </Router>
    </HelmetProvider>
  );
}

export default App;
