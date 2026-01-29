import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useStoryStore } from '../store/storyStore';
import { colors, spacing, borderRadius, fontSize } from '../constants/theme';
import { RootStackParamList } from '../types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { stories, setCurrentStory } = useStoryStore();

  const handleStorySelect = (story: any) => {
    setCurrentStory(story);
    navigation.navigate('Story', { storyId: story.id });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Ionicons name="book" size={40} color="white" />
          <Text style={styles.headerTitle}>Волшебные Сказки</Text>
          <Text style={styles.headerSubtitle}>Выбери сказку для чтения</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.storiesGrid}>
          {stories.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={styles.storyCard}
              onPress={() => handleStorySelect(story)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[story.color, `${story.color}88`]}
                style={styles.storyCardGradient}
              >
                <View style={styles.storyCardContent}>
                  <View style={styles.storyIcon}>
                    <Ionicons 
                      name={story.icon as any} 
                      size={32} 
                      color="white" 
                    />
                  </View>
                  <Text style={styles.storyTitle}>{story.title}</Text>
                  <Text style={styles.storyDescription}>{story.description}</Text>
                  <View style={styles.readButton}>
                    <Ionicons name="play" size={16} color="white" />
                    <Text style={styles.readButtonText}>Читать</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    alignItems: 'center' as const,
  },
  headerTitle: {
    fontSize: fontSize.xxlarge,
    fontWeight: 'bold' as const,
    color: 'white',
    marginTop: spacing.sm,
    textAlign: 'center' as const,
  },
  headerSubtitle: {
    fontSize: fontSize.medium,
    color: 'white',
    opacity: 0.9,
    marginTop: spacing.xs,
    textAlign: 'center' as const,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  storiesGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
  },
  storyCard: {
    width: (width - spacing.lg * 3) / 2,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.large,
    overflow: 'hidden' as const,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  storyCardGradient: {
    padding: spacing.lg,
    minHeight: 180,
  },
  storyCardContent: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  storyIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: spacing.sm,
  },
  storyTitle: {
    fontSize: fontSize.large,
    fontWeight: 'bold' as const,
    color: 'white',
    textAlign: 'center' as const,
    marginBottom: spacing.xs,
  },
  storyDescription: {
    fontSize: fontSize.small,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center' as const,
    marginBottom: spacing.md,
    lineHeight: 18,
  },
  readButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
  },
  readButtonText: {
    color: 'white',
    fontSize: fontSize.small,
    fontWeight: '600' as const,
    marginLeft: spacing.xs,
  },
};