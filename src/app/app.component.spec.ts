import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'string-calculator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('string-calculator');
  });

  it('should return 0 when add method is called with an empty string', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const result = app.add('');
    expect(result).toBe(0);
  });

  it('should return 0 when add method is called with a string containing only spaces', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const result = app.add('   ');
    expect(result).toBe(0);
  });
  it('should bind inputValue using ngModel', () => {
    const textarea = fixture.nativeElement.querySelector('textarea');
    textarea.value = 'Test input';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.inputValue).toBe('Test input');
  });
  it('should call onSubmit method when submit button is clicked', () => {
    // Spy on the onSubmit method
    spyOn(component, 'onSubmit').and.callThrough();

    // Trigger form submission
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    // Check if the onSubmit method was called
    expect(component.onSubmit).toHaveBeenCalled();
  });
  it('should call add with the correct input value when onSubmit is called', () => {
    // Set up a spy on the add method
    spyOn(component, 'add').and.callThrough();

    // Set the input value
    component.inputValue = '123.45';

    // Trigger form submission
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    // Check if the add method was called with the correct input value
    expect(component.add).toHaveBeenCalledWith('123.45');
  });
  it('should assign the correct value to outputValue when onSubmit is called', () => {
    // Set up a spy on the add method
    spyOn(component, 'add').and.callFake((value: string) => {
      // Define the behavior for the spy
      return value.trim() === '' ? 0 : parseFloat(value);
    });

    // Set the input value
    component.inputValue = '123.45';

    // Trigger form submission
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    // Check if the outputValue was updated correctly
    expect(component.outputValue).toBe(123.45);
  });

  it('should assign 0 to outputValue when inputValue is an empty string', () => {
    // Set up a spy on the add method
    spyOn(component, 'add').and.callFake((value: string) => {
      // Define the behavior for the spy
      return value.trim() === '' ? 0 : parseFloat(value);
    });

    // Set the input value to an empty string
    component.inputValue = '';

    // Trigger form submission
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    // Check if the outputValue was updated correctly
    expect(component.outputValue).toBe(0);
  });
});
