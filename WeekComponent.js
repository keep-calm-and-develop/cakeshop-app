import { addDays, format, getDay, nextSaturday, previousSunday } from "date-fns";
import { useCallback, useMemo } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";


export const WeekComponent = ({ onChange, currentDay }) => {
    const today = useMemo(() => new Date(), []);
    
    const daysArr = useMemo(() => {
        const arr = [];
        const sunday = previousSunday(today);
        arr.push(sunday);
        for (let i = 1; i <= 5; i += 1) {
            const nextDay = addDays(sunday, i);
            arr.push(nextDay);
        }
        const saturday = nextSaturday(today);
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
                            <View style={[styles.day, selected ? styles.selectedDay : {}]}>
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
        gap: 5,
    },
    day: {
        borderRadius: 50,
        width: 65,
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDay: {
        backgroundColor: 'sienna'
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