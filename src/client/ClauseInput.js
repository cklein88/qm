import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import ModifierTag from "./ModifierTag";
import ClauseTextInput from "./ClauseTextInput";

class ClauseInput extends Component {
    componentWillMount() {
        this.props.handler({})
    }

    render(){
        return ([
            (<Col xs={this.props.args===2 ? 2 : 5}><ClauseTextInput type={this.props.type} op={this.props.op} index={0} handler={(e) => this.props.handler(e)}/></Col>),
            this.props.args === 2 && (<ModifierTag>and</ModifierTag>),
            this.props.args === 2 && (<Col xs={2}><ClauseTextInput type={this.props.type} op={this.props.op} index={1} handler={(e) => this.props.handler(e)}/></Col>)
        ])
    }
}

export default ClauseInput;