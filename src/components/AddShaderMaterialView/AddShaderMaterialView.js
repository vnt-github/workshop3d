import React, { Component, PropTypes } from 'react';
import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/tomorrow-night-eighties.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';

import AddShaderMaterialRenderer from '../AddShaderMaterialRenderer/AddShaderMaterialRenderer';

import './AddShaderMaterialView.css';

class AddShaderMaterialView extends Component {
    constructor(props) {
        super(props);

        this.fragmentShader = `
            uniform vec2 u_resolution;
            uniform float u_time;
            uniform vec2 u_mouse;

            void main() {
                gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
            }
        `.replace(/^ {12}/gm, '').trim();

        this.state = {
            fragmentShader: this.fragmentShader
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.refs.editor.focus();

        const cm = CodeMirror.fromTextArea(this.refs.editor, {
            lineNumbers: true,
            mode: 'x-shader/x-fragment',
            theme: 'tomorrow-night-eighties',
            indentUnit: 4
        });
        cm.on('change', this.onChange);
    }

    onChange(e) {
        this.setState({
            fragmentShader: e.getValue()
        });
    }

    render() {
        return (
            <div className="add-shader-material-view">
                <textarea defaultValue={this.fragmentShader} ref="editor" style={{fontSize: 50}} />
                <AddShaderMaterialRenderer fragmentShader={this.state.fragmentShader} callbacks={this.props.callbacks} />
            </div>
        );
    }
}

AddShaderMaterialView.propTypes = {
    callbacks: PropTypes.object.isRequired
};

export default AddShaderMaterialView;
