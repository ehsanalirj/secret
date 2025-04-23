import { useContext } from 'react';
import { UserContext } from '../providers/UserProvider.jsx';

export function useUser() {
  return useContext(UserContext);
}
