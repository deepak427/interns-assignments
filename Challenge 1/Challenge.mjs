import fs from 'fs';
import readline from 'readline';

//Levenshtein Distance between two strings
function levenshtein(a, b) {
  const Distances = [];

  // Initialize the first row and column of the Distances
  for (let i = 0; i <= a.length; i++) {
    Distances[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    Distances[0][j] = j;
  }

  // Compute the rest of the Distances
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        Distances[i][j] = Distances[i - 1][j - 1];
      } else {
        Distances[i][j] = Math.min(
          Distances[i - 1][j - 1] + 1, // substitution
          Distances[i][j - 1] + 1,     // insertion
          Distances[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return Distances[a.length][b.length];
}

// Read and parse the text file (similarity.txt)
const filePath = 'Challenge 1\\similarity.txt';
let words = [];
try {
  const data = fs.readFileSync(filePath, 'utf8');

  words = data.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
  console.log(`Loaded ${words.length} words from ${filePath}.`);
} catch (err) {
  console.error(`Error reading file ${filePath}:`, err);
  process.exit(1);
}

// Based on the Levenshtein distance
function findSuggestions(query, k = 3) {
  const suggestions = words.map(word => ({
    word,
    distance: levenshtein(query, word)
  }));
  suggestions.sort((a, b) => a.distance - b.distance);
  return suggestions.slice(0, k).map(item => item.word);
}


const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Search word: '
});

userInput.prompt();

userInput.on('line', (line) => {
  const query = line.trim();
  if (query === '') {
    console.log('Please enter a non-empty search term.');
  } else {
    const suggestions = findSuggestions(query, 3);
    console.log('Suggestions:', suggestions.join(', '));
  }
  userInput.prompt();
}).on('close', () => {
  console.log('Exiting approximate search.');
  process.exit(0);
});
