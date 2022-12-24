import { useNavigate, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { CSVLink } from "react-csv";

const Result = () => {
    const { state } = useLocation();
    var elements = []
    const navigate = useNavigate();
    const csvData = [["File name", "Grade"]]
    //output a list of student file name with its corresponding score
    for (const [key, value] of Object.entries(state)) {
        csvData.push([key, value[0]])
        elements.push(<ListGroup.Item style={{ display: 'flex', justifyContent: 'space-between' }}><div className="fw-bold">{key} </div><div>Score: {value[0]} <Link style={{ marginLeft: '15px' }} to='/detail' state={{ state: { filename: key, detail: state } }}><BsFillArrowRightCircleFill /></Link></div></ListGroup.Item>)
    }
    //route to the stats page if button is clicked
    const routeChange = () => {
        navigate("/stats", { state: state });
    }


    return (
        <div>
        <Container className="mt-3 mb-3">
            <Row>
                <Col style={{ display: 'flex', justifyContent: 'center', margin: "5px" }}>
                    <h1 style={{ color: "white", marginTop: '30px' }}>CAD Autograder</h1>
                </Col>
            </Row>
            <Row>
                <Col style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button style={{ background: "#012169", borderRadius: "10px" }} onClick={routeChange} className="m-3">
                        See more stats
                    </Button>
                </Col>
                <Col style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button style={{ background: "#012169", borderRadius: "10px"}} className="m-3">
                        <CSVLink data={csvData} style={{ color: "white", textDecoration: 'none' }}>Export CSV</CSVLink>
                    </Button>
                </Col>


            </Row>
            <Row>
                <ListGroup>
                    {elements}
                </ListGroup>
            </Row>
        </Container>
        </div>
    )
}
export default Result