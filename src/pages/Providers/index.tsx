/* eslint-disable camelcase */
import React, { useState, useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import { View } from "react-native";
import {
    Container,
    Header,
    ListContainer,
    ProviderList,
    BackButton,
    HomeContainer,
    Title,
    ImageFundo,
} from "./styles";
import api from "../../services/api";
import fundo from "../../../assets/FundoA.png";
import { cores } from "../../utils/ferramentas";
import { Prestador } from "../../components/Prestador";

export interface Provider {
    id: string;
    nome: string;
    avatar: string;
    funcao: string;
    token: string;
}

const Prestadores: React.FC = () => {
    const [provider, setProvider] = useState<Provider[]>([]);
    const { navigate, goBack } = useNavigation();

    const navigaeTotCreateAppointment = useCallback(
        (providerId: string, token: string) => {
            navigate("SelectService", { providerId, token });
        },
        [navigate]
    );

    const handleBackToHome = useCallback(() => {
        navigate("Home");
    }, [navigate]);

    useEffect(() => {
        api.get("agendamento/me/prestador/list").then((respose) => {
            setProvider(respose.data);
        });
    }, []);

    const urlAvatar = "https://dai-nails.s3.us-east-2.amazonaws.com/avatar/";

    return (
        <Container>
            <ImageFundo source={fundo} />

            <Header>
                <BackButton onPress={goBack}>
                    <AntDesign name="arrowleft" size={40} color={cores.roxo} />
                </BackButton>

                <HomeContainer onPress={handleBackToHome}>
                    <Fontisto name="home" size={40} color={cores.roxo} />
                </HomeContainer>
            </Header>

            <Title>Escolha um prestador(a)</Title>

            <ListContainer>
                <ProviderList
                    showsHorizontalScrollIndicator={false}
                    data={provider}
                    keyExtractor={(provider) => provider.id}
                    renderItem={({ item: provider }) => (
                        <View>
                            <Prestador
                                nome={provider.nome}
                                avatar={`${urlAvatar}${provider.avatar}`}
                                funcao={provider.funcao}
                                changePrestador={() =>
                                    navigaeTotCreateAppointment(
                                        provider.id,
                                        provider.token
                                    )
                                }
                                linkFace={() => console.log("face")}
                                linkIns={() => console.log("inta")}
                                linkMap={() => console.log("map")}
                                linkW={() => console.log("whats")}
                            />
                        </View>
                    )}
                />
            </ListContainer>
        </Container>
    );
};

export default Prestadores;
