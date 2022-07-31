import { useNavigate } from 'react-router-dom'
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


const Assignment = () => {
    const [studentFile, setStudentFile] = useState([])
    const [correctFile, setCorrectFile] = useState([])
    const [accuracyThreshold, setAccuracyThreshold] = useState(0)
    const [extraEntities, setExtraEntities] = useState(0)
    const [coloringError, setColoringError] = useState(0)
    const [lineweightError, setLineweightError] = useState(0)
    const [scalingError, setScalingError] = useState(0)
    const [rotationError, setRotationError] = useState(0)
    const [verbose, setVerbose] = useState(2)
    const [hatchError, setHatchError] = useState(0)
    const [studentFileStatus, setStudentFileStatus] = useState(false)
    const [correctFileStatus, setCorrectFileStatus] = useState(false)
    const onStudentFileChange = event => {
        const files = event.target.files
        console.log(files.length)
        for (let i = 0; i < files.length; i++) {
            setStudentFile(studentFile => { return [...studentFile, files[i]] })
        }
        setStudentFileStatus(true)
    }
    const onCorrectFileChange = event => {
        const files = event.target.files
        console.log(files.length)
        for (let i = 0; i < files.length; i++) {
            setCorrectFile(correctFile => { return [...correctFile, files[i]] })
        }
        setCorrectFileStatus(true)
    }
    const onAccuracyChange = event => {
        setAccuracyThreshold(event.target.value)
    }
    const onExtraEntitiesChange = event => {
        setExtraEntities(event.target.value)
    }
    const onColoringChange = event => {
        setColoringError(event.target.value)
    }
    const onScalingChange = event => {
        setScalingError(event.target.value)
    }
    const onLineweightChange = event => {
        setLineweightError(event.target.value)
    }
    const onRotationChange = event => {
        setRotationError(event.target.value)
    }
    // const onVerboseChange = event => {
    //     setVerbose(event.target.value)
    // }
    const onHatchChange = event => {
        setHatchError(event.target.value)
    }
    const renderTooltip = props => (
        <Tooltip {...props}>Tooltip for the register button</Tooltip>
    );


    const navigate = useNavigate();

    const routeChange = () => {
        const formData = new FormData()
        for (let i = 0; i < studentFile.length; i++) {
            const file = studentFile[i]
            formData.append('student_files', file)
        }
        for (let i = 0; i < correctFile.length; i++) {
            const file = correctFile[i]
            formData.append('correct_files', file)
        }

        formData.append('accuracyThreshold', accuracyThreshold)
        formData.append('coloringError', coloringError)
        formData.append('extraEntities', extraEntities)
        formData.append('lineweightError', lineweightError)
        formData.append('scalingError', scalingError)
        formData.append('rotationError', rotationError)
        formData.append('verbose', verbose)
        formData.append('hatchError', hatchError)
        console.log("verbose")
        console.log(verbose)
        console.log("accuracy")
        console.log(accuracyThreshold)



        axios.post("http://localhost:5000/grade", formData)
            .then(res => {
                console.log(res.data)
                navigate("/result", { state: res.data });
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <Form>

            <Container>
                <Row>
                    <Col style={{ display: 'flex', justifyContent: 'center', margin: "5px" }}>
                        <h1 style={{ color: "#012169" }}>CAD Autograder</h1>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ display: 'flex', justifyContent: 'center' }}>
                        <Form.Group controlId="formFileLg" className="m-3" style={{ justifyContent: 'center' }}>
                            <Form.Label htmlFor="filename" style={{ background: "#012169", color: "white", padding: "8px 12px", borderRadius: "12px", marginBottom: '0px' }}>Click to choose a folder for student files:</Form.Label>
                            <p style={{ color: "green", visibility: (studentFileStatus ? "visible" : "hidden") }}>{studentFile.length} files uploaded successfully!</p>
                            <Form.Control type="file" value="" directory="" webkitdirectory="" onChange={onStudentFileChange} id="filename" style={{ visibility: "hidden" }} />

                        </Form.Group>

                    </Col>
                    <Col style={{ display: 'flex', justifyContent: 'center' }}>
                        <Form.Group controlId="formFileLg" className="m-3">
                            <Form.Label htmlFor="filename2" style={{ background: "#012169", color: "white", padding: "8px 12px", borderRadius: "12px", marginBottom: '0px' }}>Click to choose a folder for correct file:</Form.Label>
                            <p style={{ color: "green", visibility: (correctFileStatus ? "visible" : "hidden") }}>{correctFile.length} files uploaded successfully!</p>
                            <Form.Control type="file" value="" directory="" webkitdirectory="" onChange={onCorrectFileChange} id="filename2" style={{ visibility: "hidden" }} />

                        </Form.Group>

                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Button style={{ background: "#012169", borderRadius: "10px", marginLeft: "0px", marginTop: "0px", marginBottom: "5px", marginRight: "10px" }} size="md">
                            Penalties
                        </Button>
                        <p style={{ display: "inline-block", color: "#012169" }}>Points to take off when there is...</p>
                        <Form>
                            {/* <Form.Group controlId="formBasicSelect" style={{ margin: "5px" }}>
                                <Form.Label style={{ color: "#012169" }}>Verbose
                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                        <Button style={{ background: "#ADD8E6", padding: "0px", borderRadius: "50%", marginLeft: '10px', paddingLeft: '7px', paddingRight: '7px' }}>?</Button>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Select onChange={onVerboseChange} style={{ borderRadius: "10px" }}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </Form.Select>
                            </Form.Group> */}
                            <Form.Group controlId="formBasicSelect" style={{ margin: "5px" }}>
                                <Form.Label style={{ color: "#012169" }}>Accuracy Threshold
                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                        <Button style={{ background: "#ADD8E6", padding: "0px", borderRadius: "50%", marginLeft: '10px', paddingLeft: '7px', paddingRight: '7px' }}>?</Button>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Select onChange={onAccuracyChange} style={{ borderRadius: "10px" }}>
                                    <option value="1">1 decimal point</option>
                                    <option value="2">2 decimal points</option>
                                    <option value="3">3 decimal points</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formBasicSelect" style={{ margin: "5px" }}>
                                <Form.Label style={{ color: "#012169" }}>Extra Entities
                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                        <Button style={{ background: "#ADD8E6", padding: "0px", borderRadius: "50%", marginLeft: '10px', paddingLeft: '7px', paddingRight: '7px' }}>?</Button>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Select onChange={onExtraEntitiesChange} style={{ borderRadius: "10px" }}>
                                    <option value="0">0 point lost for extra entities</option>
                                    <option value="1">1 point lost for each extra entity</option>
                                    <option value="5">5 points lost for each extra entity</option>
                                    <option value="10">10 points lost for each extra entity</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formBasicSelect" style={{ margin: "5px" }}>
                                <Form.Label style={{ color: "#012169" }}>Coloring Errors
                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                        <Button style={{ background: "#ADD8E6", padding: "0px", borderRadius: "50%", marginLeft: '10px', paddingLeft: '7px', paddingRight: '7px' }}>?</Button>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Select onChange={onColoringChange} style={{ borderRadius: "10px" }}>
                                    <option value="0">no penalty for color errors </option>
                                    <option value="5">5% lost for color errors</option>
                                    <option value="10">10% lost for color errors</option>
                                    <option value="25">25% lost for color errors</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formBasicSelect" style={{ margin: "5px" }}>
                                <Form.Label style={{ color: "#012169" }}>Lineweight Error
                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                        <Button style={{ background: "#ADD8E6", padding: "0px", borderRadius: "50%", marginLeft: '10px', paddingLeft: '7px', paddingRight: '7px' }}>?</Button>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Select onChange={onLineweightChange} style={{ borderRadius: "10px" }}>
                                    <option value="0">no penalty for lineweight errors </option>
                                    <option value="5">5% lost for lineweight errors</option>
                                    <option value="10">10% lost for lineweight errors</option>
                                    <option value="25">25% lost for lineweight errors</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formBasicSelect" style={{ margin: "5px" }}>
                                <Form.Label style={{ color: "#012169" }}>Scaling Error
                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                        <Button style={{ background: "#ADD8E6", padding: "0px", borderRadius: "50%", marginLeft: '10px', paddingLeft: '7px', paddingRight: '7px' }}>?</Button>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Select onChange={onScalingChange} style={{ borderRadius: "10px" }}>
                                    <option value="0">no penalty for a scaling error </option>
                                    <option value="5">5 points lost for a scaling error</option>
                                    <option value="10">10 points lost for a scaling error</option>
                                    <option value="15">15 points lost for a scaling error</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formBasicSelect" style={{ margin: "5px" }}>
                                <Form.Label style={{ color: "#012169" }}>Rotation Error
                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                        <Button style={{ background: "#ADD8E6", padding: "0px", borderRadius: "50%", marginLeft: '10px', paddingLeft: '7px', paddingRight: '7px' }}>?</Button>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Select onChange={onRotationChange} style={{ borderRadius: "10px" }}>
                                    <option value="0">no penalty for a rotation error </option>
                                    <option value="5">5 points lost for a rotation error</option>
                                    <option value="10">10 points lost for a rotation error</option>
                                    <option value="15">15 points lost for a rotation error</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formBasicSelect" style={{ margin: "5px" }}>
                                <Form.Label style={{ color: "#012169" }}>Hatch Error
                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                        <Button style={{ background: "#ADD8E6", padding: "0px", borderRadius: "50%", marginLeft: '10px', paddingLeft: '7px', paddingRight: '7px' }}>?</Button>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Select onChange={onHatchChange} style={{ borderRadius: "10px" }}>
                                    <option value="0">no penalty for hatching errors </option>
                                    <option value="5">5% lost for hatching errors</option>
                                    <option value="10">10% lost for hatching errors</option>
                                    <option value="25">25% lost for hatching errors</option>
                                </Form.Select>
                            </Form.Group>

                        </Form>
                    </Col>
                </Row>







                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col style={{ display: 'flex', justifyContent: 'center' }}>

                        <Button style={{ background: "#012169", borderRadius: "12px" }} size="lg" onClick={routeChange} className="m-5">
                            Start grading
                        </Button>



                    </Col>

                </Row>


            </Container >
        </Form>

    );
}
export default Assignment
