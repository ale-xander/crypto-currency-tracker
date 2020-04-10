import React from 'react';
import './App.css';

import AppLayout from './AppLayout';
import NavBar from './NavBar';
import {AppProvider} from './AppProvider';
import Settings from '../Settings';
import Content from '../Shared/Content';


function App() {
  return (
  <AppLayout>
    <AppProvider>
      <NavBar/>
        <Content>
          <Settings />
        </Content>
    </AppProvider>
  </AppLayout>
  );
}

export default App;
