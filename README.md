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

