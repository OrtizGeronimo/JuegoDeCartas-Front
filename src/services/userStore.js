import { useLayoutEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { User, getCurrentUser } from '../services/userService';

let currentUser;

const userSubject = new Subject();

export function useSessionUser() {
  const [user, setUser] = useState(currentUser);

  useLayoutEffect(() => {
    const subscription = userSubject.subscribe((newState) => {
      setUser(newState);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return user;
}


export function setCurrentUser(user) {
  currentUser = user;
  userSubject.next(currentUser);
}

export function cleanupCurrentUser() {
  currentUser = undefined;
  userSubject.next(currentUser);
}
 