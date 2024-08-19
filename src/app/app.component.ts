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
     // Check for custom delimiter
     const delimiterMatch = numbers.match(/^\/\/(.+?)\n(.+)/s);

     let numbersString: string;
 
     if (delimiterMatch) {
       // Extract the delimiter and numbers part
       const delimiter = delimiterMatch[1];
       numbersString = delimiterMatch[2];
 
       // Replace all instances of the custom delimiter and newlines with commas
       const cleanedValue = numbersString.replace(new RegExp(`\\${delimiter}`, 'g'), ',').replace(/\n+/g, ',');
 
       // Split by commas, convert to numbers, and sum up
       return cleanedValue.split(',')
                           .map(num => parseFloat(num.trim()))
                           .reduce((acc, num) => !isNaN(num) ? acc + num : acc, 0);
     } else {
       // Default handling when no custom delimiter is provided
       // Replace newlines with commas
       const cleanedValue = numbers.replace(/\n+/g, ',');
       // Split by commas, convert to numbers, and sum up
       return cleanedValue.split(',')
                           .map(num => parseFloat(num.trim()))
                           .reduce((acc, num) => !isNaN(num) ? acc + num : acc, 0);
     }
  }
  onSubmit(): void {
    const result = this.add(this.inputValue);
    this.outputValue = result;
    // You can add additional logic here, such as displaying the result to the user.
  }
}
