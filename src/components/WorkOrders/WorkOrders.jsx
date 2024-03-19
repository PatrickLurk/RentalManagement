import { useState, useContext } from 'react';
import useHttp from '../../hooks/useHttp.js';

import Modal from '../UI/Modal.jsx';
import Input from '../UI/Input.jsx';
import Radio from './Radio.jsx';
import Button from '../UI/Button.jsx';
import Error from '../UI/Error.jsx';
import moment from "moment";
import UserProgressContext from '../../store/UserProgressContext.jsx';

/* *******************************************************/
/* display logging
/* *******************************************************/
const showLogging = false;

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
  const [showMessage, setShowMessage] = useState(false);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp('http://localhost:3000/work-orders', requestConfig);

  const userProgressCtx = useContext(UserProgressContext);

  /* *******************************************************/
  /* handleUnitNumberChange
  /* *******************************************************/
  const handleUnitNumberChange = ({ target }) => {
    showLogging && console.log("handleUnitNumberChange()::target.value = **" + target.value + "**");
    setUnitNumber(target.value);
  };

  /* *******************************************************/
  /* handleIncidentDateChange
  /* *******************************************************/
  const handleIncidentDateChange = ({ target }) => {
    showLogging && console.log("handleIncidentDateChange()::target.value = **" + target.value + "**");
    const newDate = moment(target.value).format('YYYY-MM-DD');
    setIncidentDate(newDate);
    showLogging && console.log("incidentDate = **" + incidentDate + "**");
  };

  /* *******************************************************/
  /* handleExpectedCompletionDateChange
  /* *******************************************************/
  const handleExpectedCompletionDateChange = ({ target }) => {
    showLogging && console.log("handleExpectedCompletionDateChange()::target.value = **" + target.value + "**");
    const newDate = moment(target.value).format('YYYY-MM-DD');
    setExpectedCompletionDate(newDate);
    showLogging && console.log("expectedCompletionDate = **" + expectedCompletionDate + "**");
  };

  /* *******************************************************/
  /* handleCondoChange
  /* *******************************************************/
  const handleCondoChange = (event) => {
    setCondo(event.target.value);
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
        <p>Your work order was submitted successfully.</p>
        <p>You will recieve a confirmation via email within the next few minutes.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>OK</Button>
        </p>
      </Modal>
    );  
  }

  setTimeout(() => {
    setShowMessage(true);
  }, 50000);

  /* *******************************************************/
  /* JSX code
  /* *******************************************************/
  return (
    <div>
      {showMessage ? 
        <div>
          <Modal open={true} onClose={handleFinish}>
            <h2>Please contine entering data</h2>
            <p className="modal-actions">
              <Button onClick={handleFinish}>OK</Button>
            </p>
          </Modal>
        </div> 
        : null
      }
      <h2>Work Order Request Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="condo">Location:</label>
            <select 
              id="condo"
              name="condo"
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
              onChange={(e)=>handleUnitNumberChange(e)}/>  
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
              onChange={(e)=>handleIncidentDateChange(e)}/>              
          </p>
          <p className="control">
            <label htmlFor="expectedCompletionDate">Expected Completion Date:</label>
            <input 
              id="expectedCompletionDate"
              name="expectedCompletionDate"
              type="date"
              value={expectedCompletionDate}
              onChange={(e)=>handleExpectedCompletionDateChange(e)}/>              
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
            rows={6} 
            cols={80} />
        </p>

        {error && <Error title="Failed to submit order" message={error} />}
        
        <p className="modal-actions">{actions}</p>
      </form>
    </div>
  );
}