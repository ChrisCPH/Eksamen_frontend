import React, {useState, useEffect} from 'react';
import facade from "../utils/apiFacade.js";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ProjectInvoice() {

    const [projectInvoice, setProjectInvoice] = useState([])

    const [searchProjectInvoice, setSearchProjectInvoice] = useState("")

    const performSearchProjectInvoice = (evt) => {
        evt.preventDefault();
        getProjectPrice(searchProjectInvoice.projectName);
    }

    const getProjectPrice = (projectName) => {
        facade.getProjectInvoice(projectName)
        .then((data) => {
            setProjectInvoice(data);
        })
    }

    const onChangeProjectInvoice = (evt) => {
        setSearchProjectInvoice({...searchProjectInvoice, [evt.target.id]: evt.target.value});
    }

    const projectInvoiceTable = projectInvoice?.map((data) => (
        <tr key={data.id}>
            <th>{data.project.description}</th>
            <th>{data.hoursSpent}</th>    
            <th>{data.developer.billingPrHour} kr.</th>
            <th>{data.hoursSpent * data.developer.billingPrHour} kr.</th>
        </tr>     
    ))

    return (
        <Container fluid="md">
            <Row>
                <Col>
                <form>
                    <h3>Project Invoice</h3>
                    <input onChange={onChangeProjectInvoice} type="text" placeholder="Project name" id="projectName"></input><br></br>
                    <button onClick={performSearchProjectInvoice} type="submit">Search</button>
                </form>
                <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Description: </th>
                        <th>Hours spent: </th>
                        <th>Pr. hour: </th>
                        <th>Total: </th>
                    </tr>
                </thead>
                <tbody>
                    {projectInvoiceTable}
                </tbody>
                </Table>
                </Col>
            </Row>
    </Container>
    );
}

export default ProjectInvoice;