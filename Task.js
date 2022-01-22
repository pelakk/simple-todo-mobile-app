import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

export function Task({ text, setTodos, todos, todo }) {

  const deleteHandler = () => {
    setTodos(todos.filter(el => el.id !== todo.id))
  }

  return (
    <View style={styles.container}>
        <Text numberOfLines={1} style={styles.text}> {text} </Text>
        <TouchableOpacity onPress={deleteHandler}>
          <View style={styles.deleteWrapper}>
            <Entypo name="plus" size={22} color="black" style={{transform: [{ rotate: "45deg" }]}}/>
          </View>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10
  },
  text: {
    width: '84%',
    paddingHorizontal: 4
  },
  deleteWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 34,
    width: 34,
    borderLeftColor: '#c0c0c0',
    borderLeftWidth: 1
  }
});
