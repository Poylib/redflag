import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Slot } from 'expo-router';

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
            <Text style={styles.sectionTitle}>드라이버 챔피언십</Text>
            <Text style={styles.ruleText}>
              • 각 레이스에서 상위 10위에 드는 드라이버에게 포인트가 부여됩니다
              {'\n'}• 포인트 시스템: 25-18-15-12-10-8-6-4-2-1{'\n'}• 상위 10위에
              들 경우 가장 빠른 랩에 추가 포인트{'\n'}• 시즌 종료 시 가장 많은
              포인트를 가진 드라이버가 우승{'\n'}• 동점일 경우, 우승 횟수, 그
              다음으로 2위 횟수 등을 비교합니다.
            </Text>

            <Text style={styles.sectionTitle}>컨스트럭터 챔피언십</Text>
            <Text style={styles.ruleText}>
              • 팀의 두 차량 모두 각 레이스에서 포인트를 획득할 수 있습니다
              {'\n'}• 두 드라이버의 포인트가 합산됩니다{'\n'}• 드라이버
              챔피언십과 동일한 포인트 시스템{'\n'}• 시즌 종료 시 가장 많은
              포인트를 가진 팀이 우승{'\n'}• 재정적 보상은 컨스트럭터 챔피언십
              순위에 기반합니다.
            </Text>

            <Text style={styles.sectionTitle}>스프린트 레이스 포인트</Text>
            <Text style={styles.ruleText}>
              • 상위 8위 피니셔가 포인트를 획득: 8-7-6-5-4-3-2-1{'\n'}• 포인트는
              두 챔피언십에 모두 반영됩니다{'\n'}• 스프린트 레이스에서는 가장
              빠른 랩에 추가 포인트가 없습니다.
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export default function RankingsLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('drivers');
  const slideAnim = useState(new Animated.Value(0))[0];
  const router = useRouter();
  const { width } = useWindowDimensions();
  const tabWidth = width / 2; // Since we have 2 tabs

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    router.push(`/rankings/${tab}`);
    Animated.spring(slideAnim, {
      toValue: tab === 'drivers' ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

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

        <View style={styles.tabBar}>
          <Pressable
            style={[styles.tab, activeTab === 'drivers' && styles.activeTab]}
            onPress={() => handleTabPress('drivers')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'drivers' && styles.activeTabText,
              ]}
            >
              Drivers
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tab,
              activeTab === 'constructors' && styles.activeTab,
            ]}
            onPress={() => handleTabPress('constructors')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'constructors' && styles.activeTabText,
              ]}
            >
              Constructors
            </Text>
          </Pressable>
          <Animated.View
            style={[
              styles.indicator,
              {
                width: tabWidth,
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, tabWidth],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>

        <View style={styles.content}>
          <Slot />
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#141414',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    position: 'relative',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    color: '#999999',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    backgroundColor: '#E10600',
  },
  content: {
    flex: 1,
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
