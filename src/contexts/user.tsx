import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { useStorage } from '../utils/hooks/useStorage';

interface User {
  name: string;
  email: string;
}

interface UserProps {
  children: ReactNode;
}

type AuthenticationScreen = 'SIGN_IN' | 'SIGN_UP' | 'SIGN_OUT';

interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
  authenticationScreen: AuthenticationScreen;
  setAuthenticationScreen: (authenticationScreen: AuthenticationScreen) => void;
}

const UserContext = createContext({} as UserContextProps);

export function UserContextProvider({ children }: UserProps) {
  const userStorage = useStorage<User>('user');
  const [user, setUser] = useState<User>();
  const [authenticationScreen, setAuthenticationScreen] =
    useState<AuthenticationScreen>('SIGN_IN');

  useEffect(() => {
    const storageUser = userStorage.find();
    if (storageUser) {
      setUser(storageUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      userStorage.save(user, 24);
      setAuthenticationScreen('SIGN_OUT');
    } else {
      userStorage.remove();
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        authenticationScreen,
        setAuthenticationScreen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const user = useContext(UserContext);
  return user;
}
