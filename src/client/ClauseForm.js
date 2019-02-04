import React, { Component } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Highlight from 'react-highlight.js';
import ClauseButton from "./ClauseButton";
import Clause from "./Clause.js";

class ClauseForm extends Component {
    constructor(props){
        super(props);
        this.state = { clauses:[{index:1}], n:1, options:{predicates:[],operators:{STRING:[],INTEGER:[]}} };
    }

    addClause = (clause) => {
        this.setState({clauses: [...this.state.clauses, clause], n: this.state.n + 1})
    };

    removeClause = (index) => {
        this.setState({clauses: this.state.clauses.filter(i => i.index !== index)})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(e.target.checkValidity()) {
            fetch('/search', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.clauses)
            }).then(res => res.json())
                .then(result => this.setState({sql:result.sql}))
        } else {
            this.setState({sql:'INVALID INPUT'})
        }
        this.setState({validated: true})
    };

    formChange = (index, update) => {
        const copy = this.state.clauses;
        const clause = copy.findIndex(i => i.index === index);
        copy[clause] = {...copy[clause], ...update};
        this.setState({clauses: copy, validated: false})
    };

    componentWillMount() {
        fetch("/setup").then(res => res.json()).then(options => this.setState({options: options}));
    }

    render() {
        return (
            <Form noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)}>
                <Row>
                    <Col xs={8}>
                        <Form.Group as={Row}>
                            <Col xs={12}>{this.state.clauses.map(clause =>
                                <Clause options={this.state.options} n={this.state.clauses.length} formChange={this.formChange} key={clause.index} index={clause.index} remove={(index) => this.removeClause(index)}/>
                            )}</Col>
                        </Form.Group>
                        <Form.Group as={Row}><Col xs={2}><ClauseButton onClick={() => this.addClause({index: this.state.n + 1})}>AND</ClauseButton></Col></Form.Group>
                        <Form.Group as={Row}><Col xs={9}/><Col xs={3}><ClauseButton type="submit" onClick={() => {}}>Search</ClauseButton></Col></Form.Group>
                    </Col>
                    <Col xs={4}>
                        <Form.Group as={Row} style={{"height":"100%","padding-bottom":"1rem"}}>
                            <Col style={{"background":"aliceblue", "margin-right":"15px"}}>
                                <Highlight language="sql">{this.state.sql}</Highlight>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default ClauseForm;