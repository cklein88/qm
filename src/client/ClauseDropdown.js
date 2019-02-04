import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class ClauseDropdown extends Component {
    constructor(props){
        super(props);
        this.state = {value:"equals"}
    }

    onChange = (selected) => {
        const option = this.props.options.find(o => o.value === selected.target.value);
        this.setState({value:option.value});
        this.props.handler(option);
    };

    componentWillMount() {
        if (this.props.options.length > 0) {
            this.props.handler(this.props.options[0]);
            this.setState({value:this.props.options[0]});
        }
    }

    componentWillReceiveProps(props){
        if(props.options.length !== this.props.options.length || !props.options.every(o => this.props.options.find(p => o.value === p.value))) {
            if (props.options.length > 0) {
                props.handler(props.options[0]);
                this.setState({value:props.options[0]});
            }
        }
    }

    render() {
        return (
            <Form.Control
                style={{"border-radius":"0"}}
                as="select"
                onChange={(selected) => this.onChange(selected)}
                value={this.state.value}>
                {this.props.options.map(option => <option key={option.value} value={option.value}>{option.name}</option>)}
            </Form.Control>
        )
    }
}

export default ClauseDropdown;