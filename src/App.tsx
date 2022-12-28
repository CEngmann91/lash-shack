// Landing page with carousel
// Details of the course, when clicked shows 3 images.
// Add upcoming days/dates that are available for the selected course for the next 3 months.



import './index.scss';
import React from 'react';
import ShoppingBasketProvider from './providers/ShoppingBasketProvider';
import UserAccountProvider from './providers/AuthContextProvider';
import AppMain from './AppMain';

function App() {


  return (
    <UserAccountProvider>
      <ShoppingBasketProvider>
        <AppMain />
      </ShoppingBasketProvider>
    </UserAccountProvider>
  )
}

export default App;
