import React from 'react';
import Sidebar from './Sidebar';
const Layout = ({ children }) => {
    return (
        <div >
            <Sidebar/>
            <div  class="p-4 sm:ml-64">
                {children}
            </div>
        </div>
    );
};

export default Layout;
