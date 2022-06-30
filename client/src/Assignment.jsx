import { Link } from 'react-router-dom'
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
const Assignment = () => {
    return (

        <Container>
            <Row>
                <Col>
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Upload student work</Form.Label>
                        <Form.Control type="file" size="sm" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Upload correct work</Form.Label>
                        <Form.Control type="file" size="sm" />
                    </Form.Group>
                </Col>



            </Row>
            <Row>
                <Col md={{ span: 10, offset: 5 }}>
                    <Link to='/result'>
                        <Button variant="primary" size="lg">
                            Start grading
                        </Button>{' '}
                    </Link>
                </Col>

            </Row>

        </Container>

    );
}
export default Assignment
