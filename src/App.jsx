import Cart from './components/Meals/Cart.jsx';
import Checkout from './components/Meals/Checkout.jsx';
import Header from './components/Meals/Header.jsx';
import Meals from './components/Meals/Meals.jsx';
import WorkOrders from './components/WorkOrders/WorkOrders.jsx';
import Weather from './components/Weather/Weather.jsx';
import RentalManagementSidebar from './components/RentalManagementSidebar.jsx';
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';

import { useState, useEffect } from 'react';
import UseEffectExample from './components/Practice/UseEffectExample/UseEffectExample.jsx'
import UseCallbackExample from './components/Practice/UseCallbackExample/UseCallbackParent.jsx'

/* *******************************************************/
/* display logging
/* *******************************************************/
const showLogging = false;

showLogging && console.log("in App.jsx::before the App component");

function App() {
  showLogging && console.log("in App.jsx::App()::beginning");

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
        title: "Examples",
      }, 
      {
        id: 4,
        title: "Weather",
      },          
    ],
  });

  function handleClick(id) {
    showLogging && console.log("in App.jsx::App()::handleClick:beginning::id = " + id);
    setProjectsState((previousState) => {
      showLogging && console.log("in App.jsx::App()::setProjectState::beginning");
      return {
        ...previousState,
        selectedProjectId: id,
      }
    })
    showLogging && console.log("in App.jsx::App()::handleClick:end::id = " + id);
  }

  showLogging && console.log("in App.jsx::App()::before setting the content = " + projectsState.selectedProjectId);
  let content = null;
  if (projectsState.selectedProjectId === 1) {
    content = (
      <UserProgressContextProvider>
        <CartContextProvider>
          <div>
            <Header />
            <Meals />
          </div>
          <Cart />
          <Checkout />
        </CartContextProvider>
      </UserProgressContextProvider>
    );
  } else if (projectsState.selectedProjectId === 2) {
    content = (
      <UserProgressContextProvider>
        <WorkOrders/>
      </UserProgressContextProvider>
    );
  } else if (projectsState.selectedProjectId === 3) {
    content = (
      <div>
        <UseEffectExample/>
        {/* <UseCallbackExample/> */}
      </div>
    );
  } else if (projectsState.selectedProjectId === 4) {
    content = (
      <div>
        <Weather/>
      </div>
    );
  }

  showLogging && console.log("in App.jsx::App()::after setting the content = " + projectsState.selectedProjectId);

  showLogging && console.log("in App.jsx::App()::before the return = " + projectsState.selectedProjectId);
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
