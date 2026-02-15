import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <div class="parent-container">
      <h1>Angular Lifecycle Hooks - Interactive Demo</h1>
      
      <div class="controls">
        <label>
          Component Name:
          <input 
            type="text" 
            [(ngModel)]="componentName" 
            placeholder="Enter component name"
          />
        </label>
        
        <button (click)="toggleComponent()">
          {{ showComponent ? 'Destroy Component' : 'Create Component' }}
        </button>
      </div>

      <div class="info-box">
        <h3>🎮 What You Can Do?</h3>
        <ul>
          <li><strong>Change the component name:</strong> Triggers ngOnChanges()</li>
          <li><strong>Click "Increment Counter":</strong> Triggers change detection hooks</li>
          <li><strong>Toggle "Destroy/Create Component":</strong> Triggers ngOnDestroy() and ngOnInit()</li>
        </ul>
      </div>

      <app-lifecycle 
        *ngIf="showComponent"
        [name]="componentName">
        <p>This content is projected using ng-content!</p>
        <p>It demonstrates content projection hooks.</p>
      </app-lifecycle>

      <div class="explanation" *ngIf="!showComponent">
        <h2>Component is destroyed</h2>
        <p>Click "Create Component" to see the lifecycle hooks in action.</p>
      </div>
    </div>
  `,
  styles: [`
    .parent-container {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }
    
    .controls {
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }
    
    label {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-weight: 500;
    }
    
    input {
      padding: 8px 12px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      min-width: 200px;
    }
    
    input:focus {
      outline: none;
      border-color: #3f51b5;
    }
    
    button {
      background-color: #4caf50;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: background-color 0.3s;
    }
    
    button:hover {
      background-color: #45a049;
    }
    
    .info-box {
      background-color: #e3f2fd;
      border-left: 4px solid #2196f3;
      padding: 15px 20px;
      margin-bottom: 20px;
      border-radius: 4px;
    }
    
    .info-box h3 {
      margin-top: 0;
      color: #1976d2;
    }
    
    .info-box ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    
    .info-box li {
      margin: 8px 0;
    }
    
    .explanation {
      text-align: center;
      padding: 40px;
      background-color: #fff3cd;
      border-radius: 8px;
      margin-top: 20px;
    }
    
    .explanation h2 {
      color: #856404;
      margin-top: 0;
    }
  `]
})
export class ParentComponent {
  componentName: string = 'Lifecycle Demo';
  showComponent: boolean = true;

  toggleComponent(): void {
    this.showComponent = !this.showComponent;
    console.log(`Component ${this.showComponent ? 'created' : 'destroyed'}`);
  }
}
