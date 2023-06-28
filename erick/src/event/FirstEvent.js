import React from "react";

class ErickEvent extends React.Component {

    // 名字必须为state
    state = {
        collect: "收藏",
        unCollect: "取消收藏",
        flag: true
    }

    render() {
        return (
            <div>
                <h1>欢迎你</h1>
                <button onClick={() => {
                    this.setState({
                        flag: !this.state.flag
                    })
                }}>{this.state.flag ? this.state.collect : this.state.unCollect}
                </button>

                <br/>
            </div>
        )
    }
}

export default ErickEvent