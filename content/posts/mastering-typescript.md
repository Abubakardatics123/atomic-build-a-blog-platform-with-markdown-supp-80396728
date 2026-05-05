---
title: "Mastering TypeScript: Advanced Patterns for Production Apps"
date: "2024-01-28"
excerpt: "Deep dive into advanced TypeScript patterns including conditional types, mapped types, template literal types, and utility types that will level up your codebase."
tags: ["TypeScript", "JavaScript", "Programming"]
author: "Alex Morgan"
authorBio: "Full-stack developer passionate about React, TypeScript, and building great developer experiences."
authorAvatar: "/images/author-alex-morgan.jpg"
coverImage: "/images/typescript-advanced-patterns.jpg"
featured: true
---

# Mastering TypeScript: Advanced Patterns for Production Apps

TypeScript has evolved far beyond simple type annotations. Modern TypeScript gives you a powerful type-level programming language that can catch entire classes of bugs at compile time.

## Conditional Types

Conditional types let you create types that depend on other types:

```typescript
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>; // true
type B = IsArray<string>;   // false
```

A more practical example — extracting the element type from an array:

```typescript
type ElementType<T> = T extends (infer E)[] ? E : never;

type StringElement = ElementType<string[]>; // string
type NumberElement = ElementType<number[]>; // number
```

## Mapped Types

Mapped types transform existing types by iterating over their keys:

```typescript
// Make all properties optional
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// Make all properties readonly
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Transform all values to a new type
type Stringify<T> = {
  [K in keyof T]: string;
};
```

### Filtering Keys with Mapped Types

```typescript
type FilterByValue<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Only string properties
type StringProps = FilterByValue<User, string>;
// { name: string; email: string }
```

## Template Literal Types

Template literal types allow you to create string types programmatically:

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<'click'>;   // 'onClick'
type ChangeEvent = EventName<'change'>; // 'onChange'

// Generate CSS property types
type CSSProperty = 'margin' | 'padding' | 'border';
type CSSDirection = 'Top' | 'Right' | 'Bottom' | 'Left';
type CSSDirectionalProperty = `${CSSProperty}${CSSDirection}`;
// 'marginTop' | 'marginRight' | ... | 'borderLeft'
```

## Discriminated Unions

Discriminated unions are one of TypeScript's most powerful patterns for modeling state:

```typescript
type LoadingState = { status: 'loading' };
type SuccessState<T> = { status: 'success'; data: T };
type ErrorState = { status: 'error'; error: Error };

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

function renderState<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return state.data; // TypeScript knows data exists here
    case 'error':
      return state.error.message; // TypeScript knows error exists here
  }
}
```

## Utility Types Deep Dive

### ReturnType and Parameters

```typescript
function createUser(name: string, age: number, email: string) {
  return { id: Math.random(), name, age, email, createdAt: new Date() };
}

type User = ReturnType<typeof createUser>;
// { id: number; name: string; age: number; email: string; createdAt: Date }

type CreateUserParams = Parameters<typeof createUser>;
// [name: string, age: number, email: string]
```

### Awaited — Unwrapping Promises

```typescript
async function fetchUser(): Promise<{ id: number; name: string }> {
  return { id: 1, name: 'Alex' };
}

type UserData = Awaited<ReturnType<typeof fetchUser>>;
// { id: number; name: string }
```

## The `satisfies` Operator

Introduced in TypeScript 4.9, `satisfies` validates a value against a type without widening it:

```typescript
type Color = 'red' | 'green' | 'blue';
type Palette = Record<string, Color | [number, number, number]>;

const palette = {
  red: [255, 0, 0],
  green: '#00ff00', // Error! Not a valid Color or RGB tuple
  blue: 'blue',
} satisfies Palette;

// palette.red is still typed as [number, number, number], not Color | [number, number, number]
palette.red.map(v => v * 2); // Works!
```

## Conclusion

These advanced TypeScript patterns might seem complex at first, but they pay dividends in large codebases. Conditional types, mapped types, and discriminated unions let you encode business logic in the type system itself, catching bugs before they reach production.

The key is to start simple and reach for these patterns when you find yourself writing repetitive type definitions or when you need to express complex relationships between types.
