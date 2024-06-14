import React from 'react';
import Sidebar from './Sidebar';

function Layout ({ children }) {
    return (
        <div className="flex max-w-6xl mt-4 mx-auto gap-4">
            <div className="w-1/4">
                <Sidebar />
            </div>
            <div className="w-3/4">
                {children}
            </div>
        </div>
    );
}

export default Layout;
