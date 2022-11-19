import React from 'react';
import { AppProvider } from "./contexts/AppContext";
import NavbarSection from './components/nav-section/NavbarSection';
import OptionPanel from './components/body-section/OptionPanel';

function App(){

  return (
    <AppProvider>
      <NavbarSection/>
      <OptionPanel/>
    </AppProvider>
  );
}

export default App;
