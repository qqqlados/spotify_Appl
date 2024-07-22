// IF WE NEED SOME AREA TO DRAG ELEMENT BUT NO ELEMENT BY ITSELF WE NEED TO PASS SOME PROPS TO DRAGGABLE COMPONENT LIKE 'dragHandleProps={provided.dragHandleProps}' AND FOR CONTAINER WE SPREAD OUR PROPS LIKE THIS: '<div ...{dragHandleProps}> <SomeComponent /> </div>'. DragHandleProps CARES FOR AREA, THE ELEMENT IS DRAGGING BY. FOR THE ELEMENT THAT IS DRAGGING WE PASS PROPS 'provided.droppableProps'.

// IF WE NEED TO SIMPLY DRAG ELEMENT WE PASS BENCH OF PROPS: provided.droppableProps (accounts for ability to drag element) and provided.DragHandleProps
