import { MotiView } from "moti";
import { RectButton } from "react-native-gesture-handler";
/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import { FlatList } from "react-native";

import styled from "styled-components/native";
import { cores } from "../../utils/ferramentas";
import { IPromocao, Response } from "./index";
import themes from "../../utils/themes";

const { color, font } = themes;

export const Container = styled(MotiView)`
    align-items: center;
    flex: 1;
    background: ${cores.fundo};
    padding: 25px;
`;

export const Header = styled.View`
    width: 100%;
    height: 110px;
    align-items: center;
    flex-direction: row;
    padding: 25px;
    background: ${color.primary};
`;

export const ContainerAvatar = styled.TouchableOpacity``;

export const ImageAvatar = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 30px;
    background-color: ${cores.branco};
`;

export const TextName = styled.Text`
    font-size: 22px;
    margin-left: 30%;
    color: ${color.focus};
    font-family: "Mregular";
`;

export const ImageFundo = styled.Image`
    position: absolute;
    top: 0px;
    opacity: 0.3;
`;

export const ContainerTitle = styled.TouchableOpacity`
    width: 158px;
    height: 47px;
    background: ${cores.branco};
    align-items: center;
    justify-content: center;
    border-radius: 16px;

    margin-top: 20px;
`;

export const Title = styled.Text`
    font-size: 22px;
    color: ${cores.roxo};
`;

export const ContainerAgenda = styled.View`
    flex-direction: row;
    padding: 8px;
    width: 100%;
    justify-content: space-between;

    background: rgba(165, 99, 134, 0.8);
    /* opacity: 0.8; */

    margin-top: 5px;
    border-radius: 10px;
`;

export const ContainerHorario = styled.View`
    padding: 1px 5px 1px 15px;
    width: 30%;
    align-items: center;
    justify-content: center;
`;

export const TextHorario = styled.Text`
    font-size: 50px;
    color: ${cores.branco};
`;

export const ContainerDescricao = styled.View`
    padding: 5px 5px 5px 20px;
    width: 70%;
    /* align-items: center; */
    justify-content: center;
`;

export const TextDescription = styled.Text`
    font-size: 18px;
    color: ${cores.branco};
`;

export const ContainerAfterAgendamento = styled(
    FlatList as new () => FlatList<Response>
)``;

export const ContainerAfter = styled.View`
    flex-direction: row;
    padding: 8px;
    width: 100%;
    justify-content: space-between;

    background: rgba(165, 99, 134, 0.5);

    margin-top: 5px;
    border-radius: 10px;
`;

export const ContainerDelete = styled.TouchableOpacity`
    margin-top: 45px;
    justify-content: center;
    align-self: flex-end;
    width: 45%;
`;

export const TextDelete = styled.Text`
    font-size: 16px;
    font-family: "Mblak";
    color: ${cores.branco};
`;

export const Flat = styled(FlatList as new () => FlatList<IPromocao>)``;
