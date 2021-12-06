import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import {useDispatch} from 'react-redux';

import * as authAction from '../redux/actions/authAction';

const formSchema = yup.object({
  fullName: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

const RegisterScreen = (navData) => {

  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          dispatch(authAction.registerUser(values))
            .then(result => {
              if(result.success) {
                navData.navigation.navigate("Stocks");
              } else {
                Alert.alert('Registration failed. Try Again')
              }   
            })
            .catch(err => console.log(err)) 
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <View style={styles.logo}>
              <Image
                source={require("../assets/images/blood.png")}
                style={styles.image}
              />
            </View>
            <View>
                <Text style={styles.text}> Blood Inventory V2</Text>
                </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#909090"
                onChangeText={props.handleChange("fullName")}
                value={props.values.fullName}
                onBlur={props.handleBlur("fullName")}
              />
              <Text style={styles.error}>
                {props.touched.fullName && props.errors.fullName}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#909090"
                keyboardType="email-address"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
              />
              <Text style={styles.error}>
                {props.touched.email && props.errors.email}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#909090"
                secureTextEntry={true}
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
              />
              <Text style={styles.error}>
                {props.touched.password && props.errors.password}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Have an account?</Text>
                <TouchableOpacity
                  onPress={() => navData.navigation.navigate("Login")}
                >
                  <Text style={styles.registerButton}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
  },
  text:{
    marginTop:-20,
    marginBottom:8,
    padding:10,
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    color:"#CC0000",

  },
  logo: {
    alignItems: "center",
    marginBottom: 40,
  },
  image: {
    width: 80,
    height: 100,
  },
  input: {
    width: 300,
    backgroundColor: "white",
    color:"black",
    borderRadius: 25,
    padding: 16,
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: "#CC0000",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  registerContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row",
  },
  registerText: {
    color: "#738289",
    fontSize: 16,
    
  },
  registerButton: {
    color: "#738289",
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  error: {
      color: '#CC0000',
      fontSize:10,
      padding:2,
      marginLeft:15,
      fontWeight:'bold'
  },
});

export default RegisterScreen;
