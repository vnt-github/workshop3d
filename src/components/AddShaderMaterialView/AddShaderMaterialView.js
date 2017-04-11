import React, { Component } from 'react';
import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/tomorrow-night-eighties.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';

import './AddShaderMaterialView.css';

class AddShaderMaterialView extends Component {
    componentDidMount() {
        CodeMirror.fromTextArea(this.refs.editor, {
            lineNumbers: true,
            mode: 'x-shader/x-fragment',
            theme: 'tomorrow-night-eighties',
            indentUnit: 4
        });
    }

    render() {
        return (
            <textarea defaultValue="hello" ref="editor" style={{fontSize: 50}} />
        );
    }
}

export default AddShaderMaterialView;
