import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useCallback, useState } from "react";
import { Feather, Fontisto } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import api from "../../services/api";

import {
    ServiceContainer,
    Container,
    Box,
    ServiceText,
    Description,
    Title,
    Header,
    BoxContainer,
    TextDescription,
    BackButton,
    HomeContainer,
    ContainerImage,
    ImageFundo,
    TitleName,
} from "./styles";
import { cores } from "../../utils/ferramentas";
import { useAuth } from "../../hooks/AuthContext";
import fundo from "../../../assets/FundoB.png";

interface RouteParams {
    providerId: string;
    token: string;
}

export interface Response {
    service: string;
    providerId: string;
    time: string;
    value: number;
    description: string;
}

const SelectService: React.FC = () => {
    const route = useRoute();
    const { user } = useAuth();
    const { navigate, goBack } = useNavigation();
    const { providerId, token } = route.params as RouteParams;

    const [respost, setRespost] = useState<Response[]>([]);
    console.log(token);

    const navigateToCreateAppointment = useCallback(
        (service: string, providerId: string, token: string) => {
            navigate("CreateAgendamento", { service, providerId, token });
        },
        [navigate]
    );

    useEffect(() => {
        api.get(`/service/${providerId}/list`).then((response) => {
            setRespost(response.data);
        });
    }, [providerId]);

    const styles = StyleSheet.create({
        box: {
            shadowColor: "#8f2d2d",
            shadowOpacity: 0.58,
            shadowOffset: {
                width: 0,
                height: 12,
            },
            shadowRadius: 16,
            elevation: 25,
        },
    });

    return (
        <Container>
            <ContainerImage>
                <ImageFundo source={fundo} />
            </ContainerImage>
            <Header>
                <BackButton onPress={goBack}>
                    <Feather name="chevron-left" size={35} color={cores.roxo} />
                </BackButton>

                <TitleName>{user.nome}</TitleName>

                <HomeContainer onPress={() => navigate("Home")}>
                    <Fontisto name="home" size={35} color={cores.roxo} />
                </HomeContainer>
            </Header>

            <Title>Escolha um serviço</Title>

            <ServiceContainer
                contentContainerStyle={{
                    paddingBottom: 50,
                }}
                data={respost}
                keyExtractor={(service) => service.service}
                renderItem={({ item: service }) => (
                    <BoxContainer
                        style={styles.box}
                        onPress={() =>
                            navigateToCreateAppointment(
                                service.service,
                                providerId,
                                token
                            )
                        }
                    >
                        <Box>
                            <ServiceText>{service.service}</ServiceText>
                            <Description> {service.description}</Description>
                            <Description>
                                Duração: <Text>{service.time}h</Text>
                            </Description>
                            <Description>R$ {service.value}</Description>
                            <View
                                style={{
                                    alignItems: "flex-end",
                                    paddingRight: 20,
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <TextDescription>Agendar</TextDescription>
                            </View>
                        </Box>
                    </BoxContainer>
                )}
            />
        </Container>
    );
};

export default SelectService;
