import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TabView, SceneMap } from 'react-native-tab-view';

const UpcomingRaceDetails = () => (
  <ThemedView style={styles.sectionContainer}>
    <ThemedText type="title">Upcoming Race Details</ThemedText>
    {/* Add upcoming race details here */}
  </ThemedView>
);

const DriverStandings = () => (
  <ThemedView style={styles.sectionContainer}>
    <ThemedText type="title">Driver Standings</ThemedText>
    {/* Add driver standings here */}
  </ThemedView>
);

const TeamStandings = () => (
  <ThemedView style={styles.sectionContainer}>
    <ThemedText type="title">Team Standings</ThemedText>
    {/* Add team standings here */}
  </ThemedView>
);

const TeamsAndDriversList = () => (
  <ThemedView style={styles.sectionContainer}>
    <ThemedText type="title">F1 Teams and Drivers</ThemedText>
    {/* Add F1 teams and drivers list here */}
  </ThemedView>
);

const F1GuideAndRules = () => (
  <ThemedView style={styles.sectionContainer}>
    <ThemedText type="title">F1 Guide & Rules</ThemedText>
    {/* Add F1 guide and rules here */}
  </ThemedView>
);

const renderScene = SceneMap({
  drivers: DriverStandings,
  teams: TeamStandings,
});

export default function RankingScreen() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'drivers', title: 'Drivers' },
    { key: 'teams', title: 'Teams' },
  ]);

  return (
    <ScrollView style={styles.container}>
      <UpcomingRaceDetails />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 300 }}
      />
      <TeamsAndDriversList />
      <F1GuideAndRules />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    padding: 16,
  },
});
