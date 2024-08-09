import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { db } from "../../../../service/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function FavoriteBarbers() {
  const [barbers, setBarbers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchBarbers = async () => {

        const favoriteBarbersRef = collection(db, 'users', user, 'favoriteBarbers');
        const favoriteBarbersSnapshot = await getDocs(favoriteBarbersRef);
        const likedBarbersIds = favoriteBarbersSnapshot.docs.map(doc => doc.id);

        const barbersData = await Promise.all(
          likedBarbersIds.map(async (barberId) => {
            const barberDoc = await db.collection('barbers').doc(barberId).get();
            const likesCount = (await db.collection('barbers').doc(barberId).collection('likes').get()).size;
            return { id: barberId, ...barberDoc.data(), likesCount };
          })
        );

        setBarbers(barbersData);
      };

      fetchBarbers();
    }
  }, [user]);

  return (
    <div>
      <h2>Your Liked Barbers</h2>
      <ul>
        {barbers.map((barber) => (
          <li key={barber.id}>
            <div>
              <h3>
                {barber.firstName} {barber.lastName}
              </h3>
              <p>{barber.summary}</p>
              <img
                src={barber.photoUrl}
                alt={`${barber.firstName} ${barber.lastName}`}
              />
              <p>Likes: {barber.likesCount}</p>
              <button
                // onClick={() => handleLikeToggle(barber.id, barber.likedByUser)}
              >
                {barber.likedByUser ? "Unlike" : "Like"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
