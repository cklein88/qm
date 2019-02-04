import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class ClauseTextInput extends Component {
    constructor(props) {
        super(props);
        const pattern = this.getPattern(props);
        this.state = {pattern: pattern}
    }

    getPattern = (props) => {
        let pattern = '.*\\S+.*';
        if(props.type === 'INTEGER') {
            pattern = '[\\d ]+';
        } else if(props.type === 'EMAIL' && (props.op === "equals" || props.op === "in")) {
            pattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]+'
        } else if(props.type === 'EMAIL' && props.op === 'contains') {
            pattern = "([a-zA-Z0-9._%+-]?)+@?([a-zA-Z0-9.-]?)+";
        } else if(props.type === 'EMAIL' && props.op === 'starts') {
            pattern = "[a-zA-Z0-9._%+-]+@?([a-zA-Z0-9.-]?)+";
        }

        if(props.op === 'in') {
            pattern = `((${pattern})(\\s+)?,?(\\s+)?)+`
        }
        return pattern;
    };

    componentWillMount() {
        const pattern = this.getPattern(this.props);
        if(this.state.pattern !== pattern) {
            this.setState({pattern: pattern});
        }
    }

    componentWillReceiveProps(props){
        const pattern = this.getPattern(props);
        if(this.state.pattern !== pattern) {
            this.setState({pattern: pattern});
        }
    }

    render(){
        return (
            <Form.Control style={{"border-radius":"0"}}
                          type='text'
                          pattern={this.state.pattern}
                          required
                          onChange={(e) => this.props.handler({index:this.props.index,value:e.target.value})}/>
        )
    }
}

export default ClauseTextInput;