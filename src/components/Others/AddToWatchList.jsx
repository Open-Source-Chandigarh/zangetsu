import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const AddToWatchList = ({ title, url }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleAddToWatchlist = async () => {
    if (!user) return;

    const watchlistDocRef = doc(db, 'watchlist', user.uid); // Using UID as document ID
    const watchlistDoc = await getDoc(watchlistDocRef);

    if (watchlistDoc.exists()) {
      // If the watchlist already exists, update it
      const currentData = watchlistDoc.data();
      const updatedList = { ...currentData.list, [title]: url }; // Add the new title and URL

      await updateDoc(watchlistDocRef, {
        list: updatedList,
      });
      console.log('Watchlist updated');
    } else {
      // If no watchlist exists, create a new one
      await setDoc(watchlistDocRef, {
        uid: user.uid,
        username: user.displayName || 'User',
        list: {
          [title]: url,
        },
      });
      console.log('New watchlist created');
    }
  };

  return (
    <div onClick={handleAddToWatchlist}>
      <h2>{title}</h2>
      <p>{url}</p>
    </div>
  );
};

export default AddToWatchList;
