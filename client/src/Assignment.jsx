import { useNavigate } from 'react-router-dom'
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import image from "./garden2.png"


const Assignment = () => {
    const [studentFile, setStudentFile] = useState([])
    const [correctFile, setCorrectFile] = useState([])
    const [accuracyThreshold, setAccuracyThreshold] = useState(1)
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
    const renderTooltipAccuracy = props => (
        <Tooltip {...props}>Decimal precision when comparing drawings</Tooltip>
    );
    const renderTooltipHatch = props => (
        <Tooltip {...props}>Area is not correctly hatched</Tooltip>
    );
    const renderTooltipColor = props => (
        <Tooltip {...props}>Color of the object is not matched</Tooltip>
    );
    const renderTooltipScale = props => (
        <Tooltip {...props}>Drawing scale does not match</Tooltip>
    );
    const renderTooltipLineweight = props => (
        <Tooltip {...props}>Thickness of the object is not matched</Tooltip>
    );
    const renderTooltipExtraEntities = props => (
        <Tooltip {...props}>Extra entities exist</Tooltip>
    );
    const renderTooltipRotate = props => (
        <Tooltip {...props}>Drawing is incorrectly rotated</Tooltip>
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



        axios.post("/grade", formData)
            .then(res => {
                navigate("/result", { state: res.data });
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
 <div>
            <Container >
                <Row>
                    <Col style={{ display: 'flex', justifyContent: 'center', margin: "5px" }}>
                        <h1 style={{ color: "white", marginTop: '30px'}}>CAD Autograder</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                        <Form.Group style={{ display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                        <Form.Control type="file" value="" id="" style={{ visibility: "hidden", maxHeight: '1px !important', maxWidth: '1px !important'}} />   
                        <p style={{ margin: "5px", color: "#90EE90", visibility: "hidden", whiteSpace: 'nowrap' }}>success!</p>         
                            <Form.Label htmlFor="filename2" style={{
                                background: "#012169", color: "white", padding: "8px 12px", borderRadius: "12px", marginBottom: '5px', whiteSpace: 'nowrap',
                                textAlign: 'center'
                            }}>Select Solution File:</Form.Label><br/>
                            <p style={{ margin: "5px", color: "white", visibility: (correctFileStatus ? "visible" : "hidden"), whiteSpace: 'nowrap' }}>success!</p>
                            <Form.Control type="file" value="" onChange={onCorrectFileChange} id="filename2" style={{ visibility: "hidden", maxHeight: '1px !important', maxWidth: '1px !important'}} />            
                        </Form.Group>
                    </Col>
                </Row><Row>

                    <Col style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                        <Form.Group style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                        <Form.Control type="file" value="" directory="" webkitdirectory="" id="" style={{ visibility: "hidden", maxHeight: '1px !important', maxWidth: '1px !important' }} />
                        <p style={{ margin: "5px", color: "#90EE90", visibility: "hidden", whiteSpace: 'nowrap' }}>{studentFile.length} files uploaded successfully!</p>
                            <Form.Label htmlFor="filename" style={{
                                background: "#012169", color: "white", padding: "8px 12px", borderRadius: "12px", marginBottom: '5px', whiteSpace: 'nowrap',
                                textAlign: 'center'
                            }}>Select Students' Files Directory:</Form.Label>
                            <br/>
                            <p style={{ margin: "5px", color: "white", visibility: (studentFileStatus ? "visible" : "hidden"), whiteSpace: 'nowrap' }}>{studentFile.length} files uploaded successfully!</p>
                            <Form.Control type="file" value="" directory="" webkitdirectory="" onChange={onStudentFileChange} id="filename" style={{ visibility: "hidden", maxHeight: '1px !important', maxWidth: '1px !important' }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Form.Group controlId="formBasicSelect" style={{ marginLeft: "5px", marginTop: "5px", marginRight: "5px", marginBottom: "25px"}}>
                                <Form.Label style={{ color: "white", fontSize: 30}}>Accuracy Threshold
                                    <OverlayTrigger placement="top" overlay={renderTooltipAccuracy}>
                                    <Button style={{ background: "#012169", padding: "0px", borderRadius: "50%", marginLeft: '10px', paddingLeft: '7px', paddingRight: '7px'}}>?</Button>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Select onChange={onAccuracyChange} style={{ borderRadius: "10px"}}>
                                    <option value="1">1 decimal point</option>
                                    <option value="2">2 decimal points</option>
                                    <option value="3">3 decimal points</option>
                                </Form.Select>
                            </Form.Group>
                            <h3 style={{marginLeft: '5px', color: 'white'}}>   Penalties:</h3>
                            <Form.Group controlId="formBasicSelect" style={{ margin: "5px", marginBottom: "25px" }}>
                                <Form.Label style={{ color: "white", fontSize: 30 }}>Extra Entities
                                    <OverlayTrigger placement="top" overlay={renderTooltipExtraEntities}>
                                        <Button style={{ background: "#012169", padding: "0px", borderRadius: "50%", marginLeft: '10px', paddingLeft: '7px', paddingRight: '7px'}}>?</Button>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Select onChange={onExtraEntitiesChange} style={{ borderRadius: "10px" }}>
                                    <option value="0">0 point lost for extra entities</option>
                                    <option value="1">1 point lost for each extra entity</option>
                                    <option value="5">5 points lost for each extra entity</option>
                                    <option value="10">10 points lost for each extra entity</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formBasicSelect" style={{ margin: "5px", marginBottom: "25px" }}>
                                <Form.Label style={{ color: "white" , fontSize: 30}}>Color Errors
                                    <OverlayTrigger placement="top" overlay={renderTooltipColor}>
                                        <Button style={{ background: "#012169", padding: "0px", borderRadius: "50%", marginLeft: '10px', paddingLeft: '7px', paddingRight: '7px' }}>?</Button>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Select onChange={onColoringChange} style={{ borderRadius: "10px" }}>
                                    <option value="0">no penalty for color errors </option>
                                    <option value="5">5% lost for color errors</option>
                                    <option value="10">10% lost for color errors</option>
                                    <option value="25">25% lost for color errors</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formBasicSelect" style={{ margin: "5px", marginBottom: "25px" }}>
                                <Form.Label style={{ color: "white", fontSize: 30 }}>Lineweight Errors
                                    <OverlayTrigger placement="top" overlay={renderTooltipLineweight}>
                                        <Button style={{ background: "#012169", padding: "0px", borderRadius: "50%", marginLeft: '10px', paddingLeft: '7px', paddingRight: '7px' }}>?</Button>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Select onChange={onLineweightChange} style={{ borderRadius: "10px" }}>
                                    <option value="0">no penalty for lineweight errors </option>
                                    <option value="5">5% lost for lineweight errors</option>
                                    <option value="10">10% lost for lineweight errors</option>
                                    <option value="25">25% lost for lineweight errors</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formBasicSelect" style={{ margin: "5px", marginBottom: "25px" }}>
                                <Form.Label style={{ color: "white", fontSize: 30 }}>Hatching Errors
                                    <OverlayTrigger placement="top" overlay={renderTooltipHatch}>
                                        <Button style={{ background: "#012169", padding: "0px", borderRadius: "50%", marginLeft: '10px', paddingLeft: '7px', paddingRight: '7px' }}>?</Button>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Select onChange={onHatchChange} style={{ borderRadius: "10px" }}>
                                    <option value="0">no penalty for hatching errors </option>
                                    <option value="5">5% lost for hatching errors</option>
                                    <option value="10">10% lost for hatching errors</option>
                                    <option value="25">25% lost for hatching errors</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formBasicSelect" style={{ margin: "5px" , marginBottom: "25px"}}>
                                <Form.Label style={{ color: "white", fontSize: 30 }}>Scale Error
                                    <OverlayTrigger placement="top" overlay={renderTooltipScale}>
                                        <Button style={{ background: "#012169", padding: "0px", borderRadius: "50%", marginLeft: '10px', paddingLeft: '7px', paddingRight: '7px' }}>?</Button>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Select onChange={onScalingChange} style={{ borderRadius: "10px" }}>
                                    <option value="0">no penalty for a scaling error </option>
                                    <option value="5">5 points lost for a scaling error</option>
                                    <option value="10">10 points lost for a scaling error</option>
                                    <option value="15">15 points lost for a scaling error</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formBasicSelect" style={{ margin: "5px" , marginBottom: "25px"}}>
                                <Form.Label style={{ color: "white", fontSize: 30 }}>Rotation Error
                                    <OverlayTrigger placement="top" overlay={renderTooltipRotate}>
                                        <Button style={{ background:"#012169", padding: "0px", borderRadius: "50%", marginLeft: '10px', paddingLeft: '7px', paddingRight: '7px' }}>?</Button>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Select onChange={onRotationChange} style={{ borderRadius: "10px" }}>
                                    <option value="0">no penalty for a rotation error </option>
                                    <option value="5">5 points lost for a rotation error</option>
                                    <option value="10">10 points lost for a rotation error</option>
                                    <option value="15">15 points lost for a rotation error</option>
                                </Form.Select>
                            </Form.Group>


                        </Form>
                    </Col>
                </Row>







                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col style={{ display: 'flex', justifyContent: 'center' }}>

                        <Button style={{ background: "#012169", borderRadius: "12px" }} size="lg" onClick={routeChange} className="m-5">
                            Start Grading
                        </Button>



                    </Col>

                </Row>


            </Container >
            </div>


    );
}
export default Assignment
