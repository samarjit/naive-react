import React from './DummyReact';

export default class MyButton {
    state: any;
    constructor() {
        this.state = {count: 0};
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler() {
        console.log('Button clicked');
        this.state.count += 1; 
    };
    render() {
        return (<div>
            {this.state.count}
            <button onClick={this.clickHandler}>button text</button>
        </div>);
    }
}