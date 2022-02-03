import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import * as React from 'react';

// import MobileRow from './MobileRow';

function MobileRow(props: any) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {Object.keys(row.original)

          .filter(
            (key) =>
              key !== 'rating' && key !== 'subRows' && key !== 'hidecolumns' && key !== 'expander' && key !== 'Actions'
          )
            .slice(0, 3)
           
          .map((key, index) => {
            if (key === 'image' || key === 'picture') {
              return (
                <TableCell component='th' scope='key' variant='body'>
                  <img src={row.original[Object.keys(row.original)[index]]} className='w-25' alt='' />
                </TableCell>
              );
            }
            return (
              <TableCell component='th' scope='row'>
                {row.original[Object.keys(row.original)[index]]}
              </TableCell>
            );
          })}

        <TableCell align='right'>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowDownIcon /> : <ArrowForwardIosIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size='small' aria-label='purchases'>
                <TableBody>
                  <TableRow key={row.id}>
                    {Object.keys(row.original)

                      .filter(
                        (key) =>
                          key !== 'rating' &&
                          key !== 'subRows' &&
                          key !== 'hidecolumns' &&
                          key !== 'expander' &&
                          key !== 'Actions'
                      )
                      .slice(3)
                      .map((key, index) => {
                        if (key === 'image' || key === 'picture') {
                          return (
                            <TableCell component='th' scope='key' variant='body'>
                              <img src={row.original[Object.keys(row.original)[index]]} className='w-50' alt='' />
                            </TableCell>
                          );
                        }
                        return (
                          <TableRow component='th' scope='row'>
                            <TableCell scope='key' variant='body'>
                              {key}
                            </TableCell>
                            <TableCell scope='key'>{row.original[Object.keys(row.original)[index]]}</TableCell>
                          </TableRow>
                        );
                      })}

                    {/* <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align='right'>{historyRow.amount}</TableCell>
                      <TableCell align='right'>{Math.round(historyRow.amount * row.price * 100) / 100}</TableCell> */}
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

export default function CollapsibleTable(props: any) {
  const { getTableProps, headerGroups, getTableBodyProps, page, prepareRow, state } = props.props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        {/* <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {page?.map((row: any) => {
            console.log({ page });
            return <MobileRow key={row.id} row={row} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
