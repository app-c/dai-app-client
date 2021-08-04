import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Alert, TextInput } from "react-native";
import api from "../../services/api";
import {
    BottonIcon,
    Button,
    Container,
    ContainerIcons,
    ContainerInput,
    TextButoon,
    Title,
} from "./styles";

const Forgot: React.FC = () => {
    const [codigo, setCodigo] = useState("");
    const [senha, setSenha] = useState("");

    const { navigate } = useNavigation();

    const handleSubmit = useCallback(async () => {
        try {
            const res = await api.post("/reset", {
                password: senha,
                token: codigo,
            });

            console.log(res.data);

            Alert.alert(
                "Senha cadastrada com sucesso!",
                "Você já pode fazer login na apricação"
            );

            navigate("SignIn");
        } catch (err) {
            Alert.alert("Email incorreto");
        }
    }, [codigo, navigate, senha]);

    const backHome = useCallback(() => {
        navigate("SignIn");
    }, [navigate]);

    return (
        <Container>
            <ContainerIcons>
                <BottonIcon onPress={backHome}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </BottonIcon>
            </ContainerIcons>
            <Title style={{ fontFamily: "MontBold" }}>
                Digite sua nova senha e o codigo que você rebebeu no seu email
            </Title>

            <ContainerInput>
                <TextInput
                    placeholder="Digite sua nova senha"
                    value={senha}
                    onChangeText={setSenha}
                    keyboardType="default"
                />
            </ContainerInput>

            <ContainerInput>
                <TextInput
                    placeholder="Codigo"
                    value={codigo}
                    onChangeText={setCodigo}
                    keyboardType="email-address"
                />
            </ContainerInput>

            <Button onPress={handleSubmit}>
                <TextButoon style={{ fontFamily: "MontBlack" }}>
                    Enviar
                </TextButoon>
            </Button>
        </Container>
    );
};
export default Forgot;
