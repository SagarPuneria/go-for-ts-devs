# Go vs Angular Development: A Bridge Guide

> **A comprehensive guide for Go developers transitioning to Angular development in the Frontend project**

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Reference Table](#quick-reference-table)
- [Core Paradigm Differences](#core-paradigm-differences)
- [Project Structure Mapping](#project-structure-mapping)
- [Concept Mapping](#concept-mapping)
- [Development Workflow](#development-workflow)
- [Key Angular Concepts](#key-angular-concepts)
- [Quick Start Guide](#quick-start-guide)
- [Mental Model Reference](#mental-model-reference)
- [Learning Path](#learning-path)
- [Additional Resources](#additional-resources)

---

## Overview

This guide helps experienced Go developers understand Angular development by mapping familiar Go concepts to their Angular equivalents. Frontend is an enterprise Angular application, and this guide focuses on practical patterns used in this codebase.

---

## Quick Reference Table

Go developers use [pkg.go.dev/std](https://pkg.go.dev/std) for standard library docs. Here's the web equivalent:

| **Go Concept** | **Web Equivalent** | **Documentation** |
|----------------|-------------------|-------------------|
| `pkg.go.dev/std` | **MDN Web Docs** | [developer.mozilla.org/en-US/docs/Web/API](https://developer.mozilla.org/en-US/docs/Web/API) |
| Standard library | Web APIs (built into browser) | No npm install needed |
| Package search | MDN search bar | [developer.mozilla.org](https://developer.mozilla.org) |

### Finding Browser APIs (localStorage, sessionStorage, etc.)

**Go:** Import from standard library → `pkg.go.dev`
```go
import "net/http"  // Then search: pkg.go.dev/net/http
```

**TypeScript:** Browser APIs are globally available → MDN docs
```typescript
localStorage.clear();     // Search: MDN localStorage
window.location.reload(); // Search: MDN Location
```

**Key Resources:**
- 📚 [MDN Web API Reference](https://developer.mozilla.org/en-US/docs/Web/API)
- 💾 [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
- 🌐 [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window), [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document), [Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)

---

### Finding Third-Party Libraries (@ngxs/store, rxjs, etc.)

**Workflow:** `package.json` → [npmjs.com](https://www.npmjs.com/) → Find "Homepage" link → Official docs

**Example:**
```typescript
import { Store } from '@ngxs/store';
// 1. Check version: package.json → "@ngxs/store": "3.7.5"
// 2. Visit: npmjs.com/package/@ngxs/store
// 3. Click "Homepage" → ngxs.io
// 4. Navigate to version docs -> ngxs.io/v3.7/concepts/store
// 5. Or use npm CLI to open docs -> npm docs @ngxs/store
```

**Common MarketIQ Libraries:**

| **Library** | **npm Package** | **Official Docs** | **Purpose** |
|------------|----------------|-------------------|-------------|
| NGXS | [@ngxs/store](https://www.npmjs.com/package/@ngxs/store) | [ngxs.io](https://www.ngxs.io) | State management |
| RxJS | [rxjs](https://www.npmjs.com/package/rxjs) | [rxjs.dev](https://rxjs.dev) | Reactive programming |
| Angular Material | [@angular/material](https://www.npmjs.com/package/@angular/material) | [material.angular.io](https://material.angular.io) | UI components |
| PrimeNG | [primeng](https://www.npmjs.com/package/primeng) | [primeng.org](https://primeng.org) | UI components |
| AG Grid | [ag-grid-angular](https://www.npmjs.com/package/ag-grid-angular) | [ag-grid.com](https://www.ag-grid.com) | Data grid |

**Pro Tip:** Use IDE's IntelliSense (Cmd+Click) to see type definitions and source.

---

### Finding Language Documentation (TypeScript vs Go)

| **Aspect** | **TypeScript** | **Go** |
|-----------|---------------|---------|
| **Language Docs** | [typescriptlang.org/docs](https://www.typescriptlang.org/docs/) | [go.dev/doc](https://go.dev/doc/) |
| **Getting Started** | [TypeScript in 5 min](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) | [Tour of Go](https://go.dev/tour/) |
| **Handbook** | [TS Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) | [Effective Go](https://go.dev/doc/effective_go) |
| **Playground** | [typescriptlang.org/play](https://www.typescriptlang.org/play) | [go.dev/play](https://go.dev/play) |
| **Package Registry** | [npmjs.com](https://www.npmjs.com/) | [pkg.go.dev](https://pkg.go.dev/) |
| **Standard Library** | Browser APIs ([MDN](https://developer.mozilla.org/)) | [pkg.go.dev/std](https://pkg.go.dev/std) |

**Key Differences:**

1. **Ecosystem Split**:
   - **TypeScript**: Language docs separate from package registry (npmjs.com) and browser APIs (MDN)
   - **Go**: More integrated, but still splits language (go.dev/doc) from packages (pkg.go.dev)

2. **Standard Library**:
   - **TypeScript**: No standard library - relies on browser's Web APIs or Node.js APIs
   - **Go**: Rich standard library included with the language

3. **Documentation Structure**:
   - **TypeScript**: Focus on type system, compilation, and language features
   - **Go**: Focus on language spec, standard library, and best practices

**Example: Learning Basic Concepts**

```typescript
// TypeScript: Learn about types
// Visit: typescriptlang.org/docs/handbook/2/everyday-types.html

interface User {
  id: number;
  name: string;
  email?: string;  // Optional property
}

function greet(user: User): string {
  return `Hello, ${user.name}!`;
}
```

```go
// Go: Learn about types
// Visit: go.dev/tour/basics/11

type User struct {
    ID    int
    Name  string
    Email string  // No optional concept, use pointer: *string
}

func greet(user User) string {
    return fmt.Sprintf("Hello, %s!", user.Name)
}
```

**Quick Lookup:**

| **What You Need** | **Where to Go** |
|------------------|-----------------|
| TypeScript types, interfaces, generics | [typescriptlang.org/docs](https://www.typescriptlang.org/docs/) |
| JavaScript APIs (Array, Date, JSON, etc.) | [MDN JavaScript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| Browser APIs (localStorage, fetch, DOM) | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API) |
| npm packages (Angular, RxJS, lodash) | [npmjs.com](https://www.npmjs.com/) → Homepage link |
| Go packages | [pkg.go.dev](https://pkg.go.dev/) |

---

### How to Identify Where an API Comes From (No Import Statement?)

**The Confusion:** In Go, everything must be imported. In TypeScript/Angular, some things are globally available without imports.

#### The Four Categories of Code in TypeScript/Angular

When coding in TypeScript/Angular, you'll encounter **four categories** of code. Three require **no imports**, and one requires **explicit imports**.

```typescript
// Example TypeScript file
import { Component, OnInit } from '@angular/core';  // ✅ Category 4: Explicit import required

export class MyComponent implements OnInit {
  // Category 3: TypeScript Language Features (no import)
  user: Partial<User>;  // Partial<T> is a TypeScript utility type
  status: 'active' | 'inactive';  // Union type
  
  ngOnInit(): void {
    // Category 2: JavaScript Built-ins (no import)
    const arr = Array.isArray([1, 2, 3]);
    const data = JSON.parse('{"key": "value"}');
    const now = new Date();
    
    // Category 1: Browser APIs (no import)
    localStorage.setItem('key', 'value');
    console.log('Hello');
    window.location.href = '/home';
    
    // Category 3: TypeScript types (no import)
    const name: string = 'John';
    const age: number = 30;
  }
}
```

---

### Category 1: 🌐 Browser APIs (No Import Needed)

**What:** APIs provided by the web browser runtime

**Common Examples:**
- **Storage:** `localStorage`, `sessionStorage`
- **Browser Objects:** `window`, `document`, `navigator`, `location`, `history`
- **Network:** `fetch`, `XMLHttpRequest`, `WebSocket`
- **Console:** `console` (log, error, warn, debug)
- **DOM:** `HTMLElement`, `Event`, `Element`
- **Timers:** `setTimeout`, `setInterval`, `requestAnimationFrame`

**Why no import?** These are provided globally by the browser runtime environment.

**Documentation:** [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API)

**Example:**
```typescript
// All work without imports
localStorage.setItem('token', 'abc123');
const data = localStorage.getItem('token');

window.location.reload();
document.getElementById('myElement');
console.log('Debug message');

fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

### Category 2: 📦 JavaScript Built-ins (No Import Needed)

**What:** Core JavaScript/ECMAScript language features

**Common Examples:**
- **Arrays:** `Array`, `Array.isArray()`, `Array.from()`
- **Objects:** `Object`, `Object.keys()`, `Object.values()`, `Object.entries()`
- **Strings:** `String`, string methods
- **Numbers:** `Number`, `parseInt()`, `parseFloat()`, `isNaN()`
- **JSON:** `JSON.parse()`, `JSON.stringify()`
- **Math:** `Math.floor()`, `Math.random()`, `Math.max()`
- **Dates:** `Date`, `new Date()`
- **Promises:** `Promise`, `Promise.all()`, `Promise.race()`
- **Collections:** `Map`, `Set`, `WeakMap`, `WeakSet`
- **Errors:** `Error`, `TypeError`, `RangeError`
- **RegEx:** `RegExp`

**Why no import?** These are part of the JavaScript language specification.

**Documentation:** [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

**Example:**
```typescript
// All work without imports
const isArray = Array.isArray([1, 2, 3]);  // true
const keys = Object.keys({ a: 1, b: 2 });  // ['a', 'b']
const json = JSON.stringify({ name: 'John' });
const num = Math.floor(4.7);  // 4
const date = new Date();
const promise = Promise.resolve(42);

const map = new Map();
map.set('key', 'value');

const set = new Set([1, 2, 3, 3]);  // Set {1, 2, 3}
```

---

### Category 3: 🔷 TypeScript Language Features (No Import Needed)

**What:** TypeScript's type system and language features (compile-time only)

**Primitive Types:**
- `string`, `number`, `boolean`
- `null`, `undefined`, `void`
- `any`, `unknown`, `never`
- `symbol`, `bigint`

**Utility Types:**
- `Partial<T>` - Make all properties optional
- `Required<T>` - Make all properties required
- `Readonly<T>` - Make all properties readonly
- `Pick<T, K>` - Pick specific properties from T
- `Omit<T, K>` - Omit specific properties from T
- `Record<K, V>` - Object with keys K and values V
- `Exclude<T, U>` - Exclude types from union
- `Extract<T, U>` - Extract types from union
- `NonNullable<T>` - Remove null/undefined
- `ReturnType<T>` - Get function return type
- `Parameters<T>` - Get function parameter types

**Type Keywords:**
- `interface` - Define object shape
- `type` - Type alias
- `enum` - Enumeration
- `class` - Class definition
- `namespace` - Namespace organization

**Type Operators:**
- `typeof` - Get type of value
- `keyof` - Get keys of type
- `as` - Type assertion
- `is` - Type guard
- `in` - Property check
- `extends` - Generic constraint
- `infer` - Type inference in conditionals

**Why no import?** These are part of TypeScript's type system and are compile-time only (removed during transpilation).

**Documentation:** [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)

**Example:**
```typescript
// All work without imports

// Primitive types
const name: string = 'John';
const age: number = 30;
const isActive: boolean = true;
const nothing: null = null;
const notDefined: undefined = undefined;

// Interface
interface User {
  id: number;
  name: string;
  email?: string;
}

// Type alias
type UserId = number;
type Status = 'active' | 'inactive' | 'pending';

// Enum
enum Role {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST'
}

// Utility types
type PartialUser = Partial<User>;  // All properties optional
type ReadonlyUser = Readonly<User>;  // All properties readonly
type UserKeys = keyof User;  // 'id' | 'name' | 'email'
type UserWithoutEmail = Omit<User, 'email'>;
type UserRecord = Record<string, User>;

// Type operators
const user = { id: 1, name: 'John' };
type UserType = typeof user;  // { id: number; name: string }

// Generic function with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Type guard
function isUser(obj: any): obj is User {
  return typeof obj === 'object' && 'id' in obj && 'name' in obj;
}
```

---

### Category 4: 📚 Framework/Library Code (Import Required ✅)

**What:** Third-party packages installed via npm

**Angular Framework Examples:**
- **Core:** `Component`, `Injectable`, `NgModule`, `Directive`, `Pipe`
- **Lifecycle:** `OnInit`, `OnDestroy`, `OnChanges`, `AfterViewInit`
- **Communication:** `Input`, `Output`, `EventEmitter`
- **HTTP:** `HttpClient`, `HttpHeaders`, `HttpParams`
- **Routing:** `Router`, `ActivatedRoute`, `RouterModule`
- **Forms:** `FormBuilder`, `FormGroup`, `FormControl`, `Validators`
- **DI:** `Inject`, `InjectionToken`

**RxJS Library Examples:**
- **Core:** `Observable`, `Subject`, `BehaviorSubject`, `ReplaySubject`
- **Creation:** `of`, `from`, `interval`, `timer`, `fromEvent`
- **Operators:** `map`, `filter`, `tap`, `switchMap`, `mergeMap`, `catchError`, `debounceTime`, `distinctUntilChanged`
- **Combination:** `forkJoin`, `combineLatest`, `merge`, `zip`

**Other Common Libraries:**
- **NGXS:** `Store`, `Select`, `Action`, `State`, `Selector`
- **Angular Material:** `MatDialog`, `MatSnackBar`, `MatTableDataSource`
- **PrimeNG:** Various UI components
- **Lodash:** `cloneDeep`, `debounce`, `throttle`, `groupBy`
- **Moment.js / date-fns:** Date utilities

**Why import required?** These are external dependencies not built into the language, TypeScript, or browser.

**Documentation:** Check import path, then find official docs (npmjs.com → Homepage)

**Example:**
```typescript
// ✅ All these require explicit imports

// Angular imports
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// RxJS imports
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, filter, tap, switchMap, catchError, debounceTime } from 'rxjs/operators';

// NGXS imports
import { Store, Select } from '@ngxs/store';
import { MyState } from './store/my.state';

// Third-party library imports
import { cloneDeep } from 'lodash-es';
import * as moment from 'moment';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html'
})
export class MyComponent implements OnInit {
  @Input() data: any;
  @Output() clicked = new EventEmitter<void>();
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}
  
  ngOnInit(): void {
    this.loadData();
  }
}
```

---

**Visual Example of all 4 categories:**
```typescript
// ❌ No imports needed for these 3 categories:

// Category 1: Browser API
localStorage.setItem('key', 'value');
window.location.href = '/home';

// Category 2: JavaScript Built-in
Array.isArray([1, 2, 3]);
JSON.parse('{"name": "John"}');

// Category 3: TypeScript Language Feature
const user: Partial<User> = {};
const keys: keyof User = 'name';
type Status = 'active' | 'inactive';
interface User { name: string; }

// ✅ Imports required for Category 4:
import { Component, OnInit } from '@angular/core';  // Angular
import { Observable } from 'rxjs';                   // RxJS
import { Store } from '@ngxs/store';                // NGXS
```

**Go Comparison:**
```go
// Go: EVERYTHING needs an import
import (
    "fmt"         // Must import
    "net/http"    // Must import
    "encoding/json"  // Must import
)

func main() {
    fmt.Println("Hello")  // Won't work without import
}
```

**Key Insight:**
 - Categories 1-3 are globally available (no import needed):
    - ❌ Browser APIs → provided by browser runtime environment
    - ❌ JavaScript Built-ins → provided by language standard library
    - ❌ TypeScript Features → Type system (provided by compile-time only)
 - Category 4 requires explicit imports:
    - ✅ Libraries/Frameworks → External dependencies

---

#### API Identification Decision Tree

Use this flowchart to identify where an API comes from:

```
Is there an import statement at the top?
│
├─ YES → Check the import path
│   ├─ '@angular/...' → Angular Framework (angular.dev)
│   ├─ 'rxjs/...' → RxJS Library (rxjs.dev)
│   ├─ '@cbre/...' → Internal CBRE Library (codebase)
│   └─ 'package-name' → Third-party (npmjs.com → official docs)
│
└─ NO → Check what it is
    ├─ Browser object (window, document, localStorage) → MDN Web Docs
    ├─ Built-in JavaScript (Array, Object, Promise, Map) → MDN JavaScript Reference
    ├─ TypeScript language feature (string, Partial<T>, interface) → TypeScript Docs
    └─ If still unsure → Cmd+Click in IDE to see definition file
```

---

#### Method 1: Use Your IDE (Fastest Way)

**In VS Code (or any IDE):**

1. **Cmd+Click (Mac) or Ctrl+Click (Windows)** on the API name
   - Takes you to the type definition
   - Shows you where it's declared

2. **Hover over the API** to see type information
   - Shows the signature
   - Shows documentation comments

**Example:**

```typescript
// Hover over or Cmd+Click these:
Array.isArray([1, 2, 3]);      // → Takes you to lib.es5.d.ts (JavaScript built-in)
localStorage.clear();           // → Takes you to lib.dom.d.ts (Browser API)
ngOnInit(): void { }           // → Takes you to @angular/core (must be imported)
```

**What the file names mean:**
- `lib.es5.d.ts` / `lib.es2015.d.ts` → JavaScript/ECMAScript built-in (language feature)
- `lib.dom.d.ts` → Browser Web APIs (MDN documentation)
- `node_modules/@angular/...` → Angular framework (angular.dev)
- `node_modules/rxjs/...` → RxJS library (rxjs.dev)

---

#### Method 2: The Three-Question Method

Ask yourself these three questions:

##### Question 1: Is it a Browser API?

**Common Browser APIs (globally available, no import needed):**
- `window` - The browser window object
- `document` - The DOM document
- `localStorage` / `sessionStorage` - Web Storage API
- `console` - Browser console
- `fetch` - Network requests
- `navigator` - Browser/device info
- `location` - Current URL
- `history` - Browser history

**How to verify:** Search MDN
- Go to: [developer.mozilla.org](https://developer.mozilla.org)
- Search for the API name
- If you find it under "Web APIs" → It's a browser API

**Example:**
```typescript
// All browser APIs - no imports needed
localStorage.setItem('key', 'value');  // MDN: Web Storage API
window.location.href = '/home';        // MDN: Location API
document.getElementById('myId');       // MDN: Document API
fetch('https://api.example.com/data'); // MDN: Fetch API
```

**Go Analogy:**
```go
// In Go, you'd import net/http to make HTTP calls
import "net/http"

// In browser TypeScript, fetch is globally available
// No import needed because it's provided by the browser runtime
```

---

##### Question 2: Is it a JavaScript Built-in?

**Common JavaScript Built-ins (part of the language):**
- `Array` - Array manipulation
- `Object` - Object utilities
- `String` - String methods
- `Number` - Number utilities
- `Date` - Date/time handling
- `Math` - Mathematical operations
- `Promise` - Async operations
- `Map` / `Set` - Data structures
- `JSON` - JSON parsing/stringifying
- `Error` - Error handling

**How to verify:** Search MDN JavaScript Reference
- Go to: [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- Look under "Standard built-in objects"

**Example:**
```typescript
// All JavaScript built-ins - no imports needed
Array.isArray([1, 2, 3]);              // MDN: JavaScript Reference > Array
Object.keys({ a: 1, b: 2 });           // MDN: JavaScript Reference > Object
JSON.parse('{"name": "John"}');        // MDN: JavaScript Reference > JSON
Math.floor(4.7);                       // MDN: JavaScript Reference > Math
new Date();                            // MDN: JavaScript Reference > Date
Promise.resolve(42);                   // MDN: JavaScript Reference > Promise
```

**Go Analogy:**
```go
// In Go, you import packages for everything
import (
    "encoding/json"
    "math"
)

// In JavaScript/TypeScript, these are built into the language
// No import needed - they're part of the JavaScript standard
```

---

##### Question 3: Is it a TypeScript Language Feature?

**TypeScript provides several language features that don't require imports:**

**Primitive Types (no import needed):**
- `string` - String type
- `number` - Number type (integers and floats)
- `boolean` - True/false
- `null` - Null value
- `undefined` - Undefined value
- `void` - No return value
- `any` - Any type (avoid when possible)
- `unknown` - Unknown type (safer than any)
- `never` - Never returns
- `symbol` - Unique identifier
- `bigint` - Large integers

**Type Keywords (no import needed):**
- `interface` - Define object shape
- `type` - Type alias
- `enum` - Enumeration
- `class` - Class definition
- `namespace` - Namespace organization

**Utility Types (built into TypeScript):**
- `Partial<T>` - Make all properties optional
- `Required<T>` - Make all properties required
- `Readonly<T>` - Make all properties readonly
- `Pick<T, K>` - Pick specific properties
- `Omit<T, K>` - Omit specific properties
- `Record<K, V>` - Object with keys of type K and values of type V
- `Exclude<T, U>` - Exclude types from T that are assignable to U
- `Extract<T, U>` - Extract types from T that are assignable to U
- `NonNullable<T>` - Remove null and undefined
- `ReturnType<T>` - Get return type of function
- `Parameters<T>` - Get parameter types of function

**Type Operators (no import needed):**
- `typeof` - Get type of value
- `keyof` - Get keys of interface/type
- `as` - Type assertion
- `is` - Type guard
- `in` - Check if property exists
- `extends` - Generic constraint
- `infer` - Infer type in conditional

**How to verify:** These are part of TypeScript language
- Go to: [typescriptlang.org/docs/handbook/utility-types.html](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- Look in TypeScript Handbook for language features

**Example:**
```typescript
// All TypeScript language features - no imports needed

// Primitive types
const name: string = 'John';
const age: number = 30;
const isActive: boolean = true;
const nullable: string | null = null;

// Interface
interface User {
  id: number;
  name: string;
  email?: string;  // Optional property
}

// Type alias
type UserId = number;
type UserStatus = 'active' | 'inactive' | 'pending';

// Enum
enum Role {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST'
}

// Utility types
type PartialUser = Partial<User>;  // All properties optional
type ReadonlyUser = Readonly<User>;  // All properties readonly
type UserWithoutEmail = Omit<User, 'email'>;  // Omit email property
type UserKeys = keyof User;  // 'id' | 'name' | 'email'

// Utility type in function
function updateUser(id: number, updates: Partial<User>) {
  // updates can have any subset of User properties
}

// Type assertion
const data = JSON.parse('{"id": 1}') as User;

// Type guard
function isUser(obj: any): obj is User {
  return typeof obj === 'object' && 'id' in obj && 'name' in obj;
}

// Generic with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

**Go Analogy:**
```go
// In Go, even basic types are part of the language
type User struct {
    ID    int
    Name  string
    Email *string  // Optional using pointer
}

// TypeScript has richer type system built into the language
// Similar to how Go has basic types built-in, but more powerful
```

**When you see these in code:**
```typescript
// No imports at top of file
export class UserService {
  // string, number, Partial<User> - all TypeScript language features
  updateUser(id: number, updates: Partial<User>): Promise<User> {
    // Promise is JavaScript built-in
    // Partial<User> is TypeScript utility type
    // Both work without imports!
  }
}
```

**TypeScript Definition Files:**
- When you Cmd+Click on these, you'll see files like:
- `lib.es5.d.ts` - JavaScript built-ins
- `lib.dom.d.ts` - Browser APIs
- No file means it's a TypeScript keyword (interface, type, etc.)

---

##### Question 4: Is it from Angular or a Library?

**Angular Framework APIs (MUST be imported):**
- `Component`, `Injectable`, `NgModule` - Decorators
- `OnInit`, `OnDestroy`, `OnChanges` - Lifecycle interfaces
- `Input`, `Output`, `EventEmitter` - Component communication
- `HttpClient` - HTTP requests
- `Router`, `ActivatedRoute` - Routing

**How to verify:**
1. Look for import statement at top of file
2. Check if it starts with `@angular/`
3. Search [angular.dev](https://angular.dev)

**Example:**
```typescript
// Angular APIs - MUST have imports
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({ ... })  // From @angular/core
export class MyComponent implements OnInit {  // OnInit from @angular/core
  constructor(private http: HttpClient) {}    // HttpClient from @angular/common/http
}
```

**Third-Party Libraries (MUST be imported):**
```typescript
// RxJS - reactive programming
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

// NGXS - state management
import { Store } from '@ngxs/store';

// Lodash - utility functions
import { cloneDeep } from 'lodash-es';
```

---

#### Practical Lookup Guide

**Scenario 1: I see `localStorage.clear()` with no import**

1. ✅ **Try:** Cmd+Click in IDE → Takes you to `lib.dom.d.ts`
2. ✅ **Verify:** Search "localStorage" on [developer.mozilla.org](https://developer.mozilla.org)
3. ✅ **Result:** Found under "Web APIs" → Browser API
4. ✅ **Documentation:** [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

**Scenario 2: I see `Array.isArray()` with no import**

1. ✅ **Try:** Cmd+Click in IDE → Takes you to `lib.es5.d.ts`
2. ✅ **Verify:** Search "Array.isArray" on MDN
3. ✅ **Result:** Found under "JavaScript Reference > Standard built-in objects"
4. ✅ **Documentation:** [MDN Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

**Scenario 3: I see `ngOnInit()` method**

1. ✅ **Check top of file:** `import { OnInit } from '@angular/core';` ✓
2. ✅ **Starts with @angular/:** It's Angular framework
3. ✅ **Search:** [angular.dev](https://angular.dev) for "OnInit"
4. ✅ **Documentation:** [Angular Lifecycle Hooks](https://angular.dev/guide/components/lifecycle)

**Scenario 4: I see `this.store.select()` method**

1. ✅ **Check top of file:** `import { Store } from '@ngxs/store';` ✓
2. ✅ **It's from @ngxs/store:** Third-party library
3. ✅ **Search npm:** [npmjs.com/package/@ngxs/store](https://www.npmjs.com/package/@ngxs/store)
4. ✅ **Find docs link:** Homepage → [ngxs.io](https://www.ngxs.io)

---

#### Quick Reference Table: Common APIs

| **API** | **Import Needed?** | **Type** | **Documentation** |
|---------|-------------------|----------|-------------------|
| `localStorage` | ❌ No | Browser API | [MDN Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) |
| `sessionStorage` | ❌ No | Browser API | [MDN Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) |
| `window` | ❌ No | Browser API | [MDN Window](https://developer.mozilla.org/en-US/docs/Web/API/Window) |
| `document` | ❌ No | Browser API | [MDN Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) |
| `console` | ❌ No | Browser API | [MDN Console](https://developer.mozilla.org/en-US/docs/Web/API/Console) |
| `fetch` | ❌ No | Browser API | [MDN Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) |
| `Array.isArray()` | ❌ No | JavaScript Built-in | [MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) |
| `Object.keys()` | ❌ No | JavaScript Built-in | [MDN Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) |
| `JSON.parse()` | ❌ No | JavaScript Built-in | [MDN JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) |
| `Math.floor()` | ❌ No | JavaScript Built-in | [MDN Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) |
| `Promise` | ❌ No | JavaScript Built-in | [MDN Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) |
| `Date` | ❌ No | JavaScript Built-in | [MDN Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) |
| `string`, `number`, `boolean` | ❌ No | TypeScript Type | [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) |
| `Partial<T>` | ❌ No | TypeScript Utility Type | [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) |
| `Record<K,V>` | ❌ No | TypeScript Utility Type | [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) |
| `interface`, `type` | ❌ No | TypeScript Keyword | [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) |
| `Component` | ✅ Yes | Angular Framework | [Angular Components](https://angular.dev/guide/components) |
| `OnInit` | ✅ Yes | Angular Framework | [Angular Lifecycle](https://angular.dev/guide/components/lifecycle) |
| `HttpClient` | ✅ Yes | Angular Framework | [Angular HttpClient](https://angular.dev/guide/http) |
| `Observable` | ✅ Yes | RxJS Library | [RxJS Observable](https://rxjs.dev/guide/observable) |
| `Store` | ✅ Yes | NGXS Library | [NGXS Store](https://www.ngxs.io/concepts/store) |

---

#### Why This Difference Exists

**Go Philosophy:**
- Explicit is better than implicit
- Everything must be imported
- Clear dependency management

**JavaScript/TypeScript/Browser Philosophy:**
- Browser provides runtime APIs globally (localStorage, window, etc.)
- JavaScript language provides built-ins globally (Array, Object, etc.)
- Only third-party libraries and frameworks require imports
- Convenience for common operations

**Trade-offs:**

| **Aspect** | **Go (Explicit Imports)** | **TypeScript (Global + Imports)** |
|------------|--------------------------|----------------------------------|
| **Clarity** | ✅ Always know where things come from | ⚠️ Must learn what's global vs imported |
| **Convenience** | ⚠️ More imports needed | ✅ Common things "just work" |
| **Discovery** | ✅ `go doc` shows everything | ⚠️ Must know where to look |
| **Bundle Size** | N/A (compiled binary) | ✅ Tree-shaking removes unused code |

---

#### Pro Tips for Go Developers

1. **Use IDE IntelliSense religiously**
   - Cmd+Click to jump to definitions
   - Hover to see documentation
   - Use "Go to Type Definition" (Cmd+T)

2. **Learn the four main sources**
   - Browser APIs → MDN Web Docs
   - JavaScript built-ins → MDN JavaScript Reference
   - TypeScript language features → TypeScript Handbook
   - Framework/Libraries → Check imports, then find official docs

3. **Watch out for naming conflicts**
   ```typescript
   // Both 'Headers' exist!
   import { Headers } from '@angular/common/http';  // Angular's Headers
   // vs
   const headers = new Headers();  // Browser's Headers API
   
   // Use IDE to see which one you're using
   ```

4. **Create a mental model**
   - If it feels "too convenient" (no import) → Probably browser or language built-in
   - If it's framework-specific → Must be imported
   - When in doubt → Cmd+Click in IDE

5. **Use TypeScript's `.d.ts` files**
   - These are type definition files
   - `lib.dom.d.ts` = Browser APIs
   - `lib.es5.d.ts` = JavaScript built-ins
   - `node_modules/@angular/**/*.d.ts` = Angular framework

---

## Core Paradigm Differences

| Aspect | Go (Backend) | Angular (Frontend) |
|--------|-------------|-------------------|
| **Runtime** | Server-side compiled binary | Browser JavaScript runtime |
| **Language** | Go | TypeScript (superset of JavaScript) |
| **Compilation** | Native binary (`go build`) | Transpiled to JavaScript (Webpack) |
| **Concurrency** | Goroutines + channels | Async/Promises + RxJS Observables |
| **State Management** | Request-scoped or global vars | Component state + NGXS store |
| **Architecture** | MVC/Clean Architecture | Component-based with services |
| **Package Manager** | `go.mod` | `package.json` (npm) |
| **Testing** | `testing` package | Jasmine/Karma |
| **Dependency Injection** | Manual (typically) | Automatic via Angular DI |

---

## Project Structure Mapping

### Go Project Structure
```
myapp/
├── cmd/
│   └── main.go              ← Entry point
├── pkg/
│   ├── handlers/            ← HTTP handlers
│   ├── services/            ← Business logic
│   └── models/              ← Data structures
├── internal/
│   ├── db/                  ← Database layer
│   └── middleware/          ← Middleware
├── go.mod                   ← Dependency management
└── go.sum                   ← Dependency checksums
```

### Angular Project Structure (Frontend)
```
Frontend-frontend/
├── src/
│   ├── main.ts              ← Entry point (like cmd/main.go)
│   ├── app/
│   │   ├── records/         ← Feature modules (like handlers)
│   │   ├── reports/         ← Feature modules
│   │   ├── shared/
│   │   │   ├── services/    ← Business logic (like pkg/services)
│   │   │   ├── models/      ← Interfaces (like pkg/models)
│   │   │   └── components/  ← Reusable UI components
│   │   └── core/            ← Singletons (like internal/)
│   ├── assets/              ← Static files
│   └── environments/        ← Config files
├── package.json             ← Dependency management (like go.mod)
└── angular.json             ← Build configuration
```

---

## Concept Mapping

### 1. Structs → Interfaces/Types

#### Go
```go
type User struct {
    ID        int    `json:"id"`
    FirstName string `json:"firstName"`
    LastName  string `json:"lastName"`
    Email     string `json:"email"`
    Active    bool   `json:"active"`
}

type UserResponse struct {
    Data  User   `json:"data"`
    Error string `json:"error,omitempty"`
}
```

#### TypeScript (Angular)
```typescript
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
}

interface UserResponse {
  data: User;
  error?: string;
}
```

**Key Differences:**
- TypeScript uses `interface` instead of `struct`
- No JSON tags needed (handled by `HttpClient`)
- Optional fields use `?` suffix
- TypeScript is structurally typed (duck typing)

---

### 2. HTTP Handlers → Components

#### Go (HTTP Handler)
```go
type UserHandler struct {
    service *UserService
}

func (h *UserHandler) GetUserHandler(w http.ResponseWriter, r *http.Request) {
    id := chi.URLParam(r, "id")
    user, err := h.service.GetUser(id)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    json.NewEncoder(w).Encode(user)
}
```

#### Angular (Component)
```typescript
@Component({
  selector: 'miq-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User;
  loading = false;
  errorMessage: string;
  
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    @Inject(CbreLoggerToken) private logger: CbreLogger
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadUser(id);
  }
  
  private loadUser(id: number): void {
    this.loading = true;
    this.userService.getUser(id)
      .pipe(
        catchError(err => {
          this.logger.error('Failed to load user', err);
          this.errorMessage = 'Failed to load user';
          return of(null);
        })
      )
      .subscribe(user => {
        this.user = user;
        this.loading = false;
      });
  }
}
```

**Key Differences:**
- Components handle both logic AND rendering (template)
- No manual response writing (template bindings handle it)
- Async operations use Observables instead of callbacks
- Lifecycle hooks (`ngOnInit`, `ngOnDestroy`) instead of explicit init

---

### 3. Services → Services (Very Similar!)

#### Go Service
```go
type UserService struct {
    db     *sql.DB
    logger *log.Logger
}

func NewUserService(db *sql.DB, logger *log.Logger) *UserService {
    return &UserService{
        db:     db,
        logger: logger,
    }
}

func (s *UserService) GetUser(id int) (*User, error) {
    var user User
    err := s.db.QueryRow(
        "SELECT id, first_name, last_name, email FROM users WHERE id = $1",
        id,
    ).Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email)
    
    if err != nil {
        s.logger.Printf("Error fetching user %d: %v", id, err)
        return nil, err
    }
    
    return &user, nil
}
```

#### Angular Service
```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient,
    @Inject(CbreLoggerToken) private logger: CbreLogger
  ) {}
  
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`)
      .pipe(
        tap(user => this.logger.debug('Fetched user', user)),
        catchError(error => {
          this.logger.error(`Error fetching user ${id}`, error);
          return throwError(() => error);
        })
      );
  }
  
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, user);
  }
}
```

**Key Differences:**
- `@Injectable()` decorator enables dependency injection
- `providedIn: 'root'` makes it a singleton (like a global var)
- Returns `Observable<T>` instead of `(T, error)`
- HTTP client is injected, not database connection
- Errors propagated through Observable streams

---

### 4. Goroutines/Channels → RxJS Observables

#### Go (Concurrent Operations)
```go
func fetchUserData(userID int) (*CombinedData, error) {
    // Create channels
    userCh := make(chan *User)
    ordersCh := make(chan []Order)
    errCh := make(chan error, 2)
    
    // Fetch user
    go func() {
        user, err := userService.GetUser(userID)
        if err != nil {
            errCh <- err
            return
        }
        userCh <- user
    }()
    
    // Fetch orders
    go func() {
        orders, err := orderService.GetUserOrders(userID)
        if err != nil {
            errCh <- err
            return
        }
        ordersCh <- orders
    }()
    
    // Wait for results
    select {
    case err := <-errCh:
        return nil, err
    case user := <-userCh:
        orders := <-ordersCh
        return &CombinedData{User: user, Orders: orders}, nil
    }
}
```

#### TypeScript/RxJS
```typescript
import { forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

fetchUserData(userId: number): Observable<CombinedData> {
  // Parallel execution (like goroutines)
  return forkJoin({
    user: this.userService.getUser(userId),
    orders: this.orderService.getUserOrders(userId)
  }).pipe(
    map(({ user, orders }) => ({
      user,
      orders
    })),
    catchError(error => {
      this.logger.error('Failed to fetch user data', error);
      return throwError(() => error);
    })
  );
}

// Sequential execution (like synchronous code)
fetchUserDataSequential(userId: number): Observable<CombinedData> {
  return this.userService.getUser(userId).pipe(
    switchMap(user => 
      this.orderService.getUserOrders(userId).pipe(
        map(orders => ({ user, orders }))
      )
    )
  );
}
```

**Key RxJS Operators:**
- `forkJoin` = Wait for multiple goroutines (parallel)
- `switchMap` = Serial async operations (like `<-ch` then another call)
- `map` = Transform data
- `filter` = Filter data
- `catchError` = Error handling
- `tap` = Side effects (logging)
- `debounceTime` = Rate limiting
- `distinctUntilChanged` = Skip duplicates

---

### 5. Middleware → HTTP Interceptors

#### Go Middleware
```go
func AuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        
        if token == "" {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        
        // Validate token
        if !validateToken(token) {
            http.Error(w, "Invalid token", http.StatusUnauthorized)
            return
        }
        
        next.ServeHTTP(w, r)
    })
}
```

#### Angular HTTP Interceptor
```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token
    const token = this.authService.getToken();
    
    if (!token) {
      return throwError(() => new Error('No auth token'));
    }
    
    // Clone request and add Authorization header
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    
    // Pass to next handler
    return next.handle(authReq).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}
```

---

### 6. Dependency Injection

#### Go (Manual DI)
```go
func main() {
    // Initialize dependencies
    db := initDB()
    logger := log.New(os.Stdout, "APP: ", log.LstdFlags)
    
    // Wire up services
    userService := NewUserService(db, logger)
    orderService := NewOrderService(db, logger)
    
    // Wire up handlers
    userHandler := NewUserHandler(userService, logger)
    orderHandler := NewOrderHandler(orderService, logger)
    
    // Setup routes
    r := chi.NewRouter()
    r.Get("/users/{id}", userHandler.GetUser)
    r.Get("/orders/{id}", orderHandler.GetOrder)
    
    http.ListenAndServe(":8080", r)
}
```

#### Angular (Automatic DI)
```typescript
// Services are automatically injected
@Injectable({ providedIn: 'root' })
export class UserService {
  // Angular automatically injects HttpClient and Logger
  constructor(
    private http: HttpClient,
    @Inject(CbreLoggerToken) private logger: CbreLogger
  ) {}
}

@Component({
  selector: 'miq-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  // Angular automatically injects services
  constructor(
    private userService: UserService,
    private orderService: OrderService,
    @Inject(CbreLoggerToken) private logger: CbreLogger
  ) {}
  
  ngOnInit() {
    this.loadUsers();
  }
}
```

**Key Differences:**
- Angular DI is automatic via constructor injection
- No manual wiring required
- Scopes: `providedIn: 'root'` (singleton) or module-scoped
- Use `@Inject()` decorator for injection tokens

---

## Development Workflow

### Go Development Workflow
```bash
# Install dependencies
go mod download

# Run tests
go test ./...

# Run with hot reload (using air)
air

# Build binary
go build -o app cmd/main.go

# Run application
./app

# Format code
go fmt ./...

# Lint code
golangci-lint run
```

### Angular Development Workflow (Frontend)
```bash
# Install dependencies
npm install

# Build libraries (Frontend specific - required first time)
npm run build:libraries

# Run dev server with hot reload
npm run serve
# Access at: https://local.miq.cbre.com

# Quick serve (skip library rebuild)
npm run quick-serve

# Run tests
npm test

# Run specific test suite
npm run test:fe

# Build for production
npm run build:prod

# Lint code
npm run lint

# Security scan (MANDATORY before builds)
cycode scan --type sast
```

---

## Key Angular Concepts

### 1. Components = UI Building Blocks

Think of components as **structs that render HTML templates**:

```typescript
@Component({
  selector: 'miq-user-card',           // HTML tag: <miq-user-card>
  templateUrl: './user-card.component.html',  // HTML template
  styleUrls: ['./user-card.component.scss']   // CSS styles
})
export class UserCardComponent implements OnInit {
  // Input properties (like function parameters)
  @Input() user: User;
  @Input() showDetails = false;
  
  // Output events (like callbacks)
  @Output() userClicked = new EventEmitter<User>();
  @Output() deleteClicked = new EventEmitter<number>();
  
  // Component state
  isExpanded = false;
  
  constructor(
    private userService: UserService,
    @Inject(CbreLoggerToken) private logger: CbreLogger
  ) {}
  
  ngOnInit(): void {
    this.logger.debug('User card initialized', this.user);
  }
  
  onCardClick(): void {
    this.userClicked.emit(this.user);
  }
  
  onDeleteClick(): void {
    this.deleteClicked.emit(this.user.id);
  }
  
  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }
}
```

**Template (user-card.component.html):**
```html
<div class="user-card" [class.expanded]="isExpanded">
  <div class="user-header" (click)="onCardClick()">
    <h3>{{ user.firstName }} {{ user.lastName }}</h3>
    <span class="user-email">{{ user.email }}</span>
  </div>
  
  <div class="user-details" *ngIf="showDetails && isExpanded">
    <p>ID: {{ user.id }}</p>
    <p>Status: {{ user.active ? 'Active' : 'Inactive' }}</p>
  </div>
  
  <div class="user-actions">
    <button (click)="toggleExpanded()">
      {{ isExpanded ? 'Show Less' : 'Show More' }}
    </button>
    <button (click)="onDeleteClick()" class="delete-btn">
      Delete
    </button>
  </div>
</div>
```

**Using the component:**
```html
<miq-user-card 
  [user]="currentUser"
  [showDetails]="true"
  (userClicked)="handleUserClick($event)"
  (deleteClicked)="handleDelete($event)">
</miq-user-card>
```

---

### 2. Modules = Package Organization

Similar to Go packages, modules group related functionality:

```typescript
@NgModule({
  // Components, directives, pipes declared in this module
  declarations: [
    UserListComponent,
    UserCardComponent,
    UserDetailComponent
  ],
  
  // Other modules this module depends on
  imports: [
    CommonModule,           // Basic Angular directives (ngIf, ngFor)
    ReactiveFormsModule,    // Form handling
    RouterModule.forChild(routes),  // Routing
    SharedModule            // Shared components
  ],
  
  // Services provided by this module
  providers: [
    UserService,
    UserResolver
  ],
  
  // Components that can be used outside this module
  exports: [
    UserCardComponent
  ]
})
export class UserModule { }
```

---

### 3. Reactive Programming with RxJS

Observables are like **Go channels with superpowers**:

```typescript
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

// Hot Observable (like a channel that's always open)
private searchSubject = new Subject<string>();

ngOnInit() {
  // Create an observable pipeline
  this.searchSubject.pipe(
    debounceTime(300),              // Wait 300ms after last emission
    distinctUntilChanged(),         // Skip if same as previous
    filter(term => term.length > 2), // Only search if 3+ chars
    switchMap(term => 
      this.userService.searchUsers(term)  // Make API call
    )
  ).subscribe(users => {
    this.users = users;
  });
}

onSearchInput(event: Event): void {
  const term = (event.target as HTMLInputElement).value;
  this.searchSubject.next(term);  // Like: ch <- term
}
```

**Common Observable Patterns:**

```typescript
// Cold Observable (like creating a channel)
const data$ = this.http.get<User[]>('/api/users');

// Subscribe (like: result := <-ch)
data$.subscribe(users => {
  console.log(users);
});

// Transform data (map)
const names$ = data$.pipe(
  map(users => users.map(u => u.firstName))
);

// Handle errors
data$.pipe(
  catchError(error => {
    console.error(error);
    return of([]); // Return empty array on error
  })
).subscribe(users => {
  this.users = users;
});

// Combine multiple observables (forkJoin = Promise.all)
forkJoin({
  users: this.userService.getUsers(),
  roles: this.roleService.getRoles()
}).subscribe(({ users, roles }) => {
  // Both completed
});
```

**Using Async Pipe (Best Practice):**

Instead of manually subscribing, use the `async` pipe in templates for automatic subscription management:

```typescript
// Component
export class UserListComponent implements OnInit {
  // Store Observable directly (note the $ suffix convention)
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    // Assign observable, don't subscribe
    this.users$ = this.userService.getUsers().pipe(
      tap(users => console.log('Users loaded', users)),
      catchError(error => {
        console.error('Error loading users', error);
        return of([]);
      })
    );
  }
  
  // No ngOnDestroy needed - async pipe handles unsubscription!
}
```

```html
<!-- Template - async pipe automatically subscribes and unsubscribes -->
<div *ngIf="users$ | async as users; else loading">
  <div *ngFor="let user of users">
    {{ user.firstName }} {{ user.lastName }}
  </div>
</div>

<ng-template #loading>
  <div>Loading users...</div>
</ng-template>
```

**Benefits of Async Pipe:**
- ✅ Automatic subscription management (no memory leaks)
- ✅ Automatic unsubscription on component destroy
- ✅ Cleaner component code
- ✅ Works with Angular's change detection
- ✅ No need for `@UntilDestroy()` decorator

**When to Use Manual Subscription vs Async Pipe:**

```typescript
// ❌ DON'T: Manual subscription without cleanup
export class BadComponent {
  users: User[];
  
  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    // Memory leak! Subscription never cleaned up
  }
}

// ⚠️ OK: Manual subscription with cleanup (use when you need to imperatively call methods)
@UntilDestroy()
export class OkayComponent {
  users: User[];
  
  ngOnInit() {
    this.userService.getUsers()
      .pipe(untilDestroyed(this))
      .subscribe(users => {
        this.users = users;
        this.doSomethingAfterLoad();
      });
  }
  
  private doSomethingAfterLoad() {
    // Side effects that need to happen after data loads
  }
}

// ✅ BEST: Async pipe (use whenever possible)
export class GoodComponent {
  users$ = this.userService.getUsers();
  
  constructor(private userService: UserService) {}
}
// Template: <div *ngFor="let user of users$ | async">
```

**Go Analogy:**
```go
// Go: Manual channel management
ch := make(chan Data)
defer close(ch)  // Like ngOnDestroy cleanup

// Angular: Async pipe is like having Go automatically manage your channels
```

---

### 4. State Management with NGXS

NGXS is like a **centralized in-memory cache** with Redux-style state management:

```typescript
// State Model (like a struct)
export interface UserStateModel {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

// Actions (like function calls)
export class LoadUsers {
  static readonly type = '[User] Load Users';
}

export class SelectUser {
  static readonly type = '[User] Select User';
  constructor(public userId: number) {}
}

// State (like a service managing shared state)
@State<UserStateModel>({
  name: 'user',
  defaults: {
    users: [],
    selectedUser: null,
    loading: false,
    error: null
  }
})
@Injectable()
export class UserState {
  constructor(private userService: UserService) {}
  
  // Action handler (like a handler function)
  @Action(LoadUsers)
  loadUsers(ctx: StateContext<UserStateModel>) {
    ctx.patchState({ loading: true });
    
    return this.userService.getUsers().pipe(
      tap(users => {
        ctx.patchState({ users, loading: false, error: null });
      }),
      catchError(error => {
        ctx.patchState({ loading: false, error: error.message });
        return throwError(() => error);
      })
    );
  }
  
  @Action(SelectUser)
  selectUser(ctx: StateContext<UserStateModel>, action: SelectUser) {
    const state = ctx.getState();
    const user = state.users.find(u => u.id === action.userId);
    ctx.patchState({ selectedUser: user });
  }
  
  // Selector (like a getter)
  @Selector()
  static users(state: UserStateModel) {
    return state.users;
  }
  
  @Selector()
  static selectedUser(state: UserStateModel) {
    return state.selectedUser;
  }
  
  @Selector()
  static loading(state: UserStateModel) {
    return state.loading;
  }
}
```

**Using NGXS in components:**

```typescript
export class UserListComponent implements OnInit {
  // Select from state (like reading from cache)
  users$ = this.store.select(UserState.users);
  loading$ = this.store.select(UserState.loading);
  
  constructor(private store: Store) {}
  
  ngOnInit() {
    // Dispatch action (like calling a service method)
    this.store.dispatch(new LoadUsers());
  }
  
  selectUser(userId: number) {
    this.store.dispatch(new SelectUser(userId));
  }
}
```

---

### 5. Reactive Forms

Angular's approach to form handling:

```typescript
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    // Build form structure (like defining a struct)
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18)]],
      address: this.fb.group({
        street: [''],
        city: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
      })
    });
    
    // Listen to field changes
    this.userForm.get('email').valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(email => {
        this.checkEmailAvailability(email);
      });
  }
  
  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      this.userService.createUser(formValue).subscribe(
        user => console.log('User created', user),
        error => console.error('Error creating user', error)
      );
    } else {
      this.markFormGroupTouched(this.userForm);
    }
  }
  
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
```

---

## Quick Start Guide

### 1. Environment Setup

```bash
# Install Node Version Manager (like gvm for Go)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use required Node version
nvm install 22.11.0
nvm use 22.11.0

# Verify installation
node --version  # Should show v22.11.0
npm --version   # Should show 10.x.x
```

### 2. Clone and Setup Frontend

```bash
# Clone repository
git clone <repo-url>
cd Frontend-frontend

# Install dependencies (like go mod download)
npm install

# Build workspace libraries (Frontend specific)
npm run build:libraries

# Add local host entry
npm run host:add:local
```

### 3. Run Development Server

```bash
# Start dev server (requires sudo for port 443)
npm run serve

# Access application
# Open browser to: https://local.miq.cbre.com
```

### 4. Common Development Commands

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test -- --watch

# Lint code
npm run lint

# Build for production
npm run build:prod

# Security scan (REQUIRED before commits)
cycode scan --type sast
```

---

## Mental Model Reference

Quick lookup table for Go → Angular concept mapping:

| **When you think...** | **In Angular, it's...** |
|----------------------|------------------------|
| `pkg.go.dev/std` | MDN Web Docs |
| Standard library | Web APIs (built into browser) |
| HTTP handler | Component |
| Service layer | Injectable Service |
| Struct | Interface/Type |
| `go func()` | Observable.subscribe() |
| Channel (`chan`) | Observable |
| `<-ch` (receive) | `.subscribe()` or `async` pipe |
| `ch <-` (send) | `.next()` on Subject |
| Middleware | HTTP Interceptor |
| Package | Module |
| `main.go` | `main.ts` + `app.module.ts` |
| JSON tags | Interface properties |
| Pointer receiver | `this` in class methods |
| `if err != nil` | `.pipe(catchError())` |
| Goroutine pool | Observable operators |
| Context | RxJS Subject/BehaviorSubject |
| Database query | HttpClient call |
| `defer` | `ngOnDestroy()` or `async` pipe |
| Interface{} | `any` or `unknown` |
| Type assertion | Type guards |
| Go templates | Angular templates |

---

## Learning Path

### Week 1: TypeScript Fundamentals
- **Day 1-2**: TypeScript basics (types, interfaces, classes)
- **Day 3-4**: TypeScript advanced (generics, decorators, utility types)
- **Day 5**: Practice TypeScript exercises

**Resources:**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript for Java/C# Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html) (Similar concepts for Go developers)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

### Week 2: Angular Basics
- **Day 1-2**: Components, templates, data binding
- **Day 3**: Component communication (@Input, @Output)
- **Day 4**: Directives and pipes
- **Day 5**: Build small components

**Resources:**
- [Angular Tour of Heroes Tutorial](https://angular.io/tutorial)
- [Angular Component Interaction](https://angular.io/guide/component-interaction)

### Week 3: Services & Dependency Injection
- **Day 1-2**: Services and dependency injection
- **Day 3**: HttpClient and API integration
- **Day 4-5**: Practice building services

### Week 4: RxJS & Reactive Programming
- **Day 1-2**: Observable basics
- **Day 3**: Common RxJS operators
- **Day 4**: Subject, BehaviorSubject
- **Day 5**: Practice reactive patterns

**Resources:**
- [Learn RxJS](https://www.learnrxjs.io/)
- [RxJS Marbles](https://rxmarbles.com/)

### Week 5: State Management (NGXS)
- **Day 1-2**: NGXS concepts (State, Actions, Selectors)
- **Day 3**: State mutations and async actions
- **Day 4-5**: Build features with NGXS

### Week 6: Frontend Codebase
- **Day 1**: Explore project structure
- **Day 2**: Study existing components
- **Day 3**: Study existing services
- **Day 4**: Fix small bugs
- **Day 5**: Build small feature

---

## Additional Resources

### Official Documentation
- [Angular Official Documentation](https://angular.dev/overview)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)

### Development Resources
- [NPM Package Manager](https://www.npmjs.com/) (Use npm to install Angular CLI or third-party libraries like Bootstrap, RxJS, NGXS...etc)
- [Bootstrap Documentation](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
    - [ng-bootstrap](https://ng-bootstrap.github.io/#/home)
- [RxJS Documentation](https://rxjs.dev/)
- [NGXS Documentation](https://www.ngxs.io/)
- [News API](https://newsapi.org) - API Key: `eeef35fa74bd474e84b6edaf206414cd`
- [StackBlitz CanDeactivate Example](https://stackblitz.com/edit/candeactivate)

### Frontend Specific Docs
- [Project README](../README.md)
- [Copilot Usage Guide](./COPILOT_USAGE_GUIDE.md)
- [Angular LLMs Context](./angular-llms-context.md)

### Go Developer Specific Resources
- [TypeScript for Go Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html)
- [JavaScript Concepts for Backend Developers](https://github.com/leonardomso/33-js-concepts)

### Community Resources
- [Angular Blog](https://blog.angular.io/)
- [RxJS Best Practices](https://blog.angular-university.io/rxjs-best-practices/)
- [Angular Community on Discord](https://discord.gg/angular)

### Notes on Best Practices
- **Bootstrap**: Follow good practices when implementing Bootstrap
- **Async Pipe**: Use the `async` pipe in templates for automatic Observable subscription and unsubscription (prevents memory leaks)
- **Subscriptions**: When manual subscriptions are needed, always unsubscribe in `ngOnDestroy()` or use the `@UntilDestroy()` decorator
- **Deprecations**: Be aware that some features like 'filter' may be deprecated

---

## Tips for Go Developers

### ✅ Things You'll Love About Angular

1. **Strong Typing**: TypeScript provides compile-time type safety like Go
2. **Dependency Injection**: Similar to what you might use in Go, but automatic
3. **Observables**: More powerful than channels for async operations
4. **Tooling**: Excellent IDE support, especially in VS Code
5. **Testing**: Well-integrated testing framework

### ⚠️ Things That Might Surprise You

1. **No Pointers**: Everything is passed by reference (objects) or value (primitives)
2. **Async Everywhere**: Almost everything is asynchronous
3. **Build Times**: Slower than Go compilation
4. **Runtime Errors**: Some errors only appear at runtime
5. **Bundle Size**: Need to be conscious of bundle size for frontend performance

### 🎯 Best Practices from Go That Apply

1. **Single Responsibility**: Each component/service should do one thing
2. **Clear Interfaces**: Define clear interfaces for your types
3. **Error Handling**: Always handle errors (in `.subscribe()` error callbacks)
4. **Logging**: Use proper logger (`CbreLogger`), never `console.log`
5. **Testing**: Write tests for your code
6. **Documentation**: Document public APIs and complex logic
7. **Memory Management**: Use async pipe in templates or `@UntilDestroy()` decorator to prevent memory leaks (like `defer` in Go)

---

## Conclusion

As a Go developer, you already understand many key concepts that translate well to Angular development:

- **Type safety** → TypeScript
- **Clean architecture** → Angular's layered structure
- **Dependency injection** → Angular DI
- **Concurrency** → RxJS Observables
- **Testing** → Jasmine/Karma

The main difference is the **runtime environment** (browser vs server) and **reactive programming** patterns. Focus on understanding Observables and component-based architecture, and you'll be productive quickly!

---

**Happy Coding! 🚀**

*Last Updated: February 15, 2026*