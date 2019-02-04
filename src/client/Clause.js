import React, { Component } from 'react';
import { Form, Row, InputGroup, Col } from 'react-bootstrap';
import ClauseButton from "./ClauseButton";
import PredicateDropdown from "./PredicateDropdown";
import OperatorDropdown from "./OperatorDropdown";
import ClauseInput from "./ClauseInput";

class Clause extends Component {
    constructor(props) {
        super(props);
        this.state = {predicate:{type:"STRING"},operator:{},inputs:[{index:0},{index:1}]}
    }

    predicateHandler = (selected) => {
        const predicate = {predicate: selected};
        this.setState(predicate);
        this.props.formChange(this.props.index, predicate);
    };

    operatorHandler = (selected) => {
        const operator = {operator: selected};
        this.setState(operator);
        this.props.formChange(this.props.index, operator);
    };

    inputHandler = (field) => {
        const _inputs = this.state.inputs;
        _inputs[field.index] = field;
        const inputs = {inputs: _inputs};

        this.setState(inputs);
        this.props.formChange(this.props.index, inputs);
    };

    render() {
        return (
            <Form.Group as={Row}>
                <Col xs={4}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <ClauseButton disabled={this.props.n === 1} variant="secondary" onClick={() => this.props.remove(this.props.index)}>-</ClauseButton>
                        </InputGroup.Prepend>
                        <PredicateDropdown options={this.props.options.predicates} index={this.props.index} handler={(selected) => this.predicateHandler(selected)}/>
                    </InputGroup>
                </Col>
                <OperatorDropdown options={this.props.options.operators[this.state.predicate.type]} index={this.props.index} handler={(selected) => this.operatorHandler(selected)} type={this.state.predicate.type}/>
                <ClauseInput
                    index={this.props.index}
                    handler={(field) => this.inputHandler(field)}
                    args={this.state.operator.args}
                    type={this.state.predicate.value === 'user_email' ? 'EMAIL' : this.state.predicate.type}
                    op={this.state.operator.value}/>
            </Form.Group>
        )
    }
}

export default Clause;