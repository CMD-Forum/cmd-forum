import * as React from 'react';

const DialogContext = React.createContext({
    isOpen: false,
    setIsOpen: () => {},
    isMounted: false,
    setIsMounted: () => {},
    closeButton: false,
});

if (process.env.NODE_ENV !== 'production') {
  DialogContext.displayName = 'DialogContext';
}

export default DialogContext;