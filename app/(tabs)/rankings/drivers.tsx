import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { useRankings } from './_layout';

export default function DriversScreen() {
  const router = useRouter();
  const {
    driverRankings,
    setDriverRankings,
    isLoading,
    setIsLoading,
    error,
    setError,
    activeTab,
  } = useRankings();

  const fetchDriverRankings = useCallback(async () => {
    if (driverRankings.length === 0) {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('driver_rankings')
          .select(`
            id,
            position,
            points,
            year,
            driver_id,
            driver:drivers (
              id,
              name,
              team_id,
              team:teams (
                name
              )
            )
          `)
          .eq('year', 2024)
          .order('position');

        if (error) throw error;
        setDriverRankings(data || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to fetch driver rankings');
      } finally {
        setIsLoading(false);
      }
    }
  }, [driverRankings.length, setDriverRankings, setError, setIsLoading]);

  useEffect(() => {
    if (activeTab === 'drivers') {
      fetchDriverRankings();
    }
  }, [activeTab, fetchDriverRankings]);

  const formatDriverName = (name: string) => name.replace(/-/g, ' ');

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading rankings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {driverRankings.map((ranking) => (
        <Pressable 
          key={ranking.id} 
          style={styles.driverCard}
          onPress={() => router.push(`/details/driver/${ranking.driver.id}`)}
        >
          <LinearGradient
            colors={['#1E1E1E', '#2A2A2A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBackground}
          />
          <View style={styles.positionContainer}>
            <Text style={styles.position}>{ranking.position}</Text>
          </View>
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{formatDriverName(ranking.driver.name)}</Text>
            <Text style={styles.teamName}>{ranking.driver.team.name}</Text>
          </View>
          <View style={styles.pointsContainer}>
            <Text style={styles.points}>{ranking.points}</Text>
            <Text style={styles.pointsLabel}>PTS</Text>
          </View>
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
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  positionContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#E10600',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  position: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
    backgroundColor: 'rgba(225, 6, 0, 0.1)',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  points: {
    color: '#E10600',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pointsLabel: {
    color: '#999999',
    fontSize: 12,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#E10600',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});