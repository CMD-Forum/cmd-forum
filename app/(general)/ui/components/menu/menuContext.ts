import * as React from 'react';

const MenuContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  MenuContext.displayName = 'MenuContext';
}

export default MenuContext;