const getRndInt = (min, max) => {
  return Math.floor(Math.random() * ( max - min )) + min;
};

const isValid = (arr, row, col) => {
  return ( arr[ row ] !== undefined && arr[ row ][ col ] !== undefined );
};

const isMine = (arr, row, col) => {
  //if (typeof arr !== "array") return;
  const cell = arr[ row ][ col ];
  return !!Number(cell) ? cell < 0 : cell.isMine;
};

const isRevealed = (arr, row, col) => {
  return arr[ row ][ col ].isRevealed;
};

const isFlagged = (arr, row, col) => {
  return arr[ row ][ col ].isFlagged;
};

const isProtected = (arr, row, col) => {
  return isRevealed(arr, row, col) || isFlagged(arr, row, col);
};

export {
  isProtected,
  getRndInt,
  isValid,
  isMine
};