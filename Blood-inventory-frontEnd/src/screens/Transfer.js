import { View,Text, Center,useToast } from 'native-base';
import React, { useState } from 'react';
import {TouchableOpacity, StyleSheet, Button, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BASE_URL} from '../../env';

const groupe = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'AB', value: 'AB' },
  { label: 'O', value: 'O' },

];

const sous_groupe = [
    { label:'Plus', value:'Plus'},
    { label: 'Moins', value: 'Moins'}
];

const Cities =[
    { label: "Marseille", value: "Marseille" },
    { label: "Paris", value: "Paris" },
    { label: "Dijon", value: "Dijon" },
    { label: "Nice", value: "Nice" },
    { label: "Lille", value: "Lille" },
];

const values=["25%","50%","75%","100%"];



const Transfer = ({navigation}) => {

    const toast = useToast();
    const HandleTransfer = () =>{

    fetch(`${BASE_URL}/api/TransferStock`, {
        method: 'POST',
        body: JSON.stringify({
            "src":value.src,
            "dest":value.dest,
            "category_name":value.groupe,
            "subcategory_name":value.sous_groupe,
            "stock":value.stock_src
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => {            
          toast.show({
            title: json.message,
            status: json.success
          })
          navigation.goBack();
        })
        .catch((error) => {
          console.log('FETCH_ERROR', error);
        });
  }  
  const [value, setValue] = useState({
      groupe: '',
      sous_groupe: '',
      src: '',
      dest: '',
      stock_src:'0.0',
      stock_dest: '0.0',
  });

  const errorHandler = () =>{
      
  }
  const findStockByCity= (json,PassedCity) =>{
    
    const _city = json.find((city)=> city.city_name === PassedCity);
    if(_city){
      console.log(_city);
      const _category = _city.blood_stock.find((category) => category.category_name === value.groupe)
      if(_category){
          const sub_category = _category.sub_category.find((subcategory) => subcategory.name === value.sous_groupe);
          if(sub_category.stock){
              return sub_category.stock;
          }
          else{
              return 0;
          }
  
      }
      else{
          return 0;
      }
      return 0;
    }


  }

  const getStocks_OfCities= async (percentage) => {
        
    fetch(`${BASE_URL}/api/stocks`)
    .then((response) => response.json())
    .then((json) => {

        const City_src_Stock = findStockByCity(json,value.src);
        const City_dest_Stock = findStockByCity(json,value.dest);

        setValue({...value, stock_dest: (City_dest_Stock),stock_src:(City_src_Stock)*percentage.replace('%','')/100})        

    })
    .catch((error) => console.error(error))
    //.finally(() => setLoading(false));        
}



  return (

      <View style={styles.Container}>
            <View style={styles.dropdownContainer}>
                <Dropdown
            style={styles.dropdownGroupe}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={groupe}
            placeholder="Groupe"
            maxHeight={200}
            labelField="label"
            valueField="value"
            
            value={value.groupe}
            onChange={item => {
                setValue({...value, groupe: item.value});

            }}
            />

            <Dropdown
            style={styles.dropdownSousGroupe}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={sous_groupe}
            maxHeight={120}
            labelField="label"
            valueField="value"
            placeholder="Sous Groupe"
            value={value.sous_groupe}
            onChange={item => {
                setValue({...value, sous_groupe: item.value});
            }}
            />
            </View>

            <View>
                <Text style={styles.text}>From</Text>
            </View>

            <View style={styles.City_Stock_Container}>
                <Dropdown
                style={styles.dropdownCities}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={Cities}
                labelField="label"
                valueField="value"
                placeholder="City Src"
                onChange={item => {
                    setValue({...value, src: item.value});
                }}
                />
            <View style={styles.Stock_Value}>
                <Text style={styles.Stock_Value_number}>{value.stock_src}</Text>                
            </View>
            </View>

            <View style={styles.row}>
                {values.map((value) => (
                    <TouchableOpacity
                    key={value}
                    onPress={() => getStocks_OfCities(value)}
                    style={[
                        styles.button,
                        styles.selected,
                    ]}
                    >
                    <Text
                        style={[
                        styles.buttonLabel,
                        styles.selectedLabel,
                        ]}
                    >
                        {value}
                    </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View>
                <Text style={styles.text}>TO</Text>
            </View>

            <View style={styles.City_Stock_Container}>
                <Dropdown
                style={styles.dropdownCities}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={Cities}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder="City Dest"
                value={value.dest}
                onChange={item => {
                    setValue({...value, dest: item.value});
                }}
                />
            <View style={styles.Stock_Value}>
                <Text style={styles.Stock_Value_number}>{value.stock_dest}</Text>                
            </View>
            </View>

            <View style={styles.Transfer}>

            <Pressable style={styles.Transferbutton} onPress={HandleTransfer}>
                <Text style={styles.Transfertext}>Transfer Stock</Text>
            </Pressable>           

            </View>




      </View>


    
  );
};

export default Transfer;

const styles = StyleSheet.create({
    Container:{
        flex:1,
        padding:10,
    },
    dropdownGroupe: {
    margin: 16,
    height: 50,
    width:150,
  },

  dropdownSousGroupe:{
    margin: 16,
    height: 50,
    width:150
  },
  dropdownContainer:{
      flexDirection:'row',
      backgroundColor:"white",

  },
  City_Stock_Container:{
      flexDirection:'row',
      justifyContent:'space-around',
      backgroundColor:'white',
      marginBottom:10,


    
  },
  dropdownCities:{
    margin:16,
    height:40,
    width:150,
    padding:10,
    color:'white',
    backgroundColor:'#DDDDDD',

  },
  Stock_Value:{
    alignItems:'center',
    justifyContent:'center',

  },
  Stock_Value_number:{
    paddingVertical:12,
    fontSize:24,
    fontWeight:'bold',
},
  placeholderStyle: {
    fontSize: 18,
    fontWeight:'bold',
  },
  selectedTextStyle: {
    fontSize: 18,
    fontWeight:'bold'

  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    justifyContent:'center',
    alignItems:'center',
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    marginLeft:8,
    minWidth: "20%",
    textAlign: "center",
  },
  Transfer:{
      margin:20,

  },
  TransferButton:{
    backgroundColor:"#CC0000"

  },
  selected: {
    backgroundColor: "#CC0000",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "coral",
  },
  selectedLabel: {
    color: "white",
  },
  row:{
    maxWidth:10,  
    flexDirection:'row',

  },

  Transferbutton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#CC0000',
    },
    Transfertext: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    text:{
        padding:10,
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
    }

});
