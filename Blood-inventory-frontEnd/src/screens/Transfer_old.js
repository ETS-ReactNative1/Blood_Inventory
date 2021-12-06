import React, {useState, useContext} from 'react';
import {Select, VStack, CheckIcon, Input, Box, Button, useToast} from 'native-base';
import AppDataContext from '../contexts/AppData';

const TransferScreen = ({ navigation }) => {
  const toast = useToast();
  const {state, isLoading, refreshData} = useContext(AppDataContext);
  const [data, _setData] = useState({
    src: '',
    dest: '',
    fruit: '',
    quantity: 0,
  });
  const [isSubmitting, _setIsLoading] = useState(false);

  const transfer = () => {
    const errors = [];

    if(isLoading) return

    if (!data.src) errors.push('From');
    if (!data.dest) errors.push('To');
    if (!data.fruit) errors.push('Fruit');

    if (errors.length)
      return toast.show({
        title: errors.join(', ') + ' is required.',
        status: 'error',
      });

    if (!data.quantity) {
      return toast.show({
        title: 'Quantity must be more than 0',
        status: 'error',
      });
    }
    
    _setIsLoading(true);
    fetch(`${BASE_URL}/api/Transfer`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        _setIsLoading(false);
        refreshData();
        toast.show({
          title: "Stock transfered successfully.",
          status: "success"
        })
        navigation.goBack();
      })
      .catch((error) => {
        _setIsLoading(false);
        console.log('FETCH_ERROR', error);
      });
  };

  let cities = []
  let city_fruites = [];

  if(state && Array.isArray(state)){
    cities = state.map((item) => item.city_name);

    if(data.src){
      city_fruites =
        state?.find((item) => item.city_name === data.src)?.fruits_stock || [];
    }
  }

  console.log('data', {state, city_fruites, data});
  return (
    <Box p="4">
      <VStack space={4} justifyContent="space-between">
        <Select
          selectedValue={data.src}
          minWidth="200"
          accessibilityLabel="From"
          placeholder="From"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => _setData({...data, src: itemValue})}>
          {cities.map((item) => (
            <Select.Item key={'src' + item} label={item} value={item} />
          ))}
        </Select>
        <Select
          selectedValue={data.dest}
          minWidth="200"
          accessibilityLabel="To"
          placeholder="To"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => _setData({...data, dest: itemValue})}>
          {cities.map((item) => (
            <Select.Item key={'dest' + item} label={item} value={item} />
          ))}
        </Select>
        <Select
          selectedValue={data.fruit}
          minWidth="200"
          accessibilityLabel="Fruit"
          placeholder="Fruit"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => _setData({...data, fruit: itemValue})}>
          {city_fruites.map((item) => (
            <Select.Item
              key={'dest' + item.name}
              label={`${item.name} (${item.stock})`}
              value={item.name}
            />
          ))}
        </Select>
        <Input
          placeholder="Input"
          w={{
            base: '100%',
          }}
          keyboardType="number-pad"
          value={`${data.quantity}`}
          onChangeText={(text) =>
            _setData({...data, quantity: text ? parseInt(text) : 0})
          }
        />

        <Button
          isLoading={isSubmitting}
          size="lg"
          _loading={{
            bg: 'primary.400:alpha.100',
            _text: {
              color: 'white',
            },
          }}
          _spinner={{
            color: 'white',
          }}
          onPress={transfer}
          isLoadingText="Transferring">
          Transfer
        </Button>
      </VStack>
    </Box>
  );
};

export default TransferScreen;
