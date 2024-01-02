// _app.js

import React from 'react';
import '../styles/globals.css'; // Your global styles

function MyApp({ Component, pageProps }) {
  // Custom logic or providers can be added here

  return <Component {...pageProps} />;
}

export default MyApp;
