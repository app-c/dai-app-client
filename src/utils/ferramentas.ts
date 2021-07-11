/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import { useFonts } from "expo-font";

export const cores = {
    rosa: "#DFC5C5",
    rosaClaro: "#FDF2ED",
    roxo: "#A56386",
    branco: "#f1f1f1",
    fundo: "#FADDDF",
    texto: {
        cinza_Escuro: "#585858",
    },
};

export function Fonts() {
    const [fontsLoads] = useFonts({
        MontBlack: require("../../assets/fonts/roboto/Roboto/Roboto-Black.ttf"),
        MontRegular: require("../../assets/fonts/roboto/Roboto/Roboto-Regular.ttf"),
        MontBold: require("../../assets/fonts/roboto/Roboto/Roboto-Bold.ttf"),
    });

    return fontsLoads;
}

// export function convertHours(time: string) {
//    const [hour, minutes] = time.split(':').map(Number);
//    const timeInMinutes = hour * 60 + minutes;
//    return timeInMinutes;
// }
