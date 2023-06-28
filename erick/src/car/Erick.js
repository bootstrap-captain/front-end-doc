import React from "react";

class App extends React.Component {
    render() {
        let name = "erick";
        let nameStyle = {background: "red", fontSize: "100px"} // 驼峰样式
        return (
            <div>
                <div style={{background: "yellow"}}>
                    {10 + 20}
                </div>

                <div style={nameStyle}>
                    {name}
                </div>

                <div>
                    {10 > 20 ? "aaa" : "bbb"}
                </div>
            </div>
        )
    }
}

export default App