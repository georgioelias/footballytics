# Footballytics

## Student Information
**Name:** Georgio Elias

## Live Demo
🌐 **Live Application**: [https://footballytics-platform.onrender.com/](https://footballytics-platform.onrender.com/)

## API Used
**TheSportsDB** - https://www.thesportsdb.com/api.php

TheSportsDB is a free sports database API that provides comprehensive football data including:
- League standings and tables
- Team information and statistics
- Match results and fixtures
- Player data and statistics

The API is accessed through RESTful endpoints and returns JSON data. The application implements caching and fallback mock data to ensure reliability.

## Project Description
Footballytics is a comprehensive football analytics web application that provides real-time data and insights for major European football leagues. The platform offers a rich set of capabilities designed for football enthusiasts, analysts, and casual fans alike.

**Core Features:**
- **Live Match Tracking**: Real-time scores, match status, and live updates from ongoing games
- **League Analytics**: Comprehensive standings, points tables, and league progression tracking
- **Team Intelligence**: Detailed team profiles, statistics, performance metrics, and historical data
- **Match Analysis**: In-depth match results, fixtures, team lineups, and match timelines
- **Multi-League Support**: Coverage of major European leagues including Premier League, La Liga, Serie A, and more
- **Interactive Data Visualization**: Charts, graphs, and visual representations of football statistics
- **Responsive Dashboard**: Intuitive tabbed navigation system for seamless data exploration
- **Contact Support**: Direct email communication system for user inquiries and feedback

**Technical Capabilities:**
- **Real-time Data Integration**: Live API connections with automatic data refresh and caching
- **Intelligent Error Handling**: Graceful fallbacks and mock data when API services are unavailable
- **Performance Optimization**: Efficient data loading, caching strategies, and optimized rendering
- **Cross-Platform Compatibility**: Responsive design that adapts to desktop, tablet, and mobile devices
- **Modern User Experience**: Smooth animations, loading states, and interactive feedback systems

The application is built using modern web technologies including React, TypeScript, Tailwind CSS, and EmailJS, with a responsive design that works seamlessly across desktop and mobile devices. It features dynamic content loading, smooth animations, and an intuitive user interface for exploring football data.

## Custom UI Requirement Explanation
**Requirement:** Implement tabbed navigation using JavaScript

**Implementation:**
The custom tabbed navigation system is implemented through an ES6 class called `TabManager` located in `src/utils/tabManager.ts`. This class manages all aspects of the tabbed interface functionality.

**Key Features:**
- **ES6 Class Structure**: The `TabManager` class uses modern JavaScript syntax with constructor, methods, and properties
- **Dynamic Tab Switching**: Handles switching between different data views (Live Matches, League Tables, Team Stats, Recent Results)
- **API Integration**: Each tab loads specific data from TheSportsDB API when activated
- **State Management**: Manages loading states, error handling, and data caching
- **User Feedback**: Provides toast notifications and loading indicators during tab transitions

**Technical Implementation:**
```javascript
class TabManager {
  constructor(activeTab, setActiveTab, setTabData, setLoading) {
    this.activeTab = activeTab;
    this.setActiveTab = setActiveTab;
    this.setTabData = setTabData;
    this.setLoading = setLoading;
    this.api = new FootballAPI();
  }

  async switchTab(tabId, competition, season) {
    // Handles tab switching logic, API calls, and error handling
  }
}
```

The tabbed navigation provides a smooth user experience with CSS transitions and maintains data consistency across different views. Users can easily switch between different types of football data while the system handles loading states and error conditions gracefully.
