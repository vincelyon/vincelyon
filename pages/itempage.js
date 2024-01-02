import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, doc } from 'firebase/firestore';
import db from '../utils/firebaseconfig';

const ItemPage = () => {
  const { categoryId } = useParams();
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const categoryDocRef = doc(db, 'categories', categoryId);
        const itemsRef = collection(categoryDocRef, 'items');
        const itemSnapshots = await getDocs(itemsRef);

        const itemsData = itemSnapshots.docs.map((doc) => ({
          id: doc.id,
          itemName: doc.data().itemName,
          // Other item details...
        }));

        setCategoryItems(itemsData);
      } catch (error) {
        console.error('Error fetching items: ', error);
      }
    };

    fetchItems();
  }, [categoryId]);

  return (
    <div>
      <h1>Items for Category</h1>
      <ul>
        {categoryItems.map((item) => (
          <li key={item.id}>
            <p>{item.itemName}</p>
            {/* Display other item details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemPage;
