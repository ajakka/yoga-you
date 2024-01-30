import { NavigationContainer } from "@react-navigation/native";
import { initYogaDB } from "./src/data/database";
import { NativeStackNavigator } from "./src/navigation/NativeStack";

initYogaDB();

export default function App() {
  return (
    <NavigationContainer>
      <NativeStackNavigator />
    </NavigationContainer>
  );
}
