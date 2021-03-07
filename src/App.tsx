import React from 'react';
import Home from './pages/home'
import { LocationProvider } from './contexts/LocationContext'

function App() {
  return (<>
    <LocationProvider>
      <Home />
    </LocationProvider>
  </>)
}

export default App;
