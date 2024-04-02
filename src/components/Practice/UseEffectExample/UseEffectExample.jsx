import { useEffect, useRef, useState } from 'react';

import Button from '../../UI/Button.jsx';

console.log("in UseEffectExample.jsx::outside of the UseEffectExample component");

export default function UseEffectExample() {
    console.log("in UseEffectExample.jsx::beginning of component");

    const [dataValue, setDataValue] = useState(false);

    console.log("in UseEffectExample.jsx::beginning of component dataValue = **" + (dataValue ? "true" : "false") + "**");
    
    useEffect(() => {
        console.log("in UseEffectExample.jsx::useEffect()::beginning");
        console.log("in UseEffectExample.jsx::useEffect() **" + (dataValue ? "true" : "false") + "**");
        console.log("in PUseEffectExampleayouts.jsx::useEffect()::end");
        }, [dataValue]
    );

    function handleClick() {
        console.log("in UseEffectExample.jsx::handleClick()");
        console.log("in UseEffectExample.jsx::handleClick()::before setDataValue **" + (dataValue ? "true" : "false") + "**")
        setDataValue(!dataValue);
        console.log("in PaUseEffectExampleyouts.jsx::handleClick()::after setDataValue **" + (dataValue ? "true" : "false") + "**")
    }

    console.log("in UseEffectExample.jsx::end of component");
    let buttonTextColor = dataValue ? 'red': 'yellow';
    let buttonBackgroundColor = dataValue ? 'yellow': 'red';

    return (
        <div>
            <div style = {{border: '3px dashed blue'}}>
                <h2>Example using useEffect</h2>
                <p>Click the button to cause the useEffect() function to execute.</p>
                <p>The useEffect() function will cause the color of the button to change.</p>
                <Button style = {{color: buttonTextColor, backgroundColor: buttonBackgroundColor, fontWeight: 'bold'}} onClick={handleClick}>Click</Button>
            </div>
            <br/>
        </div>
    );
}
