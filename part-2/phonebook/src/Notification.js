import React from 'react';

const Notification = ({ error, info }) => {
  if (!error && !info) return null;

  return <div className={error ? 'error' : 'info'}>{error ? error : info}</div>;
};

export default Notification;
