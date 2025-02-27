import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

// 현재 시간 기준으로 테스트 데이터 생성
const now = new Date();
const createTestSchedule = () => {
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // 현재 시간 기준으로 세션 시간 설정
  const startTime = new Date(now);
  startTime.setMinutes(currentMinute - 15); // 15분 전에 시작

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', { 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
  };

  return {
    practice1: {
      day: formatDate(startTime),
      time: formatTime(startTime),
      duration: 60
    },
    practice2: {
      day: formatDate(now),
      time: formatTime(now),
      duration: 60
    },
    practice3: {
      day: formatDate(now),
      time: formatTime(new Date(now.getTime() + 60 * 60 * 1000)),
      duration: 60
    },
    qualifying: {
      day: formatDate(new Date(now.getTime() + 24 * 60 * 60 * 1000)),
      time: "15:00",
      duration: 60
    },
    race: {
      day: formatDate(new Date(now.getTime() + 48 * 60 * 60 * 1000)),
      time: "15:00",
      duration: 120
    }
  };
};

const nextRace = {
  name: "Japanese Grand Prix",
  circuit: "Suzuka Circuit",
  date: now.toLocaleDateString('ko-KR', { 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  }),
  time: "15:00",
  image: "https://images.unsplash.com/photo-1647516262110-ef8a5f8af19c?auto=format&fit=crop&q=80&w=1200",
  schedule: createTestSchedule(),
  trackInfo: {
    length: "5.807 km",
    turns: 18,
    lapRecord: "1:30.983 (Lewis Hamilton, 2019)",
    drsZones: 2,
    topSpeed: "330 km/h",
    characteristics: [
      "Technical first sector with 'S' curves",
      "High-speed flowing sections",
      "Challenging 130R corner",
      "Unique figure-8 layout"
    ]
  }
};

interface SessionItemProps {
  session: {
    name: string;
    day: string;
    time: string;
  };
  isActive: boolean;
  isRace?: boolean;
}

const AnimatedSessionItem: React.FC<SessionItemProps> = ({ session, isActive, isRace }) => {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isActive) {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.6, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        true
      );

      scale.value = withRepeat(
        withSequence(
          withTiming(1.02, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        true
      );
    } else {
      opacity.value = 1;
      scale.value = 1;
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[
      styles.scheduleItem,
      isActive && styles.activeSession,
      isRace && styles.raceSession,
      isRace && isActive && styles.activeRaceSession,
      animatedStyle
    ]}>
      <View style={styles.sessionInfo}>
        <View style={styles.sessionNameContainer}>
          <Text style={[
            styles.sessionName,
            isActive && styles.activeSessionText,
            isRace && styles.raceSessionText,
          ]}>{session.name}</Text>
          {isRace && (
            <View style={styles.raceIndicator}>
              <Ionicons name="flag" size={16} color="#FFD700" />
            </View>
          )}
        </View>
        <Text style={styles.sessionDay}>{session.day}</Text>
      </View>
      <View style={styles.sessionTimeContainer}>
        <Text style={[
          styles.sessionTime,
          isActive && styles.activeSessionText,
          isRace && styles.raceSessionText,
        ]}>{session.time}</Text>
      </View>
    </Animated.View>
  );
};

const isSessionActive = (session: { day: string; time: string; duration: number }) => {
  const now = new Date();
  const [hours, minutes] = session.time.split(':').map(Number);
  
  const sessionStart = new Date(now);
  sessionStart.setHours(hours, minutes, 0);
  
  if (session.day !== now.toLocaleDateString('ko-KR', { 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  })) {
    return false;
  }
  
  const sessionEnd = new Date(sessionStart.getTime() + session.duration * 60000);
  return now >= sessionStart && now <= sessionEnd;
};

export default function HomeScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const sessions = [
    { name: 'Practice 1', ...nextRace.schedule.practice1 },
    { name: 'Practice 2', ...nextRace.schedule.practice2 },
    { name: 'Practice 3', ...nextRace.schedule.practice3 },
    { name: 'Qualifying', ...nextRace.schedule.qualifying },
    { name: 'Race', ...nextRace.schedule.race }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.nextRaceCard}>
        <Image source={{ uri: nextRace.image }} style={styles.raceImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <View style={styles.raceInfo}>
          <Text style={styles.nextRaceLabel}>NEXT RACE</Text>
          <Text style={styles.raceName}>{nextRace.name}</Text>
          <Text style={styles.raceCircuit}>{nextRace.circuit}</Text>
          <Text style={styles.raceDateTime}>{nextRace.date} {nextRace.time}</Text>
        </View>
      </View>

      <View style={styles.scheduleSection}>
        <Text style={styles.sectionTitle}>Race Weekend Schedule</Text>
        <View style={styles.scheduleList}>
          {sessions.map((session) => (
            <AnimatedSessionItem
              key={session.name}
              session={session}
              isActive={isSessionActive(session)}
              isRace={session.name === 'Race'}
            />
          ))}
        </View>
      </View>

      <View style={styles.trackSection}>
        <Text style={styles.sectionTitle}>Track Characteristics</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{nextRace.trackInfo.length}</Text>
            <Text style={styles.statLabel}>Track Length</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{nextRace.trackInfo.turns}</Text>
            <Text style={styles.statLabel}>Corners</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{nextRace.trackInfo.drsZones}</Text>
            <Text style={styles.statLabel}>DRS Zones</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{nextRace.trackInfo.topSpeed}</Text>
            <Text style={styles.statLabel}>Top Speed</Text>
          </View>
        </View>

        <View style={styles.lapRecordCard}>
          <View style={styles.lapRecordHeader}>
            <Ionicons name="stopwatch" size={20} color="#E10600" />
            <Text style={styles.lapRecordTitle}>Lap Record</Text>
          </View>
          <Text style={styles.lapRecordValue}>{nextRace.trackInfo.lapRecord}</Text>
        </View>

        <View style={styles.characteristicsCard}>
          <Text style={styles.characteristicsTitle}>Key Features</Text>
          {nextRace.trackInfo.characteristics.map((characteristic, index) => (
            <View key={index} style={styles.characteristicItem}>
              <View style={styles.bullet} />
              <Text style={styles.characteristicText}>{characteristic}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  nextRaceCard: {
    height: 300,
    position: 'relative',
  },
  raceImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  raceInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  nextRaceLabel: {
    color: '#E10600',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  raceName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  raceCircuit: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 4,
  },
  raceDateTime: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  scheduleSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  scheduleList: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  activeSession: {
    backgroundColor: 'rgba(225, 6, 0, 0.1)',
  },
  raceSession: {
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
    borderLeftWidth: 3,
    borderLeftColor: '#FFD700',
  },
  activeRaceSession: {
    backgroundColor: 'rgba(225, 6, 0, 0.15)',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  raceIndicator: {
    marginLeft: 8,
  },
  sessionDay: {
    color: '#999999',
    fontSize: 14,
  },
  sessionTimeContainer: {
    alignItems: 'flex-end',
  },
  sessionTime: {
    color: '#E10600',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeSessionText: {
    color: '#E10600',
  },
  raceSessionText: {
    color: '#FFD700',
  },
  trackSection: {
    padding: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  statValue: {
    color: '#E10600',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  lapRecordCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  lapRecordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  lapRecordTitle: {
    color: '#E10600',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  lapRecordValue: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  characteristicsCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
  },
  characteristicsTitle: {
    color: '#E10600',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  characteristicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E10600',
    marginRight: 8,
  },
  characteristicText: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
});