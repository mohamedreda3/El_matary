import React from 'react';
import Routes from "./Routes";
import 'react-toastify/dist/ReactToastify.css';
import 'rsuite/dist/rsuite.min.css';

// Import Scss
import './assets/scss/theme.scss';

// Fake Backend 
import fakeBackend from "./helpers/AuthType/fakeBackend";
import { ToastContainer } from 'react-toastify';
fakeBackend();



function App() {
  return (
    <React.Fragment>
      <Routes />
    </React.Fragment>
  );
}

export default App;
