import React from 'react';
import { useState,useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import {Button,View, FlatList, ActivityIndicator,Text, StyleSheet,Pressable} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mdiWaterPlus } from '@mdi/js';
import Icon from '@mdi/react'
import { mdiAccount } from '@mdi/js'

import {BASE_URL} from '../../env';
import { List } from 'react-native-paper';
import _ from "lodash";


function Stocks({navigation}){
  
    //<MyComponent/>
  
    
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
  
    const [isLoading,setLoading] = useState(true);
    const [data,setData] = useState([]);


    const getTotalStockOfCategory = (data) => {
      const count = _.sumBy(data.sub_category, 'stock');

      return count || 0;
  }

  const getTotalStockOfCity = (data) => {
    const count = _.sumBy(data.blood_stock, 'stock');

    return count || 0;
}

const isFocused = useIsFocused();

    const getStocks = async () => {
        
        fetch(`${BASE_URL}/api/stocks`)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));        
    }

    useEffect(() => {
        getStocks();
      }, [isFocused]);

      return (

        <List.Section>

          <View style={styles.containerPressable}>
          <Pressable style={styles.transferButton} onPress={() => navigation.push('Transfer')}>
          <Text style={styles.Transfertext}>Transfer Stock</Text>
          </Pressable>

          <Pressable style={styles.transferButton} onPress={() => navigation.push('Transfer')}>
          <Text style={styles.Transfertext}>Add Stock</Text>
          </Pressable>
          </View>

        {data.map( (city,index) => (
          
          <List.Accordion key={index}
            title={`${city.city_name} ( ${getTotalStockOfCity(city)} )`}

            left={props => <List.Icon {...props} icon={'city'} />
            }>
              {city?.blood_stock?.map( (category) => (
                <List.Accordion key={category._id} style={styles.ListAccordion}
                title={`${category.category_name} ( ${getTotalStockOfCategory(category)} )`}
                left={props => <List.Icon {...props} icon='water' /> }>
                  {category?.sub_category?.map( (subcategory) =>
                        
                        <List.Item key={subcategory._id} style={styles.ListItem} title={`${subcategory.name} ( ${subcategory.stock}) `}
                        left={props => <List.Icon {...props} icon={'water'} /> }
                        />  
                        
                  ) }
                </List.Accordion>            
              ))}
              
          </List.Accordion>
    
        ))}
        </List.Section>




        


      );

}

const styles = StyleSheet.create({
  ListAccordion: {
    marginLeft:40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ListItem:{
    display:"flex",
    alignContent:'space-between',
    justifyContent:'space-between',
    marginLeft:'25%'
  },
  transferButton:{
    margin:5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderWidth:1,
    borderColor:'#CC0000',
    maxWidth:'50%',
    elevation: 0,
    backgroundColor: 'transparent',
  },
  containerPressable:{
    flexDirection:'row',
    marginBottom:8,
  },
  Transfertext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#CC0000',
  },
});

export default Stocks;