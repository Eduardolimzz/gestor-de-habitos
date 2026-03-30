import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert } from "react-native";
import api from "../services/api";

import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  StyledFormArea,
  StyledTextInput,
  StyledButton,
  ButtonText,
  MsgBox,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  TopRow,
} from "../components/styles";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await api.post('/auth/login', {
        email,
        password
      });

      Alert.alert('Sucesso', 'Login realizado!');
      navigation.navigate('Welcome'); // depois podemos trocar pra Habits

    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao logar');
    }
  };

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <TopRow>
          <PageTitle>ENTRAR</PageTitle>
          <TextLink onPress={() => navigation.navigate('Signup')}>
            <TextLinkContent>Cadastre-se →</TextLinkContent>
          </TextLink>
        </TopRow>

        <StyledFormArea>
          <StyledTextInput
            placeholder="Email"
            onChangeText={setEmail}
          />

          <StyledTextInput
            placeholder="Senha"
            secureTextEntry
            onChangeText={setPassword}
          />

          <ExtraView>
            <ExtraText>⬜ Lembre-se de mim</ExtraText>
            <TextLink>
              <TextLinkContent>Esqueceu a senha?</TextLinkContent>
            </TextLink>
          </ExtraView>

          <StyledButton onPress={handleLogin}>
            <ButtonText>Entrar</ButtonText>
          </StyledButton>

          <MsgBox>Ou entre com</MsgBox>

          <StyledButton google>
            <ButtonText google>Entrar com Google</ButtonText>
          </StyledButton>
        </StyledFormArea>
      </InnerContainer>
    </StyledContainer>
  );
};

export default Login;