
'use client';

import React, { useMemo, useEffect, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useUser } from '@/firebase/provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { seedAgencias } from '@/lib/seed-db';
import { seedUsers } from '@/lib/seed-users';
import { registeredSites } from '@/lib/registered-sites';
import { unifiedTasks } from '@/lib/tasks-data';


// Automatically mark planning tasks as complete for sites that are past that stage.
function prefillCompletedTasks() {
  const planningTasks = unifiedTasks.filter(task => task.phase === 'planejamento');

  registeredSites.forEach(site => {
    // Check if the site has a preparation or migration date, indicating planning is complete.
    const isPlanningComplete = site.preparacao?.date || site.migracao?.date;

    if (isPlanningComplete) {
      const storageKey = `tasks-${site.id}`;
      
      // Avoid overwriting existing completed tasks.
      const existingData = localStorage.getItem(storageKey);
      const completedSet = existingData ? new Set(JSON.parse(existingData)) : new Set();
      
      let updated = false;
      planningTasks.forEach(task => {
        const taskId = `${site.id}-${task.id}`;
        if (!completedSet.has(taskId)) {
          completedSet.add(taskId);
          updated = true;
        }
      });

      if (updated) {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(completedSet)));
      }
    }
  });
  // Dispatch a storage event to notify other tabs/components of the change.
  window.dispatchEvent(new Event('storage'));
}


interface FirebaseClientProviderProps {
  children: ReactNode;
}

function AuthGate({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const { auth, firestore } = useMemo(() => initializeFirebase(), []);

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);
  
  useEffect(() => {
    if (firestore) {
      seedAgencias(firestore);
      seedUsers(firestore);
      prefillCompletedTasks();
    }
  }, [firestore]);

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
