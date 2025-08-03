import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/leaderboard')
      .then(res => res.json())
      .then(users => {
        setAllUsers(users);
        if (users.length > 0) {
          handleUserSwitch(users[0].referralCode);
        } else {
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.error("Failed to fetch user list:", err);
        setIsLoading(false);
      });
  }, []);

  const handleUserSwitch = (referralCode) => {
    setIsLoading(true);
    fetch(`http://localhost:5001/api/dashboard/${referralCode}`)
      .then(res => res.json())
      .then(userData => {
        setCurrentUser(userData);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(`Failed to fetch data for ${referralCode}:`, err);
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.dashboardLayout}>
      {/* --- Main Content Column --- */}
      <main className={styles.mainContent}>
        <div className={styles.userSwitcher}>
          <h4>Switch User:</h4>
          {allUsers.map(user => (
            <button
              key={user.referralCode}
              onClick={() => handleUserSwitch(user.referralCode)}
              className={currentUser?.referralCode === user.referralCode ? styles.activeButton : ''}
            >
              {user.internName}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : currentUser ? (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3>👤 Intern Name</h3>
              <p className={styles.statValue}>{currentUser.internName}</p>
            </div>
            <div className={styles.statCard}>
              <h3>🔗 Referral Code</h3>
              <p className={`${styles.statValue} ${styles.referralCode}`}>
                {currentUser.referralCode}
              </p>
            </div>
            <div className={styles.statCard}>
              <h3>💰 Total Donations</h3>
              <p className={styles.statValue}>
                ₹{currentUser.totalDonations.toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </main>

      {/* --- Sidebar Leaderboard Column --- */}
      <aside className={styles.sidebarLeaderboard}>
        <h2>🏆 Leaderboard</h2>
        <ol className={styles.leaderboardList}>
          {allUsers.map((user, index) => (
            <li
              key={user.referralCode}
              className={`${styles.leaderboardItem} ${currentUser?.referralCode === user.referralCode ? styles.currentUserHighlight : ''}`}
            >
              <span>{index + 1}. {user.internName}</span>
              <span>₹{user.totalDonations.toLocaleString()}</span>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}

export default Dashboard;