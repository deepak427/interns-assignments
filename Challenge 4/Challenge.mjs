import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a string: ', (input) => {
  const str = input.trim();
  
  // Reverse the string
  const reversed = str.split('').reverse().join('');
  
  // Check if the original string is the same as the reversed string
  if (str === reversed) {
    console.log(`The string '${str}' is a palindrome.`);
  } else {
    console.log(`The string '${str}' is not a palindrome.`);
  }
  
  rl.close();
});
