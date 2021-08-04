/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Feather, Fontisto } from "@expo/vector-icons";
import { Alert, FlatList, Text, View } from "react-native";
import { format, getDate, getMonth, getYear } from "date-fns";
import CalendaPiker from "@react-native-community/datetimepicker";
import * as Notificatons from "expo-notifications";
import { differenceInSeconds } from "date-fns/esm";
import { convertHours } from "./Utils/StateFuncion";
import {
    Container,
    Header,
    BackButton,
    Calendario,
    Content,
    SectionContente,
    Hour,
    HourText,
    CreateAppointmentButton,
    CreateAppointmentButtonText,
    HourContainer,
    HomeContainer,
    OpenPikerButon,
    OpenPickerText,
} from "./styles";

import api from "../../services/api";
import { cores } from "../../utils/ferramentas";
import { useAuth } from "../../hooks/AuthContext";

interface RouteParams {
    providerId: string;
    service: string;
}

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

interface AvailavilityItem {
    hour: string;
    avaliable: boolean;
}

Notificatons.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const CreateAppointment: React.FC = () => {
    const route = useRoute();
    const routeParams = route.params as RouteParams;
    const { goBack, navigate } = useNavigation();
    const { user } = useAuth();

    const [selectedProvider] = useState(routeParams.providerId);

    const [selectService] = useState(routeParams.service);
    const [selectDia, setSelectDia] = useState(new Date());
    const [disponivel, setDisponivel] = useState<AvailavilityItem[]>([]);
    const [selectHour, setSelectHour] = useState("");
    const [showPider, setShowPiker] = useState(false);

    const Notification = useCallback(
        async (hora: string) => {
            const data = new Date();
            const conver = convertHours(selectHour);
            const dataAgendada = new Date(
                getYear(selectDia),
                getMonth(selectDia),
                getDate(selectDia),
                0,
                conver
            );

            const sec = differenceInSeconds(dataAgendada, data) - 60 * 60;

            const notifica = await Notificatons.scheduleNotificationAsync({
                content: {
                    title: "Meu agendamento",
                    body: `Você tem um horario agendado pra ${selectHour}`,
                    sound: true,
                    priority: Notificatons.AndroidNotificationPriority.HIGH,
                    data: {
                        hora,
                    },
                },
                trigger: { seconds: sec },
            });

            return notifica;
        },
        [selectDia, selectHour]
    );

    const backToHome = useCallback(() => {
        navigate("Home");
    }, [navigate]);

    const handleSelectHour = useCallback((hour: string) => {
        setSelectHour(hour);
    }, []);

    const handleCreateAppointment = useCallback(async () => {
        try {
            const tempo = convertHours(selectHour);
            const date = new Date(selectDia);
            const dia = getDate(date);
            const mes = getMonth(date) + 1;
            const ano = getYear(date);

            const time = new Date(ano, mes - 1, dia, 0, tempo, 0);
            await api.post("agendamento", {
                provider_id: selectedProvider,
                user_id: user.id,
                from: selectHour,
                dia,
                mes,
                ano,
                service: selectService,
            });

            Notification(selectHour);

            navigate("AgendamentoCriado", {
                date: time.getTime(),
                provider: selectedProvider,
            });
        } catch (err) {
            Alert.alert("Erro ao criar agendamento", err.message);
        }
    }, [
        selectHour,
        selectDia,
        selectedProvider,
        user.id,
        selectService,
        Notification,
        navigate,
    ]);

    const availabily = useMemo(() => {
        return disponivel.map(({ avaliable, hour }) => {
            return {
                hour,
                avaliable,
            };
        });
    }, [disponivel]);

    const hendleDatePiker = useCallback(() => {
        function show() {
            setShowPiker((state) => !state);
        }
        show();
    }, []);

    const handleChange = useCallback((event: any, date: Date | undefined) => {
        setShowPiker(false);
        if (date) {
            setSelectDia(date);
        }
    }, []);

    useEffect(() => {
        try {
            const dat = new Date(selectDia);
            const dia = getDate(dat);
            const mes = getMonth(dat) + 1;
            const ano = getYear(dat);

            api.get(`/agendamento/h/horarios`, {
                params: {
                    provider_id: selectedProvider,
                    mes,
                    ano,
                    dia,
                    service: selectService,
                },
            }).then((response) => {
                setDisponivel(response.data);
            });
        } catch (err) {
            Alert.alert(err.message);
        }
    }, [selectDia, selectHour, selectService, selectedProvider, user.id]);

    const handleDisponivel = useMemo(() => {
        return disponivel.filter((h) => {
            return h.avaliable !== false;
        });
    }, [disponivel]);

    return (
        <Container>
            <Header>
                <BackButton onPress={goBack}>
                    <Feather name="chevron-left" size={35} color={cores.roxo} />
                </BackButton>

                <HomeContainer onPress={backToHome}>
                    <Fontisto name="home" size={35} color={cores.roxo} />
                </HomeContainer>
            </Header>

            <Content>
                <Calendario>
                    <OpenPikerButon onPress={hendleDatePiker}>
                        <OpenPickerText style={{ fontFamily: "MontBlack" }}>
                            Escolha uma data
                        </OpenPickerText>
                    </OpenPikerButon>
                    {showPider && (
                        <CalendaPiker
                            onChange={handleChange}
                            value={selectDia}
                        />
                    )}
                    <Text
                        style={{
                            marginTop: 10,
                            fontSize: 16,
                            fontFamily: "MontBold",
                            color: cores.branco,
                        }}
                    >
                        Data: {format(new Date(selectDia), "dd/MM/yyyy")}
                    </Text>
                </Calendario>

                {handleDisponivel.length > 0 && (
                    <Text
                        style={{
                            marginTop: 30,
                            fontSize: 20,
                            fontFamily: "MontBold",
                            color: cores.roxo,
                        }}
                    >
                        Horários disponíveis
                    </Text>
                )}
                {handleDisponivel.length === 0 && (
                    <Text
                        style={{
                            marginTop: 30,
                            fontSize: 20,
                            fontFamily: "MontBold",
                            color: cores.roxo,
                        }}
                    >
                        {"         "}Nenhum Horário {"\n"} disponível para esse
                        dia
                    </Text>
                )}

                <View
                    style={{
                        height: 100,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <SectionContente>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={availabily}
                            keyExtractor={(h) => h.hour}
                            renderItem={({ item: h }) => (
                                <HourContainer
                                    enabled={h.avaliable}
                                    onPress={() => handleSelectHour(h.hour)}
                                >
                                    <Hour
                                        available={h.avaliable}
                                        select={selectHour === h.hour}
                                    >
                                        <HourText
                                            select={selectHour === h.hour}
                                        >
                                            {h.hour}
                                        </HourText>
                                    </Hour>
                                </HourContainer>
                            )}
                        />
                    </SectionContente>
                </View>
            </Content>
            <CreateAppointmentButton onPress={handleCreateAppointment}>
                <CreateAppointmentButtonText style={{ fontFamily: "MontBold" }}>
                    Agendar
                </CreateAppointmentButtonText>
            </CreateAppointmentButton>
        </Container>
    );
};

export default CreateAppointment;
