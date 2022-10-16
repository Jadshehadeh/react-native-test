import React, { FC, ReactElement, useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Login } from "../api/auth/login";
import { useAppDispatch,  } from "../hooks/hooks";
import { setLogin } from "../redux/slices/authSlice";
import Toast from "react-native-toast-message";
import { Ionicons, FontAwesome } from "@expo/vector-icons";


const UserLogIn: FC<{}> = (): ReactElement => {
  
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [showPass, setshowPass] = useState<boolean>(true)


  useEffect(() => {
    if (username && password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [username, password]);

  const handleLogin = () => {
    const data = {
      username,
      password,
    };

    Login(data)
      .then((result) => {
        dispatch(setLogin({ token: result, isLoggedIn: true }));
        Toast.show({
          type: "success",
          text1: "Logged-In Successfully",
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error.response.data.error,
          text2: error.response.data.message,
        });
      });
  };
  return (
    <ScrollView className="flex  mx-4  p-4 rounded-3xl bg-slate-100 drop-shadow-2xl ">
      <View className="space-y-5">
        <Image
          className="my-10 mx-auto h-44 w-44 "
          source={require("../assets/login.png")}
        />
        <View>
          <TextInput
            className="relative flex justify-center items-center rounded-xl px-5 h-14 mx-12  border-2 border-gray-300 focus:border-orange-500 focus:border-4"
            value={username}
            placeholder={"Username"}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize={"none"}
            keyboardType={"email-address"}
          />
          <View className="absolute right-12 top-1 p-3">
            <FontAwesome name="user" size={24} color="orange" />
          </View>
        </View>
        <View>
          <TextInput
            className="relative flex justify-center items-center rounded-xl px-5 h-14 mx-12 border-2 border-gray-300 focus:border-orange-500 focus:border-4"
            value={password}
            placeholder={"Password"}
            secureTextEntry={showPass}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setshowPass(!showPass)}
            className="absolute right-12 top-1"
          >
            <Text className="p-3">
              {showPass ? (
                <Ionicons name="eye" size={24} color="orange" />
              ) : (
                <Ionicons name="eye-off" size={24} color="orange" />
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-10">
          <TouchableOpacity
            onPress={() => handleLogin()}
            disabled={isDisabled}
            className={`"flex justify-center items-center rounded-full mt-5 h-12 mx-12 ${
              isDisabled ? " bg-gray-600 opacity-50" : "bg-orange-500"
            } `}
          >
            <Text className="text-white">LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </ScrollView>
  );
};

export default UserLogIn;
