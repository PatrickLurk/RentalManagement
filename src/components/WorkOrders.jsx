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
  const [selectedCondo, setSelectedCondo] = useState('');
  const [priority, setPriority] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
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
  const onChangeIncidentDate = ({ target }) => {
    showLogging && console.log("onChangeIncidentDate()::target.value = **" + target.value + "**");
    const newDate = moment(target.value).format('YYYY-MM-DD');
    setIncidentDate(newDate);
    showLogging && console.log("incidentDate = **" + incidentDate + "**");
  };

  /* *******************************************************/
  /* *******************************************************/
  const onChangeExpectedCompletionDate = ({ target }) => {
    showLogging && console.log("onChangeExpectedCompletionDate()::target.value = **" + target.value + "**");
    const newDate = moment(target.value).format('YYYY-MM-DD');
    setExpectedCompletionDate(newDate);
    showLogging && console.log("expectedCompletionDate = **" + expectedCompletionDate + "**");
  };

    /* *******************************************************/
  /* *******************************************************/
  const onChangeAssignedTo = ({ target }) => {
    showLogging && console.log("onAssignedTo()::target.value = **" + target.value + "**");
    setAssignedTo(target.value);
  };

  /* *******************************************************/
  /* *******************************************************/
  const handleSelectCondoChange = (event) => {
    setSelectedCondo(event.target.value);
  };
  
  /* *******************************************************/
  /* *******************************************************/
  const handleSelectPriorityChange = (event) => {
    setPriority(event.target.value);
  };

  /* *******************************************************/
  /* *******************************************************/
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const workOrderData = Object.fromEntries(fd.entries()); // { email: test@example.com }

    showLogging && console.log("in WorkOrders.jdx::handleSubmit:: workOrderData[location] = **" + workOrderData['location'] + "**");
    showLogging && console.log("in WorkOrders.jdx::handleSubmit:: workOrderData[requestor] = **" + workOrderData['requestor'] + "**");
    showLogging && console.log("in WorkOrders.jdx::handleSubmit:: workOrderData[incidentDate] = **" + workOrderData['incidentDate'] + "**");
    showLogging && console.log("in WorkOrders.jdx::handleSubmit:: workOrderData[expectedCompletionDate] = **" + workOrderData['expectedCompletionDate'] + "**");   
    showLogging && console.log("in WorkOrders.jdx::handleSubmit:: workOrderData[assignedTo] = **" + workOrderData['assignedTo'] + "**");
    showLogging && console.log("in WorkOrders.jdx::handleSubmit:: workOrderData[priority] = **" + workOrderData['priority'] + "**");
    showLogging && console.log("in WorkOrders.jdx::handleSubmit:: workOrderData[description] = **" + workOrderData['description'] + "**");

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
  function handleFinish() {
    console.log("handleFinish");
    userProgressCtx.hideCheckout();
    clearData();
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
      <h2>Work Order Request Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="location" style={{color: "red"}}>Location:</label>
            <select 
              id="location"
              name="location"
              onChange={handleSelectCondoChange} 
              style={{height: "2.0rem", width:"10rem"}}>
              <option value="sundestin">SunDestin</option>
              <option value="breakers">Breakers</option>
              <option value="surfside">Surfside</option>
            </select>
          </p>
        </div>
        <Input 
          label="Requestor:" 
          type="text" 
          id="requestor"
          name="requestor"
          initialValue="Patrick Allen Lurk"/>
        <div className="control-row">
          <p className="control">
            <label htmlFor="incidentDate">Date of Request:</label>
            <input 
              id="incidentDate"
              name="incidentDate"
              type="date"
              value={incidentDate}
              onChange={(e)=>onChangeIncidentDate(e)}/>              
          </p>
          <p className="control">
            <label htmlFor="expectedCompletionDate">Expected Completion Date:</label>
            <input 
              id="expectedCompletionDate"
              name="expectedCompletionDate"
              type="date"
              value={expectedCompletionDate}
              onChange={(e)=>onChangeExpectedCompletionDate(e)}/>              
          </p>
        </div>

        <div className="control-row">
          <Input 
            label="Assigned To:" 
            type="text" 
            id="assignedTo"
            name="assignedTo"
            initialValue="Patrick Allen Lurk"/>
          <p className="control">
            <label htmlFor="priority">Priority:</label>
            <select 
              id="priority"
              name="priority"
              onChange={handleSelectPriorityChange} 
              style={{height: "2.3rem", width:"10rem"}}>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </p>
        </div>
        <div>
        </div>
        <p className="control">
          <label htmlFor="description">Enter description of request:</label>
          <textarea 
            id="description"
            name="description" 
            rows={10} 
            cols={80} />
        </p>

        {error && <Error title="Failed to submit order" message={error} />}
        
        <p className="modal-actions">{actions}</p>
      </form>
    </div>
  );
}