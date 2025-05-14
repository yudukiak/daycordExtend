// 曜日・祝日判定でクラスを付与する共通関数だよ〜😆
// holidays-jp.github.io のAPIを使うヨ！

window.addDateColorClass = (thElement, holidays = {}) => {
  if (!thElement || !thElement.innerText) return;
  const dateMatch = thElement.innerText.match(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
  if (!dateMatch) return;
  const [ , yyyy, mmRaw, ddRaw ] = dateMatch;
  const mm = mmRaw.padStart(2, '0');
  const dd = ddRaw.padStart(2, '0');
  const isoDate = `${yyyy}-${mm}-${dd}`;
  const tr = thElement.parentElement;

  const add = cls => {
    thElement.classList.add(cls);
    if (tr) tr.classList.add(cls);
  };
  if (/土/.test(thElement.innerText)) add('saturday');
  if (/日/.test(thElement.innerText)) add('sunday');
  if (holidays[isoDate]) add('holiday');
};

window.fetchHolidayData = async () => {
  try {
    const res = await fetch('https://holidays-jp.github.io/api/v1/date.json');
    return await res.json();
  } catch (e) {
    return {};
  }
};