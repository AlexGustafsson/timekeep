export function exportToCSV(store) {
  let output = '"Name","Time","Previous Time"\n';
  for (let timekeep of store.state.timekeepings)
    output += `"${timekeep.name}",${timekeep.time},${timekeep.previous}\n`;

  return output;
}
