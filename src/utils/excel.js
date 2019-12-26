import Excel from 'exceljs';

function addWeek(workbook, year, week, timekeeps) {
  const rows = [];
  for (const timekeep of timekeeps) {
    const weeks = timekeep.years[year];
    // The timekeep does not have any entries during that year
    if (!weeks || weeks.length == 0)
      continue;

    const days = weeks[week];
    // The timekeep does not have any entries during that year and week
    if (!days || days.length == 0)
      continue;

    const row = [timekeep.name];
    // Add the total of all checkpoints that day
    for (let i = 0; i < 7; i++)
      row.push(Math.round(timekeep.getTime(year, week, i) / 1000) / 86400);
    row.push({formula: `SUM(B${rows.length + 2}:H${rows.length + 2})`, result: Math.round(timekeep.getTotalTime(year, week) / 1000) / 86400});

    // Only add rows that actually have time tracked
    if (row[8].result != 0)
      rows.push(row);
  }

  if (rows.length == 0)
    return;

  const worksheet = workbook.addWorksheet(`${year} week ${week}`, {
    properties: {
      tabColor: {
        showGridLines: true,
        defaultRowHeight: 35,
        dyDescent: 55
      }
    }
  });

  const rowsEnd = Math.max(rows.length + 1, 2);
  const columns = [
    {name: 'Project'},
    {name: 'Monday', totalsRowLabel: 'Total', totalsRowFunction: 'custom', totalsRowFormula: `SUM(B2:B${rowsEnd})`},
    {name: 'Tuesday', totalsRowLabel: 'Total', totalsRowFunction: 'custom', totalsRowFormula: `SUM(C2:C${rowsEnd})`},
    {name: 'Wednesday', totalsRowLabel: 'Total', totalsRowFunction: 'custom', totalsRowFormula: `SUM(D2:D${rowsEnd})`},
    {name: 'Thursday', totalsRowLabel: 'Total', totalsRowFunction: 'custom', totalsRowFormula: `SUM(E2:E${rowsEnd})`},
    {name: 'Friday', totalsRowLabel: 'Total', totalsRowFunction: 'custom', totalsRowFormula: `SUM(F2:F${rowsEnd})`},
    {name: 'Saturday', totalsRowLabel: 'Total', totalsRowFunction: 'custom', totalsRowFormula: `SUM(G2:G${rowsEnd})`},
    {name: 'Sunday', totalsRowLabel: 'Total', totalsRowFunction: 'custom', totalsRowFormula: `SUM(H2:H${rowsEnd})`},
    {name: 'Total'},
  ];

  worksheet.addTable({
    name: 'week1',
    displayName: 'Week 1',
    ref: 'A1',
    headerRow: true,
    totalsRow: true,
    style: {
      theme: 'TableStyleLight1',
      showRowStripes: false,
    },
    columns,
    rows,
  });

  // Style the width of the columns
  for (let i = 0; i < columns.length; i++) {
    if (i == 0)
      worksheet.getColumn(i + 1).width = 25;
    else
      worksheet.getColumn(i + 1).width = 12;
  }

  // Style the cells to use a specific format and height
  for (let i = 0; i <= worksheet.lastRow.number; i++) {
    const row = worksheet.getRow(i);
    row.height = 35;

    row.eachCell({includeEmpty: true}, (cell => {
      cell.alignment = {vertical: 'middle', horizontal: 'center', wrapText: true};
      cell.numFmt = 'hh:mm:ss';
    }));
  }
}

// Return a map of years with respective weeks where a timekeep has a measurement
function getWeeks(timekeeps) {
  const years = {};
  for (const timekeep of timekeeps) {
    for (const year of Object.keys(timekeep.years))
      years[year] = [];
  }

  for (const year of Object.keys(years)) {
    for (const timekeep of timekeeps) {
      // The year is not in the timekeep
      if (!timekeep.years[year])
        continue;

      for (const week of Object.keys(timekeep.years[year])) {
        if (!years[year].includes(week))
          years[year].push(week);
      }
    }
  }

  return years;
}

export async function exportToExcel(timekeeps) {
  const workbook = new Excel.Workbook();

  workbook.creator = 'Timekeep';
  workbook.lastModifiedBy = 'Timekeep';
  workbook.created = new Date();
  workbook.modified = new Date();

  workbook.views = [
    {
      x: 0, y: 0, width: 100, height: 100,
      firstSheet: 0, activeTab: 0, visibility: 'visible'
    }
  ];

  const years = getWeeks(timekeeps);
  for (const year of Object.keys(years)) {
    for (const week of years[year])
      addWeek(workbook, year, week, timekeeps);
  }

  const buffer = await workbook.xlsx.writeBuffer();

  return buffer;
}
