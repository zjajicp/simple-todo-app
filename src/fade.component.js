import React from 'react';
import { CSSTransition } from 'react-transition-group';
export const Fade = ({ children, ...props }) => (
  <CSSTransition 
    {...props}
    classNames="fade"
    timeout={250}>
    {children}
  </CSSTransition>
);