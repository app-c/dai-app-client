import React, { useCallback, useRef, useState } from "react";
import { Alert, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Form } from "@unform/mobile";
import { Container, Tilte, BackContainer } from "./styles";
import Input from "../../components/Input";
import api from "../../services/api";
import getValidationErrors from "../../utils/getValidationsErrors";
import Button from "../../components/Button";
import { cores } from "../../utils/ferramentas";

interface SignUpFormDatea {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
}

const SingUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { goBack } = useNavigation();

    const handleSigUp = useCallback(async (data: SignUpFormDatea) => {
        try {
            formRef.current?.setErrors({});

            const shema = Yup.object().shape({
                nome: Yup.string().required("Nome obrigatorio"),
                email: Yup.string()
                    .required("E-mail obrigatorio")
                    .email("Digite um email valido"),
                telefone: Yup.string()
                    .required("telefone obrigatorio")
                    .min(11, "telefone invalido"),
                senha: Yup.string()
                    .required("Senha obrigatoria")
                    .min(6, "No minimo 6 digitos"),
            });

            await shema.validate(data, {
                abortEarly: false,
            });

            await api.post("/user", {
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                senha: data.senha,
            });

            Alert.alert("Cadastro realiazado com sucesso!");
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                Alert.alert(err.message);

                return;
            }

            console.log(err);

            Alert.alert("Erro", "Usuário ja castrado");
        }
    }, []);

    return (
        <>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <Container behavior="padding">
                    <Tilte>Criar uma conta</Tilte>
                    <Form ref={formRef} onSubmit={handleSigUp}>
                        <Input name="nome" icon="user" placeholder="Nome" />

                        <Input
                            name="email"
                            icon="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Input
                            name="telefone"
                            icon="phone"
                            placeholder="Cell (xx) xxxxx xxxx"
                            keyboardType="number-pad"
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
                            Criar
                        </Button>
                    </Form>
                </Container>
            </ScrollView>
            <BackContainer onPress={() => goBack()}>
                <Feather name="log-in" size={20} color={cores.roxo} />
                <Tilte style={{ marginLeft: 15 }}>Voltar para o login</Tilte>
            </BackContainer>
        </>
    );
};

export default SingUp;
