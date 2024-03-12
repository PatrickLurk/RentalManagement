import { useContext } from 'react';
import useHttp from '../hooks/useHttp.js';

import Modal from './UI/Modal.jsx';
import WorkOrderContext from '../store/WorkOrderContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
import Error from './Error.jsx';
import Calendar from 'react-calendar';

/* *******************************************************/
/* display logging
/* *******************************************************/
const showLogging = true;

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function WorkOrders() {
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp('http://localhost:3000/work-orders', requestConfig);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleCalendarChange(calendarDate) {
    // setCalendarDate(calendarDate);
    console.log("handleCalendarChange");
    console.log(calendarDate);
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const workOrderData = Object.fromEntries(fd.entries()); // { email: test@example.com }

    showLogging && console.log("in WorkOrders.jdx::handleSubmit:: workOrderData[name] = **" + workOrderData['name'] + "**");
    showLogging && console.log("in WorkOrders.jdx::handleSubmit:: workOrderData[postal-code] = **" + workOrderData['postal-code'] + "**");
    showLogging && console.log("in WorkOrders.jdx::handleSubmit:: workOrderData[city] = **" + workOrderData['city'] + "**");

    sendRequest(
      JSON.stringify({
        order: {
          workOrder: workOrderData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  /* open={true}  */

  if (data && !error) {
    return (
      <Modal
        open={true}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );  
  }

  return (
      <div>
        <h2>Work Orders</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Full Name" type="text" id="name" initialValue="Patrick Allen Lurk"/>
          <div className="control-row">
            <Input label="Postal Code" type="text" id="postal-code" initialValue="12345"/>
            <Input label="City" type="text" id="city"  initialValue="Any city"/>
          </div>

          {error && <Error title="Failed to submit order" message={error} />}
          
          <p className="modal-actions">{actions}</p>
        </form>
      </div>
  );
}