import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const menuItems = [
  {
    title: "Race Rules",
    icon: "book",
    description: "Complete F1 racing regulations"
  },
  {
    title: "Track Guides",
    icon: "map",
    description: "Detailed circuit information"
  },
  {
    title: "Teams",
    icon: "car-sport",
    description: "F1 constructor profiles"
  },
  {
    title: "News",
    icon: "newspaper",
    description: "Latest F1 updates"
  },
  {
    title: "Settings",
    icon: "settings",
    description: "App preferences"
  }
];

export default function MoreScreen() {
  return (
    <ScrollView style={styles.container}>
      {menuItems.map((item, index) => (
        <Pressable
          key={index}
          style={styles.menuItem}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon as any} size={24} color="#E10600" />
          </View>
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemTitle}>{item.title}</Text>
            <Text style={styles.menuItemDescription}>{item.description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E1E1E',
    marginVertical: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(225, 6, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuItemDescription: {
    color: '#999999',
    fontSize: 14,
  },
});