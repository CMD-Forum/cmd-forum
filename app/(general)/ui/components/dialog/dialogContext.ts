import * as React from 'react';

const DialogContext = React.createContext({
    isOpen: false,
    setIsOpen: () => {},
    isMounted: false,
    setIsMounted: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  DialogContext.displayName = 'DialogContext';
}

export default DialogContext;