import React, { useState, useMemo } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { Match } from '@/types/football';
import MatchCard from './MatchCard';
import MatchDetails from './MatchDetails';
import { AnimatePresence, motion } from 'framer-motion';

interface MatchesViewProps {
  matches: Match[];
  message?: string;
  type: 'live' | 'recent';
}

const MatchesView: React.FC<MatchesViewProps> = ({ matches, message, type }) => {
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);

  const handleMatchClick = (matchId: string) => {
    setExpandedMatchId(expandedMatchId === matchId ? null : matchId);
  };

  // Group matches by matchday for recent results
  const groupedMatches = useMemo(() => {
    if (type !== 'recent') {
      return { ungrouped: matches };
    }

    const groups: { [key: string]: Match[] } = {};
    
    matches.forEach(match => {
      const matchday = match.matchday || 'Unknown';
      const key = `Matchday ${matchday}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(match);
    });

    // Sort matches within each group by date (most recent first)
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime());
    });

    return groups;
  }, [matches, type]);

  if (message) {
    return (
      <div className="text-center py-12">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">{message}</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">
          No matches found for the selected criteria.
        </p>
      </div>
    );
  }

  // Render ungrouped matches (for live matches)
  if (groupedMatches.ungrouped) {
    return (
      <div className="space-y-2">
        {groupedMatches.ungrouped.map((match) => (
          <div key={match.id}>
            <MatchCard 
              match={match} 
              onClick={() => handleMatchClick(match.id)}
              isExpanded={expandedMatchId === match.id}
            />
            <AnimatePresence>
              {expandedMatchId === match.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <MatchDetails match={match} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    );
  }

  // Render grouped matches (for recent results)
  const sortedGroupKeys = Object.keys(groupedMatches).sort((a, b) => {
    const matchdayA = parseInt(a.replace('Matchday ', '')) || 0;
    const matchdayB = parseInt(b.replace('Matchday ', '')) || 0;
    return matchdayB - matchdayA; // Most recent matchday first
  });

  return (
    <div className="space-y-6">
      {sortedGroupKeys.map((groupKey) => (
        <div key={groupKey} className="space-y-3">
          {/* Matchday Header */}
          <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg">
            <Calendar className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-lg text-gray-800">{groupKey}</h3>
            <span className="text-sm text-gray-500">
              ({groupedMatches[groupKey].length} match{groupedMatches[groupKey].length !== 1 ? 'es' : ''})
            </span>
          </div>
          
          {/* Matches in this matchday */}
          <div className="space-y-2 ml-4">
            {groupedMatches[groupKey].map((match) => (
              <div key={match.id}>
                <MatchCard 
                  match={match} 
                  onClick={() => handleMatchClick(match.id)}
                  isExpanded={expandedMatchId === match.id}
                />
                <AnimatePresence>
                  {expandedMatchId === match.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <MatchDetails match={match} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Summary footer for recent results */}
      {type === 'recent' && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between text-sm text-blue-800">
            <span>Total Matches: {matches.length}</span>
            <span>Matchdays: {sortedGroupKeys.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchesView;
