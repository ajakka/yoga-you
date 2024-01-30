import { NativeStackPropsOf } from "../../navigation/NativeStack";
import { TabStackNavigator } from "../../navigation/TabStack";

export const HOME_SCREEN = "HOME";

type Props = NativeStackPropsOf<"HOME">;

export default function HomeScreen(props: Props) {
  return <TabStackNavigator />;
}
