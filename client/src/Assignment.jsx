import { useNavigate } from 'react-router-dom'
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import DxfParser from 'dxf-parser';
import axios from 'axios';


const Assignment = () => {
    const [studentFile, setStudentFile] = useState([])
    const [correctFile, setCorrectFile] = useState([])
    const [accuracyThreshold, setAccuracyThreshold] = useState(0)
    const [extraEntities, setExtraEntities] = useState(0)
    const [coloringError, setColoringError] = useState(0)
    const [lineweightError, setLineweightError] = useState(0)
    const [scalingError, setScalingError] = useState(0)
    const [rotationError, setRotationError] = useState(0)
    const [verbose, setVerbose] = useState(0)
    const [hatchError, setHatchError] = useState(0)
    const onStudentFileChange = event => {
        const files = event.target.files
       // const file = files[0]
        // const map = new Map();
        // for (let i = 0; i < files.length; i++) {
        //     const parser = new DxfParser();
        //     const read = new FileReader();
        //     const file = files[i]
        //     if (file.name.endsWith('.dxf')) {
        //         read.readAsText(file);
        //         read.onload = function () {
        //             try {
        //                 const dxfFile = parser.parse(read.result);
        //                 console.log(file.name)
        //                 console.log(dxfFile)
        //                 map.set(file.name, dxfFile)
        //             } catch (err) {
        //                 return console.error(err.stack)
        //             }
        //         }
        //     }
        // }
        // const read = new FileReader();
        // read.readAsText(file);
        // read.onload = function () {
        //     try {
        //         setStudentFile(read.result)
        //     } catch (err) {
        //         return console.error(err.stack)
        //     }
        // }
        console.log(files.length)
        for (let i = 0; i < files.length; i++) {
            setStudentFile(studentFile=>{return [...studentFile, files[i]]})
        }
    }
    const onCorrectFileChange = event => {
        // const file = event.target.files[0]
        // const parser = new DxfParser()
        // const read = new FileReader()
        // if (file.name.endsWith('.dxf')) {
        //     read.readAsText(file)
        //     read.onload = function () {
        //         try {
        //             const dxfFile = parser.parse(read.result);
        //             setCorrectFile(dxfFile)
        //         } catch (err) {
        //             return console.error(err.stack)
        //         }
        //     }
        // }
        const files = event.target.files
        console.log(files.length)
        for (let i = 0; i < files.length; i++) {
            setCorrectFile(correctFile=>{return [...correctFile, files[i]]})
        }
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
    const onVerboseChange = event => {
        setVerbose(event.target.value)
    }
    const onHatchChange = event => {
        setHatchError(event.target.value)
    }

    const navigate = useNavigate();
   
    const routeChange = () => {

        // const myParams = {
        //     studentFile: studentFile,
        //     correctFile: correctFile,
        //     accuracyThreshold: accuracyThreshold,
        //     coloringError: coloringError,
        //     extraEntities: extraEntities,
        //     lineweightError: lineweightError,
        //     scalingError: scalingError,
        //     rotationError: rotationError
        // }
        const formData = new FormData()
        console.log(studentFile.length)
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
                <Col>
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label for="file">Choose student files:</Form.Label>
                        <Form.Control type="file" value="" directory="" webkitdirectory="" onChange={onStudentFileChange} name="student_files" id="filename"/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label for="file">Choose correct files:</Form.Label>
                        <Form.Control type="file" value="" directory="" webkitdirectory="" onChange={onCorrectFileChange} />
                    </Form.Group>
                </Col>



            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>

                    <Form>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>Verbose</Form.Label>
                            <Form.Select onChange={onVerboseChange}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>Accuracy Threshold</Form.Label>
                            <Form.Select onChange={onAccuracyChange}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>Extra Entities</Form.Label>
                            <Form.Select onChange={onExtraEntitiesChange}>
                                <option>0</option>
                                <option>1</option>
                                <option>5</option>
                                <option>10</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>Coloring Errors</Form.Label>
                            <Form.Select onChange={onColoringChange}>
                                <option>0</option>
                                <option>5</option>
                                <option>10</option>
                                <option>25</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>Lineweight Error</Form.Label>
                            <Form.Select onChange={onLineweightChange}>
                                <option>0</option>
                                <option>5</option>
                                <option>10</option>
                                <option>25</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>Scaling Error</Form.Label>
                            <Form.Select onChange={onScalingChange}>
                                <option>0</option>
                                <option>5</option>
                                <option>10</option>
                                <option>15</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>Rotation Error</Form.Label>
                            <Form.Select onChange={onRotationChange}>
                                <option>0</option>
                                <option>5</option>
                                <option>10</option>
                                <option>15</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>Hatch Error</Form.Label>
                            <Form.Select onChange={onHatchChange}>
                            <option>0</option>
                            <option>5</option>
                            <option>10</option>
                            <option>25</option>
                            </Form.Select>
                        </Form.Group>

                    </Form>
                </Col>
            </Row>







            <Row>
                <Col md={{ span: 10, offset: 5 }}>
            
                    <Button variant="primary" size="lg" onClick={routeChange} className="m-5">
                        Start grading
                    </Button>

                 
              
                </Col>

            </Row>


        </Container >
        </Form>

    );
}
export default Assignment
