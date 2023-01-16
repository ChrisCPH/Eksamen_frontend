import React, {useState, useEffect} from 'react';
import facade from "../utils/apiFacade.js";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Developers() {

    const [developers, setDevelopers] = useState([])
    const [projects, setProjects] = useState([])

    const [hoursSpent, setHoursSpent] = useState()
    const [userStory, setUserStory] = useState()
    const [description, setDescription] = useState("")

    const [selectDeveloper, setSelectDeveloper] = useState([])
    const [selectProject, setSelectProject] = useState([])

    useEffect(() => {
        getDevelopers();
        getProjects();
    });

    const getDevelopers = () => {
        facade.getDevelopers()
        .then((data) => {
            setDevelopers(data);
        })
    }

    const getProjects = () => {
        facade.getProjects()
        .then((data) => {
            setProjects(data);
        })
    }

    const developersTable = developers?.map((developer) => (
        <tr key={developer.id}>
            <th>{developer.id}</th>
            <th>{developer.name}</th>
            <th>{developer.email}</th>
            <th>{developer.phone}</th>
            <th>{developer.billingPrHour} kr.</th>
            <th><button onClick={() => setSelectDeveloper(developer.id)}>Select</button></th>
        </tr>     
    ))

    const projectsTable = projects?.map((project) => (
        <tr key={project.id}>
            <th>{project.id}</th>
            <th>{project.name}</th>
            <th>{project.description}</th>
            <th><button onClick={() => setSelectProject(project.id)}>Select</button></th>
        </tr>     
    ))

    const assignDeveloper = (evt) => {
        evt.preventDefault();
        facade.assignDeveloper(hoursSpent, userStory, description, selectDeveloper, selectProject)
    }

    return (
        <Container fluid="md">
            <Row>
                <Col>
                <h3>All developers</h3>
                <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id: </th>
                        <th>Name: </th>
                        <th>Email: </th>
                        <th>Phone: </th>
                        <th>Pr. hour: </th>
                    </tr>
                </thead>
                <tbody>
                    {developersTable}
                </tbody>
                </Table>
                <h3>All projects</h3>
                <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id: </th>
                        <th>Name: </th>
                        <th>Description: </th>
                    </tr>
                </thead>
                <tbody>
                    {projectsTable}
                </tbody>
                </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                <h3>Select developer and project</h3>
                <p>Selected Developer: {selectDeveloper}</p>
                <p>Selected Project: {selectProject}</p>
                </Col>
                <Col>
                <form>
                    <h3>Assign Developer</h3>
                    <input onChange={evt => setHoursSpent(evt.target.value)} type="number" placeholder="Hours spent"></input><br></br>
                    <input onChange={evt => setUserStory(evt.target.value)} type="number" placeholder="User story"></input><br></br>
                    <input onChange={evt => setDescription(evt.target.value)} type="text" placeholder="Description"></input><br></br>
                    <button onClick={assignDeveloper} type="submit">Assign</button>
                </form>
                </Col>
            </Row>
    </Container>
    );
}

export default Developers;