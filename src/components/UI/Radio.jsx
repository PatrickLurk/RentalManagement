import React, { useState } from "react"; 

export default function Radio({label}) { 
	const [selectedValue, setSelectedValue] = useState("option1"); 

	const handleRadioChange = (value) => { 
		setSelectedValue(value); 
	}; 

	const styles = { 
        container: { 
            display: "flex", 
            flex: 1, 
            justifyContent: "top",
            alignItems: "center", 
        }, 
        radioGroup: { 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "space-around", 
            // marginTop: "1px", 
            borderRadius: "8px", 
            backgroundColor: "white", 
            padding: "15px", 
            boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)", 
        }, 
        radioButton: { 
            display: "flex", 
            flexDirection: "row", 
            alignItems: "center", 
        }, 
        radioLabel: { 
            marginLeft: "8px", 
            fontSize: "17px", 
            color: "#333", 
        }, 
    }; 

	return ( 
        <div className="control-row">
            <p className="control">
                <label>{label}</label>
                <div style={styles.container}> 
                    <div style={styles.radioGroup}> 
                        <div style={styles.radioButton}> 
                            <input 
                                type="radio"
                                id="option1"
                                value="option1"
                                checked={selectedValue === "option1"} 
                                onChange={() => handleRadioChange("option1")} 
                            /> 
                            <label htmlFor="option1" style={styles.radioLabel}>High</label> 
                        </div>
                        <div style={styles.radioButton}> 
                            <input 
                                type="radio"
                                id="option2"
                                value="option2"
                                checked={selectedValue === "option2"} 
                                onChange={() => handleRadioChange("option2")} 
                            /> 
                            <label htmlFor="option2" style={styles.radioLabel}>Medium</label> 
                        </div> 
                        <div style={styles.radioButton}> 
                            <input 
                                type="radio"
                                id="option3"
                                value="option3"
                                checked={selectedValue === "option3"} 
                                onChange={() => handleRadioChange("option3")} 
                            /> 
                            <label htmlFor="option3" style={styles.radioLabel}>Low</label>
                        </div>
                    </div> 
                </div> 
		    </p> 
		</div> 
	); 
}

