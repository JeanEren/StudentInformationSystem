import {Container,Row,Col} from 'react-bootstrap'
import DataTable from './components/DataTable'

function App() {
  
  return (
    <Container fluid>
      <Row className="justify-content-center" style={{padding:"25px"}}>
        <Col sm={10}>
          <DataTable/>
        </Col>
      </Row>
    </Container>

  );
}

export default App;
