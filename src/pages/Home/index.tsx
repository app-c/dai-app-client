/* eslint-disable array-callback-return */
/* eslint-disable import/no-duplicates */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import {
    Feather,
    SimpleLineIcons,
    MaterialIcons,
    Fontisto,
    FontAwesome5,
    EvilIcons,
} from "@expo/vector-icons";
import { format, intervalToDuration, isAfter, isToday } from "date-fns";
import prBr from "date-fns/locale/pt-BR";
import AppLoading from "expo-app-loading";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/AuthContext";
import api from "../../services/api";
import { cores, Fonts } from "../../utils/ferramentas";

import Fundo from "../../../assets/Fundo.png";

import {
    Container,
    ContainerAfter,
    ContainerAfterAgendamento,
    ContainerAgenda,
    ContainerAvatar,
    ContainerDelete,
    ContainerDescricao,
    ContainerHorario,
    ContainerTitle,
    Header,
    ImageAvatar,
    ImageFundo,
    TextDelete,
    TextDescription,
    TextHorario,
    TextName,
    Title,
} from "./styles";

export interface Response {
    ano: number;
    mes: number;
    dia: number;
    from: number;
    service: string;
    id: string;
    data: string;
    provider: {
        avatar_url: string;
        name: string;
    };
}

const Home: React.FC = () => {
    const { user, signOut } = useAuth();
    const { navigate } = useNavigation();
    const [agendamento, setAgendamento] = useState<Response[]>([]);

    const data = new Date(Date.now());

    useEffect(() => {
        async function Load() {
            try {
                const res = await api.get("/agendamento/me");

                const { message } = res.data;

                setAgendamento(res.data);

                console.log(message);
            } catch (err) {
                signOut();
            }
        }
        Load();
    }, []);

    const nexAg = useMemo(() => {
        return agendamento.find((h) => {
            const dia = new Date(h.ano, h.mes - 1, h.dia, 0, h.from);

            if (isAfter(dia, new Date())) {
                return h;
            }
        });
    }, [agendamento]);

    const navigateToSelectProviders = useCallback(() => {
        navigate("Prestador");
    }, [navigate]);

    const afterAgendamentos = useMemo(() => {
        return agendamento.filter((h) => {
            if (nexAg) {
                const dia = new Date(h.ano, h.mes, h.dia, 0, h.from, 0);
                const nxdia = new Date(
                    nexAg.ano,
                    nexAg.mes,
                    nexAg.dia,
                    0,
                    nexAg.from,
                    0
                );

                if (isAfter(dia, nxdia)) {
                    return h;
                }
            }
        });
    }, [agendamento, nexAg]);

    const navigateProfile = useCallback(() => {
        navigate("Profile");
    }, [navigate]);

    const handleDelete = useCallback(
        (
            dia: number,
            mes: number,
            ano: number,
            horario: number,
            id: string
        ) => {
            async function Delete(): Promise<void> {
                try {
                    await api.delete(`agendamento/${id}/agendamento`);

                    setAgendamento(agendamento.filter((h) => h.id !== id));
                } catch (err) {}
            }

            const dateNow = new Date();
            const dateAgendada = new Date(ano, mes - 1, dia, 0, horario);
            const canpare =
                intervalToDuration({
                    start: dateNow,
                    end: dateAgendada,
                }).hours + 1;

            if (canpare <= 2) {
                Alert.alert(
                    "Atenção",
                    "Você só pode desmarcar com 2 horas de antecedencia"
                );
            } else {
                Alert.alert(
                    "Atenção",
                    "Tem certeza que seseja desmarcar um horário",
                    [
                        {
                            text: "Cancel",
                            style: "cancel",
                        },
                        {
                            text: "Ok",
                            onPress: () => Delete(),
                        },
                    ]
                );
            }
        },
        [agendamento]
    );

    function formatd(ano: number, mes: number, dia: number, from: number) {
        return format(new Date(ano, mes, dia, 0, from), `HH: ${"\n"}mm`);
    }

    return (
        <>
            <Header>
                {user.avatar === null && (
                    <ContainerAvatar onPress={navigateProfile}>
                        <EvilIcons name="user" size={70} color={cores.roxo} />
                    </ContainerAvatar>
                )}

                {user.avatar && (
                    <ContainerAvatar onPress={navigateProfile}>
                        <ImageAvatar
                            source={{
                                uri: `https://dai-nails.s3.us-east-2.amazonaws.com/${user.avatar}`,
                            }}
                        />
                    </ContainerAvatar>
                )}
                <TextName>{user.nome}</TextName>
            </Header>

            <Container>
                <ImageFundo source={Fundo} />
                <ContainerTitle onPress={navigateToSelectProviders}>
                    <Title>Agendar</Title>
                </ContainerTitle>

                {nexAg === undefined && <Title>Sem horários marcados</Title>}

                {isToday(data) && nexAg && (
                    <View style={{ marginTop: 20 }}>
                        <Title>Meu agendamento</Title>
                        <ContainerAgenda>
                            <ContainerHorario>
                                <TextHorario>
                                    {formatd(
                                        nexAg.ano,
                                        nexAg.mes - 1,
                                        nexAg.dia,
                                        nexAg.from
                                    )}
                                </TextHorario>
                            </ContainerHorario>

                            <ContainerDescricao>
                                <TextDescription
                                    style={{ fontFamily: "MontBold" }}
                                >
                                    {format(
                                        new Date(
                                            nexAg.ano,
                                            nexAg.mes,
                                            nexAg.dia
                                        ),
                                        `dd MMMM `,
                                        { locale: prBr }
                                    )}
                                </TextDescription>

                                <TextDescription style={{ color: "#f2f2f2" }}>
                                    {nexAg.service}
                                </TextDescription>
                                <ContainerDelete
                                    onPress={() => {
                                        handleDelete(
                                            nexAg.dia,
                                            nexAg.mes,
                                            nexAg.ano,
                                            nexAg.from,
                                            nexAg.id
                                        );
                                    }}
                                >
                                    <TextDelete>Desmarcar</TextDelete>
                                </ContainerDelete>
                            </ContainerDescricao>
                        </ContainerAgenda>
                    </View>
                )}

                <ContainerAfterAgendamento
                    data={afterAgendamentos}
                    keyExtractor={(h) => h.id}
                    renderItem={({ item: h }) => (
                        <View style={{ marginTop: 20 }}>
                            <Title>Meu agendamento</Title>
                            <ContainerAfter>
                                <ContainerHorario>
                                    <TextHorario>
                                        {formatd(
                                            h.ano,
                                            h.mes - 1,
                                            h.dia,
                                            h.from
                                        )}
                                    </TextHorario>
                                </ContainerHorario>

                                <ContainerDescricao>
                                    <TextDescription>
                                        {format(
                                            new Date(h.ano, h.mes, h.dia),
                                            `dd MMMM `,
                                            {
                                                locale: prBr,
                                            }
                                        )}
                                    </TextDescription>

                                    <TextDescription
                                        style={{ color: "#f2f2f2" }}
                                    >
                                        {h.service}
                                    </TextDescription>
                                    <ContainerDelete
                                        onPress={() => {
                                            handleDelete(
                                                h.dia,
                                                h.mes,
                                                h.ano,
                                                h.from,
                                                h.id
                                            );
                                        }}
                                    >
                                        <TextDelete>Desmarcar</TextDelete>
                                    </ContainerDelete>
                                </ContainerDescricao>
                            </ContainerAfter>
                        </View>
                    )}
                />
            </Container>

            {/* <Container>



               <BoxAgenda
                  data={afterAgendamentos}
                  keyExtractor={h => h.id}
                  renderItem={({ item: h }) => (
                     <>
                        <HorariosContainer>
                           <HpContainer>
                              <Deteles>
                                 <SimpleLineIcons name="note" size={24} />

                                 <Hp style={{ fontFamily: 'MontBold' }}>
                                    {h.service}
                                 </Hp>
                              </Deteles>

                              <Deteles>
                                 <MaterialIcons name="alarm" size={24} />
                                 <Hp>
                                    {format(
                                       new Date(
                                          h.ano,
                                          h.mes - 1,
                                          h.dia,
                                          0,
                                          h.from,
                                          0,
                                       ),
                                       `dd/MM/yyyy 'as' HH:mm 'hs'`,
                                    )}
                                 </Hp>
                              </Deteles>

                              <Deteles>
                                 <Feather name="trash-2" size={24} />
                                 <ButtonDelet
                                    onPress={() => {
                                       handleDelete(
                                          h.dia,
                                          h.mes,
                                          h.ano,
                                          h.from,
                                          h.id,
                                       );
                                    }}
                                 >
                                    <ButtonDeletText
                                       style={{ fontFamily: 'MontBold' }}
                                    >
                                       Desmarcar
                                    </ButtonDeletText>
                                 </ButtonDelet>
                              </Deteles>
                           </HpContainer>
                        </HorariosContainer>
                     </>
                  )}
               />
            </BodyContainer>
         </Container> */}
        </>
    );
};
export default Home;
