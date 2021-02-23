import { SVGChessboard } from "./SVGChessboard";

const example = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const example2 = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1";

function drawChessboard(): SVGElement {
  const xmlns = "http://www.w3.org/2000/svg";
  var boxWidth = 500;
  var boxHeight = 500;
  var block = document.createElementNS(xmlns, "svg");
  block.setAttributeNS(null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
  block.setAttributeNS(null, "width", String(boxWidth));
  block.setAttributeNS(null, "height", String(boxHeight));

  const svgChessboard = SVGChessboard.fromFEN(example);
  var g = svgChessboard.draw();

  block.appendChild(g);
  block.style.display = "block";

  var svgContainer = document.getElementById("svgContainer");
  if (svgContainer !== null) {
    svgContainer.appendChild(block);
  }
  return block;
}

drawChessboard();
