import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Prestadores from '../pages/Providers';
import CreateAppointment from '../pages/CreateAppointment';
import SelectService from '../pages/SelectService';
import AgendamentoCriado from '../pages/AppointmentCreated';
import Profile from '../pages/Profile';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
    <App.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#F2F2F2' },
        }}
    >
        <App.Screen name="Home" component={Home} />
        <App.Screen name="Profile" component={Profile} />
        <App.Screen name="Prestador" component={Prestadores} />
        <App.Screen name="SelectService" component={SelectService} />
        <App.Screen name="CreateAgendamento" component={CreateAppointment} />
        <App.Screen name="AgendamentoCriado" component={AgendamentoCriado} />
    </App.Navigator>
);

export default AppRoutes;
