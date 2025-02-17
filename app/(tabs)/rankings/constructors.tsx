import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const constructors = [
  {
    position: 1,
    name: "Red Bull Racing",
    points: 87,
    color: "#0600EF"
  },
  {
    position: 2,
    name: "Ferrari",
    points: 49,
    color: "#DC0000"
  },
  {
    position: 3,
    name: "McLaren",
    points: 28,
    color: "#FF8700"
  }
];

export default function ConstructorsScreen() {
  return (
    <ScrollView style={styles.container}>
      {constructors.map((constructor) => (
        <View key={constructor.position} style={styles.constructorCard}>
          <View style={styles.positionContainer}>
            <Text style={styles.position}>{constructor.position}</Text>
          </View>
          <View 
            style={[
              styles.colorBar,
              { backgroundColor: constructor.color }
            ]} 
          />
          <View style={styles.constructorInfo}>
            <Text style={styles.constructorName}>{constructor.name}</Text>
          </View>
          <View style={styles.pointsContainer}>
            <Text style={styles.points}>{constructor.points}</Text>
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
  constructorCard: {
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
  colorBar: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 16,
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