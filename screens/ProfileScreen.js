import React, { useEffect, useState } from 'react';
import { View, TouchableWithoutFeedback, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import colors from '../config/colors';
import Text from "../components/Text"
import { Badge, DefaultTheme } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { Image } from "react-native-expo-image-cache";
import useAuth from "../auth/useAuth"
import useApi from '../hooks/useApi';
import { getUser } from "../api/users"
import placeholders from '../config/placeholders';



function ProfileScreen({ route, navigation }) {
    // const phones = [{ _id: 1, phoneNum: { type: "House", number: "+970597600519" } }]
    // const skills = ["Hi", "Hello", "Yes", "No", "Hi", "Hello", "Yes", "No", "Hi", "Hello", "Yes", "No",]
    // const feedbacks = [{ _id: "1", feedbacker: { name: "Mohammad" }, Text: "Good to know you :) ", rate: 4 },
    // { _id: "2", feedbacker: { name: "Mohammad2" }, Text: "Good to know you :) ", rate: 4 },
    // { _id: "3", feedbacker: { name: "Mohammad3" }, Text: "Good to know you :) ", rate: 4 }
    // ]
    // const prevJob = [{
    //     job: {
    //         "companyName": "Company1",
    //         "duration": {
    //             "start": new Date("2022-04-18T14:56:52.396Z"),
    //             "end": new Date("2022-05-27T14:56:52.396Z")
    //         },
    //         "location": {
    //             "city": "Nablus",
    //             "country": "Palestine"
    //         },
    //         "position": "HR"
    //     }, _id: 1
    // }]
    const getProfile = useApi(getUser);

    const { user } = useAuth()
    const [pageUser, setUser] = useState({})
    useEffect(() => {
        if (route.params._id == user._id)
            return setUser(user)

        getProfile.request().then((v) => {
            setUser(v)
        }).catch(() => {

        })




    }, [])

    return (
        <Screen>
            <SafeAreaView style={styles.container}>

                <View style={styles.titleBar} />

                <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.white }}>

                    <View style={{ alignSelf: "center" }}>
                        <View style={styles.profileImage}>
                            <Image uri={placeholders.profile_placeholder} style={styles.image} resizeMode="center"></Image>
                        </View>
                        <TouchableWithoutFeedback onPress={() => console.log("Hi")}>
                            <View style={styles.add}>
                                <Ionicons name="ios-add" size={48} color={colors.white} style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={[{ fontWeight: "200", fontSize: 36 }]}>Name</Text>
                        <Text style={[{ color: "#AEB5BC", fontSize: 14 }]}>Specialization</Text>
                    </View>

                    <View style={{ margin: 20 }}>
                        <View style={styles.recentItem}>
                            <View style={{ width: 250 }}>
                                <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                    Bio
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ margin: 20, borderColor: colors.light, borderWidth: 2, flexDirection: "row" }}>
                        <View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <MaterialCommunityIcons name="gender-male-female" color={colors.primary} size={20} />
                                <Text style={{ margin: 10 }}>Male</Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <MaterialCommunityIcons name="email" size={20} color={colors.primary} />
                                <Text style={{ margin: 10 }}>Hi@gmail.com</Text>
                            </View>
                        </View>

                        <View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Ionicons name="location" size={20} color={colors.primary} />
                                <Text style={{ margin: 10 }}>Palestine, Nablus</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginHorizontal: 20, borderColor: colors.light, borderWidth: 1, borderRadius: 15 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialIcons name="phone" size={20} color={colors.primary} />
                            <Text style={{ margin: 10 }}>Phones</Text>
                        </View>
                        {
                            phones.map((v) => <View style={{ flexDirection: "row", alignItems: "center" }} key={v._id}>
                                <Text style={{ margin: 10 }}>{v.phoneNum.type} : {v.phoneNum.number}</Text>
                            </View>
                            )
                        }
                    </View>

                    <View style={{ margin: 20, borderColor: colors.light, borderWidth: 1, borderRadius: 15 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialCommunityIcons name="tools" size={30} color={colors.primary} />
                            <Text style={{ margin: 10 }}>Skills</Text>
                        </View>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {
                                skills.map((v, i) =>
                                    <Badge key={i} size={30} style={{ backgroundColor: colors.primary, margin: 5 }}>{v}</Badge>
                                )
                            }
                        </View>
                    </View>

                    <View style={{ margin: 20, borderColor: colors.light, borderWidth: 1, borderRadius: 15 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialIcons name="work" size={30} color={colors.primary} />
                            <Text style={{ margin: 10 }}>Previous work</Text>
                        </View>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {
                                prevJob.map((v, i) =>
                                    <View style={{ margin: 20, borderColor: colors.light, borderWidth: 1, borderRadius: 15 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text style={{ fontWeight: "bold" }}>{v.job.position} at {v.job.companyName}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Ionicons name="time" size={30} color={colors.primary} />
                                            <Text>{v.job.duration.start.toDateString()} - {v.job.duration.end.toDateString()}</Text>
                                        </View>

                                    </View>

                                )
                            }
                        </View>
                    </View>

                    <View style={{ margin: 20, borderColor: colors.light, borderWidth: 1, borderRadius: 15 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialIcons name="feedback" size={30} color={colors.primary} />
                            <Text style={{ margin: 10 }}>Feedbacks</Text>
                        </View>
                        <View>
                            {
                                feedbacks.map((v, i) =>
                                    <View style={{ margin: 20, borderColor: colors.light, borderWidth: 1, borderRadius: 15 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Image style={{ height: 40, width: 40, borderRadius: 20, margin: 5 }} uri={"https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744004?k=20&m=1016744004&s=612x612&w=0&h=Z4W8y-2T0W-mQM-Sxt41CGS16bByUo4efOIJuyNBHgI="} defaultSource={{ uri: v.feedbacker.image ? v.feedbacker.image : "https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744004?k=20&m=1016744004&s=612x612&w=0&h=Z4W8y-2T0W-mQM-Sxt41CGS16bByUo4efOIJuyNBHgI=" }} />
                                            <Text>{v.feedbacker.name}</Text>
                                        </View>
                                        <Rating imageSize={35} startingValue={v.rate} type="custom" ratingColor={colors.secondary} fractions={1} />
                                        <Text>
                                            {v.Text}
                                        </Text>
                                    </View>
                                )
                            }
                        </View>
                    </View>


                </ScrollView>
            </SafeAreaView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: colors.primary,
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});

export default ProfileScreen;