import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View } from 'react-native'
import defaultStyles from "../../config/styles";

import PhoneInput from "react-native-phone-number-input"

function PhoneField({ phoneVal, setPhoneVal }) {
    const [items, setPhones] = useState([
        { label: 'Home', value: 'home' },
        { label: 'Phone', value: 'phone' },
        { label: 'Office', value: 'office' },
    ]);
    const [value, setValue] = useState()
    return (
        <View style={{ width: "100%", flexDirection: "row" }}>

            <PhoneInput onChangeFormattedText={(phone) => {
                setPhoneVal({ type: phoneVal.type, number: phone })
            }} defaultCode="PS" />
        </View>
    );
}

export default PhoneField;