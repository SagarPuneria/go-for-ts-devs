# AngularLifecycleApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

---

# Angular Component Lifecycle Hooks Demo

This example demonstrates all Angular component lifecycle hooks with a practical, interactive implementation.

## 📋 Lifecycle Hooks Overview

Angular components have a well-defined lifecycle managed by the framework. Here are the hooks in execution order:

### 1. **constructor()**
- Called first when the component class is instantiated
- Use for dependency injection
- **Avoid** complex logic or DOM access

### 2. **ngOnChanges(changes: SimpleChanges)**
- Called when `@Input()` properties change
- Receives a `SimpleChanges` object with previous and current values
- Called before `ngOnInit()` and whenever inputs change
- **Not called** if there are no inputs

### 3. **ngOnInit()**
- Called once after the first `ngOnChanges()`
- Perfect for:
  - Component initialization
  - Fetching data from APIs
  - Setting up subscriptions
- **Most common** place for initialization logic

### 4. **ngDoCheck()**
- Called during every change detection cycle
- Use for custom change detection
- ⚠️ **Warning**: Called very frequently, keep logic lightweight
- Can impact performance if overused

### 5. **ngAfterContentInit()**
- Called once after content projection (`<ng-content>`) is initialized
- Use for accessing `@ContentChild` and `@ContentChildren`
- Called after `ngDoCheck()`

### 6. **ngAfterContentChecked()**
- Called after every check of projected content
- Called after `ngAfterContentInit()` and every `ngDoCheck()`
- ⚠️ **Warning**: Called frequently

### 7. **ngAfterViewInit()**
- Called once after the component's view is initialized
- Perfect for:
  - Accessing `@ViewChild` and `@ViewChildren`
  - Initializing third-party libraries
  - DOM manipulations
- ⚠️ **Note**: View is fully initialized here

### 8. **ngAfterViewChecked()**
- Called after every check of the component's view
- Called after `ngAfterViewInit()` and every `ngAfterContentChecked()`
- ⚠️ **Warning**: Called frequently

### 9. **ngOnDestroy()**
- Called just before the component is destroyed
- **Critical** for cleanup:
  - Unsubscribe from observables
  - Remove event listeners
  - Clear timers
  - Release resources
- Prevents memory leaks

## 🎯 Execution Order Diagram

```
Component Creation:
├── constructor()
├── ngOnChanges()      [if @Input exists]
├── ngOnInit()         [once]
├── ngDoCheck()
├── ngAfterContentInit()    [once]
├── ngAfterContentChecked()
├── ngAfterViewInit()       [once]
└── ngAfterViewChecked()

Change Detection Cycle (repeats):
├── ngOnChanges()      [if @Input changed]
├── ngDoCheck()
├── ngAfterContentChecked()
└── ngAfterViewChecked()

Component Destruction:
└── ngOnDestroy()      [once]
```

## 🚀 Running the Demo

### Prerequisites
- Angular CLI installed: `npm install -g @angular/cli`
- Node.js and npm

### Setup Instructions

1. Create a new Angular project (if not already done):
   ```bash
   ng new angular-lifecycle-demo
   cd angular-lifecycle-demo
   ```

2. Copy the component files to your project:
   ```bash
   # Copy lifecycle.component.ts to src/app/
   # Copy parent.component.ts to src/app/
   # Update app.module.ts with the provided module
   ```

3. Update `app.component.html` to use the parent component:
   ```html
   <app-parent></app-parent>
   ```

4. Run the development server:
   ```bash
   ng serve
   ```

5. Open `http://localhost:4200` in your browser

### Standalone Component Setup (Angular 15+)

For modern Angular apps using standalone components:

```typescript
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LifecycleComponent } from './lifecycle.component';
import { ParentComponent } from './parent.component';

// Bootstrap the app
bootstrapApplication(ParentComponent, {
  providers: []
});
```

## 🧪 Testing the Lifecycle Hooks

### Test 1: Initial Load
1. Load the page
2. Observe the logs showing the creation sequence
3. Notice the order: constructor → ngOnChanges → ngOnInit → etc.

### Test 2: Input Changes
1. Change the component name in the input field
2. Watch `ngOnChanges` fire with previous/current values
3. See change detection hooks (ngDoCheck, ngAfterContentChecked, etc.) execute

### Test 3: User Interaction
1. Click "Increment Counter" button
2. Observe change detection cycle without `ngOnChanges`
3. Notice ngDoCheck and other check hooks fire

### Test 4: Component Destruction
1. Click "Destroy Component" button
2. See `ngOnDestroy` called
3. Click "Create Component" to see initialization again

## 💡 Best Practices

### ✅ DO:
- Use `ngOnInit()` for initialization logic
- Use `ngOnDestroy()` for cleanup (unsubscribe, etc.)
- Use `ngAfterViewInit()` for ViewChild access
- Keep `ngDoCheck()` logic lightweight
- Use `ngOnChanges()` to react to input changes
- **Use async pipe in templates to auto-manage subscriptions**
- Use `takeUntil()` pattern for manual subscriptions

### ❌ DON'T:
- Don't put complex logic in constructor
- Don't access ViewChild in ngOnInit (use ngAfterViewInit)
- Don't forget to unsubscribe in ngOnDestroy (or use async pipe!)
- Don't perform heavy operations in frequently-called hooks
- Don't modify component state in ngAfterViewChecked (causes ExpressionChangedAfterItHasBeenCheckedError)
- Don't manually subscribe when async pipe would work

## 📚 Common Use Cases

### Fetching Data (Using Async Pipe - Recommended)
```typescript
// Component
data$: Observable<any>;

ngOnInit(): void {
  this.data$ = this.dataService.getData();
}

// Template
// <div *ngIf="data$ | async as data">
//   {{ data | json }}
// </div>
```

**Alternative: Manual Subscription**
```typescript
data: any;

ngOnInit(): void {
  this.dataService.getData().subscribe(data => {
    this.data = data;
  });
}
```

### Cleanup Subscriptions (Using Async Pipe - Recommended)
```typescript
// Component class
data$: Observable<any>;

ngOnInit(): void {
  this.data$ = this.dataService.getData();
  // No need to subscribe or unsubscribe!
}

// Template
// <div *ngIf="data$ | async as data">{{ data }}</div>
```

**Alternative: Manual Subscription (if async pipe not suitable)**
```typescript
private subscription: Subscription;

ngOnInit(): void {
  this.subscription = this.dataService.getData().subscribe(data => {
    this.data = data;
  });
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
```

**Best Practice: takeUntil Pattern**
```typescript
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

private destroy$ = new Subject<void>();

ngOnInit(): void {
  this.dataService.getData()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => this.data = data);
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
```

### Accessing View Children
```typescript
@ViewChild('myElement') element: ElementRef;

ngAfterViewInit(): void {
  // Safe to access this.element here
  console.log(this.element.nativeElement);
}
```

### Reacting to Input Changes
```typescript
@Input() userId: string;

ngOnChanges(changes: SimpleChanges): void {
  if (changes['userId'] && !changes['userId'].firstChange) {
    this.loadUserData(changes['userId'].currentValue);
  }
}
```

## 🔗 Additional Resources

- [Angular Lifecycle Hooks - Official Docs](https://angular.io/guide/lifecycle-hooks)
- [Understanding Change Detection](https://angular.io/guide/change-detection)
- [Component Interaction](https://angular.io/guide/component-interaction)

## 📝 Notes

- This demo includes extensive console logging to track hook execution
- The component maintains logs with timestamps for easy debugging
- Check your browser's developer console for additional detailed logs
- The demo is interactive - try different actions to see how hooks respond

---

Happy coding with Angular! 🅰️
