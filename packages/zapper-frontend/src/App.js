import React from 'react';
import { AppProvider } from "./contexts/AppContext";
import NavbarSection from './components/nav-section/NavbarSection';

function App(){

  return (
    <AppProvider>
      <NavbarSection/>
    </AppProvider>
  );
}

export default App;
