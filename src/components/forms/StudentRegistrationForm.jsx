import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStudent from '../../hooks/useStudent';
import studentService from '../../services/studentService';
import { categories, semesters } from '../../utils/constants';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

const StudentRegistrationForm = ({ isEdit, studentId }) => {
  const navigate = useNavigate();
  const { student } = useStudent(isEdit ? studentId : null);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    picture: null,
    semester: '',
    bio: '',
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        category: student.category,
        picture: null, // File not pre-filled
        semester: student.semester,
        bio: student.bio,
      });
      setPreview(`/storage/${student.picture}`);
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, picture: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isEdit) {
        await studentService.updateStudent(studentId || user.id, formData);
      } else {
        await studentService.registerStudent(formData);
      }
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {error && <p className="text-[#EF4444] mb-4">{error}</p>}
      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <select name="category" value={formData.category} onChange={handleChange} className="border p-2 w-full mb-4 rounded" required>
        <option value="">Select Category</option>
        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <input type="file" onChange={handleFileChange} accept="image/*" className="mb-4" />
      {preview && <img src={preview} alt="Preview" className="w-20 h-20 rounded-full mb-4" />}
      <select name="semester" value={formData.semester} onChange={handleChange} className="border p-2 w-full mb-4 rounded" required>
        <option value="">Select Semester</option>
        {semesters.map((sem) => <option key={sem} value={sem}>{sem}</option>)}
      </select>
      <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="border p-2 w-full mb-4 rounded" required />
      <Button type="submit" className="bg-[#1E3D99] text-white">{isEdit ? 'Update' : 'Register'}</Button>
    </form>
  );
};

export default StudentRegistrationForm;