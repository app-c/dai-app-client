import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import AppLoading from "expo-app-loading";
import * as Updates from "expo-updates";
import { useFonts } from "expo-font";
import Routes from "./src/routes";
import AppProvider from "./src/hooks";

import them from "./src/utils/themes";
import Mblak from "./assets/fonts/roboto/Roboto/Roboto-Black.ttf";
import Mbold from "./assets/fonts/roboto/Roboto/Roboto-Bold.ttf";
import Mregular from "./assets/fonts/roboto/Roboto/Roboto-Regular.ttf";

const App: React.FC = () => {
    // useEffect(() => {
    //     async function updateApp() {
    //         const { isAvailable } = await Updates.checkForUpdateAsync();
    //         if (isAvailable) {
    //             await Updates.fetchUpdateAsync();
    //             await Updates.reloadAsync(); // depende da sua estratégia
    //         }
    //     }
    //     updateApp();
    // }, []);

    const [fontsLoads] = useFonts({
        Mblak,
        Mbold,
        Mregular,
    });

    if (!fontsLoads) {
        return <AppLoading />;
    }

    return (
        <NavigationContainer>
            <AppProvider>
                <ThemeProvider theme={them}>
                    <View style={{ flex: 1 }}>
                        <StatusBar hidden />
                        <Routes />
                    </View>
                </ThemeProvider>
            </AppProvider>
        </NavigationContainer>
    );
};

export default App;
