import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";

const myImage = `data:image/png;base64,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`
var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';

const data = [{ _id: "1", title: "Full stack developer", owner: { image: myImage }, }, { _id: "2", title: "Full stack developer", owner: { image: base64Icon } }, { _id: "3", title: "Full stack developer", owner: {} }]

function ListingsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);

  useEffect(() => {
    getListingsApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={getListingsApi.request} />
          </>
        )}
        <FlatList
          data={getListingsApi.data}
          keyExtractor={(listing) => listing._id}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={(item.owner ? item.owner.name : "Some business ") + " offers a " + (item.jobType ? item.jobType : "job ") + " job at " + (item.location ? item.location.city : "some place")}
              imageUrl={item.owner.image ? item.owner.image : "https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744004?k=20&m=1016744004&s=612x612&w=0&h=Z4W8y-2T0W-mQM-Sxt41CGS16bByUo4efOIJuyNBHgI="}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
