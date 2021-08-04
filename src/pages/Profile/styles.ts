import styled from "styled-components/native";
import { Platform } from "react-native";
import { cores } from "../../utils/ferramentas";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background: ${cores.rosa};
    padding: 25px;
`;

export const Header = styled.View`
    height: 60px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    background: ${cores.rosa};
    margin-top: 10px;
`;

export const BackButton = styled.TouchableOpacity`
    margin-left: 30px;
`;

export const HomeContainer = styled.TouchableOpacity`
    margin-right: 30px;
`;

export const Text = styled.Text`
    font-size: 20px;
    color: ${cores.roxo};
    margin: 64px 0 24px;
`;

export const UserAvatarButtom = styled.TouchableOpacity`
    width: 187px;
    margin-top: 30px;
`;

export const UserAvatar = styled.Image`
    width: 186px;
    background: #508373;
    height: 186px;
    border-radius: 98px;
`;
