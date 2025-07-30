let prevPos = 0;
let prevLen = 0;
const lengthPhone = 18;

//* функция установки каретки по заданному положению inp.setSelectionRange(начало, конец)
function moveCaret(inp: HTMLInputElement, pos: number) {
  inp.focus();
  inp.setSelectionRange(pos, pos);
}

export function handleCaret(inp: HTMLInputElement) {
  const startPos = inp.value.length;
  const newPos = inp.selectionStart!;

  //* Установка направления движения каретки
  if (prevPos !== 0 && newPos === startPos) {
    if (newPos > prevLen) {
      const difLen = newPos - prevLen;
      prevPos = prevPos + difLen;
    } else prevPos = prevPos - 1;

    moveCaret(inp, prevPos);
  }
  //* возвращает каретку в конец, когда номер заполнен
  if (newPos === prevLen && prevLen === lengthPhone) {
    moveCaret(inp, prevLen);
  }
  //* ------------------------------

  if (newPos !== startPos) {
    prevPos = newPos;
  }

  prevLen = startPos;
}
