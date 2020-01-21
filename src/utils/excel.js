import XlsxPopulate from '../../node_modules/xlsx-populate/browser/xlsx-populate.min';

import {unique} from './collections';

function addWeek(workbook, year, week, timekeeps) {
  const rows = [];
  for (const timekeep of timekeeps) {
    const days = timekeep.getDays(year, week);

    // The timekeep does not have any entries during that year and week
    if (days.length === 0)
      continue;

    const totals = timekeep.getDays(year, week).reduce((totals, day) => {
      totals[day.date.dayOfWeek] = day.getTime();

      return totals;
    }, new Array(7).fill(0));

    const row = [{type: 'text', value: timekeep.name}];
    for (const total of totals)
      row.push({type: 'time', value: Math.round(total / 1000) / 86400});
    row.push({type: 'time', formula: `SUM(B${rows.length + 2}:H${rows.length + 2})`});

    const total = timekeep.getTime(year, week);
    // Only add rows that actually have time tracked
    if (total !== 0)
      rows.push(row);
  }

  if (rows.length === 0)
    return;

  const worksheet = workbook.addSheet(`${year} week ${week}`);

  const columns = [
    {name: 'Project', width: 25},
    {name: 'Monday', width: 12},
    {name: 'Tuesday', width: 12},
    {name: 'Wednesday', width: 12},
    {name: 'Thursday', width: 12},
    {name: 'Friday', width: 12},
    {name: 'Saturday', width: 12},
    {name: 'Sunday', width: 12},
    {name: 'Total', width: 12}
  ];

  // Create and style table header
  for (const [i, {name, width}] of columns.entries()) {
    const row = worksheet.row(1);
    row.height(35);

    const column = worksheet.column(i + 1);
    column.width(width);

    const cell = row.cell(i + 1);
    cell.value(name);
    cell.style('bold', true);
    cell.style('border', {bottom: true});
    cell.style('horizontalAlignment', 'center');
    cell.style('verticalAlignment', 'center');
  }

  // Style the cells to use a specific format and height
  for (const [i, columns] of rows.entries()) {
    const row = worksheet.row(i + 2);
    row.height(35);

    for (const [j, column] of columns.entries()) {
      const cell = row.cell(j + 1);
      cell.value(column.value);
      cell.style('horizontalAlignment', 'center');
      cell.style('verticalAlignment', 'center');
      if (column.type === 'time')
        cell.style('numberFormat', 'hh:mm:ss');
      if (column.formula)
        cell.formula(column.formula);
    }
  }

  // Add a footer with the total
  const footer = worksheet.row(rows.length + 2);
  footer.height(35);
  footer.style('bold', true);
  footer.style('border', {top: true});
  footer.style('horizontalAlignment', 'center');
  footer.style('verticalAlignment', 'center');
  footer.cell(1).value('Total');
  const columnLabels = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  for (const [i, label] of columnLabels.entries()) {
    const cell = footer.cell(i + 2);
    cell.style('numberFormat', 'hh:mm:ss');
    cell.formula(`SUM(${label}2:${label}${rows.length + 1})`);
  }
}

export async function exportToExcel(timekeeps) {
  const workbook = await XlsxPopulate.fromBlankAsync();

  const years = unique([...timekeeps.map(x => x.getTrackedYears()).flat()]);
  for (const year of years) {
    const weeks = unique([...timekeeps.map(x => x.getTrackedWeeks(year)).flat()]);
    for (const week of weeks)
      addWeek(workbook, year, week, timekeeps);
  }

  // Remove the default sheet
  if (workbook.sheets().length > 1)
    workbook.deleteSheet(0);

  const blob = await workbook.outputAsync();

  return blob;
}
