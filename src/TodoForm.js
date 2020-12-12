import React, { Component } from 'react';

class ToDoForm extends Component {
    state = {
        text: '',
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onCreate(this.state);
        this.setState({
            text: '',
        });
    };
    render() {
        const { text } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={text}
                           name="text"
                           placeholder="Insert to do..."
                           onChange={this.handleChange}
                           style={{height:"20px",width:"170px",font:"25px"}}
                    />
                    &nbsp;&nbsp;
                    <button type="submit" style={{height:"26px"}}>추가</button>
                </form>
            </div>
        );
    }
}

export default ToDoForm;