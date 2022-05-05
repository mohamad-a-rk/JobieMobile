import React from "react";
import { ImageBackground, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import AppText from "../components/Text";

import Button from "../components/Button";
import colors from "../config/colors";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

function WelcomeScreen({ navigation }) {
    var auth = useAuth()

    return (
        <ImageBackground
            blurRadius={10}
            style={styles.background}
            source={require("../assets/background.jpg")}
        >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/logo-job.png")} />
                <AppText style={styles.tagline}>Your Consultant to find a Job</AppText>
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    title="Login"
                    onPress={() => navigation.navigate(routes.LOGIN)}
                />
                <Button
                    title="Register"
                    color="secondary"
                    onPress={() => navigation.navigate(routes.REGISTER)}
                />
                <TouchableOpacity
                    onPress={() => {
                        auth.withOutLog()
                    }}
                    style={{ justifyContent: "center", alignItems: "center" }}
                >
                    <AppText style={{ color: colors.medium }} >
                        Skip for now
                    </AppText>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    buttonsContainer: {
        padding: 20,
        width: "100%",
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center",
    },
    tagline: {
        fontSize: 25,
        fontWeight: "600",
        paddingVertical: 20,
    },
});

export default WelcomeScreen;
