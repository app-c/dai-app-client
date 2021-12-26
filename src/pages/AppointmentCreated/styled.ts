import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { cores } from "../../utils/ferramentas";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 24px;
    background-color: ${cores.fundo};
`;

export const Description = styled.Text`
    font-size: 18px;
    margin-top: 16px;
`;

export const Title = styled.Text`
    font-size: 32px;
    margin-top: 48px;
    text-align: center;
    color: ${cores.roxo};
`;

export const OkButton = styled.TouchableOpacity`
    background: ${cores.roxo};
    width: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 24px;
    padding: 12px 24px;
`;

export const OkButtonText = styled.Text`
    font-size: 20px;
    color: #fff;
`;

export const CantainerImage = styled.View`
    position: absolute;
`;

export const ImageFundo = styled.Image``;
