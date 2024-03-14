import { useState, useContext } from 'react';
import useHttp from '../hooks/useHttp.js';

import Modal from './UI/Modal.jsx';
import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
import Error from './Error.jsx';
import moment from "moment";

/* *******************************************************/
/* display logging
/* *******************************************************/
const showLogging = true;

/* *******************************************************/
/* *******************************************************/
const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

/* *******************************************************/
/* WorkOrders
/* *******************************************************/
export default function WorkOrders() {
  const [incidentDate, setIncidentDate] = useState(moment().format('YYYY-MM-DD'));
  const [expectedCompletionDate, setExpectedCompletionDate] = useState(moment().format('YYYY-MM-DD'));

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp('http://localhost:3000/work-orders', requestConfig);

  /* *******************************************************/
  /* *******************************************************/
  function handleFinish() {
    console.log("handleFinish");
    userProgressCtx.hideCheckout();
    clearData();
  }

  /* *******************************************************/
  /* *******************************************************/
  const onChangeIncidentDate = ({ target }) => {
    showLogging && console.log("onChangeIncidentDate()::target.value = **" + target.value + "**");
    const newDate = moment(target.value).format('YYYY-MM-DD');
    setIncidentDate(newDate);
    showLogging && console.log("newDate = **" + newDate + "**");
  };

  /* *******************************************************/
  /* *******************************************************/
  const onChangeExpectedCompletionDate = ({ target }) => {
    showLogging && console.log("onChangeExpectedCompletionDate()::target.value = **" + target.value + "**");
    const newDate = moment(target.value).format('YYYY-MM-DD');
    setExpectedCompletionDate(newDate);
    showLogging && console.log("newDate = **" + newDate + "**");
  };

  /* *******************************************************/
  /* *******************************************************/
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

  /* *******************************************************/
  /* *******************************************************/
  let actions = (
    <>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  /* *******************************************************/
  /* *******************************************************/
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

  /* *******************************************************/
  /* *******************************************************/
  return (
      <div>
        <h2>Work Orders</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Full Name" type="text" id="name" initialValue="Patrick Allen Lurk"/>
          <div className="control-row">
            <Input label="Postal Code" type="text" id="postal-code" initialValue="12345"/>
            <Input label="City" type="text" id="city"  initialValue="Any city"/>
          </div>
          <p className="control">
            <label htmlFor="incidentDate">Incident Date:</label>
            <input 
              id="incidentDate"
              type="date"
              value={incidentDate}
              onChange={(e)=>onChangeIncidentDate(e)}/>              
          </p>
          <p className="control">
            <label htmlFor="description">Enter description of problem</label>
            <textarea 
              id="description"
              name="postContent" 
              rows={10} 
              cols={80} />
          </p>
          <p className="control">
            <label htmlFor="expectedCompletionDate">Expected Completion Date:</label>
            <input 
              id="expectedCompletionDate"
              type="date"
              value={expectedCompletionDate}
              onChange={(e)=>onChangeExpectedCompletionDate(e)}/>              
          </p>
          {error && <Error title="Failed to submit order" message={error} />}
          
          <p className="modal-actions">{actions}</p>
        </form>
      </div>
  );
}