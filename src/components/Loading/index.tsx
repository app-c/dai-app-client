import React from 'react';
import Lottie from 'lottie-react-native';

import { Container } from './styles';

import loading from '../../assets/load.json';

const Loading: React.FC = () => {
   return (
      <Container>
         <Lottie source={loading} autoPlay />
      </Container>
   );
};

export default Loading;
