import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const nextRace = {
  name: 'Australian Grand Prix',
  circuit: 'Albert Park Circuit',
  date: 'March 24, 2024',
  time: '05:00 GMT',
  image:
    'https://images.unsplash.com/photo-1647516262110-ef8a5f8af19c?auto=format&fit=crop&q=80&w=1200',
  trackInfo: {
    length: '5.278 km',
    turns: 14,
    lapRecord: '1:20.260 (Charles Leclerc, 2022)',
    drsZones: 4,
    topSpeed: '322 km/h',
    characteristics: [
      'High-speed sections with flowing corners',
      'Technical middle sector',
      'Multiple overtaking opportunities',
      'Smooth track surface',
    ],
  },
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
          <Text style={styles.raceDateTime}>
            {nextRace.date} - {nextRace.time}
          </Text>
        </View>
      </View>

      <View style={styles.trackSection}>
        <Text style={styles.sectionTitle}>Track Characteristics</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{nextRace.trackInfo.length}</Text>
            <Text style={styles.statLabel}>Track Length</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{nextRace.trackInfo.turns}</Text>
            <Text style={styles.statLabel}>Corners</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{nextRace.trackInfo.drsZones}</Text>
            <Text style={styles.statLabel}>DRS Zones</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{nextRace.trackInfo.topSpeed}</Text>
            <Text style={styles.statLabel}>Top Speed</Text>
          </View>
        </View>

        <View style={styles.lapRecordCard}>
          <View style={styles.lapRecordHeader}>
            <Ionicons name="stopwatch" size={20} color="#E10600" />
            <Text style={styles.lapRecordTitle}>Lap Record</Text>
          </View>
          <Text style={styles.lapRecordValue}>
            {nextRace.trackInfo.lapRecord}
          </Text>
        </View>

        <View style={styles.characteristicsCard}>
          <Text style={styles.characteristicsTitle}>Key Features</Text>
          {nextRace.trackInfo.characteristics.map((characteristic, index) => (
            <View key={index} style={styles.characteristicItem}>
              <View style={styles.bullet} />
              <Text style={styles.characteristicText}>{characteristic}</Text>
            </View>
          ))}
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
  trackSection: {
    padding: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  statValue: {
    color: '#E10600',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  lapRecordCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  lapRecordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  lapRecordTitle: {
    color: '#E10600',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  lapRecordValue: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  characteristicsCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
  },
  characteristicsTitle: {
    color: '#E10600',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  characteristicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E10600',
    marginRight: 8,
  },
  characteristicText: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
});
