import { useEffect, useRef } from 'react';
import { usePathname } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';


const ROUTE_TO_TAB_MAP: Record<string, string> = {
  '/': 'index',
  '/documents': 'documents',
  '/detention': 'detention', 
  '/reimbursement': 'reimbursement',
  '/(tabs)': 'index',
  '/(tabs)/documents': 'documents',
  '/(tabs)/detention': 'detention',
  '/(tabs)/reimbursement': 'reimbursement',
};

export function useTabTracking() {
  const pathname = usePathname();
  const { setLastActiveTab } = useAuth();
  const lastSavedTab = useRef<string | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pathname in ROUTE_TO_TAB_MAP) {
      const tabName = ROUTE_TO_TAB_MAP[pathname];
      if (lastSavedTab.current !== tabName) {
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(() => {
          setLastActiveTab(tabName);
          lastSavedTab.current = tabName;
        }, 500);
      }
    }
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [pathname, setLastActiveTab]);
}