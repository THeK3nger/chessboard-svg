import { Chessboard } from "../dist/Chessboard";

const example = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const baseChessboard = Chessboard.fromFEN(example);

test("Parse Valid FEN String should not throw.", () => {
  expect(() => Chessboard.fromFEN(example)).not.toThrow();
  let chessboard = Chessboard.fromFEN(example);
  let numPawn = 0;
  for (let c = 0; c < 8; c++) {
    for (let r = 0; r < 8; r++) {
      if (chessboard.get(c, r) == "p" || chessboard.get(c, r) == "P") {
        numPawn++;
      }
    }
  }
  expect(numPawn).toBe(16);
  expect(chessboard.get(0, 0)).toBe("r");
  expect(chessboard.getAlgebraic("a8")).toBe("r");
});

test("Number of pawns of example chessboard should be 16.", () => {
  let numPawn = 0;
  for (let c = 0; c < 8; c++) {
    for (let r = 0; r < 8; r++) {
      if (baseChessboard.get(c, r) == "p" || baseChessboard.get(c, r) == "P") {
        numPawn++;
      }
    }
  }
  expect(numPawn).toBe(16);
});

test("I should find the right pieces in the standard board, both by coords than by algebraic notation.", () => {
  expect(baseChessboard.get(0, 0)).toBe("r");
  expect(baseChessboard.get(0, 7)).toBe("R");
  expect(baseChessboard.getAlgebraic("a1")).toBe("R");
});
