/* eslint-disable camelcase */
import React, { useRef, useCallback, useState, useEffect } from "react";
import {
    AntDesign,
    EvilIcons,
    Feather,
    FontAwesome5,
    Fontisto,
} from "@expo/vector-icons";
import {
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Alert,
    View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import Input from "../../components/Input";
import Button from "../../components/Button";
import api from "../../services/api";
import getValidationErrors from "../../utils/getValidationsErrors";
import { useAuth } from "../../hooks/AuthContext";

import {
    Container,
    UserAvatarButtom,
    UserAvatar,
    Text,
    BackButton,
    Header,
    HomeContainer,
} from "./styles";
import { cores } from "../../utils/ferramentas";

interface ProfileFormData {
    nome: string;
    email: string;
    telefone: string;
    old_password: string;
    senha: string;
    password_confirmation: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const [av, setAv] = useState("");

    const { user, signOut, updateUser } = useAuth();
    console.log(user.avatar);

    const logOf = useCallback(() => {
        signOut();
    }, [signOut]);

    const handleGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const handleSubmit = useCallback(
        async (data: ProfileFormData) => {
            try {
                formRef.current?.setErrors({});

                const schme = Yup.object().shape({
                    nome: Yup.string().required("nome obrigatoório"),
                    email: Yup.string()
                        .required("emal obrigatorio")
                        .email("digite um email valido"),
                    telefone: Yup.string()
                        .required()
                        .min(11, "digite um telefone valido"),
                    old_password: Yup.string(),

                    senha: Yup.string()
                        .ensure()
                        .when("old_password", {
                            is: (val) => !!val.length,
                            then: Yup.string().required(),
                            otherwise: Yup.string(),
                        }),
                    password_confirmation: Yup.string()
                        .ensure()
                        .when("old_password", {
                            is: (val) => !!val.length,
                            then: Yup.string().required(),
                            otherwise: Yup.string(),
                        })
                        .oneOf(
                            [Yup.ref("password"), null],
                            "confirmaçao incorreta"
                        ),
                });

                await schme.validate(data, {
                    abortEarly: false,
                });

                const {
                    nome,
                    email,
                    telefone,
                    old_password,
                    senha,
                    password_confirmation,
                } = data;

                const formData = {
                    nome,
                    email,
                    telefone,
                    ...(old_password
                        ? { old_password, senha, password_confirmation }
                        : {}),
                };

                const response = await api.put("/profile", formData);

                updateUser(response.data);

                Alert.alert(
                    "Perfil atualizado com sucesso",
                    "seu perfil foi atualizado"
                );

                navigation.goBack();
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);

                    return;
                }
                Alert.alert(
                    "Erro no cadastro",
                    "Ocorreu um erro ao tentar fazer o cadastro"
                );
            }
        },
        [navigation, updateUser]
    );

    const urlAvatar = "https://dai-nails.s3.us-east-2.amazonaws.com/";

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();
    }, []);

    const UpdateAvatar = useCallback(async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            const data = new FormData();

            data.append("avatar", {
                type: "image/jpg",
                name: `${user.id}.jpg`,
                uri: result.uri,
            });

            setAv(result.uri);

            api.patch("/avatar", data).then((res) => {
                updateUser(res.data);
            });
        }
    }, [updateUser, user.id]);

    return (
        <Container>
            <KeyboardAvoidingView
                style={{ width: "100%" }}
                behavior="padding"
                enabled
            >
                <ScrollView>
                    <Header>
                        <BackButton onPress={handleGoBack}>
                            <AntDesign
                                name="arrowleft"
                                size={30}
                                color={cores.roxo}
                            />
                        </BackButton>

                        <HomeContainer onPress={logOf}>
                            <Fontisto
                                name="power"
                                size={30}
                                color={cores.roxo}
                            />
                        </HomeContainer>
                    </Header>
                    {!user.avatar && (
                        <UserAvatarButtom onPress={UpdateAvatar}>
                            <EvilIcons
                                name="user"
                                size={170}
                                color={cores.roxo}
                            />
                        </UserAvatarButtom>
                    )}

                    {user.avatar && (
                        <UserAvatarButtom onPress={UpdateAvatar}>
                            <UserAvatar
                                source={{
                                    uri: av || `${urlAvatar}${user.avatar}`,
                                }}
                            />
                        </UserAvatarButtom>
                    )}

                    <View>
                        <Text>Meu perfil</Text>
                    </View>

                    <Form
                        initialData={{
                            nome: user.nome,
                            email: user.email,
                            telefone: user.telefone,
                        }}
                        ref={formRef}
                        onSubmit={handleSubmit}
                    >
                        <Input
                            autoCorrect={false}
                            name="nome"
                            icon="user"
                            placeholder="Nome"
                        />

                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            name="email"
                            icon="mail"
                            placeholder="E-mail"
                        />

                        <Input
                            name="telefone"
                            icon="phone"
                            placeholder="Telefone"
                            keyboardType="numeric"
                        />

                        <Input
                            secureTextEntry
                            containerStyle={{ marginTop: 16 }}
                            name="old_password"
                            icon="lock"
                            placeholder="Senha atual"
                        />
                        <Input
                            secureTextEntry
                            name="password"
                            icon="lock"
                            placeholder="Nova senha"
                        />
                        <Input
                            secureTextEntry
                            name="password_confirmation"
                            icon="lock"
                            placeholder="Confirmar senha"
                        />
                    </Form>
                    <Button
                        onPress={() => {
                            formRef.current?.submitForm();
                        }}
                    >
                        Confirmar mudanças
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};

export default Profile;
