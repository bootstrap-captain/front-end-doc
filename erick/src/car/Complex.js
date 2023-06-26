import React from "react";

function Navbar() {
    return <div>Hello Navbar</div>;
}

function Menu() {
    return <div>Hello Menu</div>;
}

function Address() {
    return <div>Hello Address</div>;
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <Menu></Menu>
                <Address></Address>
            </div>
        )
    }
}

export default App