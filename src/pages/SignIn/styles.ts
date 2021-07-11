import styled from "styled-components/native";
import { cores } from "../../utils/ferramentas";

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    justify-content: center;
    align-items: center;
    background: ${cores.fundo};
`;

export const LogText = styled.Text`
    font-size: 60px;
    color: ${cores.texto.cinza_Escuro};
`;

export const ImageLogo = styled.Image`
    width: 152px;
    height: 240px;
`;

export const Tilte = styled.Text`
    font-size: 26px;
    margin-top: 15px;
    margin-bottom: 5px;
    font-size: 20px;
    color: ${cores.roxo};
`;

export const TextBotton = styled.Text`
    font-size: 16px;
`;

export const BackContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-top-width: 2px;
    border-color: #d0d0d0;
    padding: 10px;
`;

export const CriarContaText = styled.Text`
    font-size: 18px;
    color: ${cores.roxo};
`;

export const Forgot = styled.TouchableOpacity`
    align-items: flex-end;
    width: 100%;
    padding: 25px;
    margin-top: 20px;
`;

export const ForgotText = styled.Text`
    font-size: 16px;
`;
