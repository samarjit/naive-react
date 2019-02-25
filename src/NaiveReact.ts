export default class NaiveReact{

    static singletonRegistry = {};
    static srCount=0;
    static getInstance(tagName: any) {
        // if(NaiveReact.singletonRegistry[tagName.name] !== undefined) {
        //     return NaiveReact.singletonRegistry[tagName.name];
        // } else {
        //     const obj = new tagName();
        //     NaiveReact.singletonRegistry[tagName.name] = obj;
        // }
        // return NaiveReact.singletonRegistry[tagName.name];
        return new tagName();
    }
    static appendRef(inst, elm, instNumber) {
        var srRef = elm.dataset.sr;
        if (srRef === undefined) {
            srRef = {};
        } else {
            srRef = JSON.parse(srRef);
        }
        if(instNumber && inst) {
            srRef[instNumber]= inst.constructor.name;
            elm.dataset.sr = JSON.stringify(srRef);
        } else
        if(/*srRef[NaiveReact.srCount] === undefined &&*/ inst) {
            srRef[NaiveReact.srCount]= inst.constructor.name;
            elm.dataset.sr = JSON.stringify(srRef);
            NaiveReact.srCount++;
        }
    }
    static createElement(tagName: any, attrs:{[x: string]: any}, ...children) {
        let elm;
        let inst;
        if(typeof(tagName) === 'function'){
            inst = NaiveReact.getInstance(tagName);
            elm = inst.render();
            NaiveReact.singletonRegistry[NaiveReact.srCount]= inst;
            
        } else {
            elm = document.createElement(tagName);
        }

        //append ref
        NaiveReact.appendRef(inst, elm, null);
        

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
    static forceRender(comp) {
        let instNumber;
        Object.entries(NaiveReact.singletonRegistry).forEach((entry) => {
            if(entry[1] === comp) {
                instNumber =  entry[0];
            }
        });
        //find dom node;
        let nodes = document.querySelectorAll('*[data-sr]');
        const domnode = Array.from(nodes).filter( el => Object.keys(JSON.parse(el.getAttribute('data-sr'))).indexOf(instNumber) > -1);
        if(domnode.length === 1) {
            const newNode = comp.render();
            //append ref
            NaiveReact.appendRef(comp, newNode, instNumber);
            domnode[0].parentElement.replaceChild(newNode, domnode[0]);
        } else {
            console.error('Ambiguous nodes found for replacement');
        }
    }
    static renderRoot(obj, rootElement) {
        for(var element of rootElement.children) {
            rootElement.removeChild(element);
        };
        rootElement.appendChild( obj );
    }
};