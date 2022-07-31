import { useLocation } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap';
import { Container, Row} from 'react-bootstrap';
const Detail = () => {
    const { state } = useLocation();
    const { filename, detail } = state["state"]
    const mistakes = detail[filename][1]

    return (
        <Container className="mt-3 mb-3">
            <Row >
                <h3 style={{ display: 'flex', justifyContent: 'center', color: "#012169" }}>{filename}</h3>
            </Row>
            <Row>
                <ListGroup>
                    {mistakes.map(mistake => <ListGroup.Item><div className="fw-bold" style={{color: "#012169"}}>{mistake[0]}</div> <br /><div style={{color: "#012169"}}>{JSON.stringify(mistake[1])}</div></ListGroup.Item>)}
                </ListGroup>
            </Row>

        </Container>
    )
}
export default Detail