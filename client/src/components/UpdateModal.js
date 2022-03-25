import {Modal,Form,Col,Row} from 'react-bootstrap'
import {Button,TextField,Typography, FormControl, InputLabel, Select,MenuItem} from '@mui/material'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {DesktopDatePicker,LocalizationProvider} from '@mui/lab';
import {useState} from 'react'

import Axios from 'axios'

function UpdateModal(props) {

    const[FirstName,setFirstName] = useState('');
    const[MiddleName,setMiddleName] = useState('');
    const[LastName,setLastName] = useState('');

    const[Address,setAddress] = useState('');
    const[EmailAddress,setEmailAddress] = useState('');

    const[Birthday,setBirthday] = useState('');

    const [Year, setYear] = useState(1);
    const [Section,setSection] = useState('A');
    const [Course,setCourse] = useState('BSIT');

    const updateData = () =>{

      Axios.put(`https://3001-jeaneren-studentinformat-pua0avvp544.ws-us38.gitpod.io/api/student/update/${props.editrow.StudentID}`, 
      { 
        FirstName:FirstName, 
        MiddleName:MiddleName,
        LastName:LastName,  
        Address:Address,
        EmailAddress:EmailAddress,
        Birthday:Birthday,
        Year:Year,
        Section:Section,
        Course:Course,
        StudentID:props.editrow.StudentID
      } 
      ).then((res) => { 

        console.log(res);

      }) 

    } 

    return (
      <Modal
        {...props}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Update Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding:"20px 50px 20px 50px"}}>
          <Form>
            <Row>
              <Col md={12} style={{padding:5}}>
                <TextField variant="outlined" label="ID" fullWidth InputProps={{readOnly: true}} value={props.editrow? props.editrow.StudentID : ""}/>
              </Col>
            </Row>
            <Typography><b>Full Name</b></Typography>
            <Row>
              <Col md={4} style={{padding:5}}>
                <TextField variant="outlined" label="First Name" fullWidth onChange={(e)=>{setFirstName(e.target.value)}}/>
              </Col>
              <Col md={4} style={{padding:5}}>
                <TextField variant="outlined" label="Middle Name" fullWidth onChange={(e)=>{setMiddleName(e.target.value)}}/>
              </Col>
              <Col md={4} style={{padding:5}}>
                <TextField variant="outlined" label="Last Name" fullWidth onChange={(e)=>{setLastName(e.target.value)}}/>
              </Col>
            </Row>
            <Typography className="mt-3 mb-1"><b>Credentials</b></Typography>
            <Row>
              <Col style={{padding:5}}>
                <TextField type="email" variant="outlined" label="Email Address" fullWidth onChange={(e)=>{setEmailAddress(e.target.value)}}/>
              </Col>
            </Row>
            <Row>
              <Col style={{padding:5}}>
                <TextField variant="outlined" label="Address" fullWidth onChange={(e)=>{setAddress(e.target.value)}}/>
              </Col>
            </Row>
            <Row>
              <Col style={{padding:5}}>
                <TextField type="date" variant="outlined" label="Birthday" fullWidth onChange={(e)=>{setBirthday(e.target.value)}}/>
              </Col>
            </Row>
            <Row>
              <Col style={{padding:5}}>
                <FormControl fullWidth>
                  <InputLabel>Course</InputLabel>
                  <Select
                    value={Course}
                    label="Course"
                    onChange={(e)=>{setCourse(e.target.value)}}
                  >
                    <MenuItem value="BSIT">BSIT</MenuItem>
                    <MenuItem value="BLIS">BLIS</MenuItem>
                    <MenuItem value="BSCS">BSCS</MenuItem>
                    <MenuItem value="CIT">CIT</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              <Col style={{padding:5}}>
                <FormControl fullWidth>
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={Year}
                    label="Year"
                    onChange={(e)=>{setYear(e.target.value)}}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              <Col style={{padding:5}}>
                <FormControl fullWidth>
                  <InputLabel>Section</InputLabel>
                  <Select
                    value={Section}
                    label="Section"
                    onChange={(e)=>{setSection(e.target.value)}}
                  >
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                    <MenuItem value="D">D</MenuItem>
                    <MenuItem value="E">E</MenuItem>
                    <MenuItem value="F">F</MenuItem>
                    <MenuItem value="G">G</MenuItem>
                    <MenuItem value="H">H</MenuItem>
                    <MenuItem value="I">I</MenuItem>
                    <MenuItem value="J">J</MenuItem>
                    <MenuItem value="K">K</MenuItem>
                  </Select>
                </FormControl>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" onClick={updateData}>Update Data</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default UpdateModal;