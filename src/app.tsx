import React from './DummyReact';
import MyButton from './MyButton';

class App {
    render(): any {
        return (<div>Hello <MyButton/></div>);
    }
}

React.renderRoot(<App/>, document.getElementById('root'));