// Letter component: single cell
function Letter({ char, color }) {
  return (
    <div className={`w-12 h-12 flex items-center justify-center text-xl font-bold uppercase border border-gray-400 ${color} text-black dark:text-white`}>
      {char === ' ' ? '' : char}
    </div>
  );
}

export default Letter;