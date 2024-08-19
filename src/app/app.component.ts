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
    const substrings = numbers.split(',');

    // Map each substring to a floating-point number after trimming whitespace
    const values = substrings.map(substring => {
      // Trim any leading or trailing whitespace and convert to a number
      const number = parseFloat(substring.trim());
      return number;
    });

    // Use reduce to sum up the valid numbers (ignoring NaN values)
    const sum = values.reduce((accumulator, current) => {
      // Add only valid numbers (not NaN) to the accumulator
      if (!isNaN(current)) {
        return accumulator + current;
      }
      return accumulator; // If current is NaN, just return the accumulator unchanged
    }, 0);

    // Return the computed sum
    return sum;
  }
  onSubmit(): void {
    const result = this.add(this.inputValue);
    this.outputValue = result;
    // You can add additional logic here, such as displaying the result to the user.
  }
}
