import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

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
          <StyledTextInput placeholder="Digite seu nome completo" />

          <FieldLabel>Email</FieldLabel>
          <StyledTextInput placeholder="Digite seu email" keyboardType="email-address" />

          <FieldLabel>Senha</FieldLabel>
          <StyledTextInput placeholder="Digite sua senha" secureTextEntry />

          <FieldLabel>Confirme sua senha</FieldLabel>
          <StyledTextInput placeholder="Confirme sua senha" secureTextEntry />

          <StyledButton>
            <ButtonText>Cadastre-se</ButtonText>
          </StyledButton>

          <MsgBox>Ou entre com</MsgBox>

          <GoogleIconButton>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Entrar com Google</Text>
          </GoogleIconButton>

        </SignupFormArea>
      </InnerContainer>
    </StyledContainer>
  );
};

export default Signup;