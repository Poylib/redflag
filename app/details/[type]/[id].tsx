import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../../lib/supabase';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface Driver {
  id: string;
  name: string;
  team_id: string;
  country: string;
  podiums: number;
  points: number;
  grands_prix_entered: number;
  world_championships: number;
  highest_race_finish: number;
  highest_grid_position: number;
  date_of_birth: string;
  place_of_birth: string;
  team: {
    name: string;
  };
}

interface Team {
  id: string;
  full_team_name: string;
  name: string;
  base: string;
  team_chief: string;
  technical_chief: string;
  chassis: string;
  power_unit: string;
  first_team_entry: number;
  world_championships: number;
  highest_race_finish: number;
  pole_positions: number;
  fastest_laps: number;
  drivers: Driver[];
}

export default function DetailsScreen() {
  const { type, id } = useLocalSearchParams();
  const router = useRouter();
  const [details, setDetails] = useState<Driver | Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isDriver = type === 'driver';

  useEffect(() => {
    async function fetchDetails() {
      try {
        if (isDriver) {
          const { data, error } = await supabase
            .from('drivers')
            .select(`
              *,
              team:teams (
                name
              )
            `)
            .eq('id', id)
            .single();

          if (error) throw error;
          setDetails(data);
        } else {
          const { data: teamData, error: teamError } = await supabase
            .from('teams')
            .select(`
              *,
              drivers (
                id,
                name
              )
            `)
            .eq('id', id)
            .single();

          if (teamError) throw teamError;
          setDetails(teamData);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to fetch details');
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [id, isDriver]);

  if (loading) {
    return (
      <View style={styles.container}>
        <SafeAreaView edges={['top']} style={styles.safeArea}>
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.headerTitle}>Loading...</Text>
            <View style={styles.headerRight} />
          </View>
        </SafeAreaView>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading details...</Text>
        </View>
      </View>
    );
  }

  if (error || !details) {
    return (
      <View style={styles.container}>
        <SafeAreaView edges={['top']} style={styles.safeArea}>
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.headerTitle}>Error</Text>
            <View style={styles.headerRight} />
          </View>
        </SafeAreaView>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>{error || 'Details not found'}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.headerTitle}>
            {isDriver ? details.name : details.full_team_name}
          </Text>
          <View style={styles.headerRight} />
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeader}>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>
              {isDriver ? details.name : details.full_team_name}
            </Text>
            {isDriver ? (
              <Text style={styles.team}>{(details as Driver).team.name}</Text>
            ) : (
              <>
                <Text style={styles.base}>{(details as Team).base}</Text>
                <Text style={styles.teamChief}>
                  Team Principal: {(details as Team).team_chief}
                </Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            {isDriver ? (
              <>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{(details as Driver).grands_prix_entered}</Text>
                  <Text style={styles.statLabel}>Races</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{(details as Driver).podiums}</Text>
                  <Text style={styles.statLabel}>Podiums</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{(details as Driver).highest_race_finish}</Text>
                  <Text style={styles.statLabel}>Best Finish</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{(details as Driver).world_championships}</Text>
                  <Text style={styles.statLabel}>Championships</Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{(details as Team).world_championships}</Text>
                  <Text style={styles.statLabel}>Championships</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{(details as Team).pole_positions}</Text>
                  <Text style={styles.statLabel}>Pole Positions</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{(details as Team).fastest_laps}</Text>
                  <Text style={styles.statLabel}>Fastest Laps</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{(details as Team).highest_race_finish}</Text>
                  <Text style={styles.statLabel}>Best Finish</Text>
                </View>
              </>
            )}
          </View>
        </View>

        <View style={styles.infoContainer}>
          {isDriver ? (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nationality</Text>
                <Text style={styles.infoValue}>{(details as Driver).country}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Birth Date</Text>
                <Text style={styles.infoValue}>{(details as Driver).date_of_birth}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Birth Place</Text>
                <Text style={styles.infoValue}>{(details as Driver).place_of_birth}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Technical Chief</Text>
                <Text style={styles.infoValue}>{(details as Team).technical_chief}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Chassis</Text>
                <Text style={styles.infoValue}>{(details as Team).chassis}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Power Unit</Text>
                <Text style={styles.infoValue}>{(details as Team).power_unit}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>First Entry</Text>
                <Text style={styles.infoValue}>{(details as Team).first_team_entry}</Text>
              </View>
              <Text style={styles.driversTitle}>Current Drivers</Text>
              {(details as Team).drivers.map((driver) => (
                <Text key={driver.id} style={styles.driverName}>{driver.name}</Text>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  safeArea: {
    backgroundColor: '#E10600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E10600',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  headerInfo: {
    flex: 1,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});