import React, {Component} from 'react';

class SecondEvent extends Component {

    addListRef = React.createRef();

    state = {

        list: [
            {
                id: "001", data: "111"
            },
            {
                id: "002", data: "222"
            },
            {
                id: "003", data: "333"
            }
        ]
    }

    render() {

        let newList = this.state.list.map(item => <li key={item.id}>{item.data}</li>)

        return (<div>
            <div>
                <input ref={this.addListRef}/>
                <button onClick={() => {
                    // 不要直接修改state属性

                }}>添加数据
                </button>
            </div>

            <ul>
                {newList}
            </ul>
        </div>);
    }
}

export default SecondEvent;