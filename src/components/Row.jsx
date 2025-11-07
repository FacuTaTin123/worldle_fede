import Letter from './Letter.jsx';

// Row component: 5 letters
function Row({ word, info }) {
  return (
    <div className="grid grid-cols-5 gap-1">
      {word.split('').map((char, index) => (
        <Letter 
          key={index} 
          char={char} 
          color={info ? getColor(info[index].scoring) : 'bg-gray-300 dark:bg-gray-600'} 
        />
      ))}
    </div>
  );
}

// Helper to get color class from scoring
function getColor(scoring) {
  if (scoring.correct_idx) return 'bg-green-500';
  if (scoring.in_word) return 'bg-yellow-500';
  return 'bg-gray-500';
}

export default Row;