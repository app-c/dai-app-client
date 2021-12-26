/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-duplicates */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Image, Modal, Text, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { format, intervalToDuration, isAfter, isToday } from "date-fns";
import prBr from "date-fns/locale/pt-BR";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";
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
    Flat,
    Header,
    ImageAvatar,
    ImageFundo,
    TextDelete,
    TextDescription,
    TextHorario,
    TextName,
    Title,
} from "./styles";
import { PromocaoModal } from "../../components/Promocao";

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

export interface IPromocao {
    id: string;
    descricao: string;
    prestador_id: string;
    image: string;
}

const Home: React.FC = () => {
    const { user, signOut } = useAuth();
    const { navigate } = useNavigation();
    const [agendamento, setAgendamento] = useState<Response[]>([]);
    const [promocao, setPromocao] = useState<IPromocao[]>([]);
    const [modal, setModal] = useState(false);

    const data = new Date(Date.now());

    const Promocao = useCallback(async () => {
        const res = await api.get("/promocao/list");

        setPromocao(res.data);
    }, []);
    console.log(promocao);

    const Agendamentos = useCallback(async () => {
        try {
            const res = await api.get("/agendamento/me");

            setAgendamento(res.data);
        } catch (err: any) {
            if (err.response.data.message === "token expirou") {
                Alert.alert(err.response.data.message);
                signOut();
            }
        }
    }, [signOut]);

    const CloseModal = useCallback(() => {
        setModal(false);
    }, []);

    useEffect(() => {
        Agendamentos();
        Promocao();
    }, [Agendamentos, Promocao]);

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
        console.log("oks");
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

    useFocusEffect(
        useCallback(() => {
            setModal(true);
        }, [])
    );

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
                                uri: `https://dai-nails.s3.us-east-2.amazonaws.com/avatar/${user.avatar}`,
                            }}
                        />
                    </ContainerAvatar>
                )}
                <TextName>{user.nome}</TextName>
            </Header>

            <Modal visible={modal} transparent>
                <Flat
                    data={promocao}
                    keyExtractor={(h) => h.id}
                    renderItem={({ item: h }) => (
                        <PromocaoModal ofModal={CloseModal} image={h.image} />
                    )}
                />
            </Modal>

            <Container
                animate={{
                    opacity: modal ? 0.3 : 1,
                }}
            >
                <ImageFundo source={Fundo} />
                <ContainerTitle onPress={navigateToSelectProviders}>
                    <Title>Agendar</Title>
                </ContainerTitle>

                {!nexAg && <Title>Sem horários marcados</Title>}

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
                                <TextDescription>
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
        </>
    );
};
export default Home;
