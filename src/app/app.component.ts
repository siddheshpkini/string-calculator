import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'string-calculator';
  inputValue: string = '';
  outputValue: number = 0;
  add(numbers: string): number{
    if (numbers.trim() === '') {
      return 0;
    }
    return parseInt(numbers);
  }
  onSubmit(): void {
    const result = this.add(this.inputValue);
    this.outputValue = result;
    // You can add additional logic here, such as displaying the result to the user.
  }
}
