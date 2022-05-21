import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native'
import Screen from "../components/Screen"
import TextInput from "../components/TextInput"
import defaultStyles from "../config/styles"
import Text from "../components/Text"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ListItem } from '../components/lists';


function SearchScreen({ navigation }) {
    const [search, setSearch] = useState("")
    const [res, setRes] = useState([])

    const [filter, setFilter] = useState([
        { label: 'Application', value: 'app' },
        { label: 'Business', value: 'b' },
        { label: 'Freelancer', value: 'f' },
    ])


    const AppsType = [
        { label: 'Title', value: 'title' },
        { label: 'Job type', value: 'jobType' },
        { label: 'Profession', value: 'profession' },
        { label: 'Location', value: 'place' },
    ]

    const UserType = [
        { label: 'Name', value: 'name' },
        { label: 'Specialization', value: 'specialization' },
        { label: 'Location', value: 'place' },
    ]

    const [by, setBy] = useState({});
    const [searchFor, setFor] = useState("");

    const [byOpen, setByOpen] = useState(false);
    const [forOpen, setForOpen] = useState(false);


    const findAndSearch = () => {

    }
    return (
        <Screen>
            <TextInput placeholder={"Search"} icon={"text-search"} onChangeText={(text) => {
                setSearch(text)
                findAndSearch()
            }} />
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <TouchableWithoutFeedback onPress={() => {
                    setForOpen(true);
                }}
                >
                    <View style={styles.Datecontainer}>
                        <Text style={styles.placeholder}>{searchFor === "" ? "Search for" : searchFor}</Text>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={20}
                            color={defaultStyles.colors.medium}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {
                    setByOpen(true);
                }}
                >
                    <View style={styles.Datecontainer}>
                        <Text style={styles.placeholder}>{by === {} ? "Search by" : by.label}</Text>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={20}
                            color={defaultStyles.colors.medium}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <Modal visible={forOpen} onDismiss={() => setForOpen(false)} onRequestClose={() => setForOpen(false)}>
                {
                    filter.map((v, i) =>
                        <ListItem title={v.label} onPress={() => {
                            setForOpen(false)
                            setFor(v.label)
                        }} >

                        </ListItem>

                    )
                }

            </Modal>

            {searchFor !== "Application" && <Modal visible={byOpen} onDismiss={() => setForOpen(false)} onRequestClose={() => setForOpen(false)}>
                {
                    UserType.map((v, i) =>
                        <ListItem title={v.label} onPress={() => {
                            setByOpen(false)
                            setBy(v)
                        }} >

                        </ListItem>

                    )
                }

            </Modal>}

            {searchFor === "Application" && <Modal visible={byOpen} onDismiss={() => setByOpen(false)} onRequestClose={() => setByOpen(false)}>
                {
                    AppsType.map((v, i) =>
                        <ListItem title={v.label} onPress={() => {
                            setByOpen(false)
                            setBy(v)
                        }} >

                        </ListItem>

                    )
                }

            </Modal>}

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
        margin: 10,
    },
    placeholder: {
        color: defaultStyles.colors.medium,

    }
});

export default SearchScreen;