import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import WorkOrders from './components/WorkOrders.jsx';
import Payouts from './components/Payouts.jsx';
import RentalManagementSidebar from './components/RentalManagementSidebar.jsx';
import Reservation from './components/Reservation.jsx';
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';

import { useState, useEffect } from 'react';

console.log("in App.jsx::before the App component");

function App() {
  console.log("in App.jsx::App()::beginning");

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: 1,
    projects: [
      {
        id: 1,
        title: "Reservations",
      },
      {
        id: 2,
        title: "Work Orders",
      },
      {
        id: 3,
        title: "Payouts",
      },      
    ],
  });

  function handleClick(id) {
    console.log("in App.jsx::App()::handleClick:beginning::id = " + id);
    setProjectsState((previousState) => {
      console.log("in App.jsx::App()::setProjectState::beginning");
      return {
        ...previousState,
        selectedProjectId: id,
      }
    })
    console.log("in App.jsx::App()::handleClick:end::id = " + id);
  }

  console.log("in App.jsx::App()::before setting the content = " + projectsState.selectedProjectId);
  let content = null;
  if (projectsState.selectedProjectId === 1) {
    content = (<UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
        <Reservation />
      </CartContextProvider>
    </UserProgressContextProvider>);
  } else if (projectsState.selectedProjectId === 2) {
    content = (<WorkOrders/>);
  } else if (projectsState.selectedProjectId === 3) {
    content = (<Payouts/>);
  }
  console.log("in App.jsx::App()::after setting the content = " + projectsState.selectedProjectId);

  console.log("in App.jsx::App()::before the return = " + projectsState.selectedProjectId);
  return (
    <div className="control-row">
      <RentalManagementSidebar 
          projects={projectsState.projects} 
          selectedProjectId={projectsState.selectedProjectId}
          handleClick={handleClick}
      />
      {content}
    </div>
  );
}

export default App;
