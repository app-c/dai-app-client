/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable consistent-return */
import { useNavigation, useRoute } from "@react-navigation/native";
import ptBr, { format } from "date-fns";

import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Feather } from "@expo/vector-icons";
import Loading from "expo-app-loading";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";
import {
    CantainerImage,
    Container,
    Title,
    Description,
    OkButton,
    OkButtonText,
    ImageFundo,
} from "./styled";
import { Fonts } from "../../utils/ferramentas";
import fundo from "../../../assets/FundoC.png";
import api from "../../services/api";
import { useAuth } from "../../hooks/AuthContext";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

interface RouteParams {
    date: number;
    provider: string;
    token: string;
}

interface Response {
    token: string;
}

const AgendamentoCriado: React.FC = () => {
    const { params } = useRoute();
    const routeParams = params as RouteParams;

    const [provider_id, _] = useState(routeParams.provider);
    const { reset } = useNavigation();

    console.log(routeParams.token);

    const sendPushNotification = useCallback(async () => {
        const message = {
            to: routeParams.token,
            sound: "default",
            title: "Novo agendamento",
            body: `vocẽ tem um novo agendamento para ${format(
                routeParams.date,
                "dd/MM/yyyy 'ás' HH:mm'h'"
            )}`,
        };

        await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        });
    }, [routeParams.date, routeParams.token]);

    const handleOkButton = useCallback(async () => {
        sendPushNotification();
        reset({
            routes: [{ name: "Home" }],
            index: 0,
        });
    }, [reset, sendPushNotification]);

    const formattedDate = useMemo(() => {
        return format(routeParams.date, "dd/MM/yyyy 'ás' HH:mm'h'", {
            locale: ptBr,
        });
    }, [routeParams]);

    const font = Fonts();
    if (!font) {
        return <Loading />;
    }

    return (
        <Container>
            <CantainerImage>
                <ImageFundo source={fundo} />
            </CantainerImage>

            <Feather name="check" size={220} color="#04d361" />

            <Title>Agendamento concluido</Title>
            <Description>{formattedDate}</Description>

            <OkButton
                onPress={async () => {
                    await sendPushNotification();
                    handleOkButton();
                }}
            >
                <OkButtonText>Ok</OkButtonText>
            </OkButton>
        </Container>
    );
};

export default AgendamentoCriado;
