import { createContext, useReducer } from 'react';

const WorkOrderContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearWorkOrders: () => {},
});

function workOrderReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingWorkOrderItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingWorkOrderItemIndex > -1) {
      const existingItem = state.items[existingWorkOrderItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingWorkOrderItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingWorkOrderItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingWorkOrderItem = state.items[existingWorkOrderItemIndex];

    const updatedItems = [...state.items];

    if (existingWorkOrderItem.quantity === 1) {
      updatedItems.splice(existingWorkOrderItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingWorkOrderItem,
        quantity: existingWorkOrderItem.quantity - 1,
      };
      updatedItems[existingWorkOrderItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'CLEAR_WORK_ORDER') {
    return { ...state, items: [] };
  }

  return state;
}

export function WorkOrderContextProvider({ children }) {
  const [workOrder, dispatchWorkOrderAction] = useReducer(workOrderReducer, { items: [] });

  function addItem(item) {
    dispatchWorkOrderAction({ type: 'ADD_ITEM', item });
  }

  function removeItem(id) {
    dispatchWorkOrderAction({ type: 'REMOVE_ITEM', id });
  }

  function clearWorkOrder() {
    dispatchWorkOrderAction({ type: 'CLEAR_WORK_ORDER' });
  }

  const workOrderContext = {
    items: workOrder.items,
    addItem,
    removeItem,
    clearWorkOrder
  };

  return (
    <WorkOrderContext.Provider value={workOrderContext}>{children}</WorkOrderContext.Provider>
  );
}

export default WorkOrderContext;
