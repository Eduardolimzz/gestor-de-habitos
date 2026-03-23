import React from "react";
import { StatusBar } from "expo-status-bar";

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
          <StyledTextInput placeholder="Email" />
          <StyledTextInput placeholder="Senha" secureTextEntry />

          <ExtraView>
            <ExtraText>⬜ Lembre-se de mim</ExtraText>
            <TextLink>
              <TextLinkContent>Esqueceu a senha?</TextLinkContent>
            </TextLink>
          </ExtraView>

          <StyledButton>
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