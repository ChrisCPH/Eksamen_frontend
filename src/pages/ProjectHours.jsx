import React, {useState, useEffect} from 'react';
import facade from "../utils/apiFacade.js";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ProjectHours() {

    const [devProjects, setDevProjects] = useState([])
    const [devProject, setDevProject] = useState([])

    const [searchProjects, setSearchProjects] = useState("")
    const [searchProject, setSearchProject] = useState("")

    const [hoursSpent, setHoursSpent] = useState()
    const [userStory, setUserStory] = useState()
    const [description, setDescription] = useState("")

    const [selectDeveloper, setSelectDeveloper] = useState([])
    const [selectProject, setSelectProject] = useState([])
    const [selectId, setSelectId] = useState([])

    

    const performSearchProjects = (evt) => {
        evt.preventDefault();
        getDevProjects(searchProjects.developerName);
    }

    const getDevProjects = (developerName) => {
        facade.getAllDevProjects(developerName)
        .then((data) => {
            setDevProjects(data);
        })
    }

    const onChangeProjects = (evt) => {
        setSearchProjects({...searchProjects, [evt.target.id]: evt.target.value});
    }

    const performSearchProject = (evt) => {
        evt.preventDefault();
        getDevProject(searchProjects.developerName, searchProject.projectName);
    }

    const getDevProject = (developerName, projectName) => {
        facade.getSpecificDevProject(developerName, projectName)
        .then((data) => {
            setDevProject(data);
        })
    }

    const onChangeProject = (evt) => {
        setSearchProject({...searchProject, [evt.target.id]: evt.target.value});
    }

    const devTables = devProjects?.map((data) => (
        <tr key={data.id}>
            <th>{data.id}</th>
            <th>{data.project.id}</th>
            <th>{data.project.name}</th>
            <th>{data.project.description}</th>
            <th>{data.hoursSpent}</th>
            <th>{data.userStory}</th>
            <th>{data.description}</th>
            <th>{data.developer.billingPrHour} kr.</th>
            <th><button onClick={() => addData(data)}>Select</button></th>
            <th><button onClick={() => deleteProjectHours(data.id)}>Delete</button></th>
        </tr>
    ))

    const devTable = devProject?.map((data) => (
        <tr key={data.id}>
            <th>{data.id}</th>
            <th>{data.project.id}</th>
            <th>{data.project.name}</th>
            <th>{data.project.description}</th>
            <th>{data.hoursSpent}</th>
            <th>{data.userStory}</th>
            <th>{data.description}</th>
            <th>{data.developer.billingPrHour} kr.</th>
            <th><button onClick={() => deleteProjectHours(data.id)}>Delete</button></th>
        </tr>
    ))

    const addData = (data) => {
        setSelectId(data.id);
        setSelectProject(data.project.id);
        setSelectDeveloper(data.developer.id);
        setHoursSpent(data.hoursSpent);
        setUserStory(data.userStory);
        setDescription(data.description);
    }

    const updateHours = (evt) => {
        evt.preventDefault();
        facade.updateHours(hoursSpent, userStory, description, selectDeveloper, selectProject, selectId)
    }

    const recordHours = (evt) => {
        evt.preventDefault();
        facade.assignDeveloper(hoursSpent, userStory, description, selectDeveloper, selectProject)
    }

    const deleteProjectHours = (projectHourId) => {
        facade.deleteProjectHour(projectHourId);
    }

    
    return (
        <Container fluid="md">
            <Row>
                <Col>
                <form>
                    <h3>Search for developer</h3>
                    <input onChange={onChangeProjects} type="text" placeholder="Developer name" id="developerName"></input><br></br>
                    <button onClick={performSearchProjects} type="submit">Search</button>
                </form>
                </Col>
                <Col>
                <form>
                    <h3>Search for project</h3>
                    <input onChange={onChangeProject} type="text" placeholder="Project name" id="projectName"></input><br></br>
                    <button onClick={performSearchProject} type="submit">Search</button>
                </form>
                </Col>
            </Row>
            <Row>
                <Col>
                <h3>Projects</h3>
                <Table striped bordered hover size="sm"> 
                <thead>
                    <tr>
                        <th>Id: </th>
                        <th>Project id: </th>
                        <th>Project name: </th>
                        <th>Project description: </th>
                        <th>Hours spent: </th>
                        <th>User story: </th>
                        <th>Description: </th>
                        <th>Pr. hour: </th>
                        <th>Update: </th>
                        <th>Delete: </th>
                    </tr>
                </thead>
                <tbody>
                    {devTables}
                </tbody>
                </Table>
                <h3>{searchProject.projectName}</h3>
                <Table striped bordered hover size="sm"> 
                <thead>
                    <tr>
                        <th>Id: </th>
                        <th>Project id: </th>
                        <th>Project name: </th>
                        <th>Project description: </th>
                        <th>Hours spent: </th>
                        <th>User story: </th>
                        <th>Description: </th>
                        <th>Pr. hour: </th>
                        <th>Delete: </th>
                    </tr>
                </thead>
                <tbody>
                    {devTable}
                </tbody>
                </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                <p>Selected id: {selectId}</p>
                </Col>
                <Col>
                <h3>Record Hours</h3>
                <form>
                    <input onChange={evt => setSelectDeveloper(evt.target.value)} type="number" placeholder="Developer id"></input><br></br>
                    <input onChange={evt => setSelectProject(evt.target.value)} type="number" placeholder="Project id"></input><br></br>
                    <input onChange={evt => setHoursSpent(evt.target.value)} type="number" placeholder="Hours spent"></input><br></br>
                    <input onChange={evt => setUserStory(evt.target.value)} type="number" placeholder="User story"></input><br></br>
                    <input onChange={evt => setDescription(evt.target.value)} type="text" placeholder="Description"></input><br></br>
                    <button onClick={recordHours} type="submit">Record</button>
                </form>
                </Col>
                <Col>
                <h3>Edit Hours</h3>
                <form>
                    <input onChange={evt => setHoursSpent(evt.target.value)} type="number" placeholder="Hours spent"></input><br></br>
                    <button onClick={updateHours} type="submit">Update</button>
                </form>
                </Col>
            </Row>
        </Container>
    )
 }

export default ProjectHours;