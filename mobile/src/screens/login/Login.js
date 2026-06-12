import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert } from "react-native";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

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
} from "../../components/styles";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha email e senha.');
      return;
    }

    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data;
      login({ user, token });
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao fazer login');
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
            keyboardType="email-address"
            autoCapitalize="none"
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
