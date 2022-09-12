import { useLocation } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import image from "./garden2.png"
const Detail = () => {
    const { state } = useLocation();
    const { filename, detail } = state["state"]
    const mistakes = detail[filename][1]

    return (
        <div>
        <Container className="mt-3 mb-3">
            <Row>
                <Col style={{ display: 'flex', justifyContent: 'center', margin: "5px" }}>
                    <h1 style={{ color: "white", marginTop: '30px' }}>CAD Autograder</h1>
                </Col>
            </Row>
            <Row >
                <h3 style={{ display: 'flex', justifyContent: 'center', color: "white" }}>{filename}</h3>
            </Row>
            <Row>
                <ListGroup>
                    {mistakes.map(mistake => <ListGroup.Item><div className="fw-bold" style={{ color: "#012169" }}>{mistake[0]}</div> <br /><div style={{ color: "#012169" }}>{JSON.stringify(mistake[1])}</div></ListGroup.Item>)}
                </ListGroup>
            </Row>

        </Container>
        </div>
    )
}
export default Detail