import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useStoryStore } from '../store/storyStore';
import { colors, spacing, borderRadius, fontSize } from '../constants/theme';
import { RootStackParamList } from '../types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Congratulations'>;
type CongratulationsRouteProp = RouteProp<RootStackParamList, 'Congratulations'>;

const { width } = Dimensions.get('window');

export default function CongratulationsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CongratulationsRouteProp>();
  const { resetCurrentStory } = useStoryStore();

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const starAnimations = useRef([...Array(6)].map(() => new Animated.Value(0))).current;
  const sparkleRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Main celebration animation
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }),
      Animated.stagger(100, 
        starAnimations.map(anim => 
          Animated.spring(anim, {
            toValue: 1,
            useNativeDriver: false,
          })
        )
      )
    ]).start();

    // Continuous sparkle rotation
    Animated.loop(
      Animated.timing(sparkleRotation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const handleGoHome = () => {
    resetCurrentStory();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const sparkleRotationInterpolation = sparkleRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={[colors.purple, colors.pink, colors.secondary]}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Animated stars background */}
        {starAnimations.map((anim, index) => (
          <Animated.View
            key={index}
            style={[
              styles.backgroundStar,
              {
                opacity: anim,
                transform: [{ scale: anim }],
                top: `${20 + (index * 12)}%`,
                left: `${10 + (index % 3) * 30}%`,
              }
            ]}
          >
            <Ionicons 
              name="star" 
              size={20 + (index % 3) * 8} 
              color="rgba(255, 255, 255, 0.3)" 
            />
          </Animated.View>
        ))}

        <Animated.View 
          style={[
            styles.celebrationContainer,
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          {/* Rotating sparkles */}
          <Animated.View 
            style={[
              styles.sparkleContainer,
              { transform: [{ rotate: sparkleRotationInterpolation }] }
            ]}
          >
            <Ionicons name="sparkles" size={40} color={colors.secondary} />
          </Animated.View>

          {/* Main trophy icon */}
          <View style={styles.trophyContainer}>
            <Ionicons name="trophy" size={80} color={colors.secondary} />
          </View>

          {/* Congratulations text */}
          <View style={styles.textContainer}>
            <Text style={styles.congratsTitle}>Поздравляем!</Text>
            <Text style={styles.congratsMessage}>
              Ты прочитал сказку
            </Text>
            <Text style={styles.storyTitle}>"{route.params.storyTitle}"</Text>
            <Text style={styles.encouragement}>
              Ты большой молодец! 🌟
            </Text>
          </View>

          {/* Decorative elements */}
          <View style={styles.decorativeRow}>
            <Ionicons name="heart" size={24} color={colors.accent} />
            <Ionicons name="star" size={28} color={colors.secondary} />
            <Ionicons name="happy" size={24} color={colors.orange} />
          </View>
        </Animated.View>

        {/* Action buttons */}
        <View style={styles.buttonContainer}>
          <View style={{ borderRadius: borderRadius.large, overflow: 'hidden' }}>
            <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
              <LinearGradient
                colors={[colors.success, '#66BB6A']}
                style={styles.homeButtonGradient}
              >
                <Ionicons name="home" size={24} color="white" />
                <Text style={styles.homeButtonText}>На главную</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom decorative elements */}
        <View style={styles.bottomDecorations}>
          <Ionicons name="gift" size={32} color="rgba(255, 255, 255, 0.4)" />
          <Ionicons name="balloon" size={28} color="rgba(255, 255, 255, 0.4)" />
          <Ionicons name="flower" size={24} color="rgba(255, 255, 255, 0.4)" />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: spacing.xl,
  },
  backgroundStar: {
    position: 'absolute' as const,
  },
  celebrationContainer: {
    alignItems: 'center' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.large,
    padding: spacing.xxl,
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sparkleContainer: {
    position: 'absolute' as const,
    top: -20,
    right: -20,
  },
  trophyContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  textContainer: {
    alignItems: 'center' as const,
    marginBottom: spacing.lg,
  },
  congratsTitle: {
    fontSize: fontSize.xxlarge + 8,
    fontWeight: 'bold' as const,
    color: 'white',
    textAlign: 'center' as const,
    marginBottom: spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  congratsMessage: {
    fontSize: fontSize.large,
    color: 'white',
    textAlign: 'center' as const,
    marginBottom: spacing.sm,
    opacity: 0.9,
  },
  storyTitle: {
    fontSize: fontSize.xlarge,
    fontWeight: 'bold' as const,
    color: colors.secondary,
    textAlign: 'center' as const,
    marginBottom: spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  encouragement: {
    fontSize: fontSize.large,
    color: 'white',
    textAlign: 'center' as const,
    fontWeight: '600' as const,
  },
  decorativeRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: spacing.lg,
    marginTop: spacing.md,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center' as const,
  },
  homeButton: {
    borderRadius: borderRadius.large,
    overflow: 'hidden' as const,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  homeButtonGradient: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
    minWidth: width * 0.6,
  },
  homeButtonText: {
    color: 'white',
    fontSize: fontSize.large,
    fontWeight: 'bold' as const,
    marginLeft: spacing.md,
  },
  bottomDecorations: {
    position: 'absolute' as const,
    bottom: spacing.xl,
    flexDirection: 'row' as const,
    gap: spacing.xl,
  },
};