import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { makeStyles } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from 'react';

    export default function MobileRow(props: any) {
  const { row, headerGroups } = props;
  const dataRow = row.original;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment> 
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {headerGroups[0]?.headers

          .filter(
            (headerGroup: any) =>
              headerGroup.id !== '_selector' &&
              headerGroup.id !== 'rating' &&
              headerGroup.id !== 'subRows' &&
              headerGroup.id !== 'hidecolumns' &&
              headerGroup.id !== 'expander' &&
              headerGroup.id !== 'Actions'
          )
          .slice(0, 3)

          .map((headerGroup: any) => {
            if (headerGroup.id === 'image' || headerGroup.id === 'picture') {
              return (
                <TableCell component='th' scope='key' variant='body' key={headerGroup.id}>
                  <img src={dataRow[headerGroup.id]} className='w-25 h-25' alt='' />
                </TableCell>
              );
            }
            return (
              <TableCell component='th' scope='row' key={headerGroup.id}>
                {dataRow[headerGroup.id]}
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
            <Box sx={{ marginLeft: 0, marginRight: 0 }}>
              <Table aria-label={row.id}>
                <TableBody>
                  <TableRow key={row.id} sx={{ alignItems: 'between' }}>
                    {headerGroups[0]?.headers

                      .filter(
                        (headerGroup: any) =>
                          headerGroup.id !== '_selector' &&
                          headerGroup.id !== 'rating' &&
                          headerGroup.id !== 'subRows' &&
                          headerGroup.id !== 'hidecolumns' &&
                          headerGroup.id !== 'expander' &&
                          headerGroup.id !== 'Actions'
                      )
                      .slice(3)
                      .map((headerGroup: any) => {
                        if (headerGroup.id === 'image' || headerGroup.id === 'picture') {
                          return (
                            <TableRow component='th' scope='row' key={headerGroup.id}>
                              <TableCell className='tableCellLabel' scope='key' variant='body' align='right'>
                                {headerGroup.id}
                              </TableCell>
                              <TableCell component='th' scope='row' variant='body'>
                                <img src={dataRow[headerGroup.id]} className='w-25 h-25' alt='' />
                              </TableCell>
                            </TableRow>
                          );
                        }
                        return (
                          <TableRow component='th' scope='row' key={headerGroup.id}>
                            <TableCell
                              scope='key'
                              variant='body'
                              style={{
                                fontSize: '150px',
                                lineHeight: '1.5rem',
                                fontWeight: 700,
                                width: 100,
                              }}
                            >
                              {headerGroup.id}
                            </TableCell>
                            <TableCell scope='key'>{dataRow[headerGroup.id]}</TableCell>
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

// export default function MobileRow(props: any) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);

//   return (
//     <React.Fragment>
//       <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//         <TableCell component='th' scope='row'>
//           {row.id}
//         </TableCell>
//         {/* <TableCell align='right'>{row.calories}</TableCell>
//         <TableCell align='right'>{row.fat}</TableCell>
//         <TableCell align='right'>{row.carbs}</TableCell>
//         <TableCell align='right'>{row.protein}</TableCell> */}
//         <TableCell>
//           <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout='auto' unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Typography variant='h6' gutterBottom component='div'>
//                 History
//               </Typography>
//               <Table size='small' aria-label='purchases'>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Customer</TableCell>
//                     <TableCell align='right'>Amount</TableCell>
//                     <TableCell align='right'>Total price ($)</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody></TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }
