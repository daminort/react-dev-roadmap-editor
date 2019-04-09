/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
export const boxSource = {
  canDrag(props) {
    // You can disallow drag based on props
    return props.isSelected && !props.isResize;
  },

  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.id;
  },

  beginDrag(props /*, monitor, component*/) {
    // Return the data describing the dragged item
    const item = { id: props.id };
    return item;
  },

  endDrag(props, monitor, component) {
    const initialOffset = monitor.getInitialSourceClientOffset();
    const currentOffset = monitor.getSourceClientOffset();
    const difference    = monitor.getDifferenceFromInitialOffset();

    component.onEndDrag({
      initialOffset,
      currentOffset,
      difference,
    });
  },
};

/**
 * Specifies which props to inject into your component.
 */
export function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
  };
}
