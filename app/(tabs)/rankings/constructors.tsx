import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { useRankings } from './_layout';

const teamColors = {
  'red-bull': ['#0600EF', '#1E1E1E'],
  'ferrari': ['#DC0000', '#1E1E1E'],
  'mercedes': ['#00D2BE', '#1E1E1E'],
  'mclaren': ['#FF8700', '#1E1E1E'],
  'aston-martin': ['#006F62', '#1E1E1E'],
  'alpine': ['#0090FF', '#1E1E1E'],
  'williams': ['#005AFF', '#1E1E1E'],
  'alpha-tauri': ['#2B4562', '#1E1E1E'],
  'alfa-romeo': ['#900000', '#1E1E1E'],
  'haas': ['#FFFFFF', '#1E1E1E'],
};

export default function ConstructorsScreen() {
  const router = useRouter();
  const {
    teamRankings,
    setTeamRankings,
    isLoading,
    setIsLoading,
    error,
    setError,
    activeTab,
  } = useRankings();

  const fetchTeamRankings = useCallback(async () => {
    if (teamRankings.length === 0) {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('team_rankings')
          .select(`
            id,
            position,
            points,
            year,
            team_id,
            team:teams (
              id,
              name,
              full_team_name
            )
          `)
          .eq('year', 2024)
          .order('position');

        if (error) throw error;
        setTeamRankings(data || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to fetch team rankings');
      } finally {
        setIsLoading(false);
      }
    }
  }, [teamRankings.length, setTeamRankings, setError, setIsLoading]);

  useEffect(() => {
    if (activeTab === 'constructors') {
      fetchTeamRankings();
    }
  }, [activeTab, fetchTeamRankings]);

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
      {teamRankings.map((ranking) => (
        <Pressable 
          key={ranking.id} 
          style={styles.constructorCard}
          onPress={() => router.push(`/details/constructor/${ranking.team.id}`)}
        >
          <LinearGradient
            colors={teamColors[ranking.team.id as keyof typeof teamColors] || ['#1E1E1E', '#2A2A2A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBackground}
          />
          <View style={styles.positionContainer}>
            <Text style={styles.position}>{ranking.position}</Text>
          </View>
          <View style={styles.constructorInfo}>
            <Text style={styles.constructorName}>{ranking.team.full_team_name}</Text>
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
  constructorCard: {
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
  constructorInfo: {
    flex: 1,
  },
  constructorName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pointsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 8,
    borderRadius: 8,
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