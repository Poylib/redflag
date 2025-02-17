import { withLayoutContext } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

function ChampionshipRulesModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Championship Rules</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
          <ScrollView style={styles.modalBody}>
            <Text style={styles.sectionTitle}>Drivers' Championship</Text>
            <Text style={styles.ruleText}>
              • Points are awarded to drivers who finish in the top 10 positions
              in each race{'\n'}• Points system: 25-18-15-12-10-8-6-4-2-1{'\n'}•
              Additional point for fastest lap (if finished in top 10){'\n'}•
              Driver with the most points at the end of the season wins{'\n'}•
              In case of a tie, the number of wins is compared, then second
              places, etc.
            </Text>

            <Text style={styles.sectionTitle}>Constructors' Championship</Text>
            <Text style={styles.ruleText}>
              • Both team cars can score points in each race{'\n'}• Points from
              both drivers are combined{'\n'}• Same points system as Drivers'
              Championship{'\n'}• Team with the most points at the end of the
              season wins{'\n'}• Financial rewards are based on Constructors'
              Championship position
            </Text>

            <Text style={styles.sectionTitle}>Sprint Race Points</Text>
            <Text style={styles.ruleText}>
              • Top 8 finishers score points: 8-7-6-5-4-3-2-1{'\n'}• Points
              count towards both championships{'\n'}• No additional point for
              fastest lap in sprint races
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export default function RankingsLayout() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Championship</Text>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.helpButton}
          >
            <Ionicons name="help-circle-outline" size={24} color="#FFFFFF" />
          </Pressable>
        </View>

        <ChampionshipRulesModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E10600',
  },
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E10600',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  helpButton: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    width: '100%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 16,
  },
  sectionTitle: {
    color: '#E10600',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  ruleText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
});
