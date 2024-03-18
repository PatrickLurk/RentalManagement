import { useState, useContext } from 'react';
import useHttp from '../hooks/useHttp.js';

import Modal from './UI/Modal.jsx';
import Input from './UI/Input.jsx';
import Radio from './UI/Radio.jsx';
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
  const [selectedCondo, setCondo] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
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
  /* onChangeUnitNumber
  /* *******************************************************/
  const onChangeUnitNumber = ({ target }) => {
    showLogging && console.log("onChangeUnitNumber()::target.value = **" + target.value + "**");
    setUnitNumber(target.value);
  };

  /* *******************************************************/
  /* onChangeIncidentDate
  /* *******************************************************/
  const onChangeIncidentDate = ({ target }) => {
    showLogging && console.log("onChangeIncidentDate()::target.value = **" + target.value + "**");
    const newDate = moment(target.value).format('YYYY-MM-DD');
    setIncidentDate(newDate);
    showLogging && console.log("incidentDate = **" + incidentDate + "**");
  };

  /* *******************************************************/
  /* onChangeExpectedCompletionDate
  /* *******************************************************/
  const onChangeExpectedCompletionDate = ({ target }) => {
    showLogging && console.log("onChangeExpectedCompletionDate()::target.value = **" + target.value + "**");
    const newDate = moment(target.value).format('YYYY-MM-DD');
    setExpectedCompletionDate(newDate);
    showLogging && console.log("expectedCompletionDate = **" + expectedCompletionDate + "**");
  };

  /* *******************************************************/
  /* onChangeAssignedTo
  /* *******************************************************/
  const onChangeAssignedTo = ({ target }) => {
    showLogging && console.log("onAssignedTo()::target.value = **" + target.value + "**");
    setAssignedTo(target.value);
  };

  /* *******************************************************/
  /* handleCondoChange
  /* *******************************************************/
  const handleCondoChange = (event) => {
    setCondo(event.target.value);
  };
  
  /* *******************************************************/
  /* handlePriorityChange
  /* *******************************************************/
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  /* *******************************************************/
  /* handleSubmit
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
  /* handleFinish
  /* *******************************************************/
  function handleFinish() {
    console.log("handleFinish");
    userProgressCtx.hideCheckout();
    clearData();
  }

  /* *******************************************************/
  /* actions
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
  /* JSX code
  /* *******************************************************/
  return (
    <div>
      <h2>Work Order Request Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="location">Location:</label>
            <select 
              id="location"
              name="location"
              onChange={handleCondoChange} 
              style={{height: "2.0rem", width:"10rem"}}>
              <option value="sundestin">SunDestin</option>
              <option value="breakers">Breakers</option>
              <option value="surfside">Surfside</option>
            </select>
          </p>
          <p className="control">
            <label htmlFor="unitNumber">Unit Number:</label>
            <input 
              id="unitNumber"
              name="unitNumber"
              type="text"
              value={unitNumber}
              onChange={(e)=>onChangeUnitNumber(e)}/>  
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
          <div>
            <Input 
              label="Assigned To:" 
              type="text" 
              id="assignedTo"
              name="assignedTo"
              initialValue="Patrick Allen Lurk, Jr"/>
            <Input 
              label="Supervisor:" 
              type="text" 
              id="supervisor"
              name="supervisor"
              initialValue="Patrick Allen Lurk, Sr"/>
            </div>
            <div>
              <Radio label="Priority:"/>
            </div>
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