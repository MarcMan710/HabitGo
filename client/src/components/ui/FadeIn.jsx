import React from 'react';

const FadeIn = ({ children, duration = '500ms' }) => {
  const style = {
    animation: `fadeIn ${duration} ease-out forwards`,
  };

  return (
    <div style={style}>
      {children}
    </div>
  );
};

export default FadeIn;


