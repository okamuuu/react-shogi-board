# TODO

status を考える

0: 手番に応じたコマのみをクリックに対応する
1: コマを選択中、移動可能なマスのみ選択可能にする。それ以外をクリックした場合は status 0 に戻る
2: 移動可能なマスへコマを移動、プロモート可能な場合は status 3 へ。それ以外は ターン終了
3: 成るか成らないかを選択させる。それ以外をクリックした場合は status 0 に戻る

clickable な component を状況に応じて生成する?
コマではなく Box 単位で考えればうまくいくか？

0: selectableBoxes
1: selectBox, movableBoxes

handleClickBox(x, y) {
  if (!selectableBoxes && !movableBoxes) {
    // cancel
    return;
  }

  // 処理を実行する
  
}
