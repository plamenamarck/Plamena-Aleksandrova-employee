import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TableCSVdata({array, headerKeys}) {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

  return (
    <div>
      <TableContainer component={Paper}>
{/* HEADERS */}
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            {headerKeys.map((key) => (
              <StyledTableCell key={key}>{key}</StyledTableCell>
            ))}
            </TableRow>
          </TableHead>
{/* DATA CSV ROWS */}
          <TableBody>
          {array.map((item) => (
            // CREATING UNIQUE KEY FOR EVERY ROW 
            <StyledTableRow key={item + Math.random()}>
              {Object.values(item).map((val) => (
                // CREATING UNIQUE KEY FOR EVERY CELL IN A ROW
                <StyledTableCell key={val+Math.random()}>{val}</StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
