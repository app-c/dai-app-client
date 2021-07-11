/* eslint-disable camelcase */
import React, { useState, useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import {
    Container,
    Header,
    ListContainer,
    ProviderContainer,
    ProviderName,
    ProviderList,
    ProviderInfo,
    ProviderAvatar,
    ProviderMeta,
    ProviderMetaText,
    BackButton,
    HomeContainer,
    Title,
    ContainerImage,
    ImageFundo,
} from "./styles";
import api from "../../services/api";
import fundo from "../../../assets/FundoA.png";
import { cores } from "../../utils/ferramentas";

export interface Provider {
    id: string;
    nome: string;
    avatar: string;
}

const Prestadores: React.FC = () => {
    const [provider, setProvider] = useState<Provider[]>([]);
    const { navigate, goBack } = useNavigation();

    const navigaeTotCreateAppointment = useCallback(
        (providerId: string) => {
            navigate("SelectService", { providerId });
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

    console.log(provider);

    const urlAvatar = "https://dai-nails.s3.us-east-2.amazonaws.com/";

    return (
        <Container>
            <Header>
                <BackButton onPress={goBack}>
                    <AntDesign name="arrowleft" size={40} color={cores.roxo} />
                </BackButton>

                <HomeContainer onPress={handleBackToHome}>
                    <Fontisto name="home" size={40} color={cores.roxo} />
                </HomeContainer>
            </Header>

            <Title style={{ fontFamily: "MontBold" }}>
                Escolha um prestador(a)
            </Title>

            <ListContainer>
                <ProviderList
                    showsHorizontalScrollIndicator={false}
                    data={provider}
                    keyExtractor={(provider) => provider.id}
                    renderItem={({ item: provider }) => (
                        <ProviderContainer
                            onPress={() =>
                                navigaeTotCreateAppointment(provider.id)
                            }
                        >
                            <ProviderAvatar
                                source={{
                                    uri: `${urlAvatar}${provider.avatar}`,
                                }}
                            />
                            <ProviderInfo>
                                <ProviderMeta>
                                    <ProviderName
                                        style={{ fontFamily: "MontBold" }}
                                    >
                                        {provider.nome}
                                    </ProviderName>
                                    <ProviderMetaText
                                        style={{ fontFamily: "MontRegular" }}
                                    >
                                        Designer de unhas
                                    </ProviderMetaText>
                                </ProviderMeta>
                            </ProviderInfo>
                        </ProviderContainer>
                    )}
                />
            </ListContainer>
            <ContainerImage>
                <ImageFundo source={fundo} />
            </ContainerImage>
        </Container>
    );
};

export default Prestadores;
