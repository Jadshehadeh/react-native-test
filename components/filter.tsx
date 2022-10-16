import React from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { clearFilter, setFilter } from "../redux/slices/fliterSlice";
import { MaterialIcons } from "@expo/vector-icons";

const Filter = () => {
  const filter = useAppSelector((state) => state.articleFilter.filter);
  const dispatch = useAppDispatch();
  return (
    <View className="w-full">
      <TextInput
        className="relative flex justify-center items-center rounded-xl px-5 h-14  m-2 border-2 border-gray-300 focus:border-orange-500 focus:border-4"
        placeholder="Search"
        onChangeText={(text) => dispatch(setFilter(text))}
        value={filter}
      />
      <TouchableOpacity
        onPress={() => dispatch(clearFilter())}
        className="absolute right-2 top-2"
      >
        <Text className="p-3">
          <MaterialIcons name="clear" size={34} color="orange" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Filter;
