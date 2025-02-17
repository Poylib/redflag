import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const drivers = [
  {
    position: 1,
    name: "Max Verstappen",
    team: "Red Bull Racing",
    points: 51,
    avatar: "https://images.unsplash.com/photo-1646220983576-6b0be3c8dce3?auto=format&fit=crop&q=80&w=100"
  },
  {
    position: 2,
    name: "Sergio Perez",
    team: "Red Bull Racing",
    points: 36,
    avatar: "https://images.unsplash.com/photo-1646220983576-6b0be3c8dce3?auto=format&fit=crop&q=80&w=100"
  },
  {
    position: 3,
    name: "Charles Leclerc",
    team: "Ferrari",
    points: 28,
    avatar: "https://images.unsplash.com/photo-1646220983576-6b0be3c8dce3?auto=format&fit=crop&q=80&w=100"
  }
];

export default function DriversScreen() {
  return (
    <ScrollView style={styles.container}>
      {drivers.map((driver) => (
        <View key={driver.position} style={styles.driverCard}>
          <View style={styles.positionContainer}>
            <Text style={styles.position}>{driver.position}</Text>
          </View>
          <Image source={{ uri: driver.avatar }} style={styles.avatar} />
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <Text style={styles.teamName}>{driver.team}</Text>
          </View>
          <View style={styles.pointsContainer}>
            <Text style={styles.points}>{driver.points}</Text>
            <Text style={styles.pointsLabel}>PTS</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E1E1E',
    marginVertical: 1,
  },
  positionContainer: {
    width: 30,
    marginRight: 16,
  },
  position: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  teamName: {
    color: '#999999',
    fontSize: 14,
  },
  pointsContainer: {
    alignItems: 'center',
  },
  points: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pointsLabel: {
    color: '#999999',
    fontSize: 12,
  },
});