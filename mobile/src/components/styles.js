import styled from 'styled-components/native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary: '#ffffff',
  secondary: '#E5E7EB',
  terciary: '#1F2937',
  darklight: '#9CA3AF',
  brand: '#10B981',
  green: '#10B981',
  red: '#EF4444',
};

const { primary, secondary, terciary, darklight, brand, green } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 10}px;
  background-color: ${primary};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const TopRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 55px;
`;

export const PageTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${brand};
`;

export const StyledFormArea = styled.View`
  width: 100%;
  margin-top: 60px;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 18px;
  border-radius: 14px;
  margin-bottom: 18px;
  width: 100%;
`;

export const StyledButton = styled.TouchableOpacity`
  background-color: ${(props) => (props.google ? secondary : green)};
  padding: 18px;
  border-radius: 14px;
  align-items: center;
  margin-top: 15px;
`;

export const ButtonText = styled.Text`
  color: ${(props) => (props.google ? terciary : "#fff")};
  font-size: 16px;
  font-weight: bold;
`;

export const MsgBox = styled.Text`
  text-align: center;
  margin: 20px 0;
  color: ${darklight};
`;

export const ExtraView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

export const ExtraText = styled.Text`
  color: ${darklight};
`;

export const TextLink = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-weight: bold;
  margin-top: -40px;
`;
export const SignupContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 10}px;
  background-color: ${secondary};
`;

export const SignupTitleBlock = styled.View`
  margin-top: 55px;
  width: 100%;
`;

export const SignupTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${brand};
`;

export const SignupSubLink = styled.TouchableOpacity`
  align-self: flex-end;
  margin-top: 6px;
`;

export const FieldLabel = styled.Text`
  font-size: 14px;
  color: ${terciary};
  margin-bottom: 6px;
  margin-top: 4px;
`;

export const SignupFormArea = styled.View`
  width: 100%;
  margin-top: 30px;
`;

export const GoogleIconButton = styled.TouchableOpacity`
  background-color: ${secondary};
  padding: 18px;
  border-radius: 14px;
  align-items: center;
  margin-top: 15px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
  elevation: 3;
`;