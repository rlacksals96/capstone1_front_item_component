

import React, { Component } from 'react';
import ToDoInfo from './TodoInfo';
import './TodoList.css';
class ToDoList extends Component {

    render() {
        const { data, onUpdate, onRemove } = this.props;

        return (
            <div>
                <ul>
                    {data.map((data) => (
                        <li className='itemStyle'>
                            <ToDoInfo data={data} onUpdate={onUpdate} onRemove={onRemove} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ToDoList;