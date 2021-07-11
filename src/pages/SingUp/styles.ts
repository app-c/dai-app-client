import styled from 'styled-components/native';
import { cores } from '../../utils/ferramentas';

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    padding: 25px;
    justify-content: center;
    align-items: center;
    background: ${cores.fundo};
`;

export const Tilte = styled.Text`
    font-size: 20px;
    font-family: 'MontBold';
    color: ${cores.roxo};
`;

export const BackContainer = styled.TouchableOpacity`
    flex-direction: row;
    height: 7%;
    align-items: center;
    justify-content: center;
    background: ${cores.fundo};
    border-top-width: 2px;
    border-color: ${cores.roxo};
`;
