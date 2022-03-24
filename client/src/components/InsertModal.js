import {Modal,Form,Col,Row} from 'react-bootstrap'
import {Button,TextField,Typography} from '@mui/material'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {DesktopDatePicker,LocalizationProvider} from '@mui/lab';
import {useState} from 'react'

function InsertModal(props) {

    const [value, setValue] = useState(new Date());

    return (
      <Modal
        {...props}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Insert Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding:"20px 50px 20px 50px"}}>
          <Form>
            <Typography><b>Full Name</b></Typography>
            <Row>
              <Col md={4} style={{padding:5}}>
                <TextField variant="outlined" label="First Name" fullWidth/>
              </Col>
              <Col md={4} style={{padding:5}}>
                <TextField variant="outlined" label="Middle Name" fullWidth/>
              </Col>
              <Col md={4} style={{padding:5}}>
                <TextField variant="outlined" label="Last Name" fullWidth/>
              </Col>
            </Row>
            <Typography className="mt-3 mb-1"><b>Credentials</b></Typography>
            <Row>
              <Col style={{padding:5}}>
                <TextField type="email" variant="outlined" label="Email Address" fullWidth/>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained">Add Data</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default InsertModal;