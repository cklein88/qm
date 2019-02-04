import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class ClauseButton extends Component {
    render () {
        return (
            <Button
                style={{"border-radius":"0", "width":"100%"}}
                type={this.props.type}
                disabled={this.props.disabled}
                variant={this.props.variant}
                onClick={(e) => this.props.onClick(e)}>
                {this.props.children}
            </Button>
        )
    }
}

export default ClauseButton;
