export default class DummyReact{

    static singletonRegistry = {};
    static getInstance(tagName: any) {
        if(DummyReact.singletonRegistry[tagName.name] !== undefined) {
            return DummyReact.singletonRegistry[tagName.name];
        } else {
            const obj = new tagName();
            DummyReact.singletonRegistry[tagName.name] = obj;
        }
        return DummyReact.singletonRegistry[tagName.name];
    }
    static createElement(tagName: any, attrs:{[x: string]: any}, ...children) {
        let elm;
        if(typeof(tagName) === 'function'){
            elm = DummyReact.getInstance(tagName).render();
        } else {
            elm = document.createElement(tagName);
        }
        if(attrs) {
        for( var attr in attrs) {
            
            if(/on\w+/.test(attr)) {
                let eventName = attr.replace(/^on/,'');
                eventName = eventName.charAt(0).toLocaleLowerCase() + eventName.substr(1);
                elm.addEventListener(eventName, attrs[attr]);
            } else {
                elm.setAttribute(attr, attrs[attr]);
            }
        };
        }

        if(children) {
            children.forEach((child) => {
                if(typeof child === 'string' || typeof child === 'number') {
                    elm.innerHTML = elm.innerHTML + child;
                } else {
                    // assume it is a function; perhaps a function createElement(..)
                    elm.appendChild(child);
                }
            });
        }
        return elm;
    }

    static renderRoot(obj, rootElement) {
        for(var element of rootElement.children) {
            rootElement.removeChild(element);
        };
        rootElement.appendChild( obj );
    }
};