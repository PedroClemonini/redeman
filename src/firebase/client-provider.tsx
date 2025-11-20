'use client';

import React, { useMemo, useEffect, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useUser } from '@/firebase/provider';
import { SidebarProvider } from '@/components/ui/sidebar';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

function AuthGate({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const auth = useMemo(() => initializeFirebase().auth, []);

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-lg font-semibold text-muted-foreground">
          Loading...
        </div>
      </div>
    );
  }

  return <div className="relative flex min-h-screen">{children}</div>;
}


export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    return initializeFirebase();
  }, []); 

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      <AuthGate>
        {children}
      </AuthGate>
    </FirebaseProvider>
  );
}
