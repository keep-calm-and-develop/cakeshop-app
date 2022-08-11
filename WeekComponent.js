import { addDays, format, isTuesday, isWednesday, nextTuesday, previousWednesday } from "date-fns";
import { useCallback, useMemo } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";


export const WeekComponent = ({ onChange, currentDay }) => {
    const today = useMemo(() => {
        return new Date();
    }, []);
    
    const daysArr = useMemo(() => {
        const arr = [];
        const sunday = isWednesday(today) ? today : previousWednesday(today);
        arr.push(sunday);
        for (let i = 1; i <= 5; i += 1) {
            const nextDay = addDays(sunday, i);
            arr.push(nextDay);
        }
        const saturday = isTuesday(today) ? today : nextTuesday(today);
        arr.push(saturday);
        return arr;
    }, [currentDay, today]);

    const current = format(currentDay, 'd');

    return (
        <View style={styles.container}>
            {
                daysArr.map((date) => {
                    const day = format(date, 'd');
                    const selected = current === day;
                    return (
                        <Pressable key={day} onPress={() => onChange(date)} style={styles.dayButton}>
                            <View style={[styles.day, { margin: 5 }, selected ? styles.selectedDay : {}]}>
                                <Text style={[styles.dayText, selected ? styles.selectedDayText : {}]}>
                                    {day}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.dayNameText}>{format(date, 'EEE')}</Text>
                            </View>
                        </Pressable>
                    )
                })
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    dayButton: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    day: {
        width: 65,
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDay: {
        borderRadius: 50,
        backgroundColor: 'sienna',
    },
    dayText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'sienna'
    },
    selectedDayText: {
        color: 'white',
    },
    dayNameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray',
    }
});