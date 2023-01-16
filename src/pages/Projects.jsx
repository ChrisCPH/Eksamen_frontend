import React, {useState, useEffect} from 'react';
import facade from "../utils/apiFacade.js";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Projects() {

    const [projects, setProjects] = useState([])

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        facade.getProjects()
        .then((data) => {
            setProjects(data);
        })
    });

    const projectsTable = projects?.map((project) => (
        <tr key={project.id}>
            <th>{project.id}</th>
            <th>{project.name}</th>
            <th>{project.description}</th>
        </tr>     
    ))

    const createProject = (evt) => {
        evt.preventDefault();
        facade.createProject(description, name)
    }

    return (
        <Container fluid="md">
            <Row>
                <Col>
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
                <Col>
                <form>
                    <h3>Create Project</h3>
                    <input onChange={evt => setName(evt.target.value)} type="text" placeholder="Project name"></input><br></br>
                    <input onChange={evt => setDescription(evt.target.value)} type="text" placeholder="Description"></input><br></br>
                    <button onClick={createProject} type="submit">Create</button>
                </form>
                </Col>
            </Row>
    </Container>
    );
}

export default Projects;