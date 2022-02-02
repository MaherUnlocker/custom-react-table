export const CellRenderer = ({ column, row, data }) => {
  let cell = row[column.field];
  if (column.valueGetter) {
    cell = column.valueGetter({ value: cell, data: row })
  }
  if (column.renderCell) {
    cell = column.renderCell({ value: cell, data: row })
  }
  return cell;
}

export const LabelRenderer = ({ column, data }) =>
  (
    column.renderLabel
      ? column.renderLabel(column, data)
      : column.headerName.toUpperCase()
  )
