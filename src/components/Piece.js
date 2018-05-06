import React, { Component } from "react";
// import { DragSource, DropTarget } from "react-dnd";
import { Color } from "shogi.js";
// import { getUrlWithReverse } from "./images/PieceImage";
// import KifuStore from "./stores/KifuStore";

export default class Piece extends Component {

  render() {
    return (
        <td className={this.props.lastMove && equalsPos(this.props.lastMove.to, this.props) ? "lastto" : ""}>
            {div}
        </td>
    );
}

function getPieceImage(props) {
    return getUrlWithReverse(props.data, props.kifuStore.reversed);
}

function equalsPos(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}
