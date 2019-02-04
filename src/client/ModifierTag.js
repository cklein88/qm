import React, { Component } from 'react';
import { Button, Col} from 'react-bootstrap';

class ModifierTag extends Component {
    render () {
        return (
            <Col xs={1} style={{"padding":"0"}}><Button variant="outline-primary" disabled style={{
                "border-radius":"0",
                "width":"100%",
                "background-color":"aliceblue",
                "border":"none"
            }}>{this.props.children}</Button></Col>
        )
    }
}

export default ModifierTag;
