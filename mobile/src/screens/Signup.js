import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, Alert } from "react-native";
import api from "../services/api";

import {
  StyledContainer,
  InnerContainer,
  SignupTitleBlock,
  SignupTitle,
  SignupSubLink,
  TextLinkContent,
  SignupFormArea,
  FieldLabel,
  StyledTextInput,
  StyledButton,
  ButtonText,
  MsgBox,
  GoogleIconButton,
} from "../components/styles";

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await api.post('/auth/register', {
        name,
        email,
        password
      });

      Alert.alert('Sucesso', 'Conta criada!');
      navigation.navigate('Login');

    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao cadastrar');
    }
  };

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>

        <SignupTitleBlock>
          <SignupTitle>FAÇA SEU CADASTRO</SignupTitle>

          <SignupSubLink onPress={() => navigation.navigate('Login')}>
            <TextLinkContent>Entrar →</TextLinkContent>
          </SignupSubLink>
        </SignupTitleBlock>

        <SignupFormArea>

          <FieldLabel>Nome</FieldLabel>
          <StyledTextInput
            placeholder="Digite seu nome completo"
            onChangeText={setName}
          />

          <FieldLabel>Email</FieldLabel>
          <StyledTextInput
            placeholder="Digite seu email"
            keyboardType="email-address"
            onChangeText={setEmail}
          />

          <FieldLabel>Senha</FieldLabel>
          <StyledTextInput
            placeholder="Digite sua senha"
            secureTextEntry
            onChangeText={setPassword}
          />

          <StyledButton onPress={handleSignup}>
            <ButtonText>Cadastre-se</ButtonText>
          </StyledButton>

          <MsgBox>Ou entre com</MsgBox>

          <GoogleIconButton>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Entrar com Google
            </Text>
          </GoogleIconButton>

        </SignupFormArea>
      </InnerContainer>
    </StyledContainer>
  );
};

export default Signup;