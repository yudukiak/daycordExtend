(async () => {
  // 祝日データ取得（共通関数でfetch）
  const holidays = await fetchHolidayData();

  // 日程表示のテーブルの行ごとに処理を行う
  for (const trElm of document.querySelectorAll('table tr[id^="row_"]')) {
    const th = trElm.querySelector('.datetitle');
    if (th) addDateColorClass(th, holidays);
  }

})();
