import { useDragLayer } from "react-dnd";

export function CustomDragLayer() {
  const { isDragging, item, currentOffset, initialOffset, initialClientOffset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getClientOffset(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    initialClientOffset: monitor.getInitialClientOffset(),
  }));

  if (!isDragging || !item || !currentOffset || !initialOffset || !initialClientOffset) {
    return null;
  }

  const offsetX = initialClientOffset.x - initialOffset.x;
  const offsetY = initialClientOffset.y - initialOffset.y;

  const layerStyles = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 100,
    left: currentOffset.x - offsetX,
    top: currentOffset.y - offsetY,
  };

  return (
    <div style={layerStyles}>
      <div
        className="bigcal-pointer-events-none bigcal-rounded bigcal-border bigcal-shadow-md"
        style={{
          width: item.width,
          height: item.height,
        }}
      >
        {item.children}
      </div>
    </div>
  );
}
