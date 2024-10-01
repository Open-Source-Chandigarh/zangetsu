import Navbar from "../Sections/Navbar";
import { auth } from '../../firebaseConfig';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import './Watchlist.css'

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState({ list: {} }); // Initialize as an empty object
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          console.log('No user is logged in');
          setLoading(false);
          return;
        }

        setUser(true);
        console.log('Fetching watchlist for UID:', user.uid);

        const q = query(
          collection(db, 'watchlist'),
          where('uid', '==', user.uid)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map(doc => doc.data());
          setWatchlist(data[0] || { list: {} }); // Assuming there's only one document per user
        } else {
          console.log('No matching documents found.');
        }
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const handleCheckboxChange = async (key) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log('No user is logged in');
        return;
      }

      const q = query(
        collection(db, 'watchlist'),
        where('uid', '==', user.uid)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const updatedList = { ...watchlist.list };
        delete updatedList[key];

        await updateDoc(docRef, { list: updatedList });
        setWatchlist(prevWatchlist => ({
          ...prevWatchlist,
          list: updatedList
        }));
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (Object.keys(watchlist.list).length === 0) {
    return (
      <div>
        <Navbar />
        <div style={{
          display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center', 
          alignItems: 'center', flexDirection: 'column', color: 'white'
        }}>
          <div style={{ color: 'yellow', fontSize: '10rem'}}>404</div>
          <div>Page not found</div>
          {user ? (
            <div>Add Anime to Watchlist to view them here !</div>
          ) : (
            <div>Login First !</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ color: "white", fontWeight: '200', marginTop: '10rem' }}>

        <table style={{color: 'white' }}>
          <thead style={{ border: '1px solid white' }}>
            <tr style={{ border: '1px solid white', textAlign: 'left' }}>
              <th  className="table-column-1">Remove</th>
              {/* <th  className="table-column-2">Poster</th> */}
              <th  className="table-column-3">Title</th>
              <th  className="table-column-4">Genres</th>
              <th  className="table-column-5">Rating</th>
              <th  className="table-column-6">Watch</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(watchlist.list).map((key) => (
              <tr key={key} style={{ borderBottom: '1px solid white', textAlign: 'left' }}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(key)}
                    className="checkbox"
                  />
                </td>
                {/* <td>
                  <img 
                    src={watchlist.list[key][1]} 
                    alt={key} 
                    className="poster-img" 
                  />
                </td> */}
                <td className="title">
                  <div>{key}</div>
                </td>
                <td className="col4">
                  {watchlist.list[key][3].split(',').map((genre, i) => (
                    <div key={i}>{genre.trim()}</div>
                  ))}
                </td>
                <td className="col5">
                  {watchlist.list[key][4] / 10}
                </td>
                <td>
                  <a className="watchlist-a" href={watchlist.list[key][0]} target="_blank" rel="noopener noreferrer">
                    <button>
                      Watch {key}
                    </button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Watchlist;
