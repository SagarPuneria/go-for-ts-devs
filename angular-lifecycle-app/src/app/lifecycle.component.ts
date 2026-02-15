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
  Input,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  template: `
    <div class="lifecycle-demo">
      <h2>Angular Lifecycle Hooks Demo</h2>
      <p>Component Name: {{ name }}</p>
      <p>Counter: {{ counter }}</p>
      <button (click)="incrementCounter()">Increment Counter</button>
      
      <div class="content">
        <h3>Content Projection Area</h3>
        <ng-content></ng-content>
      </div>
      
      <div class="view">
        <h3>View Child Area</h3>
        <p #viewChild>This is a view child element</p>
      </div>
      
      <div class="logs">
        <h3>Lifecycle Hook Logs:</h3>
        <ul>
          <li *ngFor="let log of logs; let i = index">{{ i + 1 }}. {{ log }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .lifecycle-demo {
      padding: 20px;
      border: 2px solid #3f51b5;
      border-radius: 8px;
      margin: 20px;
    }
    
    h2 {
      color: #3f51b5;
      margin-top: 0;
    }
    
    button {
      background-color: #3f51b5;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin: 10px 0;
    }
    
    button:hover {
      background-color: #303f9f;
    }
    
    .content, .view {
      background-color: #f5f5f5;
      padding: 15px;
      margin: 10px 0;
      border-radius: 4px;
    }
    
    .logs {
      margin-top: 20px;
      background-color: #fff3cd;
      padding: 15px;
      border-radius: 4px;
      max-height: 300px;
      overflow-y: auto;
    }
    
    .logs ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    
    .logs li {
      padding: 5px 0;
      border-bottom: 1px solid #ddd;
      font-family: monospace;
      font-size: 12px;
    }
    
    .logs li:last-child {
      border-bottom: none;
    }
  `]
})
export class LifecycleComponent implements
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  @Input() name: string = 'Default Component';
  counter: number = 0;
  logs: string[] = [];
  
  private checkCount: number = 0;
  private contentCheckCount: number = 0;
  private viewCheckCount: number = 0;

  constructor() {
    this.addLog('#1. Constructor: Component instance created');
  }

  // 2. ngOnChanges - Called when input properties change
  ngOnChanges(changes: SimpleChanges): void {
    this.addLog('#2. ngOnChanges: Input properties changed');
    
    for (const propName in changes) {
      const change = changes[propName];
      const current = JSON.stringify(change.currentValue);
      const previous = JSON.stringify(change.previousValue);
      
      this.addLog(`#2. ngOnChanges: - ${propName}: ${previous} → ${current}`);
    }
  }

  // 3. ngOnInit - Called once after the first ngOnChanges
  ngOnInit(): void {
    this.addLog('#3. ngOnInit: Component initialized (called once)');
    // Perfect place for:
    // - Fetching data from APIs
    // - Setting up subscriptions
    // - Initializing component properties
  }

  // 4. ngDoCheck - Called during every change detection cycle
  ngDoCheck(): void {
    this.checkCount++;
    if (this.checkCount <= 5 || this.checkCount % 10 === 0) {
      this.addLog(`#4. ngDoCheck: Change detection run #${this.checkCount}`);
    }
    // Use for custom change detection
    // Warning: Called frequently, keep logic lightweight
  }

  // 5. ngAfterContentInit - Called once after content projection
  ngAfterContentInit(): void {
    this.addLog('#5. ngAfterContentInit: Content projection initialized (called once)');
    // Perfect place for:
    // - Accessing projected content (ng-content)
    // - Initializing content children (ContentChild/ContentChildren)
  }

  // 6. ngAfterContentChecked - Called after every check of projected content
  ngAfterContentChecked(): void {
    this.contentCheckCount++;
    if (this.contentCheckCount <= 3 || this.contentCheckCount % 10 === 0) {
      this.addLog(`#6. ngAfterContentChecked: Content checked #${this.contentCheckCount}`);
    }
    // Called after ngDoCheck and after checking projected content
  }

  // 7. ngAfterViewInit - Called once after component view initialization
  ngAfterViewInit(): void {
    this.addLog('#7. ngAfterViewInit: View initialized (called once)');
    // Perfect place for:
    // - Accessing view children (ViewChild/ViewChildren)
    // - Initializing third-party libraries
    // - DOM manipulations
  }

  // 8. ngAfterViewChecked - Called after every check of the component's view
  ngAfterViewChecked(): void {
    this.viewCheckCount++;
    if (this.viewCheckCount <= 3 || this.viewCheckCount % 10 === 0) {
      this.addLog(`#8. ngAfterViewChecked: View checked #${this.viewCheckCount}`);
    }
    // Called after ngAfterContentChecked
  }

  // 9. ngOnDestroy - Called just before component is destroyed
  ngOnDestroy(): void {
    this.addLog('#9. ngOnDestroy: Component is being destroyed');
    // Perfect place for:
    // - Unsubscribing from observables
    // - Cleaning up event listeners
    // - Releasing resources
    console.log('#9. ngOnDestroy: Component destroyed - cleanup complete');
  }

  // Helper method to increment counter
  incrementCounter(): void {
    this.counter++;
    this.addLog(`User Action: Counter incremented to ${this.counter}`);
  }

  // Helper method to add logs with timestamp
  private addLog(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.push(`[${timestamp}] ${message}`);

    // Also log to console for debugging
    console.log(`[${timestamp}] ${message}`);
    
    // Keep only last 50 logs to prevent memory issues
    if (this.logs.length > 50) {
      this.logs.shift();
    }
  }
}
