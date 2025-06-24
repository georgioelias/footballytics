/**
 * TabManager Class - Custom UI Requirement Implementation
 * 
 * This ES6 class manages tabbed navigation for the football application.
 * It handles tab switching, API data loading, and provides smooth user experience
 * with loading states, error handling, and caching.
 * 
 * Author: Georgio Elias
 * Course: Full Stack Development - Lebanese University
 * Custom Requirement: Implement tabbed navigation using JavaScript
 */

import FootballAPI from './footballApi';
import { toast } from '@/hooks/use-toast';

class TabManager {
  public activeTab: string;
  public setActiveTab: (tab: string) => void;
  public setTabData: (data: any) => void;
  public setLoading: (loading: boolean) => void;
  public api: FootballAPI;

  /**
   * Constructor - Initialize TabManager with React state setters
   * @param activeTab - Current active tab ID
   * @param setActiveTab - React state setter for active tab
   * @param setTabData - React state setter for tab data
   * @param setLoading - React state setter for loading state
   */
  constructor(
    activeTab: string, 
    setActiveTab: (tab: string) => void, 
    setTabData: (data: any) => void, 
    setLoading: (loading: boolean) => void
  ) {
    this.activeTab = activeTab;
    this.setActiveTab = setActiveTab;
    this.setTabData = setTabData;
    this.setLoading = setLoading;
    this.api = new FootballAPI();
  }

  /**
   * Main method to switch between tabs and load appropriate data
   * Implements smooth transitions and error handling
   * 
   * @param tabId - ID of the tab to switch to
   * @param competition - Football competition code (PL, SA, etc.)
   * @param season - Season year for data filtering
   */
  async switchTab(tabId: string, competition = 'PL', season?: string): Promise<void> {
    console.log(`[TabManager] Switching to tab: ${tabId}, Competition: ${competition}, Season: ${season}`);
    
    // Update active tab state
    this.setActiveTab(tabId);
    this.setLoading(true);
    
    try {
      let data;
      
      // Route to appropriate data loading method based on tab ID
      switch (tabId) {
        case 'live-matches':
          data = await this.loadLiveMatches(season);
          break;
          
        case 'league-tables':
          data = await this.loadLeagueStandings(competition, season);
          break;
          
        case 'team-stats':
          data = await this.loadTeamStatistics(competition, season);
          break;
          
        case 'recent-results':
          data = await this.loadRecentResults(competition, season);
          break;
          
        default:
          console.warn(`[TabManager] Unknown tab ID: ${tabId}`);
          data = { error: true, message: 'Unknown tab selected' };
      }
      
      console.log(`[TabManager] Tab data loaded successfully for: ${tabId}`);
      this.setTabData(data);
      
      // Show success notification to user
      this.showSuccessNotification(tabId);
      
    } catch (error) {
      console.error(`[TabManager] Error switching to tab ${tabId}:`, error);
      this.handleTabError(error);
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Load live match data with filtering for active games
   */
  private async loadLiveMatches(season?: string) {
    console.log('[TabManager] Fetching live matches...');
    const data = await this.api.fetchMatches(season);
    
    if (data.matches) {
      const liveMatches = data.matches.filter((match: any) => 
        match.status === 'IN_PLAY' || match.status === 'LIVE'
      );
      
      if (liveMatches.length === 0) {
        return { 
          matches: data.matches || [], 
          message: 'No live matches at the moment - showing recent matches' 
        };
      }
      
      return { ...data, matches: liveMatches };
    }
    
    return { matches: [], message: 'No live matches at the moment' };
  }

  /**
   * Load league standings data
   */
  private async loadLeagueStandings(competition: string, season?: string) {
    console.log(`[TabManager] Fetching league standings for: ${competition}, season: ${season}`);
    return await this.api.fetchStandings(competition, season);
  }

  /**
   * Load team statistics and information
   */
  private async loadTeamStatistics(competition: string, season?: string) {
    console.log(`[TabManager] Fetching teams info for: ${competition}, season: ${season}`);
    return await this.api.fetchTeams(competition, season);
  }

  /**
   * Load recent match results with filtering for finished games
   */
  private async loadRecentResults(competition: string, season?: string) {
    console.log(`[TabManager] Fetching recent results for: ${competition}, season: ${season}`);
    const data = await this.api.fetchCompetitionMatches(competition, season);
    
    if (data.matches) {
      const finishedMatches = data.matches.filter((match: any) => match.status === 'FINISHED');
      return { ...data, matches: finishedMatches };
    }
    
    return data;
  }

  /**
   * Show success notification when data loads successfully
   */
  private showSuccessNotification(tabId: string): void {
    toast({
      title: "Data Loaded Successfully",
      description: `${this.getTabDisplayName(tabId)} loaded from TheSportsDB API.`,
    });
  }

  /**
   * Handle errors that occur during tab switching
   */
  private handleTabError(error: any): void {
    toast({
      title: "Unable to load sports data", 
      description: "There was an issue loading data from the sports API. Please try again.",
      variant: "destructive",
    });
    
    this.setTabData({ 
      error: true,
      errorMessage: 'Failed to load data from TheSportsDB API',
      userFriendlyMessage: 'Unable to connect to sports data service. This may be due to API access restrictions or network issues.',
      matches: [],
      teams: [],
      standings: []
    });
  }

  /**
   * Get user-friendly display name for tab ID
   */
  private getTabDisplayName(tabId: string): string {
    const tabNames: { [key: string]: string } = {
      'live-matches': 'Live matches',
      'league-tables': 'League standings',
      'team-stats': 'Teams information',
      'recent-results': 'Recent results'
    };
    
    return tabNames[tabId] || 'Data';
  }

  /**
   * Get current active tab
   */
  public getCurrentTab(): string {
    return this.activeTab;
  }

  /**
   * Check if a specific tab is currently active
   */
  public isTabActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }
}

export default TabManager;
