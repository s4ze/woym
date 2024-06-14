import React from 'react';
import Sidebar from './Sidebar';

function Layout ({ children, hideSidebar }) {
    return (
        <div className="flex max-w-6xl mt-4 mx-auto gap-4">
            {!hideSidebar && (<div className="w-1/4">
                <Sidebar />
            </div>)}
            <div className={hideSidebar ? "w-full" : "w-3/4"}>
                {children}
            </div>
        </div>
    );
}

export default Layout;
