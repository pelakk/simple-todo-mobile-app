import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { Task } from './Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [textInput, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  React.useEffect(() => {
    getTodosFromUserDevice();
  }, []);

  React.useEffect(() => {
    saveTodoToUserDevice(todos);
  }, [todos]);

  const getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveTodoToUserDevice = async todos => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', stringifyTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = () => {
    setTodos([
      ...todos, {id: Math.random()*1000, text: textInput}
    ])
  }

  return (
    <View style={styles.main}>
        <View style={styles.container}>

          <Text style={{fontSize: 18, marginBottom: 20}}> Simple todo list</Text>

          <View style={styles.addTaskWrapper}>
              <TextInput placeholder='Add task' value={textInput} style={styles.input} onChangeText={(text)=>setInput(text)} />
              <TouchableOpacity onPress={addTodo}>
                <View style={styles.addWrapper}>
                  <Entypo name="plus" size={22} color="black" />
                </View>
              </TouchableOpacity>
          </View>
          <ScrollView style={{maxHeight: 200}}>
            {todos.map(todo => (
              <Task setTodos={setTodos} todo={todo} todos={todos} text={todo.text} key={todo.id} style={styles.task}/>
            ))}
          </ScrollView>
          
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
    height: '100%',
    backgroundColor: 'rgba(255,186,98,1)'
  },
  container: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 8,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  addTaskWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  input: {
    padding: 8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    borderRightWidth: 0,
    height: 34,
    width: '80%'
  },
  addWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1,
    color: '#000',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 34,
    width: 34
  }
});
