import { Link } from 'react-router-dom'
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
const Home = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h1>CAD autograder</h1>
                </Col>

            </Row>
            <Row>
                <Col>
                    <Link to='/assignment'>
                        <button type="button" className="btn btn-primary">Click to Start</button>
                    </Link>
                </Col>

            </Row>

        </Container>
    );
}
export default Home
