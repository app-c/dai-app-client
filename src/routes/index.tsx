import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';

import { useAuth } from '../hooks/AuthContext';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import fundo from '../../assets/Fundo.png';
import { cores } from '../utils/ferramentas';

const Routes: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: cores.fundo,
                }}
            >
                <Image source={fundo} />
            </View>
        );
    }

    return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
