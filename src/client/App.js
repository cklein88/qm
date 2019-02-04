import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap"
import ClauseForm from "./ClauseForm";

class App extends Component {
    render() {
        return (
            <Container fluid>
                <Row><Col xs={12}><span style={{"color":"grey", "font-size":"1.5rem"}}>SEARCH FOR SESSIONS</span></Col></Row>
                <hr style={{"margin-top":"0.5em","margin-bottom":"0.5em"}}/>
                <ClauseForm/>
            </Container>
        );
    }
}

export default App;
