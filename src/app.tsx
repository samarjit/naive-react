import React from './NaiveReact';
import MyButton from './MyButton';

class App {
    render(): any {
        return (<div>Hello <MyButton/><MyButton/></div>);
    }
}

React.renderRoot(<App/>, document.getElementById('root'));