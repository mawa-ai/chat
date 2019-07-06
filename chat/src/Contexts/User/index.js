import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = props => {
    const { value, ...otherProps } = props;

    const [user, setUser] = useState(value);
    const mergeUser = newUser => setUser(p => ({ ...p, ...newUser }));
 
    return <UserContext.Provider {...otherProps} value={{ user, setUser: mergeUser }} />
};