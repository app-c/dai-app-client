/* eslint-disable import/prefer-default-export */
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { cores } from '../../utils/ferramentas';

export const Container = styled.View`
    background: ${cores.rosa};
    flex: 1;
    padding: 30px;
    align-items: center;
`;

export const Title = styled.Text`
    font-size: 18px;
`;

export const ContainerInput = styled.View`
    background: ${cores.branco};
    width: 100%;
    height: 50px;

    margin-top: 30px;
    justify-content: center;
    padding-left: 20px;
    border-radius: 10px;
`;

export const Button = styled(RectButton)`
    margin-top: 15px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    background: ${cores.roxo};
    align-items: center;
    justify-content: center;
`;

export const TextButoon = styled.Text`
    color: #fff;
    font-size: 18px;
`;

export const ContainerIcons = styled.View`
    width: 100%;
    margin-bottom: 30%;
`;

export const BottonIcon = styled.TouchableOpacity``;
