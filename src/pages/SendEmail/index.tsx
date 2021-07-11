import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, TextInput } from 'react-native';
import api from '../../services/api';
import {
    BottonIcon,
    Button,
    Container,
    ContainerIcons,
    ContainerInput,
    TextButoon,
    Title,
} from './styles';

const SendMail: React.FC = () => {
    const [mail, setMail] = useState('');

    const { navigate } = useNavigation();

    const handleSubmit = useCallback(async () => {
        try {
            await api.post('/forgot', {
                email: mail,
            });

            Alert.alert(
                'Email envidao com sucesso',
                'Verifique sua caixa de entrada ou a caixa de span',
            );

            navigate('Forgot');
        } catch (err) {
            Alert.alert('Email incorreto');
        }
    }, [mail, navigate]);

    const backHome = useCallback(() => {
        navigate('SignIn');
    }, [navigate]);

    return (
        <Container>
            <ContainerIcons>
                <BottonIcon onPress={backHome}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </BottonIcon>
            </ContainerIcons>

            <Title style={{ fontFamily: 'MontBold' }}>
                Esqueceu sua senha?
            </Title>
            <Title>
                Não se preocupe, basta vocẽ enviar seu email para recuperar-la
            </Title>

            <ContainerInput>
                <TextInput
                    placeholder="Email"
                    value={mail}
                    onChangeText={setMail}
                    keyboardType="email-address"
                />
            </ContainerInput>

            <Button onPress={handleSubmit}>
                <TextButoon style={{ fontFamily: 'MontBlack' }}>
                    Enviar
                </TextButoon>
            </Button>
        </Container>
    );
};
export default SendMail;
