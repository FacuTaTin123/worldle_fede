import Row from './Row.jsx';

// Board component: displays 6 rows for guesses
function Board({ guesses, currentInput, attempts }) {
  const rows = [];

  for (let i = 0; i < 6; i++) {
    if (i < guesses.length) {
      // Past guess with colors
      rows.push(<Row key={i} word={guesses[i].word} info={guesses[i].info} />);
    } else if (i === attempts) {
      // Current input row
      rows.push(<Row key={i} word={currentInput.padEnd(5, ' ')} info={null} />);
    } else {
      // Empty future rows
      rows.push(<Row key={i} word={'     '} info={null} />);
    }
  }

  return (
    <div className="grid grid-rows-6 gap-1 my-4">
      {rows}
    </div>
  );
}

export default Board;