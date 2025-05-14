(async () => {
  // 祝日データ取得（共通関数でfetch）
  const holidays = await fetchHolidayData();

  // 「×」が幾つ目にあるか調べる
  const statusheadElm = document.querySelectorAll('#namerow th.statushead');
  // 日程, スペース, 日程確定の3つがあるので3を加える
  const invalidIndex = Array.from(statusheadElm).findIndex(e => e.innerText === "×") + 3;
  // 配列は0から始まるので1を加える
  const emptyIndex = invalidIndex + 1;
  // ユーザー数
  const userCount = document.querySelectorAll('#namerow th:not([class])').length;
  // 色のリスト
  const colorList =
    (invalidIndex === 4) ? ['success'] :
    (invalidIndex === 5) ? ['success', 'warning'] :
    (invalidIndex === 6) ? ['info', 'success', 'warning'] :
                           ['info', 'success', 'warning', 'primary'];

  // 日程表示のテーブルの行ごとに処理を行う
  for (const trElm of document.querySelectorAll('table tr[id^="row_"]')) {
    const th = trElm.querySelector('.datetitle');
    if (th) addDateColorClass(th, holidays);

    // tdごとに処理をする
    Array.from(trElm.children).forEach((tdElm, i) => {
      // 0:日程, 1:空, 2:日程確定, 3以降が対象, emptyIndexより後ろは処理しない
      if (i < 3 || emptyIndex < i) return;
      // 「×」が1つでもある場合は.invalidを追加
      if (i === invalidIndex) {
        if (tdElm.innerText !== '0') trElm.classList.add('invalid');
      }
      // 「－」がユーザ数と一致する場合は.emptyを追加
      else if (i === emptyIndex) {
        if (tdElm.innerText == userCount) trElm.classList.add('empty');
      }
      // それ以外
      else {
        const tdNum = Number(tdElm.innerText);
        const colorNum = i - 3;
        // 過半数超えてたら色のリストを追加
        if (userCount / 2 <= tdNum) tdElm.classList.add(colorList[colorNum]);
        // ユーザ数と一致したら.matchを追加
        if (userCount === tdNum) tdElm.classList.add('match');
      }
    });
  }
})();
