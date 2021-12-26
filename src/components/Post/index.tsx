/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import Button from "../Button";
import {
    Box,
    BoxImage,
    Container,
    ContainerImage,
    Flat,
    Title,
} from "./styles";

export interface Props {
    id: string;
    descricao: string;
    post: string;
    postUrl: string;
}
export function Posts() {
    const { navigate } = useNavigation();
    const [post, setPost] = useState<Props[]>([]);

    const Post = useCallback(async () => {
        await api
            .get("/post/list")
            .then((h) => {
                setPost(h.data);
            })
            .finally(() => {
                console.log("terminou");
            })
            .catch((h) => console.log(h.response.data));
    }, []);

    useEffect(() => {
        Post();
    }, [Post]);

    console.log(post);

    return (
        <Container>
            <Box>
                <Button
                    onPress={() => {
                        navigate("SignIn");
                    }}
                >
                    Acessar minha conta
                </Button>
            </Box>

            <Flat
                data={post}
                keyExtractor={(h) => h.id}
                renderItem={({ item: h }) => (
                    <ContainerImage>
                        <BoxImage source={{ uri: h.postUrl }} />
                        <Title>{h.descricao}</Title>
                    </ContainerImage>
                )}
            />
        </Container>
    );
}
