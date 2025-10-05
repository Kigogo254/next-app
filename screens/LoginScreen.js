
import {
  StyleSheet,
  Text,
  View,

} from 'react-native';

export function LoginScreen({ navigation }) {
  return (
<View style={styles.container}>
  <Text>Login</Text>
</View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#39a075ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

});
