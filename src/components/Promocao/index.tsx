/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { Button, Container, Image, Title, TitleButton } from "./styles";

interface Props {
    image: string;
    ofModal: () => void;
}

export function PromocaoModal({ image, ofModal }: Props) {
    return (
        <Container>
            <Title>Promoçao do dia</Title>
            <Image source={{ uri: image }} />
            <Button onPress={ofModal}>
                <TitleButton>FECHAR</TitleButton>
            </Button>
        </Container>
    );
}
