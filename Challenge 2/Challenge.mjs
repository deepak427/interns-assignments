import fs from 'fs';
import path from 'path';

const inputFilePath = path.join('Challenge 2\\arithmatic_expressions.txt'); // Input file with arithmetic expressions
const outputFilePath = path.join('Challenge 2\\challenge_output.txt'); 

// Read the input file
const fileContent = fs.readFileSync(inputFilePath, 'utf8');
const lines = fileContent.split(/\r?\n/).filter(line => line.trim().length > 0);

function transformExpression(expr) {
  expr = expr.trim();
  if (expr.endsWith('=')) {
    expr = expr.slice(0, -1); // Remove trailing "="
  }
  
  // Replace brackets with parentheses
  expr = expr.replace(/[\[\{]/g, '(').replace(/[\]\}]/g, ')');
  
  // Replace caret '^' with '**'
  expr = expr.replace(/\^/g, '**');
  
  // Handle implicit multiplication:
  // 1. Number immediately followed by an opening parenthesis:  "2(" -> "2*("
  expr = expr.replace(/(\d)(\()/g, '$1*(');
  // 2. Closing parenthesis immediately followed by an opening parenthesis:  ")(" -> ")*("
  expr = expr.replace(/\)(\()/g, ')*(');
  // 3. Closing parenthesis immediately followed by a digit:  ")3" -> ")*3"
  expr = expr.replace(/\)(\d)/g, ')*$1');
  // Replace a closing parenthesis followed by optional whitespace and an opening parenthesis with ')*('
  expr = expr.replace(/\)\s*\(/g, ')*(');

  return expr;
}

function evaluateExpression(expr) {
  const transformed = transformExpression(expr);
  try {
    // Use eval to calculate the result (note: only use eval on trusted input)
    const result = eval(transformed);
    return result;
  } catch (error) {
    console.error("Error evaluating expression:", expr, "transformed to", transformed);
    return "Error";
  }
}

const outputLines = lines.map(line => {
  const result = evaluateExpression(line);
  // Format the output: append the result after the "=" (if not already present)
  const trimmed = line.trim();
  let formatted;
  if (trimmed.endsWith('=')) {
    formatted = `${trimmed} ${result}`;
  } else {
    formatted = `${trimmed} = ${result}`;
  }
  return formatted;
});

// Write the results to the output file
fs.writeFileSync(outputFilePath, outputLines.join('\n'), 'utf8');
console.log(`Output written to ${outputFilePath}`);
