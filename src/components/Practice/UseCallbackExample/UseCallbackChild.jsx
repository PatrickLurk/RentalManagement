import { useState, useCallback } from 'react';
import Button from '../../UI/Button.jsx';

console.log("in UseCallbackChild.jsx::outside of the UseCallbackChild component");

export default function UseCallbackChild( {firstValue, secondValue} ) {
    console.log("in UseCallbackChild.jsx::beginning of component");

    const [dataValue, setDataValue] = useState(false);
    const [anotherDataValue, setAnotherDataValue] = useState(false);

    const DisplayConsoleLog = useCallback(function DisplayConsoleLog(someText) {
        console.log(someText);
    }, 
    [someText]);

    async function handleClick() {
        console.log("in UseCallbackChild.jsx::handleClick() - beginning");
        console.log("in UseCallbackChild.jsx::handleClick()::before setDataValue **" + (dataValue ? "true" : "false") + "**")
        setDataValue(!dataValue);
        console.log("in UseCallbackChild.jsx::handleClick()::after setDataValue **" + (dataValue ? "true" : "false") + "**")

        console.log("in UseCallbackChild.jsx::handleClick() - end");
    };

    async function handleClick2() {
        console.log("in UseCallbackChild.jsx::handleClick2() - beginning");
        console.log("in UseCallbackChild.jsx::handleClick2()::before setDataValue **" + (dataValue ? "true" : "false") + "**")
        setAnotherDataValue(!dataValue);
        console.log("in UseCallbackChild.jsx::handleClick2()::after setDataValue **" + (dataValue ? "true" : "false") + "**")

        console.log("in UseCallbackChild.jsx::handleClick2() - end");
    };        /* if one of the dependencies has change, then return the newly created function */

    console.log("in UseCallbackChild.jsx::end of component");

    return (
        <div style = {{border: '3px dashed green'}}>
            <h2>Example using useCallback</h2>
            <div>
                <Button onClick={handleClick} display={() => DisplayConsoleLog}>
                    Click Me (does use useCallback)
                </Button>
            </div>
            <div>
                <Button onClick={handleClick2} display={DisplayConsoleLog}>
                    Click Me (does NOT use useCallbacK)
                </Button>
            </div>
        </div>
    );
}