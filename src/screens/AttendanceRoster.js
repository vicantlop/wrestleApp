import { View, Text } from 'react-native'
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../../firebase-config';

const AttendanceRoster = () => {
    useEffect(() => {
        getUsers();
    })

    const getUsers = async () => {
        const q = query(collection(db, 'users'), orderBy('lastName'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            console.log(doc.data());
        })
    }
    return (
        <View>
            <Text>Roster</Text>
        </View>
    )
};

export default AttendanceRoster;