import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  ScrollView
} from "react-native";
import colors from "../config/colors";
import style from "../config/styles";

import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import ApplyForm from "../components/ApplyForm";
import useAuth from "../auth/useAuth";
import routes from "../navigation/routes";
import AppButton from "../components/Button";

function ListingDetailsScreen({ route, navigation }) {
  const listing = route.params;
  const { user } = useAuth();
  return (
    <Screen>
      <ScrollView style={styles.detailsContainer}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
        >


          <Text style={styles.title}>{listing.title}</Text>
          <View style={{ flexDirection: "row-reverse" }}>
            <Text style={styles.date}>Due to {new Date(listing.deadline).toDateString()}</Text>
          </View>
          <ListItemSeparator />
          <Text style={styles.title}>Description</Text>
          <Text style={style.text} >
            {listing.description}
          </Text>
          <ListItemSeparator />
          {listing.requrements && <View>
            <Text style={styles.title}>Requrements</Text>
            {listing.requrements.map((s, index) =>
              <Text style={style.text} key={index}> {"- " + s} </Text>)}
          </View>}
          {listing.requrements && <ListItemSeparator />}
          {listing.details && <View>
            <Text style={styles.title}>More Details</Text>
            {Object.keys(listing.details).map((detail, index) =>
              <View style={{ flexDirection: "row" }} key={index}>
                <Text style={[style.text, { fontWeight: "bold" }]}> {detail + ": "} </Text>
                <Text style={style.text}> {listing.details[detail]} </Text>
              </View>)}
          </View>}
          <View style={styles.userContainer}>
            <ListItem
              title={listing.owner.name}
              subTitle={listing.owner.specialization}
              image={listing.owner.image ? listing.owner.image : "https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744004?k=20&m=1016744004&s=612x612&w=0&h=Z4W8y-2T0W-mQM-Sxt41CGS16bByUo4efOIJuyNBHgI="}
            // onPress={() => navigation.navigate(routes.LISTING)}

            />
          </View>
          {user.email && user.userType !== "Business" && <ApplyForm listing={listing} user={user} />}
          {!user.email && user.userType !== "Business" &&
            <AppButton
              title="Apply now !"
              onPress={() => navigation.navigate(routes.APPLY, listing)}
            />}
        </KeyboardAvoidingView>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  date: {
    color: colors.danger,
    fontSize: 18,
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 20,
  },
});

export default ListingDetailsScreen;
