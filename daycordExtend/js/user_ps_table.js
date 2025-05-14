(async () => {
  // 祝日データ取得（共通関数でfetch）
  const holidays = await fetchHolidayData();

  // 各種UI取得
  const originalTable = document.querySelector('.table-container:nth-child(2) table');
  const originalTbody = originalTable?.querySelector('tbody');
  const originalThead = originalTable?.querySelector('thead');
  if (!originalTbody) return;

  const rows = Array.from(originalTbody.querySelectorAll('tr[id^="row_"]'));
  const tableContainer = document.querySelector('.table-container:nth-child(2)');

  // 各行を年月ごとにグループ化
  const grouped = new Map();
  for (const row of rows) {
    const th = row.querySelector('.datetitle');
    const match = th?.innerText.match(/(\d{4})\/(\d{1,2})/);
    if (!match) continue;

    // 色付け（曜日・祝日）
    if (th) addDateColorClass(th, holidays);

    const ym = `${match[1]}-${match[2].padStart(2, '0')}`;
    if (!grouped.has(ym)) grouped.set(ym, []);
    grouped.get(ym).push(row);
  }

  // 元のテーブルを非表示
  originalTable.style.display = 'none';

  // 1つのtableを作成
  const table = document.createElement('table');
  table.className = 'table is-bordered has-text-centered is-striped is-hoverable fixed-columns';

  let isFirst = true;
  // 月ごとにthead/tbodyを追加
  [...grouped.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([ym, rows]) => {
      const thead = originalThead.cloneNode(true);
      const th = thead.querySelector('th:first-child');
      const a = th.querySelector('a');
      if (!isFirst && a) a.style.visibility = 'hidden';
      th.innerHTML = `${ym.replace('-', '年')}月${a ? a.outerHTML : ''}`;
      table.appendChild(thead);
      if (isFirst) isFirst = false;

      // tbody
      const tbody = document.createElement('tbody');
      rows.forEach(row => tbody.appendChild(row.cloneNode(true)));
      table.appendChild(tbody);
    });

  // containerにtableを追加
  tableContainer.insertBefore(table, tableContainer.firstChild);
})();
