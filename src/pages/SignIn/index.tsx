/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Alert, Animated, BackHandler, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import {
    Container,
    Tilte,
    BackContainer,
    CriarContaText,
    ImageLogo,
    Forgot,
    ForgotText,
} from "./styles";
import Input from "../../components/Input";
import Logo from "../../../assets/Logo.png";
import { useAuth } from "../../hooks/AuthContext";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationsErrors";
import { cores } from "../../utils/ferramentas";

interface SignInFormData {
    email: string;
    senha: string;
}

const SingIn: React.FC = () => {
    const { signIn } = useAuth();
    const { navigate } = useNavigation();
    const [offSet] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
    const [opacit] = useState(new Animated.Value(0));
    const formRef = useRef<FormHandles>(null);

    const handleSignIn = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required("E-mail obrigatório")
                        .email("E-mail invalido"),
                    senha: Yup.string().min(6, "Senha no minimo 6 digitos"),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await signIn({
                    email: data.email,
                    senha: data.senha,
                }).then((h) => {
                    console.log(h);
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                }

                Alert.alert(
                    "Erro na autenticação",
                    "Ocorreu um erro ao fazer login"
                );
            }
        },
        [signIn]
    );

    const navigateToSingUp = useCallback(() => {
        navigate("SignUp");
    }, [navigate]);

    const SendMail = useCallback(() => {
        navigate("Send");
    }, [navigate]);

    useEffect(() => {
        Animated.parallel([
            Animated.spring(offSet.y, {
                toValue: 0,
                speed: 1,
                bounciness: 5,
                useNativeDriver: true,
            }),
            Animated.timing(opacit, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }),
        ]).start();
    }, [offSet.y, opacit]);

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
        },
    });

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => {
            return true;
        });
    });

    return (
        <Container behavior="padding">
            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity: opacit,
                        transform: [{ translateY: offSet.y }],
                    },
                ]}
            >
                <ImageLogo source={Logo} />

                <Tilte>Entre com uma conta</Tilte>

                <Form ref={formRef} onSubmit={handleSignIn}>
                    <Input
                        name="email"
                        icon="mail"
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        name="senha"
                        icon="lock"
                        placeholder="Senha"
                        secureTextEntry
                    />

                    <Button
                        onPress={() => {
                            formRef.current?.submitForm();
                        }}
                    >
                        Entrar
                    </Button>
                </Form>
                <BackContainer onPress={navigateToSingUp}>
                    <Feather name="log-out" size={20} color={`${cores.roxo}`} />
                    <CriarContaText style={{ marginLeft: 15, marginTop: 0 }}>
                        Criar uma conta
                    </CriarContaText>
                </BackContainer>
            </Animated.View>
            <Forgot onPress={SendMail}>
                <ForgotText>Esqueci minha senha</ForgotText>
            </Forgot>
        </Container>
    );
};

export default SingIn;
