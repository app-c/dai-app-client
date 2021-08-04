import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Response } from "./index";
import { cores } from "../../utils/ferramentas";

export const Container = styled.View`
    flex: 1;
    background: ${cores.fundo};
`;

export const Header = styled.View`
    height: 60px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
`;

export const BackButton = styled.TouchableOpacity`
    margin-left: 30px;
`;

export const HomeContainer = styled(RectButton)`
    margin-right: 30px;
`;

export const Title = styled.Text`
    align-items: center;
    align-self: center;
    margin-top: 30px;
    color: ${cores.roxo};
    font-size: 22px;
    font-family: "MontBold";
`;

export const ServiceContainer = styled(
    FlatList as new () => FlatList<Response>
)`
    padding: 25px;
`;

export const BoxContainer = styled(RectButton)``;

export const Box = styled.View`
    background: rgba(165, 99, 134, 0.8);
    margin-top: 18px;
    border-radius: 18px;
    padding: 8px 10px 15px 10px;
`;

export const ServiceText = styled.Text`
    margin-top: 10px;
    font-size: 24px;
    color: ${cores.rosa};
    margin-left: 10px;
`;

export const Description = styled.Text`
    margin-top: 10px;
    font-size: 18px;
    color: ${cores.branco};
    margin-left: 25px;
`;

export const TextDescription = styled.Text`
    margin-top: 20px;
    font-size: 16px;
    color: ${cores.branco};
`;

export const ContainerImage = styled.View`
    position: absolute;
    left: 50%;
    top: 4%;
`;

export const ImageFundo = styled.Image`
    width: 200px;
    height: 240px;
`;
