import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import UploadScreen from "./UploadScreen";
import { TouchableWithoutFeedback, View, ScrollView } from "react-native";
import defaultStyles from "../config/styles";
import Text from "../components/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButtonGroup from "../components/forms/RadioButtonGroup";
import RadioButtonField from "../components/forms/RadioButtonField";
import HeaderText from "../components/HeaderText";
import AppTextInput from "../components/TextInput";
import colors from "../config/colors"
import Icon from "../components/Icon";
import PhoneField from "../components/forms/PhoneField";
import CountryPicker from 'react-native-country-picker-modal';
import listingsApi from "../api/listings"
const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    description: Yup.string().label("Description"),
    jobType: Yup.string().required().nullable().label("Job Type"),
    field: Yup.object().required().nullable().label("Field"),
    city: Yup.string().required().nullable().label("City"),
    email: Yup.string().required().nullable().label("Email").email(),

});
import CategoryPickerItem from "../components/CategoryPickerItem"
import placeholders from "../config/placeholders";

const categories = placeholders.categories

function AddFormScreen(navigation) {
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [phoneNum, setPhoneNum] = useState({ type: "Phone" });
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [showCountry, setShowCountry] = useState(false);
    const [country, setCountry] = useState("");
    const [requirements, setRequirements] = useState([""])
    const [details, setDetails] = useState({ Detail: "Value" })

    const handleSubmit = async (listing, { resetForm }) => {
        setProgress(0);
        setUploadVisible(true);
        listing.field = listing.field.value
        const result = await listingsApi.addForm(
            { ...listing, deadline: date, country, requirements, details, phone: phoneNum.number },
            (progress) => setProgress(progress)
        );

        if (!result.ok) {
            setUploadVisible(false);
            return alert("Could not post the form");
        }

        resetForm();
        setDate(new Date())
        setCountry("")
        setRequirements([""])
        setDetails({ Detail: "Value" })
        setPhoneNum({ type: "Phone", number: "" })
    };



    const onChange = (event, selectedDate) => {
        setShow(false);
        if (selectedDate)
            setDate(selectedDate);
    };


    return (
        <Screen style={styles.container}>
            <ScrollView>
                <UploadScreen
                    onDone={() => setUploadVisible(false)}
                    progress={progress}
                    visible={uploadVisible}
                />
                <Form
                    initialValues={{
                        title: "",
                        description: "",
                        jobType: "",
                        field: "",
                        city: "",
                        email: ""
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <FormField maxLength={255} name="title" placeholder="Title" />
                    <FormField
                        maxLength={500}
                        multiline
                        name="description"
                        numberOfLines={4}
                        placeholder="Description"
                    />
                    <HeaderText>Deadline</HeaderText>
                    <TouchableWithoutFeedback onPress={() => {
                        setShow(true);
                    }}
                    >
                        <View style={styles.Datecontainer}>
                            <Text style={styles.placeholder}>{!date ? "Deadline" : date.toDateString()}</Text>
                            <MaterialCommunityIcons
                                name="chevron-down"
                                size={20}
                                color={defaultStyles.colors.medium}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <RadioButtonGroup name={"jobType"} label={"Job Type"} >
                        <View style={{ flexDirection: "row" }}>
                            <RadioButtonField label={"Full Time"} value={"Full Time"} style={{ color: defaultStyles.colors.medium }} />
                            <RadioButtonField label={"Part Time"} value={"Part Time"} style={{ color: defaultStyles.colors.medium }} />
                        </View>
                    </RadioButtonGroup>
                    {/* <FormField
                        maxLength={20}
                        name="field"
                        placeholder="Job Field"
                    /> */}
                    <Picker
                        items={categories}
                        name="field"
                        numberOfColumns={3}
                        PickerItemComponent={CategoryPickerItem}
                        placeholder="Field"
                        width="50%"
                    />

                    <HeaderText>
                        Location
                    </HeaderText>
                    <TouchableWithoutFeedback onPress={() => setShowCountry(true)}>
                        <View style={styles.Datecontainer}>
                            <Text style={{ color: colors.medium }}>{country !== "" ? country : "Country"}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <FormField
                        maxLength={20}
                        name="city"
                        placeholder="City"
                    />
                    {showCountry && <CountryPicker
                        visible={showCountry}
                        onClose={() => setShowCountry(false)}
                        onSelect={(c) => setCountry(c.name)}
                        withFlag={false}
                    />}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <HeaderText width="50%">
                            Requirements
                        </HeaderText>
                        <TouchableWithoutFeedback onPress={() => {
                            setRequirements([...requirements, ""])
                            console.log(requirements)
                        }}>
                            <View style={{ marginHorizontal: 10 }}>
                                <Icon name={"plus"} backgroundColor={colors.primary} iconColor={colors.light} />
                            </View>

                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                            requirements.pop()
                            setRequirements([...requirements])
                        }}
                        >
                            <View style={{ marginHorizontal: 10 }}>
                                <Icon name={"minus"} backgroundColor={colors.primary} iconColor={colors.light} />
                            </View>

                        </TouchableWithoutFeedback>
                    </View>



                    {
                        requirements.map((requirement, i) =>
                            <AppTextInput key={i} onChangeText={(text) => {
                                requirements[i] = text
                                setRequirements(requirements)
                            }}
                                placeholder={"Requirment"}
                            >
                                {requirement}
                            </AppTextInput>)
                    }
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <HeaderText width="50%">
                            Details
                        </HeaderText>
                        <TouchableWithoutFeedback onPress={() => {

                            setDetails({ ...details, ...{ Detail: "Value" } })
                            console.log(details)
                        }}>
                            <View style={{ marginHorizontal: 10 }}>
                                <Icon name={"plus"} backgroundColor={colors.primary} iconColor={colors.light} />
                            </View>

                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                            const myKeys = Object.keys(details)
                            delete details[myKeys[myKeys.length - 1]]
                            setDetails({ ...details })
                        }}
                        >
                            <View style={{ marginHorizontal: 10 }}>
                                <Icon name={"minus"} backgroundColor={colors.primary} iconColor={colors.light} />
                            </View>

                        </TouchableWithoutFeedback>
                    </View>
                    {
                        Object.keys(details).map((detail, i) =>
                            <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
                                <AppTextInput width="45%" onChangeText={(text) => {
                                    details[text] = details[detail]
                                    delete details[detail]
                                    setDetails({ ...details })
                                    console.log(details)
                                }}>
                                    {detail}
                                </AppTextInput>
                                <Text style={{ fontSize: 30 }}>
                                    {": "}
                                </Text>
                                <AppTextInput width="45%" onChangeText={(text) => {
                                    details[detail] = text
                                    setDetails(details)
                                }}
                                >
                                    {details[detail]}
                                </AppTextInput>
                            </View>
                        )
                    }

                    <HeaderText>
                        Contact
                    </HeaderText>
                    <View>
                        <FormField
                            name="email"
                            placeholder="Email"
                            keyboardType="email-address"
                        />
                        <>
                            <HeaderText icon={"phone"} >
                                Phone
                            </HeaderText>
                            <PhoneField phoneVal={phoneNum} setPhoneVal={setPhoneNum} />
                        </>

                    </View>


                    <SubmitButton title="Post" />
                </Form>
                {show && (
                    <DateTimePicker
                        testID="DeadlinePicker"
                        value={date}
                        mode={"date"}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    Datecontainer: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
    },
    placeholder: {
        color: defaultStyles.colors.medium,
        flex: 1,

    }
});
export default AddFormScreen;