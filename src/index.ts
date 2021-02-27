import { BoardCoordinate, Chessboard } from "./Chessboard";
import {
  WHITE_KING,
  WHITE_QUEEN,
  WHITE_KNIGHT,
  WHITE_ROOK,
  WHITE_BISHOP,
  WHITE_PAWN,
  BLACK_KING,
  BLACK_QUEEN,
  BLACK_KNIGHT,
  BLACK_ROOK,
  BLACK_BISHOP,
  BLACK_PAWN,
} from "./Pieces";

export class SVGChessboard {
  chessboard: Chessboard;

  private readonly xmlns = "http://www.w3.org/2000/svg";
  private readonly whiteColor = "white";
  private readonly blackColor = "gray";
  private readonly defaultHighlightColor = "green";

  private highlights: Array<[BoardCoordinate, string]> = [];

  private constructor(
    chessboard: Chessboard,
    private readonly squareSize: number
  ) {
    this.chessboard = chessboard;
  }

  draw(): SVGElement {
    let g = document.createElementNS(this.xmlns, "g");
    g.appendChild(this.drawBoard());
    g.appendChild(this.drawPieces());
    return g;
  }

  highlight(cell: string, color = this.defaultHighlightColor) {
    const [c, r] = this.chessboard.algebraicToCoord(cell);
    this.highlightCoord(c, r, color);
  }

  highlightCoord(c: number, r: number, color = this.defaultHighlightColor) {
    this.highlights.push([[c, r], color]);
  }

  removeHighlight(cell: string) {
    this.removeHighlightCoord(...this.chessboard.algebraicToCoord(cell));
  }

  removeHighlightCoord(c: number, r: number) {
    this.highlights = this.highlights.filter(([coord, _]) => {
      coord !== [c, r];
    });
  }

  private getHighlightedColor(c: number, r: number): string | undefined {
    const highlightItem = this.highlights.find((hi) => {
      const [x, y] = hi[0];
      return x === c && y === r;
    });
    return highlightItem?.[1];
  }

  private drawBoard(): SVGElement {
    let g = document.createElementNS(this.xmlns, "g");
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        g.appendChild(this.drawSquare([c, r]));
      }
    }
    return g;
  }

  private drawPieces(): SVGElement {
    let g = document.createElementNS(this.xmlns, "g");
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.chessboard.get(c, r);
        if (piece === "K") {
          g.appendChild(this.drawPiece([c, r], WHITE_KING));
        }
        if (piece === "Q") {
          g.appendChild(this.drawPiece([c, r], WHITE_QUEEN));
        }
        if (piece === "N") {
          g.appendChild(this.drawPiece([c, r], WHITE_KNIGHT));
        }
        if (piece === "R") {
          g.appendChild(this.drawPiece([c, r], WHITE_ROOK));
        }
        if (piece === "B") {
          g.appendChild(this.drawPiece([c, r], WHITE_BISHOP));
        }
        if (piece === "P") {
          g.appendChild(this.drawPiece([c, r], WHITE_PAWN));
        }
        if (piece === "k") {
          g.appendChild(this.drawPiece([c, r], BLACK_KING));
        }
        if (piece === "q") {
          g.appendChild(this.drawPiece([c, r], BLACK_QUEEN));
        }
        if (piece === "n") {
          g.appendChild(this.drawPiece([c, r], BLACK_KNIGHT));
        }
        if (piece === "r") {
          g.appendChild(this.drawPiece([c, r], BLACK_ROOK));
        }
        if (piece === "b") {
          g.appendChild(this.drawPiece([c, r], BLACK_BISHOP));
        }
        if (piece === "p") {
          g.appendChild(this.drawPiece([c, r], BLACK_PAWN));
        }
      }
    }
    return g;
  }

  private drawPiece(coord: BoardCoordinate, piece: string): SVGElement {
    let [x, y] = this.getBoardSVGCord(coord);
    const DELTA = 3;
    let g = document.createElementNS(this.xmlns, "g");
    g.setAttributeNS(null, "transform", `translate(${x - DELTA},${y - DELTA})`);
    g.innerHTML = piece;
    return g;
  }

  private drawSquare(coord: BoardCoordinate): SVGRectElement {
    let [x, y] = this.getBoardSVGCord(coord);
    let rect = document.createElementNS(this.xmlns, "rect");
    rect.setAttributeNS(null, "x", String(x));
    rect.setAttributeNS(null, "y", String(y));
    rect.setAttributeNS(null, "width", String(this.squareSize));
    rect.setAttributeNS(null, "height", String(this.squareSize));
    const highlightColor = this.getHighlightedColor(...coord);
    if (highlightColor) {
      rect.setAttributeNS(null, "fill", highlightColor);
    } else {
      rect.setAttributeNS(
        null,
        "fill",
        (coord[1] + coord[0]) % 2 === 0 ? this.whiteColor : this.blackColor
      );
    }
    return rect;
  }

  private getBoardSVGCord([c, r]: BoardCoordinate): [number, number] {
    return [c * this.squareSize, r * this.squareSize];
  }

  static fromFEN(fenString: string, squareSize: number = 40) {
    return new SVGChessboard(Chessboard.fromFEN(fenString), squareSize);
  }
}
