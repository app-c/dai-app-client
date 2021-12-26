import { RFPercentage } from "react-native-responsive-fontsize";
import { FlatList } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Provider } from "./index";
import { cores } from "../../utils/ferramentas";

export const Container = styled.View`
    flex: 1;
    background: ${cores.fundo};
`;

export const Header = styled.View`
    width: 100%;
    height: 90px;
    padding: 0 30px 0 30px;
    flex-direction: row;
    align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
    width: 90%;
`;

export const HomeContainer = styled.TouchableOpacity`
    justify-content: flex-end;
`;

export const HeaderTitle = styled.Text`
    color: #f3f3f3;
    font-size: 24px;
    margin-left: 12%;
`;

export const Title = styled.Text`
    align-items: center;
    align-self: center;
    margin-top: 45px;
    color: ${cores.roxo};
    font-size: 24px;
`;

export const ProviderList = styled(FlatList as new () => FlatList<Provider>)`
    padding: 0px 25px 16px;
`;

export const ListContainer = styled.View``;

export const ProviderContainer = styled.TouchableOpacity`
    background: rgba(165, 99, 134, 0.7);
    border-radius: 16px;
    padding: 20px;
    align-items: center;
    margin-top: 20px;
`;

export const ProviderAvatar = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 76px;
    background: ${cores.fundo};
`;

export const ProviderInfo = styled.View`
    flex: 1;
    margin-left: 15px;
    align-items: center;
`;

export const ProviderName = styled.Text`
    font-size: 24px;
    color: ${cores.branco};
    margin-bottom: 20px;
`;

export const ProviderMeta = styled.View`
    align-items: center;
    margin-top: 15px;
    justify-content: center;
`;

export const ProviderMetaText = styled.Text`
    margin-left: 8px;
    font-size: 18px;
    color: ${cores.rosaClaro};
`;

export const ButtonContainer = styled.View`
    padding: 25px;
    align-content: center;
`;

export const ButtonNext = styled(RectButton)`
    align-items: center;
    height: 58px;
    border-radius: 15px;
    margin-top: 50px;

    background: #fe676e;
`;

export const ButtonNextTitle = styled.Text`
    margin-top: 15px;
    font-size: 16px;
`;

export const ImageFundo = styled.Image`
    width: 300px;
    height: 200px;
    position: absolute;

    top: ${RFPercentage(40)}px;
`;

export const BoxInfo = styled.TouchableOpacity`
    padding: 5px;
    background-color: ${cores.branco};
    width: 40px;
    height: 20px;
`;
