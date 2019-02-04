import React, { Component } from 'react';
import { Col } from "react-bootstrap";
import ModifierTag from "./ModifierTag";
import ClauseDropdown from "./ClauseDropdown";

class OperatorDropdown extends Component {
    render() {
        return ([
            this.props.type === "INTEGER" && (<ModifierTag>is</ModifierTag>),
            <Col xs={this.props.type === "INTEGER" ? 2 : 3}>
                <ClauseDropdown options={this.props.options} handler={(selected) => this.props.handler(selected)}/>
            </Col>
        ])
    }
}

export default OperatorDropdown