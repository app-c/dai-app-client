import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import themes from "../../utils/themes";

const { font, color } = themes;

export const Container = styled.TouchableOpacity`
    background-color: ${color.focus_light};
    height: ${RFPercentage(24)}px;

    border-radius: 10px;
    padding: 10px;
    margin-top: 30px;
`;

export const ImageAvatar = styled.Image`
    width: ${RFValue(70)}px;
    height: ${RFValue(70)}px;
    border-radius: ${RFValue(35)}px;

    background-color: ${color.secondary};
`;

export const BoxProfile = styled.View`
    flex-direction: row;
    align-items: center;

    padding: 5px;
`;

export const BoxProfileDescricao = styled.View`
    margin-left: 30px;
`;

export const BoxSocial = styled.View`
    height: ${RFValue(70)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const BoxIconSocial = styled.TouchableOpacity`
    width: ${RFValue(60)}px;
    height: ${RFValue(30)}px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    top: ${RFValue(10)}px;

    background-color: ${color.focus};
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${font.Mbold};
    color: ${color.secondary};
`;
