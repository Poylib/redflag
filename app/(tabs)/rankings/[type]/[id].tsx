import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const driverDetails = {
  "verstappen": {
    name: "Max Verstappen",
    number: "1",
    team: "Red Bull Racing",
    nationality: "Netherlands",
    birthDate: "30 September 1997",
    championships: 3,
    avatar: "https://images.unsplash.com/photo-1646220983576-6b0be3c8dce3?auto=format&fit=crop&q=80&w=300",
    stats: {
      wins: 54,
      podiums: 98,
      polePositions: 32,
      fastestLaps: 27,
      points: 2586.5
    }
  },
  "perez": {
    name: "Sergio Perez",
    number: "11",
    team: "Red Bull Racing",
    nationality: "Mexico",
    birthDate: "26 January 1990",
    championships: 0,
    avatar: "https://images.unsplash.com/photo-1646220983576-6b0be3c8dce3?auto=format&fit=crop&q=80&w=300",
    stats: {
      wins: 6,
      podiums: 35,
      polePositions: 3,
      fastestLaps: 10,
      points: 1356
    }
  }
};

const constructorDetails = {
  "red-bull": {
    name: "Red Bull Racing",
    base: "Milton Keynes, United Kingdom",
    teamChief: "Christian Horner",
    championships: 6,
    logo: "https://images.unsplash.com/photo-1541743408289-1b5cacb5c6a1?auto=format&fit=crop&q=80&w=300",
    stats: {
      wins: 113,
      podiums: 264,
      polePositions: 94,
      fastestLaps: 95,
      points: 6821.5
    },
    drivers: ["Max Verstappen", "Sergio Perez"]
  },
  "ferrari": {
    name: "Ferrari",
    base: "Maranello, Italy",
    teamChief: "Frédéric Vasseur",
    championships: 16,
    logo: "https://images.unsplash.com/photo-1541743408289-1b5cacb5c6a1?auto=format&fit=crop&q=80&w=300",
    stats: {
      wins: 243,
      podiums: 798,
      polePositions: 244,
      fastestLaps: 259,
      points: 9269
    },
    drivers: ["Charles Leclerc", "Carlos Sainz"]
  }
};

export default function DetailsScreen() {
  const { type, id } = useLocalSearchParams();
  const router = useRouter();

  const isDriver = type === 'driver';
  const details = isDriver ? driverDetails[id as keyof typeof driverDetails] : constructorDetails[id as keyof typeof constructorDetails];

  if (!details) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Details not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{
          headerStyle: {
            backgroundColor: '#E10600',
          },
          headerTintColor: '#fff',
          headerTitle: details.name,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>
          ),
        }} 
      />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image 
            source={{ uri: isDriver ? details.avatar : details.logo }} 
            style={styles.image} 
          />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{details.name}</Text>
            {isDriver ? (
              <>
                <Text style={styles.team}>{details.team}</Text>
                <View style={styles.numberContainer}>
                  <Text style={styles.number}>#{details.number}</Text>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.base}>{details.base}</Text>
                <Text style={styles.teamChief}>Team Principal: {details.teamChief}</Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Career Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{details.stats.wins}</Text>
              <Text style={styles.statLabel}>Wins</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{details.stats.podiums}</Text>
              <Text style={styles.statLabel}>Podiums</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{details.stats.polePositions}</Text>
              <Text style={styles.statLabel}>Poles</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{details.championships}</Text>
              <Text style={styles.statLabel}>Championships</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoContainer}>
          {isDriver ? (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nationality</Text>
                <Text style={styles.infoValue}>{details.nationality}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Birth Date</Text>
                <Text style={styles.infoValue}>{details.birthDate}</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.driversTitle}>Current Drivers</Text>
              {details.drivers.map((driver, index) => (
                <Text key={index} style={styles.driverName}>{driver}</Text>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  backButton: {
    marginLeft: 8,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  team: {
    color: '#999999',
    fontSize: 16,
    marginBottom: 8,
  },
  base: {
    color: '#999999',
    fontSize: 16,
    marginBottom: 4,
  },
  teamChief: {
    color: '#999999',
    fontSize: 16,
  },
  numberContainer: {
    backgroundColor: '#E10600',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  number: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    padding: 20,
    backgroundColor: '#1E1E1E',
    marginTop: 1,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#2A2A2A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  statValue: {
    color: '#E10600',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#1E1E1E',
    marginTop: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    color: '#999999',
    fontSize: 16,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  driversTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  driverName: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    color: '#E10600',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});