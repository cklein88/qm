import React, { Component } from 'react';
import ClauseDropdown from "./ClauseDropdown";

class PredicateDropdown extends Component {
    render() {
        return (
            <ClauseDropdown options={this.props.options} handler={(selected) => this.props.handler(selected)}/>
        )
    }
}

export default PredicateDropdown