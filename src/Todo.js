import React,{Component} from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
class Todo extends Component{
    id = 0;
    state = {
        toDoList: [

        ],

    };
    handleCreate = (data) => {
        const { toDoList } = this.state;

        this.setState({
            toDoList: toDoList.concat({
                id: this.id++,
                ...data,
            }),
        });
    };

    handleUpdate = (id, data) => {
        const { toDoList } = this.state;

        this.setState({
            toDoList: toDoList.map((toDoList) => {
                console.log(toDoList);
                if (toDoList.id === id) {
                    console.log(toDoList.id + ' / ' + id);
                    return {
                        id,
                        ...data,
                    };
                }
                return toDoList;
            }),
        });
    };
    handleRemove = (id) => {
        const { toDoList } = this.state;

        this.setState({
            toDoList: toDoList.filter((data) => data.id !== id),
        });
    };
    render() {
        const {toDoList} = this.state;
        return (
            <div>
                <h3>To do List</h3>
                <TodoForm onCreate={this.handleCreate}/>
                <TodoList data={toDoList} onUpdate={this.handleUpdate} onRemove={this.handleRemove}/>
            </div>
        );
    }
}
export default Todo;