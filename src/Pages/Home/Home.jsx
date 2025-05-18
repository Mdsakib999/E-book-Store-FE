import React, { useEffect } from 'react';

const Home = () => {
  
  useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);


  return (
    <div>
      <p>hi</p>
    </div>
  );
};

export default Home;