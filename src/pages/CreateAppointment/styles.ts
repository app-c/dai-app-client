import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { cores } from "../../utils/ferramentas";

interface HourProps {
    available: boolean;
    select: boolean;
}

export const Container = styled.View`
    flex: 1;
    padding-bottom: 30px;
    background: ${cores.fundo};
`;

export const Header = styled.View`
    width: 100%;
    height: 70px;
    align-items: center;

    flex-direction: row;
    justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity`
    margin-left: 30px;
`;

export const HomeContainer = styled.TouchableOpacity`
    margin-right: 30px;
`;

export const OpenPickerText = styled.Text`
    font-size: 20px;
    color: #fff;
`;

export const Calendario = styled.View`
    align-items: center;
    /* justify-content: center; */
    width: 100%;
    height: 100px;
    background-color: ${cores.roxo};
    opacity: 0.8;
    border-radius: 10px;
`;

export const SectionContente = styled.ScrollView.attrs({
    contentContainerStyle: { paddingHorizontal: 24 },
    horizontal: true,
})`
    margin-top: 30px;
`;

export const HourContainer = styled(RectButton)``;

export const Hour = styled.View<HourProps>`
    background: ${(props) => (props.select ? `${cores.roxo}` : "#fff")};
    padding: 6px 30px;
    margin-right: 8px;
    border-radius: 15px;
    border-width: 1px;
    border-color: ${cores.roxo};

    opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const CreateAppointmentButton = styled(RectButton)`
    height: 50px;
    background: ${cores.roxo};
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin-left: 5%;
`;

export const Content = styled.View`
    padding: 25px;
    align-items: center;
    flex: 1;
`;

export const HourText = styled.Text<HourProps>`
    font-family: "MontBold";
    font-size: 16px;
    color: ${(props) => (props.select ? `${cores.branco}` : `${cores.roxo}`)};
`;

export const CreateAppointmentButtonText = styled.Text`
    color: #f3f3f3;
    font-size: 18px;
`;

export const OpenPikerButon = styled(RectButton)`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;

    background: ${cores.roxo};
    border-radius: 10px;
`;
