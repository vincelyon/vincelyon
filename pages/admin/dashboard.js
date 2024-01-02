import React, { useState, useEffect } from 'react';
import { db } from '../../utils/firebaseconfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    category: 'shoes',
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch existing categories
    const fetchCategories = async () => {
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      const categoryList = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoryList);
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddItem = async () => {
    const { category, name, description, price, image } = formData;

    try {
      const docRef = await addDoc(collection(db, category), {
        name,
        description,
        price: parseFloat(price),
        image,
      });
      console.log('Document added with ID: ', docRef.id);
      alert('Item added to Firestore');
      setFormData({
        category: 'shoes',
        name: '',
        description: '',
        price: '',
        image: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to add item');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleInputChange}>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Image URL:
          <input type="text" name="image" value={formData.image} onChange={handleInputChange} />
        </label>
        <br />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
