# Angular Component Lifecycle Hooks - Visual Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPONENT CREATION PHASE                     │
└─────────────────────────────────────────────────────────────────┘

    ┌──────────────────┐
    │   constructor()  │  Class instantiation
    │                  │  - Dependency injection
    │   Called: ONCE   │  - Simple initialization
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │  ngOnChanges()   │  Input properties set/changed
    │                  │  - Access previous & current values
    │Called: ON INPUT │  - Only if @Input() exists
    │      CHANGES     │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │   ngOnInit()     │  ⭐ MOST COMMON INITIALIZATION
    │                  │  - Fetch data from APIs
    │   Called: ONCE   │  - Setup subscriptions
    │                  │  - Complex initialization
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │   ngDoCheck()    │  ⚠️  Custom change detection
    │                  │  - Detect custom changes
    │ Called: EVERY    │  - Keep lightweight!
    │  CHANGE CYCLE    │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │ngAfterContent    │  Content projection initialized
    │    Init()        │  - Access @ContentChild
    │                  │  - Setup projected content
    │   Called: ONCE   │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │ngAfterContent    │  ⚠️  After content checked
    │   Checked()      │  - Validate content
    │                  │  - Keep lightweight!
    │ Called: EVERY    │
    │  CHANGE CYCLE    │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │ngAfterViewInit() │  ⭐ VIEW READY
    │                  │  - Access @ViewChild
    │   Called: ONCE   │  - DOM manipulation
    │                  │  - Init 3rd party libs
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │ngAfterView       │  ⚠️  After view checked
    │  Checked()       │  - Validate view
    │                  │  - Keep lightweight!
    │ Called: EVERY    │
    │  CHANGE CYCLE    │
    └────────┬─────────┘
             │
             ▼

┌─────────────────────────────────────────────────────────────────┐
│                  CHANGE DETECTION CYCLES                        │
│                  (Repeats on updates)                           │
└─────────────────────────────────────────────────────────────────┘

    ┌──────────────────────────────────────────┐
    │  User interaction / Input change /       │
    │  Timer / Async event                     │
    └──────────────┬───────────────────────────┘
                   │
                   ▼
    ┌──────────────────────────────┐
    │  ngOnChanges()               │  (Only if @Input changed)
    └──────────────┬───────────────┘
                   │
                   ▼
    ┌──────────────────────────────┐
    │  ngDoCheck()                 │
    └──────────────┬───────────────┘
                   │
                   ▼
    ┌──────────────────────────────┐
    │  ngAfterContentChecked()     │
    └──────────────┬───────────────┘
                   │
                   ▼
    ┌──────────────────────────────┐
    │  ngAfterViewChecked()        │
    └──────────────┬───────────────┘
                   │
                   └──────┐
                          │  (Cycle continues...)
                          └───────────────┐
                                          ▼

┌─────────────────────────────────────────────────────────────────┐
│                   COMPONENT DESTRUCTION                         │
└─────────────────────────────────────────────────────────────────┘

                   ┌──────────────────┐
                   │  ngOnDestroy()   │  ⭐ CLEANUP
                   │                  │  - Unsubscribe
                   │  Called: ONCE    │  - Remove listeners
                   │                  │  - Clear timers
                   └──────────────────┘

```

## Timing of Lifecycle Hooks

### During Component Initialization

```
Time →

[0ms]    constructor()
         ↓
[~1ms]   ngOnChanges()        ← If @Input properties exist
         ↓
[~2ms]   ngOnInit()           ← Initialize here! ⭐
         ↓
[~3ms]   ngDoCheck()
         ↓
[~4ms]   ngAfterContentInit()
         ↓
[~5ms]   ngAfterContentChecked()
         ↓
[~6ms]   ngAfterViewInit()    ← Access ViewChild here! ⭐
         ↓
[~7ms]   ngAfterViewChecked()
         ↓
         Component is fully initialized ✓
```

### During Change Detection

```
User clicks button / Input changes / HTTP response arrives

         ↓
[0ms]    ngOnChanges()        ← Only if @Input changed
         ↓
[~1ms]   ngDoCheck()          ⚠️  Called EVERY time
         ↓
[~2ms]   ngAfterContentChecked() ⚠️  Called EVERY time
         ↓
[~3ms]   ngAfterViewChecked()    ⚠️  Called EVERY time
         ↓
         Render complete ✓
```

## Decision Tree: Which Hook Should I Use?

```
START: What do you need to do?
  │
  ├─ Need to inject services?
  │  └─► Use: constructor()
  │
  ├─ Need to initialize component?
  │  └─► Use: ngOnInit() ⭐
  │
  ├─ Need to react to @Input changes?
  │  └─► Use: ngOnChanges()
  │
  ├─ Need to access ViewChild/template element?
  │  └─► Use: ngAfterViewInit() ⭐
  │
  ├─ Need to access ContentChild/projected content?
  │  └─► Use: ngAfterContentInit()
  │
  ├─ Need custom change detection?
  │  └─► Use: ngDoCheck() (⚠️  Use carefully!)
  │
  ├─ Need to cleanup/unsubscribe?
  │  └─► Use: ngOnDestroy() ⭐
  │
  └─ Need to respond to every change?
     └─► Use: ngAfterViewChecked() or ngAfterContentChecked()
         (⚠️  Use carefully - performance impact!)
```

## Frequency Chart

```
Frequency of Execution:

ONCE ONLY:
  ■■■■■  constructor()
  ■■■■■  ngOnInit()
  ■■■■■  ngAfterContentInit()
  ■■■■■  ngAfterViewInit()
  ■■■■■  ngOnDestroy()

OCCASIONALLY:
  ■■■■■■■■■■  ngOnChanges() (when @Input changes)

VERY FREQUENT: ⚠️
  ■■■■■■■■■■■■■■■■■■■■  ngDoCheck()
  ■■■■■■■■■■■■■■■■■■■■  ngAfterContentChecked()
  ■■■■■■■■■■■■■■■■■■■■  ngAfterViewChecked()

Legend:
■ = Low impact
■■■■■ = Moderate impact
■■■■■■■■■■■■■■■■■■■■ = High impact (optimize carefully!)
```

## Common Use Cases Mind Map

```
                    LIFECYCLE HOOKS
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
    INITIALIZATION    MONITORING        CLEANUP
        │                 │                 │
        │                 │                 │
   ngOnInit()        ngOnChanges()     ngOnDestroy()
        │                 │                 │
        ├─ API calls      ├─ Input         ├─ Unsubscribe
        ├─ Setup forms    │   validation   ├─ Clear timers
        ├─ Subscribe      ├─ Reload data   ├─ Remove
        │  to data        ├─ Update UI     │   listeners
        └─ Initialize     └─ Log changes   └─ Release
           variables                           resources
           
           
        ngAfterViewInit()    ngDoCheck()
              │                   │
              ├─ Access           ├─ Deep object
              │  ViewChild        │   comparison
              ├─ Init jQuery      ├─ Array
              │  plugins          │   mutation
              ├─ Measure          │   detection
              │  elements         └─ Custom
              └─ Focus              change
                 inputs              tracking
```

## Best Practices Checklist

```
✅ DO:
  □ Use ngOnInit() for initialization
  □ Use ngOnDestroy() for cleanup
  □ Use ngAfterViewInit() for ViewChild access
  □ Keep ngDoCheck() lightweight
  □ Unsubscribe from observables
  □ Remove event listeners in ngOnDestroy()
  □ Use async pipe when possible (auto-unsubscribe)

❌ DON'T:
  □ Put complex logic in constructor
  □ Access ViewChild in ngOnInit (use ngAfterViewInit)
  □ Forget to unsubscribe (memory leaks!)
  □ Heavy operations in frequently-called hooks
  □ Modify state in ngAfterViewChecked
  □ Make HTTP calls in ngDoCheck
  □ Ignore ExpressionChangedAfterItHasBeenCheckedError

⚠️  WARNING SIGNS:
  □ Component feels slow → Check ngDoCheck usage
  □ Memory leaks → Check ngOnDestroy cleanup
  □ ExpressionChanged errors → Check ngAfterView* hooks
  □ Unexpected re-renders → Use OnPush change detection
```

## Performance Optimization Tips

```
┌─────────────────────────────────────────────┐
│        PERFORMANCE OPTIMIZATION             │
└─────────────────────────────────────────────┘

1. Use OnPush Change Detection
   ┌────────────────────────────────┐
   │ @Component({                   │
   │   changeDetection:             │
   │     ChangeDetectionStrategy    │
   │       .OnPush                  │
   │ })                             │
   └────────────────────────────────┘
   
2. Minimize ngDoCheck logic
   ✅ Quick comparison
   ❌ Complex calculations
   
3. Use async pipe for subscriptions
   ✅ Auto-unsubscribe
   ❌ Manual subscription management
   
4. Implement trackBy for *ngFor
   ✅ Efficient list rendering
   ❌ Re-rendering entire lists
   
5. Unsubscribe patterns
   ✅ takeUntil(destroy$)
   ✅ async pipe
   ❌ Manual subscriptions without cleanup
```

---

## Legend

- ⭐ = Most commonly used
- ⚠️  = Use with caution (performance impact)
- ✅ = Recommended practice
- ❌ = Anti-pattern / Don't do this
- [timing] = Approximate execution time
