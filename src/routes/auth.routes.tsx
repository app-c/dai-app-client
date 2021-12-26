/* eslint-disable import/extensions */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SingUp";
import SendMail from "../pages/SendEmail";
import Forgot from "../pages/Forgot";
import Splash from "../pages/Splash";
import { Posts } from "../components/Post";

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <Auth.Navigator
        // initialRouteName="Posts"
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "#F2F2F2" },
        }}
    >
        <Auth.Screen name="Splash" component={Splash} />
        <Auth.Screen name="Posts" component={Posts} />
        <Auth.Screen name="SignIn" component={SignIn} />
        <Auth.Screen name="SignUp" component={SignUp} />
        <Auth.Screen name="Send" component={SendMail} />
        <Auth.Screen name="Forgot" component={Forgot} />
    </Auth.Navigator>
);

export default AuthRoutes;
