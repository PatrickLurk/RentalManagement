import { useState, useCallback } from 'react';
import UseCallbackChild from './UseCallbackChild.jsx';

console.log("in UseCallbackParent.jsx::outside of the UseCallbackParent component");

export default function UseCallbackParent() {
    console.log("in UseCallbackParent.jsx::beginning of component");

    console.log("in UseCallbackParent.jsx::end of component");

    return (
        <div>
            <UseCallbackChild firstValue='true' secondValue='true'/>
        </div>
    );
}