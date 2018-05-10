const Color = {
  Black: 0,
  White: 1
};

export default class Piece {

  promote(kind) {
    return {
      FU: "TO",
      KY: "NY",
      KE: "NK",
      GI: "NG",
      KA: "UM",
      HI: "RY",
    }[kind] || kind;
  }

  // 表に返した時の種類を返す．表の場合はそのまま．
  unpromote(kind) {
    return {
      TO: "FU",
      NY: "KY",
      NK: "KE",
      NG: "GI",
      KI: "KI",
      UM: "KA",
      RY: "HI",
      OU: "OU",
    }[kind] || kind;
  }

  // 成れる駒かどうかを返す
  canPromote(kind) {
    return Piece.promote(kind) !== kind;
  }

  isPromoted(kind) {
    return ["TO", "NY", "NK", "NG", "UM", "RY"].indexOf(kind) >= 0;
  }

  oppositeColor(color) {
    return color === Color.Black ? Color.White : Color.Black;
  }

  // SFENによる文字列表現から駒オブジェクトを作成
  fromSFENString(sfen) {
    const promoted = sfen[0] === "+";
    if (promoted) {
        sfen = sfen.slice(1);
    }
    const color = sfen.match(/[A-Z]/) ? "+" : "-";
    const kind = {
      P: "FU",
      L: "KY",
      N: "KE",
      S: "GI",
      G: "KI",
      B: "KA",
      R: "HI",
      K: "OU",
    }[sfen.toUpperCase()];
    const piece = new Piece(color + kind);
    if (promoted) {
        piece.promote();
    }
    return piece;
  }

  constructor(csa: string) {
    this.color = csa.slice(0, 1) === "+" ? Color.Black : Color.White;
    this.kind = csa.slice(1);
  }

  promote() {
    this.kind = Piece.promote(this.kind);
  }

  unpromote() {
    this.kind = Piece.unpromote(this.kind);
  }

  inverse() {
    this.color = this.color === Color.Black ? Color.White : Color.Black;
  }

  // CSAによる駒表現の文字列を返す
  toCSAString() {
    return (this.color === Color.Black ? "+" : "-") + this.kind;
  }

  // SFENによる駒表現の文字列を返す
  toSFENString() {
    const sfenPiece = {
        FU: "P", // Pawn
        KY: "L", // Lance
        KE: "N", // kNight
        GI: "S", // Silver
        KI: "G", // Gold
        KA: "B", // Bishop
        HI: "R", // Rook
        OU: "K", // King
    }[Piece.unpromote(this.kind)];

    return (Piece.isPromoted(this.kind) ? "+" : "") +
        (this.color === Color.Black ? sfenPiece : sfenPiece.toLowerCase());
  }
}

