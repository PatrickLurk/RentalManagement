import { useEffect, useRef, useState } from 'react';

import Button from '../UI/Button.jsx';

console.log("in Payouts.jsx::outside of the Payouts component");

export default function Payouts() {
    console.log("in Payouts.jsx::beginning of component");

    const [dataValue, setDataValue] = useState(false);

    useEffect(() => {
        console.log("in Payouts.jsx::useEffect()::beginning");

        console.log("in Payouts.jsx::useEffect()::end");
        }, [dataValue]
    );

    function handleClick() {
        console.log("in Payouts.jsx::handleClick()");
        console.log("in Payouts.jsx::handleClick() **" + (dataValue ? "true" : "false") + "**")
        setDataValue(!dataValue);
    }

    console.log("in Payouts.jsx::end of component");

    return (
        <div>
            <h2>Payouts</h2>
            <p>Click the button to cause the useEffect() function to execute.</p>
            <Button onClick={handleClick}>Click</Button>
        </div>
    );
}
