import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { cores } from "../../utils/ferramentas";
import themes from "../../utils/themes";

const { color, font } = themes;

export const Container = styled.View`
    background-color: ${color.primary};
    width: 100%;
    border-radius: 15px;

    align-items: center;
    align-self: center;
    margin-top: ${RFPercentage(30)}px;
    padding: 10px 0;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${font.Mblak};
    color: ${({ theme: h }) => h.color.focus};
    margin-bottom: 16px;
`;

export const TitleButton = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: "Mblak";
    color: ${({ theme: h }) => h.color.secondary};
`;

export const Button = styled.TouchableOpacity`
    background-color: ${cores.roxo};
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    width: 100px;
    height: 30px;
`;

export const Image = styled.Image`
    width: 100%;
    height: 280px;
    background-color: ${cores.fundo};
    margin-bottom: 10px;
`;
