import React, { Component } from 'react';
import './TodoInfo.css'
class ToDoInfo extends Component {
    state = {
        toggle: false,
        text  : '',

        done:false,
    };

    handleChange = ( e ) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    handleToggleChange = () => {
        const { toggle, text } = this.state;
        const { data, onUpdate } = this.props;
        // false -> true
        if (!toggle) {
            this.setState({
                text  : data.text,
                toggle: true,
            });
        } else {
            onUpdate(data.id, { text: text });
            this.setState({
                toggle: false,
            });
        }
        // ture -> false
    };

    handleRemove = () => {
        const { data, onRemove } = this.props;
        onRemove(data.id);
    }

    render() {
        const { data } = this.props;
        const { toggle, text } = this.state;

        return (
            <div>
                {toggle ? (
                    <input
                        className='textLayout'
                        onChange={this.handleChange}
                        value={text}
                        name="text"
                    />
                ) : (
                    <span>
                        <input className='chkbox' type="checkbox"/>
                        <label className='textLayout'>{data.text}</label>
                    </span>
                )}
                <span className="btn_container">
                    <button onClick={this.handleToggleChange}>{toggle ? '적용' : '수정'}</button>
                    <button onClick={this.handleRemove}>삭제</button>
                </span>

            </div>
        );
    }
}

export default ToDoInfo;