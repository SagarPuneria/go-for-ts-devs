/**
 * Angular Component Lifecycle Hooks - Quick Reference
 * 
 * This file provides a comprehensive overview of all lifecycle hooks
 * with practical examples and common patterns.
 */

import { 
  Component, 
  OnInit, 
  OnChanges, 
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
  Input
} from '@angular/core';

/**
 * LIFECYCLE HOOKS EXECUTION ORDER:
 * 
 * 1. constructor()                  - Component instantiation
 * 2. ngOnChanges()                 - When @Input() changes (if exists)
 * 3. ngOnInit()                    - Once, after first ngOnChanges
 * 4. ngDoCheck()                   - Every change detection cycle
 * 5. ngAfterContentInit()          - Once, after content projection
 * 6. ngAfterContentChecked()       - After every content check
 * 7. ngAfterViewInit()             - Once, after view initialization
 * 8. ngAfterViewChecked()          - After every view check
 * 9. ngOnDestroy()                 - Before component destruction
 */

@Component({
  selector: 'app-lifecycle-reference',
  template: `<div>Quick Reference Component</div>`
})
export class LifecycleReferenceComponent implements
  OnChanges, OnInit, DoCheck,
  AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked,
  OnDestroy {

  @Input() data: any;

  // ============================================
  // CONSTRUCTOR
  // ============================================
  constructor() {
    // ✅ USE FOR:
    // - Dependency injection
    // - Simple property initialization
    
    // ❌ AVOID:
    // - Complex logic
    // - API calls
    // - Accessing @Input properties (not yet set)
    // - DOM manipulation
    
    console.log('constructor: Component created');
  }

  // ============================================
  // ngOnChanges
  // ============================================
  ngOnChanges(changes: SimpleChanges): void {
    // ✅ USE FOR:
    // - Reacting to @Input() property changes
    // - Comparing previous and current values
    // - Triggering updates based on input changes
    
    // ❌ AVOID:
    // - Heavy computations (called frequently)
    // - Using if component has no @Input properties
    
    // EXAMPLE:
    for (const propName in changes) {
      const change = changes[propName];
      console.log(`${propName} changed from ${change.previousValue} to ${change.currentValue}`);
      
      if (!change.firstChange) {
        // Not the first change, react accordingly
        this.handleInputChange(propName, change.currentValue);
      }
    }
  }

  // ============================================
  // ngOnInit
  // ============================================
  ngOnInit(): void {
    // ✅ USE FOR:
    // - Component initialization
    // - Fetching data from APIs
    // - Setting up subscriptions
    // - Complex initialization logic
    // - @Input properties are now available
    
    // ❌ AVOID:
    // - Accessing @ViewChild/@ViewChildren (use ngAfterViewInit)
    
    // EXAMPLE - Data Fetching:
    // this.dataService.getData().subscribe(data => {
    //   this.data = data;
    // });
    
    // EXAMPLE - Setup:
    // this.initializeForm();
    // this.loadUserPreferences();
    
    console.log('ngOnInit: Component initialized');
  }

  // ============================================
  // ngDoCheck
  // ============================================
  ngDoCheck(): void {
    // ✅ USE FOR:
    // - Custom change detection
    // - Detecting changes Angular doesn't catch
    // - Monitoring object/array mutations
    
    // ❌ AVOID:
    // - Heavy operations (called VERY frequently)
    // - Modifying component state
    
    // ⚠️ WARNING: Called on every change detection cycle!
    
    // EXAMPLE - Custom Change Detection:
    // if (this.hasArrayChanged()) {
    //   this.handleArrayChange();
    // }
    
    console.log('ngDoCheck: Change detection run');
  }

  // ============================================
  // ngAfterContentInit
  // ============================================
  ngAfterContentInit(): void {
    // ✅ USE FOR:
    // - Accessing @ContentChild/@ContentChildren
    // - Working with projected content (ng-content)
    // - Initializing content-related features
    
    // ❌ AVOID:
    // - Using if component has no content projection
    
    // EXAMPLE:
    // console.log('Content children:', this.contentChildren);
    
    console.log('ngAfterContentInit: Content projection initialized');
  }

  // ============================================
  // ngAfterContentChecked
  // ============================================
  ngAfterContentChecked(): void {
    // ✅ USE FOR:
    // - Responding to projected content changes
    // - Validation after content updates
    
    // ❌ AVOID:
    // - Heavy operations (called frequently)
    // - Modifying component state (can cause infinite loop)
    
    console.log('ngAfterContentChecked: Content checked');
  }

  // ============================================
  // ngAfterViewInit
  // ============================================
  ngAfterViewInit(): void {
    // ✅ USE FOR:
    // - Accessing @ViewChild/@ViewChildren
    // - DOM manipulation
    // - Initializing third-party libraries (jQuery plugins, charts, etc.)
    // - Measuring element dimensions
    
    // ❌ AVOID:
    // - Modifying @Input-bound properties (causes ExpressionChangedError)
    
    // EXAMPLE - Accessing View Children:
    // console.log('View element:', this.viewChild.nativeElement);
    
    // EXAMPLE - Third-party library:
    // $(this.element.nativeElement).somePlugin();
    
    console.log('ngAfterViewInit: View initialized');
  }

  // ============================================
  // ngAfterViewChecked
  // ============================================
  ngAfterViewChecked(): void {
    // ✅ USE FOR:
    // - Responding to view changes
    // - Validation after view updates
    
    // ❌ AVOID:
    // - Heavy operations (called frequently)
    // - Modifying component state (can cause infinite loop)
    
    console.log('ngAfterViewChecked: View checked');
  }

  // ============================================
  // ngOnDestroy
  // ============================================
  ngOnDestroy(): void {
    // ✅ USE FOR:
    // - Unsubscribing from observables
    // - Removing event listeners
    // - Clearing timers/intervals
    // - Releasing resources
    // - Cleanup logic
    
    // ❌ AVOID:
    // - Skipping cleanup (causes memory leaks!)
    
    // EXAMPLE - Unsubscribe:
    // this.subscription?.unsubscribe();
    
    // EXAMPLE - Clear timer:
    // clearInterval(this.intervalId);
    
    // EXAMPLE - Remove listener:
    // window.removeEventListener('resize', this.handleResize);
    
    console.log('ngOnDestroy: Component destroyed');
  }

  // ============================================
  // HELPER METHODS
  // ============================================
  
  private handleInputChange(propName: string, value: any): void {
    // Handle input changes
  }
}

/**
 * COMMON PATTERNS
 */

// Pattern 1: Subscription Management
export class SubscriptionPatternComponent implements OnInit, OnDestroy {
  private subscription: any; // or Subscription from rxjs
  
  ngOnInit(): void {
    // this.subscription = this.service.getData().subscribe();
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

// Pattern 2: Multiple Subscriptions with takeUntil
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class TakeUntilPatternComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    // this.service.getData()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// Pattern 3: ViewChild Access
import { ViewChild, ElementRef } from '@angular/core';

export class ViewChildPatternComponent implements AfterViewInit {
  @ViewChild('myElement') myElement!: ElementRef;
  
  ngAfterViewInit(): void {
    // Safe to access this.myElement here
    // console.log(this.myElement.nativeElement);
  }
}

// Pattern 4: Conditional Input Handling
export class ConditionalInputComponent implements OnChanges {
  @Input() userId!: string;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      const change = changes['userId'];
      
      // Only react if not the first change
      if (!change.firstChange) {
        this.loadUserData(change.currentValue);
      }
    }
  }
  
  private loadUserData(userId: string): void {
    // Load user data
  }
}

/**
 * PERFORMANCE TIPS
 */

// 1. Use OnPush Change Detection Strategy
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-optimized',
  template: `<div>Optimized Component</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  // Reduces change detection cycles
  // Component only checks when:
  // - Input references change
  // - Events fire from template
  // - Async pipe receives new value
  // - Manual markForCheck() called
}

// 2. Avoid Expensive Operations in Frequently-Called Hooks
export class PerformanceComponent implements DoCheck {
  ngDoCheck(): void {
    // ❌ BAD: Heavy operation in ngDoCheck
    // this.expensiveCalculation();
    
    // ✅ GOOD: Lightweight check with memoization
    // if (this.cachedValue !== this.currentValue) {
    //   this.cachedValue = this.currentValue;
    //   this.updateDerivedValue();
    // }
  }
}

/**
 * DEBUGGING TIPS
 */

// Log all lifecycle hooks for debugging
export class DebuggableComponent implements OnInit, OnDestroy {
  private componentName = 'DebuggableComponent';
  
  constructor() {
    this.log('constructor');
  }
  
  ngOnInit(): void {
    this.log('ngOnInit');
  }
  
  ngOnDestroy(): void {
    this.log('ngOnDestroy');
  }
  
  private log(hookName: string): void {
    console.log(`[${this.componentName}] ${hookName}`, {
      timestamp: new Date().toISOString(),
      // Add any relevant state
    });
  }
}
