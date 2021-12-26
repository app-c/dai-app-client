import { FlatList } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Props } from ".";
import themes from "../../utils/themes";

const { font, color } = themes;

export const Container = styled.View`
    flex: 1;
    background-color: ${color.primary};
`;

export const Box = styled.View`
    width: 70%;
    height: ${RFPercentage(15)}px;
    background-color: ${color.primary};
    margin-bottom: 26px;
    align-self: center;
`;

export const ContainerImage = styled.View`
    width: 100%;
    height: ${RFPercentage(50)}px;
    background-color: ${color.secondary};
    margin-bottom: 15px;
`;

export const BoxImage = styled.Image`
    width: 100%;
    height: ${RFPercentage(40)}px;
`;

export const Flat = styled(FlatList as new () => FlatList<Props>)``;

export const Title = styled.Text`
    margin-left: 30px;
    margin-top: 5px;
    font-family: "Mbold";
`;
