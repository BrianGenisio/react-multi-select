// @flow
import React from 'react';

const buttonStyles = {
    border: '1px solid #eee',
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    fontSize: 15,
    padding: '3px 10px',
};

const Button = ({
  children,
  onClick,
  style = {},
} : {
  children?: any,
  onClick?: () => void,
  style?: any,
}) => (
    <button
        style={{...buttonStyles, ...style}}
        onClick={onClick}
    >
        {children}
    </button>
);


export default Button;
