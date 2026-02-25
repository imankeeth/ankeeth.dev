import { atom } from 'jotai';

// AuraMessage type - defined locally to avoid circular deps
export interface AuraMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

// Check if we're in a browser environment
const isServer = typeof window === 'undefined';

// Helper to read from localStorage safely
function getStorageValue<T>(key: string, defaultValue: T): T {
  if (isServer) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

// Helper to write to localStorage safely  
function setStorageValue<T>(key: string, value: T): void {
  if (isServer) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors
  }
}

// Create an atom with localStorage persistence that's SSR-safe
// Uses a simple approach: read on init (client only), write on change
function atomWithLocalStorage<T>(key: string, defaultValue: T) {
  const baseAtom = atom<T>(getStorageValue(key, defaultValue));
  
  // Create a derived atom that syncs with localStorage on write
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: T | ((prev: T) => T)) => {
      const newValue = typeof update === 'function' 
        ? (update as (prev: T) => T)(get(baseAtom))
        : update;
      set(baseAtom, newValue);
      setStorageValue(key, newValue);
    }
  );
  
  return derivedAtom;
}

// Theme State
export const themeAtom = atomWithLocalStorage<'dark' | 'light'>('ankeeth-dev-theme-v1', 'dark');

// Theme Transition State
export interface ThemeTransitionState {
  isActive: boolean;
  type: 'dark' | 'light';
  origin: { x: number; y: number };
}

export const themeTransitionAtom = atom<ThemeTransitionState>({
  isActive: false,
  type: 'light', // Default fallback
  origin: { x: 0, y: 0 }
});

// Project Modal State
export const projectModalOpenAtom = atom<boolean>(false);
// Explicitly cast initial value to ensure correct WritableAtom type inference
export const projectModalIntentAtom = atom(null as string | null);

// Aura State
export const auraOpenAtom = atom<boolean>(false);
export const auraIntentAtom = atom(null as string | null);

// Aura Sessions State (New)
export interface AuraSession {
  id: string;
  title: string;
  messages: ExtendedAuraMessage[];
  createdAt: number;
  lastActiveAt: number;
}

// Re-exporting ExtendedAuraMessage here to avoid circular deps if needed, 
// though ideally types are in types.ts. We will define it here for the atom.
export interface ExtendedAuraMessage extends AuraMessage {
  type?: 'text' | 'tool_call' | 'tool_result';
  toolName?: string;
  toolArgs?: any;
  toolResult?: any;
}

export const auraSessionsAtom = atomWithLocalStorage<AuraSession[]>('ankeeth-dev-aura-sessions-v1', []);
export const auraActiveSessionIdAtom = atomWithLocalStorage<string | null>('ankeeth-dev-aura-active-session-v1', null);


// Dashboard Layout State
// Updated keys to match the new content structure
export const DEFAULT_DASHBOARD_LAYOUT = [
  'mission-control', // Hero / Bio
  'quest-log',       // Current Focus / Philosophy (Swapped with services)
  'services-module', // Consulting / Workshops (Swapped with quest)
  'recent-writings'  // New Blog Panel
  // Moved to About Page: 'experience-log', 'tech-matrix', 'active-modules'
];

// Incremented version to v5 to force reset for layout changes
export const dashboardLayoutAtom = atomWithLocalStorage<string[]>('ankeeth-dev-dashboard-layout-v5', DEFAULT_DASHBOARD_LAYOUT);

// Aura Position State
export interface Position {
  x: number;
  y: number;
}
export const auraPositionAtom = atomWithLocalStorage<Position>('ankeeth-dev-aura-position-v1', { x: 0, y: 0 });
