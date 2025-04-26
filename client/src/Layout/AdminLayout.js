import React from 'react';



const Layout = ({ children }) => {
  return (
    <div className="layout-container">
     
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;