/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback, useEffect } from "react";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { Container, Image, ImageT } from "./styled";
import Logo from "../../../assets/Logo.png";
import LogoT from "../../../assets/LogoT.png";

export function Splash() {
    const { navigate } = useNavigation();
    const animation = useSharedValue(0);

    const style = useAnimatedStyle(() => {
        return {
            opacity: interpolate(animation.value, [0, 25, 50], [0, 0.3, 1]),
            transform: [
                {
                    translateX: interpolate(animation.value, [0, 50], [-50, 0]),
                },
            ],
        };
    });

    const time = useCallback(() => {
        setTimeout(() => {
            navigate("Posts");
        }, 3000);
    }, [navigate]);

    useEffect(() => {
        animation.value = withTiming(50, { duration: 2000 });
    }, [animation]);

    time();

    return (
        <Container>
            <ImageT source={LogoT} />
            <Animated.View style={style}>
                <Image source={Logo} />
            </Animated.View>
        </Container>
    );
}

export default Splash;
