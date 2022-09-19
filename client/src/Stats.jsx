import { useLocation } from 'react-router-dom'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ListGroup } from 'react-bootstrap';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Stats = () => {
    const { state } = useLocation();
    //tracking the list of student scores
    const grade = []
    //frequency map for student mistakes (# of students, not # of occurrences)
    const mistakes = new Map();
    let filenameWithHighestScore = [Object.keys(state)[0]]
    let filenameWithLowestScore = [Object.keys(state)[0]]
    let minGrade = state[filenameWithLowestScore][0]
    let maxGrade = minGrade;
    //calculate the max score and the min score
    for (const [key, value] of Object.entries(state)) {
        const currGrade = value[0]
        if (currGrade < minGrade) {
            filenameWithLowestScore = [key]
            minGrade = currGrade
        } else if (currGrade === minGrade) {
            filenameWithLowestScore.push(key);
        }
        if (currGrade > maxGrade) {
            filenameWithHighestScore = [key]
            maxGrade = currGrade
        } else if (currGrade === maxGrade) {
            filenameWithHighestScore.push(key);
        }
        grade.push(value[0])
        const uniqueMistake = new Set()
        for (let i = 0; i < value[1].length; i++) {
            uniqueMistake.add(value[1][i][0])
        }
        for (const mistake of uniqueMistake) {
            mistakes.set(mistake, (mistakes.get(mistake) || 0) + 1);
        }
    }
    // calculate the median score
    const calculateMedian = values => {
        values.sort(function (a, b) {
            return a - b;
        });

        let half = Math.floor(values.length / 2);

        if (values.length % 2)
            return values[half];

        return (values[half - 1] + values[half]) / 2.0;
    }
    const medianScore = calculateMedian(grade)
    //calculate the average score
    const calculateAverageScore = grade => grade.reduce((a, b) => a + b) / grade.length;
    const averageScore = calculateAverageScore(grade)
    const data = []
    for (let i = minGrade; i <= maxGrade; i += 5) {
        data.push({ range: "" + i + "-" + (i + 5), freq: 0 })
    }
    grade.forEach(score => {
        const index = parseInt((score - minGrade) / 5);
        data[index]['freq'] = data[index]['freq'] + 1
    });
    let freqList = []
    for (const [key, value] of mistakes) {
        freqList.push(<ListGroup.Item style={{ display: 'flex', justifyContent: 'space-between' }}><div>{key}</div><div> {value} people</div></ListGroup.Item>)
    }


    return (
        <div>
            <Container className="mt-3 mb-3">
                <Row>
                    <Col style={{ display: 'flex', justifyContent: 'center', margin: "5px" }}>
                        <h1 style={{ color: "white", marginTop: '30px' }}>CAD Autograder</h1>
                    </Col>
                </Row>
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col style={{ display: 'flex', justifyContent: 'center'}} >
                            <h3 style={{ marginLeft: '5px', color: "white" }}> Grade Distribution</h3>
                    </Col>
                </Row>
            <Row>
                <Col>
                    <Row>
                        <Card style={{ width: '30rem' }}>
                            <Card.Header style={{ display: 'flex', justifyContent: 'center' }}>Grade Overview</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item style={{ display: 'flex', justifyContent: 'space-between' }}><div>Highest score: </div><div>{maxGrade}</div></ListGroup.Item>
                                <ListGroup.Item style={{ display: 'flex', justifyContent: 'space-between' }}><div>Lowest score: </div><div>{minGrade}</div></ListGroup.Item>
                                <ListGroup.Item style={{ display: 'flex', justifyContent: 'space-between' }}><div>Median score: </div><div>{medianScore}</div></ListGroup.Item>
                                <ListGroup.Item style={{ display: 'flex', justifyContent: 'space-between' }}><div>Mean score: </div><div>{averageScore}</div></ListGroup.Item>
                            </ListGroup>
                        </Card>

                    </Row>
                    <Row className="mt-5 mb-5">
                        <Card style={{ width: '30rem' }}>
                            <Card.Header style={{ display: 'flex', justifyContent: 'center' }}>Most Common Mistakes</Card.Header>
                            <ListGroup>
                                {freqList}
                            </ListGroup>
                        </Card>

                    </Row>


                </Col>
                <Col>
                    {/*grade distribution visualization*/}
                    <Row>
                        <BarChart width={600} height={600} data={data} margin={{
                            top: 5,
                            right: 45,
                            left: 0,
                            bottom: 5,
                        }}>
                            <Bar dataKey="freq" fill="#012169" />
                            <CartesianGrid stroke="grey" />
                            <XAxis dataKey="range" stroke="white" />
                            <YAxis stroke="white" />
                        </BarChart>

                    </Row>

                </Col>
            </Row>
        </Container>
        </div >

    );

}
export default Stats