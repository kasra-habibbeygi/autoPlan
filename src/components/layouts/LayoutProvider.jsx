import React from 'react';

//assets
import { LayoutProviderStyle } from './LayoutProvider.style';

//components
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideBar from './Sidebar';

const LayoutProvider = () => {
   return (
      <>
         <Header />
         <LayoutProviderStyle>
            <SideBar />
            <div className="content">
               hi
               <Outlet />
            </div>
         </LayoutProviderStyle>
      </>
   );
};

export default LayoutProvider;
