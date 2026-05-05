---
title: "Understanding React Hooks: From useState to Custom Hooks"
date: "2024-02-18"
excerpt: "A thorough exploration of React Hooks — how they work under the hood, common patterns, pitfalls to avoid, and how to build powerful custom hooks for your applications."
tags: ["React", "JavaScript", "Hooks", "Web Development"]
author: "Alex Morgan"
authorBio: "Full-stack developer passionate about React, TypeScript, and building great developer experiences."
authorAvatar: "/images/author-alex-morgan.jpg"
coverImage: "/images/react-hooks-deep-dive.jpg"
featured: false
---

# Understanding React Hooks: From useState to Custom Hooks

React Hooks revolutionized how we write React components. Since their introduction in React 16.8, they've become the standard way to manage state and side effects. Let's explore them deeply.

## The Rules of Hooks

Before diving in, the two rules you must never break:

1. **Only call Hooks at the top level** — never inside loops, conditions, or nested functions
2. **Only call Hooks from React functions** — not regular JavaScript functions

These rules exist because React relies on the order of Hook calls to associate state with the correct component instance.

## useState: More Than You Think

The basic usage is familiar, but there are subtleties:

```tsx
// Functional updates — use when new state depends on old state
const [count, setCount] = useState(0);

// ❌ Stale closure problem
setCount(count + 1);
setCount(count + 1); // Still only increments by 1!

// ✅ Functional update — always correct
setCount(c => c + 1);
setCount(c => c + 1); // Correctly increments by 2
```

### Lazy Initialization

For expensive initial state computations, pass a function:

```tsx
// ❌ Runs on every render
const [data, setData] = useState(expensiveComputation());

// ✅ Only runs once on mount
const [data, setData] = useState(() => expensiveComputation());
```

## useEffect: The Complete Guide

`useEffect` is the most misunderstood Hook. Here's the mental model: **effects synchronize your component with external systems**.

```tsx
useEffect(() => {
  // Setup: runs after render
  const subscription = subscribe(userId);
  
  return () => {
    // Cleanup: runs before next effect or unmount
    subscription.unsubscribe();
  };
}, [userId]); // Re-run when userId changes
```

### Common useEffect Patterns

```tsx
// Fetch data with cleanup
useEffect(() => {
  let cancelled = false;
  
  async function fetchData() {
    const data = await api.getUser(userId);
    if (!cancelled) {
      setUser(data);
    }
  }
  
  fetchData();
  return () => { cancelled = true; };
}, [userId]);

// Event listeners
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [handleResize]);
```

## useCallback and useMemo

These hooks optimize performance by memoizing values and functions:

```tsx
// useMemo: memoize expensive computations
const sortedPosts = useMemo(
  () => posts.sort((a, b) => b.date.localeCompare(a.date)),
  [posts]
);

// useCallback: stable function references for child components
const handleSubmit = useCallback(
  async (data: FormData) => {
    await api.submit(data);
    onSuccess();
  },
  [onSuccess] // Only recreate when onSuccess changes
);
```

**When to use them:**
- `useMemo` for expensive calculations or referentially stable objects
- `useCallback` for functions passed to memoized child components
- Don't over-optimize — profile first!

## useRef: Beyond DOM References

`useRef` is useful for more than just DOM access:

```tsx
// Storing mutable values that don't trigger re-renders
const renderCount = useRef(0);
useEffect(() => {
  renderCount.current += 1;
});

// Storing previous values
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// Accessing DOM elements
const inputRef = useRef<HTMLInputElement>(null);
const focusInput = () => inputRef.current?.focus();
```

## useReducer: State Machines in React

When state logic gets complex, `useReducer` provides better structure:

```tsx
type State = {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: User | null;
  error: string | null;
};

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: User }
  | { type: 'FETCH_ERROR'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, status: 'loading', error: null };
    case 'FETCH_SUCCESS':
      return { status: 'success', data: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, status: 'error', error: action.payload };
  }
}

function UserProfile({ userId }: { userId: string }) {
  const [state, dispatch] = useReducer(reducer, {
    status: 'idle',
    data: null,
    error: null,
  });
  
  // ...
}
```

## Building Custom Hooks

Custom hooks are the killer feature — they let you extract and share stateful logic:

```tsx
// useLocalStorage — persist state to localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// useDebounce — debounce rapidly changing values
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchBar() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  
  useEffect(() => {
    if (debouncedQuery) {
      search(debouncedQuery);
    }
  }, [debouncedQuery]);
}
```

## Conclusion

React Hooks are a powerful abstraction that, when understood deeply, enable you to write cleaner, more reusable code. The key insights are:

- Think of effects as synchronization, not lifecycle events
- Use functional updates when new state depends on old state
- Extract custom hooks to share logic, not just to reduce component size
- Measure before optimizing with `useMemo` and `useCallback`

Master these patterns and you'll write React code that's both performant and maintainable.
