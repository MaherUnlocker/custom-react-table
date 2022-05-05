import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { headerProps } from './Table';

const useStyles = makeStyles({
  cell_short: {
    lineHeight: '1.5rem',
    fontWeight: '700!important',
    // width: 100,
    border: '0 !important',
  },
});

function MobileRow(props: any): React.ReactElement {
  const { row, headerGroups, cellClickHandler, cellProps } = props;
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, alignItems: 'center' }}>
        {row.cells

          .filter(
            (cell: any) =>
              cell.column.id !== 'rating' &&
              cell.column.id !== 'subRows' &&
              cell.column.id !== 'hidecolumns' &&
              cell.column.id !== 'expander' &&
              cell.column.id !== '_Actions'
          )
          .slice(0, 3)

          .map((cell: any) => {
            const { key: cellKey, role: cellRole, ...getCellProps } = cell.getCellProps(cellProps);

            return <TableCell key={cell.column.id}>{cell.render('Cell')}</TableCell>;
          })}

        <TableCell align='right'>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowDownIcon /> : <ArrowForwardIosIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      {/* collapse rest of data of selected row */}
      <TableRow style={{ marginTop: '2px' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ marginLeft: 0, marginRight: 0 }}>
              <Table aria-label={row.id}>
                <TableBody>
                  <TableRow key={row.id}>
                    {row.cells

                      .filter(
                        (cell: any) =>
                          cell.column.id !== 'rating' &&
                          cell.column.id !== 'subRows' &&
                          cell.column.id !== 'hidecolumns' &&
                          cell.column.id !== 'expander' &&
                          cell.column.id !== '_Actions'
                      )
                      .slice(3)
                      .map((cell: any) => {
                        const { key: cellKey, role: cellRole, ...getCellProps } = cell.getCellProps(cellProps);
                        console.log(cell);
                        return (
                          <TableRow
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr 1fr ',
                            }}
                          >
                            <TableCell scope='key' variant='body' className={classes.cell_short}>
                              {cell.column.Header}
                            </TableCell>

                            <TableCell
                              key={cellKey}
                              {...getCellProps}
                              style={{
                                width: 'auto',
                                // flex: 'inherit',
                                alignContent: 'end',
                                display: 'flex',
                                justifyContent: 'end',
                                border: 0,
                              }}
                            >
                              {cell.render('Cell')}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
// eslint-disable-next-line
export default function CollapsibleTable(instance: any, cellClickHandler: any): React.ReactElement {
  const { headerGroups, page, prepareRow } = instance.props;
  return (
    <TableContainer component={Paper} style={{ minHeight: '200', maxHeight: '99vh', overflowX: 'hidden' }}>
      <Table aria-label='collapsible table' stickyHeader>
        <TableHead
          id='TableHeader'
          style={{
            zIndex: '200',
            position: 'sticky',
            borderTop: '0',
            top: '0',
            overflowX: 'auto',
          }}
        >
          <TableRow>
            {headerGroups.map((headerGroup: any) => {
              const {
                key: headerGroupKey,
                title: headerGroupTitle,
                role: headerGroupRole,
                ...getHeaderGroupProps
              } = headerGroup.getHeaderGroupProps();
              console.log({ c: headerGroup.getHeaderGroupProps() });
              return (
                <React.Fragment>
                  {headerGroup.headers
                    .filter(
                      (column: any) =>
                        // column.id !== '_selector' &&
                        column.id !== 'rating' &&
                        column.id !== 'subRows' &&
                        column.id !== 'hidecolumns' &&
                        column.id !== 'expander' &&
                        column.id !== '_Actions'
                    )
                    .slice(0, 3)
                    .map((column: any) => {
                      const style = {
                        textAlign: column.align ? column.align : 'left ',
                      } as React.CSSProperties;
                      const {
                        key: headerKey,
                        role: headerRole,
                        ...getHeaderProps
                      } = column.getHeaderProps(headerProps);
                      const { title: groupTitle = '', ...columnGroupByProps } = column.getGroupByToggleProps();
                      const { title: sortTitle = '', ...columnSortByProps } = column.getSortByToggleProps();
                      console.log(column);
                      return <TableCell key={headerKey}>{column.render('Header')}</TableCell>;
                    })}
                  <TableCell align='right'>actions</TableCell>
                </React.Fragment>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {page?.map((row: any) => {
            prepareRow(row);

            return (
              <MobileRow
                key={`mobRow ${row.id}`}
                row={row}
                headerGroups={headerGroups}
                cellClickHandler={cellClickHandler}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
