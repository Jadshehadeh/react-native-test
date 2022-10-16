import React, { FC, ReactElement, useEffect } from "react";
import {  StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Articles from "../components/articles";
import Filter from "../components/filter";
import { useAppDispatch } from "../hooks/hooks";
import { setLogout } from "../redux/slices/authSlice";
import { useNavigation } from "@react-navigation/native";

const HomeScreen: FC<{}> = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      headerTitle: "Home",
      headerRight: () => (
        <TouchableOpacity onPress={() => dispatch(setLogout())} className="flex justify-center items-center rounded-lg bg-orange-500  px-4 py-2">
          <Text className="text-black">LOGOUT</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Filter />
      <Articles />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
