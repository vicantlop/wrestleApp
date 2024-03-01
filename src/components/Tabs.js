import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CheckIn from '../screens/CheckIn'
import AttendanceRoster from '../screens/AttendanceRoster'


const Tab = createBottomTabNavigator()

export default function Tabs() {
    return (
        <Tab.Navigator
            screenOption={{
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
                tabBarStyle: {
                    backgroundColor: 'lightblue',
                },
                headerStyle: {
                    backgroundColor: 'lightblue',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 25,
                    color: 'tomato',
                }
            }}
        >
            <Tab.Screen name="Check In" component={CheckIn} />
            <Tab.Screen name="Attendance" component={AttendanceRoster} />
        </Tab.Navigator>
    )
}