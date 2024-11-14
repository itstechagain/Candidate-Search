import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import type { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [results, setResults] = useState<Candidate[]>([]);
  const [currentUser, setCurrentUser] = useState<Candidate | null>(null); // Handle null state
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // Handle error state

  // Fetch user details
  const searchForSpecificUser = async (user: string) => {
    setLoading(true); // Set loading state true when fetching data
    setError(null); // Clear previous errors
    try {
      const data: Candidate = await searchGithubUser(user);
      if (!data.login) {
        throw new Error('User not found');
      }
      setCurrentUser(data);
    } catch (err) {
      setError('Error fetching user data');
      console.error(err);
    } finally {
      setLoading(false); // Set loading state false after fetch
    }
  };

  // Fetch list of GitHub users
  const searchForUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: Candidate[] = await searchGithub();
      if (data.length === 0) {
        throw new Error('No users found');
      }
      setResults(data);
      if (data.length > 0 && data[currentIdx]) {
        await searchForSpecificUser(data[currentIdx].login || '');
      }
    } catch (err) {
      setError('Error fetching users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Save the selected candidate to localStorage
  const makeDecision = async (isSelected: boolean) => {
    if (isSelected && currentUser) {
      let parsedCandidates: Candidate[] = [];
      const savedCandidates = localStorage.getItem('savedCandidates');
      if (savedCandidates) {
        parsedCandidates = JSON.parse(savedCandidates);
      }
      if (!parsedCandidates.some((candidate) => candidate.id === currentUser.id)) {
        parsedCandidates.push(currentUser);
        localStorage.setItem('savedCandidates', JSON.stringify(parsedCandidates));
      }
    }

    if (currentIdx + 1 < results.length) {
      setCurrentIdx(currentIdx + 1);
      await searchForSpecificUser(results[currentIdx + 1].login || '');
    } else {
      setCurrentIdx(0);
      await searchForUsers();
    }
  };

  // Effect to load data on component mount
  useEffect(() => {
    searchForUsers();
  }, []);

  // Show loading or error message if needed
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1>Candidate Search</h1>
      {currentUser ? (
        <CandidateCard currentUser={currentUser} makeDecision={makeDecision} />
      ) : (
        <div>No candidate to display</div>
      )}
    </>
  );
};

export default CandidateSearch;
