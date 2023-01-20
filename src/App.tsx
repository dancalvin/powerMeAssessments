import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthRoot from "./modules/Auth";
import Auth from "./modules/Auth/pages/Auth";
import CallbackPage from "./modules/Auth/pages/Callback.page";
import Logout from "./modules/Auth/pages/Logout";
import LogoutCallbackPage from "./modules/Auth/pages/LogoutCallback.page";
import MobileCallbackPage from "./modules/Auth/pages/MobileCallback.page";
import Root from "./modules/Root";
import Calculator from "./modules/Calculator/pages";
import History from "./modules/Calculator/pages/history.page";
import MenuPage from "./modules/Menu/menu.page";
import HeartFit from "./modules/HeartFit/pages";


function App() {

  const router = createBrowserRouter([
    {
      path: '', element: <MenuPage/>
    },
    {
      path: '/apps',
      element: <Root/>,
      children: [
        {path: 'calculator', element: <Calculator/>},
        {path: 'history', element: <History/>},
        {path: 'heart-fit', element: <HeartFit/>},
        // {path: 'mobile-auth-calc', element: <MobileAuthCalcPage/>}
      ]
    },
    {
      path: '/callback',
      element: <CallbackPage/>
    },
    {
      path: '/mobile-callback',
      element: <MobileCallbackPage/>
    },
    {
      path: '/logout',
      element: <LogoutCallbackPage/>
    },
    {
      path: '/auth',
      element: <AuthRoot/>,
      children: [
        {path: '', element: <Auth/>},
        {path: 'logout', element: <Logout/>}
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
