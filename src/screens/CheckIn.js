import { useMemo, useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Dimensions, TouchableOpacity } from "react-native";
import moment from "moment";
import Swiper from 'react-native-swiper'
import { auth, db } from "../../firebase-config";
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { useSelector } from "react-redux";
import Loading from "./Loading";

const { width, height } = Dimensions.get('screen')

export default function CheckIn() {
    const swiper = useRef();
    const [value, setValue] = useState(new Date())
    const [week, setWeek] = useState(0)
    const user = useSelector((state) => state.user)
    const [attendance, setAttendance] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAttendance()
    }, [])

    const getAttendance = async () => {
        try {
            const docSnap = await getDoc(doc(db, 'attendance', user.uid))
            setAttendance(docSnap.data())
            setLoading(false)
        } catch (error) {
            console.log(error)
        }   
    }

    const weeks = useMemo(() => {
        const start = moment(start).add(week, 'weeks').startOf('week');


        return [-1, 0, 1].map(adj => {
            return Array.from({ length: 7 }).map((_, index) => {
                const date = moment(start).add(adj, 'week').add(index, 'day');

                return {
                    weekday: date.format('ddd'),
                    date: date.toDate(),
                }
            })
        })
    }, [week])


    const { container, header, title, picker, itemRow, itemWeekday, itemDate, contentText, placeholder, placeholderContent, footer, btn, btnText } = styles

    const markPresent = async () => {
        const day = moment(value).startOf('day').toDate();
        const date = day.toDateString();

        try {
            const docRef = doc(db, 'attendance', user.uid)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()) {
                await updateDoc(docRef, {
                    ...docSnap.data(), [date]: 'present'
                })
            } else {
                await setDoc(doc(db, 'attendance', user.uid), {
                    [date]: 'present'
                })
            }
        } catch (e) {
            console.log(e)
        }

        getAttendance()
    }

    return (
        loading ? 
        (
            <Loading></Loading>
        ) :
        <SafeAreaView style={{ flex: 1 }}>
            <View style={container}>
                <View style={header}>
                    <Text style={title}>Check Ins</Text>
                </View>
                <View style={picker}>
                    <Swiper
                        index={1} ref={swiper} showsPagination={false} loop={false} onIndexChanged={ind => {
                            if (ind === 1) {
                                return
                            }

                            setTimeout(() => {
                                const newIndex = ind - 1
                                const newWeek = week + newIndex
                                setWeek(newWeek)
                                setValue(moment(value).add(newIndex, 'week').toDate());
                                swiper.current.scrollTo(1, false)
                            }, 100)
                        }}
                    >
                        {weeks.map((dates, index) => (
                            <View key={index} style={itemRow}>
                                {dates.map((item, dateIndex) => {
                                    const isActive = value.toDateString() === item.date.toDateString()
                                    const isPresent = attendance[item.date.toDateString()]

                                    return (
                                        <TouchableWithoutFeedback key={dateIndex} onPress={() => setValue(item.date)}>
                                            <View style={[styles.item, isActive && {
                                                backgroundColor: '#111',
                                                borderColor: '#111',
                                            }, isPresent && {
                                                backgroundColor: 'green',
                                                borderColor: 'green'
                                            }]}>
                                                <Text style={[itemWeekday, isActive && { color: '#fff' }]}>{item.weekday}</Text>
                                                <Text style={[itemDate, isActive && { color: '#fff' }]}>{item.date.getDate()}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })}
                            </View>
                        ))}
                    </Swiper>
                </View>

                <View style={{ flex: 1, paddingVertical: 24, paddingHorizontal: 16 }}>
                    <Text style={contentText}>
                        {value.toDateString()}
                    </Text>

                    <View style={placeholder}>
                        <View style={placeholderContent}>

                        </View>
                    </View>

                    <View style={footer}>
                        <TouchableOpacity style={btn} onPress={markPresent}>
                            <Text style={btnText}>Check In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10
    },
    picker: {
        flex: 1,
        maxHeight: 74,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',

    },
    header: {
        paddingHorizontal: 16,
    },
    contentText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#999',
        marginBottom: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 12,
    },
    itemRow: {
        width: width,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
    },
    item: {
        flex: 1,
        height: 50,
        marginHorizontal: 2,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'column',
    },
    itemWeekday: {
        fontSize: 13,
        fontWeight: '500',
        color: '#111',
        marginBottom: 4,
    },
    itemDate: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111'
    },
    placeholder: {
        flex: 1,
        height: 400,
    },
    placeholderContent: {
        borderWidth: 4,
        borderColor: '#e5e7eb',
        borderStyle: 'dashed',
        borderRadius: 9,
        flex: 1
    },
    footer: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    btn: {
        flexDirection: 'row',
        backgroundColor: '#007aff',
        borderWidth: 1,
        borderColor: '#007aff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff'
    }
});