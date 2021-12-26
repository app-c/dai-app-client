/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Fontisto } from "@expo/vector-icons";
import React from "react";
import themes from "../../utils/themes";
import {
    BoxIconSocial,
    BoxProfile,
    BoxProfileDescricao,
    BoxSocial,
    Container,
    ImageAvatar,
    Title,
} from "./styles";

export interface Provider {
    nome: string;
    avatar: string;
    funcao: string;
    changePrestador: () => void;
    linkW: () => void;
    linkIns: () => void;
    linkFace: () => void;
    linkMap: () => void;
}

export function Prestador({
    nome,
    avatar,
    funcao,
    changePrestador,
    linkW,
    linkIns,
    linkFace,
    linkMap,
}: Provider) {
    return (
        <Container onPress={changePrestador}>
            <BoxProfile>
                <ImageAvatar source={{ uri: avatar }} />
                <BoxProfileDescricao>
                    <Title>{nome}</Title>
                    <Title>{funcao}</Title>
                </BoxProfileDescricao>
            </BoxProfile>

            <BoxSocial>
                <BoxIconSocial onPress={linkW}>
                    <Fontisto
                        name="whatsapp"
                        size={20}
                        color={themes.color.secondary}
                    />
                </BoxIconSocial>

                <BoxIconSocial onPress={linkFace}>
                    <Fontisto
                        name="facebook"
                        size={20}
                        color={themes.color.secondary}
                    />
                </BoxIconSocial>

                <BoxIconSocial onPress={linkIns}>
                    <Fontisto
                        name="instagram"
                        size={20}
                        color={themes.color.secondary}
                    />
                </BoxIconSocial>

                <BoxIconSocial onPress={linkMap}>
                    <Fontisto
                        name="map-marker-alt"
                        size={20}
                        color={themes.color.secondary}
                    />
                </BoxIconSocial>
            </BoxSocial>
        </Container>
    );
}
