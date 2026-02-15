# Angular Lifecycle Hooks - Quick Cheatsheet

## 🚀 Quick Reference Table

| Hook | Called | Frequency | Purpose | Common Use Cases |
|------|--------|-----------|---------|------------------|
| **constructor()** | Component instantiated | Once | DI & basic setup | Inject services |
| **ngOnChanges()** | @Input changes | On input change | React to inputs | Validate inputs, reload data |
| **ngOnInit()** ⭐ | After first ngOnChanges | Once | Initialize | API calls, subscriptions, setup |
| **ngDoCheck()** ⚠️ | Every change detection | Very frequent | Custom detection | Deep object checks |
| **ngAfterContentInit()** | Content projected | Once | Content ready | Access ContentChild |
| **ngAfterContentChecked()** ⚠️ | After content check | Very frequent | Content validation | Content updates |
| **ngAfterViewInit()** ⭐ | View initialized | Once | View ready | Access ViewChild, DOM, 3rd party libs |
| **ngAfterViewChecked()** ⚠️ | After view check | Very frequent | View validation | View updates |
| **ngOnDestroy()** ⭐ | Before destruction | Once | Cleanup | Unsubscribe, clear timers |

⭐ = Most commonly used  
⚠️ = Use carefully (performance impact)

---

## 📝 One-Liner Summaries

```typescript
constructor()              // Create: "I exist now"
ngOnChanges()             // Input: "My @Input changed"
ngOnInit()                // Setup: "Let me initialize" ⭐
ngDoCheck()               // Check: "Did something change?"
ngAfterContentInit()      // Content: "My content is ready"
ngAfterContentChecked()   // Content: "Content was checked"
ngAfterViewInit()         // View: "My view is ready" ⭐
ngAfterViewChecked()      // View: "View was checked"
ngOnDestroy()             // Cleanup: "Goodbye, cleaning up" ⭐
```

---

## 🎯 When to Use What

### Need to initialize? → `ngOnInit()` ⭐
```typescript
ngOnInit(): void {
  this.loadData();
  this.setupForm();
  this.startTimer();
}
```

### Need ViewChild? → `ngAfterViewInit()` ⭐
```typescript
@ViewChild('input') input: ElementRef;
ngAfterViewInit(): void {
  this.input.nativeElement.focus();
}
```

### Need to cleanup? → `ngOnDestroy()` ⭐
```typescript
ngOnDestroy(): void {
  this.subscription.unsubscribe();
  clearInterval(this.timer);
}
```

### Need to react to inputs? → `ngOnChanges()`
```typescript
@Input() data: any;
ngOnChanges(changes: SimpleChanges): void {
  if (changes['data']) {
    this.processData(changes['data'].currentValue);
  }
}
```

---

## ⚡ Quick Copy-Paste Templates

### Basic Lifecycle Component
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `<p>Example works!</p>`
})
export class ExampleComponent implements OnInit, OnDestroy {
  
  constructor() { }
  
  ngOnInit(): void {
    // Initialize here
  }
  
  ngOnDestroy(): void {
    // Cleanup here
  }
}
```

### Component with Input
```typescript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `<p>{{ data }}</p>`
})
export class ExampleComponent implements OnChanges {
  @Input() data: any;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.handleDataChange(changes['data'].currentValue);
    }
  }
  
  private handleDataChange(newData: any): void {
    // Handle the change
  }
}
```

### Component with ViewChild
```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `<input #myInput type="text">`
})
export class ExampleComponent implements AfterViewInit {
  @ViewChild('myInput') myInput!: ElementRef;
  
  ngAfterViewInit(): void {
    this.myInput.nativeElement.focus();
  }
}
```

### Component with Subscription
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-example',
  template: `<p>{{ data }}</p>`
})
export class ExampleComponent implements OnInit, OnDestroy {
  data: any;
  private subscription!: Subscription;
  
  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
    this.subscription = this.dataService.getData()
      .subscribe(data => this.data = data);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
```

### Component with takeUntil Pattern (Recommended)
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-example',
  template: `<p>{{ data }}</p>`
})
export class ExampleComponent implements OnInit, OnDestroy {
  data: any;
  private destroy$ = new Subject<void>();
  
  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
    this.dataService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.data = data);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

## 🚫 Common Mistakes

| ❌ Don't | ✅ Do |
|---------|-------|
| API calls in constructor | API calls in ngOnInit |
| Access ViewChild in ngOnInit | Access ViewChild in ngAfterViewInit |
| Forget to unsubscribe | Always unsubscribe in ngOnDestroy |
| Heavy logic in ngDoCheck | Keep ngDoCheck lightweight |
| Modify state in ngAfterViewChecked | Use ngOnInit or event handlers |

---

## 🔍 Debugging Lifecycle

```typescript
export class DebuggableComponent {
  constructor() { console.log('1. constructor'); }
  ngOnChanges() { console.log('2. ngOnChanges'); }
  ngOnInit() { console.log('3. ngOnInit'); }
  ngDoCheck() { console.log('4. ngDoCheck'); }
  ngAfterContentInit() { console.log('5. ngAfterContentInit'); }
  ngAfterContentChecked() { console.log('6. ngAfterContentChecked'); }
  ngAfterViewInit() { console.log('7. ngAfterViewInit'); }
  ngAfterViewChecked() { console.log('8. ngAfterViewChecked'); }
  ngOnDestroy() { console.log('9. ngOnDestroy'); }
}
```

---

## 💡 Pro Tips

1. **Use OnPush for better performance**
   ```typescript
   @Component({
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   ```

2. **Use async pipe to avoid manual unsubscribe**
   ```html
   <p>{{ data$ | async }}</p>
   ```

3. **Implement trackBy for large lists**
   ```typescript
   trackById(index: number, item: any): any {
     return item.id;
   }
   ```

4. **Use Angular DevTools to visualize lifecycle**
   - Chrome Extension: Angular DevTools
   - Shows component tree and change detection

---

## 📚 Order of Execution

```
Component Created:
  1. constructor
  2. ngOnChanges (if @Input exists)
  3. ngOnInit
  4. ngDoCheck
  5. ngAfterContentInit
  6. ngAfterContentChecked
  7. ngAfterViewInit
  8. ngAfterViewChecked

On Update:
  1. ngOnChanges (if @Input changed)
  2. ngDoCheck
  3. ngAfterContentChecked
  4. ngAfterViewChecked

Component Destroyed:
  1. ngOnDestroy
```

---

## 🎓 Learning Resources

- [Official Angular Docs](https://angular.io/guide/lifecycle-hooks)
- [Angular University](https://angular-university.io/)
- [Component Lifecycle - YouTube](https://www.youtube.com/results?search_query=angular+lifecycle+hooks)

---

**Remember:** The three most important hooks are:
1. **ngOnInit()** - Initialize 
2. **ngAfterViewInit()** - Access view
3. **ngOnDestroy()** - Cleanup

Start with these three, then add others as needed! 🚀
