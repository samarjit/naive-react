## Lets build a naive react
    Given that TypeScript natively supports jsx now. It is also possible to compile jsx with babel without React js. The output javascript contains `React.createElement()`. 
    In this project, I am trying to implement this createElement() to render dom tree. Initial render is quite simple. But it gets complicated to handle rerender where children nodes need to be tracked and replaced. This was achieved in stage 2.
    To run the project. 
    1) `npm install`
    2) `npm run build`   -- This will compile all jsx and concatenate using browserify in the dist folder.
    3) Open the index.html from dist folder in a browser. Alternatively run `http-server` to serve static files from dist directory

    * Note: This is a work in progress *
### Stage 1
    We have a simple render logic that traverses the nodes through render functions and generates dom. It is simple template rendering.
#### There is no way to rerender subtrees.
    If I go with virtual dom path there is no need to rerender subtrees as it will be always full render and virtual dom diff will take care. And then dom patch will be done as in traditional react.
#### There is no way to know which subtree needs to be rerendered.
    One way is to make the state,props as observables and we can figure out if it requires rerender. Probably this is how angular1 was built.
    The rerender also cannot patch the dom since there is no marker to tell which node is being referred by the current component, so that the subtree can be replaced.
    Also I am starting to ponder what happens if the child subtree contains a form, all user's selection will be lost. So singleton will be required, but singleton instance must be created per unique node. Once created those instances are created, those needs to be reused otherwise state data will be lost.

##### We may have to go with synthetic events for 2 reasons. 
    1) To be able to cleanup without memory leaking.
    2) To know if rerender is required if there is an event.

### Stage 2
    Marker reference to each component instance in html node.

