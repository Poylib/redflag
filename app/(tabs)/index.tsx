import { ScrollView, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const nextRace = {
  name: "Australian Grand Prix",
  circuit: "Albert Park Circuit",
  date: "March 24, 2024",
  time: "05:00 GMT",
  image: "https://images.unsplash.com/photo-1647516262110-ef8a5f8af19c?auto=format&fit=crop&q=80&w=1200"
};

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.nextRaceCard}>
        <Image source={{ uri: nextRace.image }} style={styles.raceImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <View style={styles.raceInfo}>
          <Text style={styles.nextRaceLabel}>NEXT RACE</Text>
          <Text style={styles.raceName}>{nextRace.name}</Text>
          <Text style={styles.raceCircuit}>{nextRace.circuit}</Text>
          <Text style={styles.raceDateTime}>{nextRace.date} - {nextRace.time}</Text>
        </View>
      </View>

      <View style={styles.rulesSection}>
        <Text style={styles.sectionTitle}>F1 Rules Guide</Text>
        
        <View style={styles.ruleCard}>
          <Text style={styles.ruleTitle}>Qualifying Format</Text>
          <Text style={styles.ruleDescription}>
            Q1: 18-minute session, all 20 cars participate. Bottom 5 eliminated.{'\n'}
            Q2: 15-minute session for remaining 15 cars. Bottom 5 eliminated.{'\n'}
            Q3: 12-minute shootout for top 10 cars to determine pole position.
          </Text>
        </View>

        <View style={styles.ruleCard}>
          <Text style={styles.ruleTitle}>Points System</Text>
          <Text style={styles.ruleDescription}>
            1st: 25 pts | 2nd: 18 pts | 3rd: 15 pts{'\n'}
            4th: 12 pts | 5th: 10 pts | 6th: 8 pts{'\n'}
            7th: 6 pts | 8th: 4 pts | 9th: 2 pts | 10th: 1 pt{'\n'}
            Fastest Lap: +1 point (if finished in top 10)
          </Text>
        </View>

        <View style={styles.ruleCard}>
          <Text style={styles.ruleTitle}>Sprint Race Format</Text>
          <Text style={styles.ruleDescription}>
            100km race on Saturday{'\n'}
            Points: 8-7-6-5-4-3-2-1 for top 8 finishers{'\n'}
            Sets grid for Sunday's main race
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  nextRaceCard: {
    height: 300,
    position: 'relative',
  },
  raceImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  raceInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  nextRaceLabel: {
    color: '#E10600',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  raceName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  raceCircuit: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 4,
  },
  raceDateTime: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  rulesSection: {
    padding: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ruleCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  ruleTitle: {
    color: '#E10600',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ruleDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
});