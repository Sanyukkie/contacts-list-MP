import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';


export default function App() {

  const [contact, setContact] = useState({});
  
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(      
        { fields: [Contacts.Fields.PhoneNumbers] }    
        );
        if (data.length > 0) {
            setContact(data);    
        }  
      }
    }
  
  return (
    <View style={styles.container}>

      <FlatList style={styles.list}
        data={contact}
        renderItem={({ item }) =>
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.phoneNumbers[0].number}</Text>
          </View>
        }
      />

      <Button title="Get Contact"onPress={getContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:100
  },
  item: {
    alignItems: 'center',
  },
});
