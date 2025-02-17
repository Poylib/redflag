import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const races = [
  {
    round: 1,
    name: "Bahrain Grand Prix",
    date: "March 2, 2024",
    completed: true,
    winner: "Max Verstappen"
  },
  {
    round: 2,
    name: "Saudi Arabian Grand Prix",
    date: "March 9, 2024",
    completed: true,
    winner: "Max Verstappen"
  },
  {
    round: 3,
    name: "Australian Grand Prix",
    date: "March 24, 2024",
    completed: false
  },
  {
    round: 4,
    name: "Japanese Grand Prix",
    date: "April 7, 2024",
    completed: false
  },
  {
    round: 5,
    name: "Chinese Grand Prix",
    date: "April 21, 2024",
    completed: false
  }
];

export default function ScheduleScreen() {
  return (
    <ScrollView style={styles.container}>
      {races.map((race, index) => (
        <Pressable key={race.round} style={styles.raceCard}>
          <View style={styles.roundBadge}>
            <Text style={styles.roundNumber}>{race.round}</Text>
          </View>
          <View style={styles.raceInfo}>
            <Text style={styles.raceName}>{race.name}</Text>
            <Text style={styles.raceDate}>{race.date}</Text>
            {race.completed && (
              <View style={styles.winnerInfo}>
                <Ionicons name="trophy" size={16} color="#FFD700" />
                <Text style={styles.winnerText}>{race.winner}</Text>
              </View>
            )}
          </View>
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color="#666"
            style={styles.arrow}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  raceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E1E1E',
    marginVertical: 1,
  },
  roundBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E10600',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roundNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  raceInfo: {
    flex: 1,
  },
  raceName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  raceDate: {
    color: '#999999',
    fontSize: 14,
  },
  winnerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  winnerText: {
    color: '#FFD700',
    fontSize: 14,
    marginLeft: 4,
  },
  arrow: {
    marginLeft: 8,
  },
});