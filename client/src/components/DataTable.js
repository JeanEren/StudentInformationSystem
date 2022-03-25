import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon
} from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";
import Axios from "axios";
import { InputGroup, FormControl } from "react-bootstrap";

import InsertModal from "./InsertModal";
import UpdateModal from "./UpdateModal";

function createData(attributes) {
  return {
    attributes,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "StudentID",
    numeric: false,
    disablePadding: true,
    label: "Student ID",
  },
  {
    id: "FullName",
    numeric: true,
    disablePadding: false,
    label: "Full Name",
  },
  {
    id: "Address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "EmailAddress",
    numeric: true,
    disablePadding: false,
    label: "Email Address",
  },
  {
    id: "Birthday",
    numeric: true,
    disablePadding: false,
    label: "Birthday  ",
  },
  {
    id: "Crs/Yr/Sec",
    numeric: false,
    disablePadding: false,
    label: "Crs/Yr/Sec",
  },
  {
    id: "Action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

function DataTableHead(props) {
  const {
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <b>{headCell.label}</b>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

DataTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
export default function DataTable() {
  const [insertModalShow, setInsertModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rows, setRows] = useState([]);

  const [editRow,setEditRow] = useState();

  const [filteredRows,setFilteredRows] = useState([]) 
  const [searchQuery,setSearchQuery] = useState('')

  const requestSearch = (searchedVal) => {
    const fRows = rows.filter((row) => {
      return row.FirstName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setFilteredRows(fRows)
  };
  
  useEffect(() => {
    Axios.get(
      "https://3001-jeaneren-studentinformat-pua0avvp544.ws-us38.gitpod.io/api/students"
    ).then((res) => {
      setRows(res.data);
    });
  });

  const deleteStudent = (StudentID) => {
    Axios.delete(
      `https://3001-jeaneren-studentinformat-pua0avvp544.ws-us38.gitpod.io/api/student/delete/${StudentID}`
    ).then((res) => {});
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }} style={{padding:"20px"}}>
      <Paper sx={{ width: "100%", mb: 2 }} id="table">
        <Toolbar
          sx={{
            pl: { sm: 2 }
          }}
        >
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h5"
            id="tableTitle"
            component="div"
          >
            Products
          </Typography>

          <Tooltip title="Add">
            <IconButton onClick={()=>{setInsertModalShow(true)}}>
              <AddIcon/>
            </IconButton>
          </Tooltip>
        </Toolbar>
        <InputGroup style={{ paddingLeft: "20px", paddingRight: "20px" }} onChange={(e)=>{setSearchQuery(e.targetValue);requestSearch(e.target.value)}}>
          <FormControl placeholder="Search" />
          <Button variant="contained">
            <SearchIcon />
          </Button>
        </InputGroup>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <DataTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(filteredRows.length == 0 && searchQuery == ''?rows:filteredRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.StudentID}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align="center"
                      >
                        {row.StudentID}
                      </TableCell>
                      <TableCell align="center">
                        {row.FirstName + " " + row.MiddleName[0] + ". " + row.LastName}
                      </TableCell>
                      <TableCell align="center">{row.Address}</TableCell>
                      <TableCell align="center">{row.EmailAddress}</TableCell>
                      <TableCell align="center">{row.Birthday}</TableCell>
                      <TableCell align="center">
                        {row.Course + " - " + row.Year + row.Section}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit Data">
                          <IconButton onClick={()=>{
                            setUpdateModalShow(true)
                            setEditRow(row)
                          }}>
                            <EditIcon/>
                          </IconButton>
                        </Tooltip> 
                        {" "}
                        <Tooltip title="Delete Data">
                          <IconButton onClick={() => {deleteStudent(row.StudentID);}}>
                            <DeleteIcon/>
                          </IconButton>
                        </Tooltip> 
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <InsertModal
        show={insertModalShow}
        onHide={() => setInsertModalShow(false)}
      />
      
      <UpdateModal
        show={updateModalShow}
        onHide={() => setUpdateModalShow(false)}
        editrow={editRow}
      />

    </Box>
  );
}