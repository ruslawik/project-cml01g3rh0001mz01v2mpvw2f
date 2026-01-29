import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useStoryStore } from '../store/storyStore';
import { colors, spacing, borderRadius, fontSize } from '../constants/theme';
import { RootStackParamList } from '../types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Story'>;
type StoryRouteProp = RouteProp<RootStackParamList, 'Story'>;

const { width, height } = Dimensions.get('window');

export default function StoryScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<StoryRouteProp>();
  const { currentStory, currentPage, setCurrentPage } = useStoryStore();

  if (!currentStory) {
    navigation.goBack();
    return null;
  }

  const totalPages = currentStory.pages.length;
  const isLastPage = currentPage === totalPages - 1;
  const currentPageData = currentStory.pages[currentPage];

  const handleNextPage = () => {
    if (isLastPage) {
      navigation.navigate('Congratulations', { storyTitle: currentStory.title });
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[currentStory.color, `${currentStory.color}88`]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={handleHome}>
            <Ionicons name="home" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.storyTitle}>{currentStory.title}</Text>
          <View style={styles.pageCounter}>
            <Text style={styles.pageCounterText}>
              {currentPage + 1}/{totalPages}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.pageCard}>
          <View style={styles.pageNumber}>
            <Ionicons name="book-outline" size={20} color={currentStory.color} />
            <Text style={[styles.pageNumberText, { color: currentStory.color }]}>
              Страница {currentPage + 1}
            </Text>
          </View>
          
          <Text style={styles.pageText}>{currentPageData.text}</Text>
          
          <View style={styles.decorativeElements}>
            <Ionicons name="sparkles" size={24} color={colors.secondary} />
            <Ionicons name="star" size={20} color={colors.accent} />
            <Ionicons name="heart" size={18} color={colors.pink} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentPage === 0 && styles.navButtonDisabled]}
          onPress={handlePrevPage}
          disabled={currentPage === 0}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={currentPage === 0 ? colors.textLight : 'white'} 
          />
          <Text style={[
            styles.navButtonText, 
            currentPage === 0 && styles.navButtonTextDisabled
          ]}>
            Назад
          </Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${((currentPage + 1) / totalPages) * 100}%`,
                  backgroundColor: currentStory.color 
                }
              ]} 
            />
          </View>
        </View>

        <View style={{ borderRadius: borderRadius.round, overflow: 'hidden' }}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNextPage}>
            <LinearGradient
              colors={[currentStory.color, `${currentStory.color}CC`]}
              style={styles.nextButtonGradient}
            >
              <Text style={styles.nextButtonText}>
                {isLastPage ? 'Завершить' : 'Далее'}
              </Text>
              <Ionicons 
                name={isLastPage ? "checkmark" : "chevron-forward"} 
                size={24} 
                color="white" 
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingBottom: 20,
    paddingHorizontal: spacing.lg,
  },
  headerTop: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  storyTitle: {
    fontSize: fontSize.large,
    fontWeight: 'bold' as const,
    color: 'white',
    flex: 1,
    textAlign: 'center' as const,
    marginHorizontal: spacing.md,
  },
  pageCounter: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
  },
  pageCounterText: {
    color: 'white',
    fontSize: fontSize.small,
    fontWeight: '600' as const,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flexGrow: 1,
    padding: spacing.lg,
    paddingBottom: 120,
  },
  pageCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.large,
    padding: spacing.xl,
    minHeight: height * 0.4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pageNumber: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: spacing.lg,
    alignSelf: 'center' as const,
  },
  pageNumberText: {
    fontSize: fontSize.medium,
    fontWeight: '600' as const,
    marginLeft: spacing.sm,
  },
  pageText: {
    fontSize: fontSize.large,
    lineHeight: 28,
    color: colors.text,
    textAlign: 'justify' as const,
    marginBottom: spacing.xl,
  },
  decorativeElements: {
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  navigation: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: colors.textLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    minWidth: 80,
  },
  navButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  navButtonText: {
    color: 'white',
    fontSize: fontSize.small,
    fontWeight: '600' as const,
    marginLeft: spacing.xs,
  },
  navButtonTextDisabled: {
    color: colors.textLight,
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: spacing.lg,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden' as const,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  nextButton: {
    borderRadius: borderRadius.round,
    overflow: 'hidden' as const,
  },
  nextButtonGradient: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minWidth: 80,
  },
  nextButtonText: {
    color: 'white',
    fontSize: fontSize.small,
    fontWeight: '600' as const,
    marginRight: spacing.xs,
  },
};