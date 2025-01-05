import React, { useEffect, useState } from 'react';
import { useAxios } from '../AxiosContext';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get('/leaderboard');
        console.log('Leaderboard response:', response.data);

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid leaderboard data format');
        }

        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message || 'Failed to load leaderboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 60000);
    return () => clearInterval(interval);
  }, [axiosInstance]);

  if (isLoading) return <div className="text-center">Loading leaderboard...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;
  if (!leaderboard.length) return <div className="text-center">No scores available yet</div>;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-6 text-navy-blue">Leaderboard</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Rank</th>
            <th className="py-2 px-4 border-b text-left">Username</th>
            <th className="py-2 px-4 border-b text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry.username || index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{entry.rank || index + 1}</td>
              <td className="py-2 px-4 border-b">{entry.username}</td>
              <td className="py-2 px-4 border-b">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
