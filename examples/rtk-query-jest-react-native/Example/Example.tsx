import { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLazyGetMerchantQuery, useLazyVerifyApiKeyQuery } from './Example.apiSlice';

interface Props {
  navigation: NativeStackNavigationProp<any, 'EnterConfig'>;
}

export const EnterConfigScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  const [apiKey, setApiKey] = useState('');
  const [orderDescription, setOrderDescription] = useState('');
  const [verifyApiKey, { error: verifyApiKeyError, isFetching }] = useLazyVerifyApiKeyQuery();
  const [getMerchantDetails, { error: getMerchantDetailsError }] = useLazyGetMerchantQuery();

  // No try catch results in error using jest and msw
  const handleEnterConfigClick = async () => {
      const { merchantId } = await verifyApiKey(undefined).unwrap();
      const { merchantLogo } = await getMerchantDetails({ _id: merchantId }).unwrap();
      navigation.navigate('SelectJourney');
  };

  // Using try catch results in no error jest and msw
  // const handleEnterConfigClick = async () => {
  //   try{
  //     const { merchantId } = await verifyApiKey(undefined).unwrap();
  //     const { merchantLogo } = await getMerchantDetails({ _id: merchantId }).unwrap();
  //     navigation.navigate('SelectJourney');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const isConfirmDisabled = !apiKey || !orderDescription;

  return (
    <View>
      <View>
        <Text>Enter API Key:</Text>
        <TextInput
          placeholder="Enter API Key"
          value={apiKey}
          autoCapitalize="none"
          onChangeText={setApiKey}
        />
        {verifyApiKeyError && (
          <Text>ERROR</Text>
        )}
        <Text>Enter Default Order Description:</Text>
        <TextInput
          placeholder="Enter Default Order Description"
          value={orderDescription}
          autoCapitalize="none"
          onChangeText={setOrderDescription}
        />
      </View>
      {getMerchantDetailsError && (
        <Text>ERROR</Text>
      )}
      <Button title='Confirm' onPress={handleEnterConfigClick} disabled={isConfirmDisabled} />
    </View>
  );
};
