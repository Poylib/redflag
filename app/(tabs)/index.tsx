import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  heroContainer: {
    height: 400,
    width: '100%',
  },
  heroContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
  nextRaceLabel: {
    color: '#ff1616',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  circuitName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  countryText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  racesScroll: {
    marginLeft: -20,
  },
  raceCard: {
    width: 200,
    height: 280,
    marginLeft: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  raceCardImage: {
    width: '100%',
    height: 160,
  },
  raceCardContent: {
    padding: 12,
  },
  raceCardCircuit: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  raceCardCountry: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },
  raceCardDate: {
    color: '#ff1616',
    fontSize: 14,
    fontWeight: 'bold',
  },
  newsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  newsCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  newsImage: {
    width: '100%',
    height: 120,
  },
  newsContent: {
    padding: 12,
  },
  newsTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  newsTime: {
    color: '#888',
    fontSize: 12,
  },
});
