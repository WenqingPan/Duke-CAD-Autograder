import { Link, useLocation } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap';
const Result = () => {
    const {state} = useLocation();
    console.log("result")
    console.log(state)
    var elements = []
    for (const [key, value] of Object.entries(state)) {
        elements.push(<ListGroup.Item>{key}: {value} </ListGroup.Item>)
    }

    return (
        <div>
            <ListGroup>
                {elements}
            </ListGroup>
        </div>
    )
}
export default Result