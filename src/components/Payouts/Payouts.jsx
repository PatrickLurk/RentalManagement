import { useEffect, useRef, useState } from 'react';

import Button from '../UI/Button.jsx';

console.log("in Payouts.jsx::outside of the Payouts component");

export default function Payouts() {
    console.log("in Payouts.jsx::beginning of component");

    const [dataValue, setDataValue] = useState(false);

    console.log("in Payouts.jsx::beginning of component dataValue = **" + (dataValue ? "true" : "false") + "**");
    
    useEffect(() => {
        console.log("in Payouts.jsx::useEffect()::beginning");
        console.log("in Payouts.jsx::useEffect() **" + (dataValue ? "true" : "false") + "**");
        console.log("in Payouts.jsx::useEffect()::end");
        }, [dataValue]
    );

    function handleClick() {
        console.log("in Payouts.jsx::handleClick()");
        console.log("in Payouts.jsx::handleClick()::before setDataValue **" + (dataValue ? "true" : "false") + "**")
        setDataValue(!dataValue);
        console.log("in Payouts.jsx::handleClick()::after setDataValue **" + (dataValue ? "true" : "false") + "**")
    }

    console.log("in Payouts.jsx::end of component");
    let buttonTextColor = dataValue ? 'red': 'yellow';
    let buttonBackgroundColor = dataValue ? 'yellow': 'red';

    return (
        <div>
            <h2>Payouts</h2>
            <div style = {{border: '3px dashed blue'}}>
                <p>Click the button to cause the useEffect() function to execute.</p>
                <Button style = {{color: buttonTextColor, backgroundColor: buttonBackgroundColor, fontWeight: 'bold'}} onClick={handleClick}>Click</Button>
            </div>
        </div>
    );
}
