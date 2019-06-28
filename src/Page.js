import React from 'react';
import { withRouter } from 'react-router-dom';

const Page = ({ children, location: { state } }) => (
  <div
    className={`page ${
      state && state.direction ? `slide-${state.direction}` : ''
    }`}
  >
    <div className="page__inner">{children}</div>
  </div>
);

export default withRouter(Page);
