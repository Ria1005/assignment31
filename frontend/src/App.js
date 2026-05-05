import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./App.css";

function App() {

  // ✅ KEPT AS YOU WANTED
  const API = "http://127.0.0.1:8000/api";

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editUserId, setEditUserId] = useState(null);

  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState("");

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // ===== USER CRUD =====
  const fetchUsers = async () => {
    const res = await axios.get(`${API}/user`);
    setUsers(res.data);
  };

  const addUser = async () => {
    if (!name.trim()) return;

    if (editUserId) {
      await axios.put(`${API}/user/${editUserId}`, { name });
      setEditUserId(null);
    } else {
      await axios.post(`${API}/user`, { name });
    }
    setName("");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/user/${id}`);
    fetchUsers();
  };

  const editUser = (u) => {
    setName(u.name);
    setEditUserId(u._id);
  };

  // ===== POSTS =====
  const fetchPosts = async () => {
    const res = await axios.get(`${API}/post`);
    setPosts(res.data);
  };

  const addPost = async () => {
    if (!postTitle || !selectedUser) return;

    await axios.post(`${API}/post`, {
      title: postTitle,
      userId: selectedUser
    });

    setPostTitle("");
    fetchPosts();
  };

  const deletePost = async (id) => {
    await axios.delete(`${API}/post/${id}`);
    fetchPosts();
  };

  // ===== STUDENTS & COURSES =====
  const fetchStudents = async () => {
    const res = await axios.get(`${API}/student`);
    setStudents(res.data);
  };

  const fetchCourses = async () => {
    const res = await axios.get(`${API}/course`);
    setCourses(res.data);
  };

  const addStudent = async () => {
    if (!studentName.trim()) return;

    await axios.post(`${API}/student`, { name: studentName });
    setStudentName("");
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API}/student/${id}`);
    fetchStudents();
  };

  const addCourse = async () => {
    if (!courseName.trim()) return;

    await axios.post(`${API}/course`, { title: courseName });
    setCourseName("");
    fetchCourses();
  };

  const deleteCourse = async (id) => {
    await axios.delete(`${API}/course/${id}`);
    fetchCourses();
  };

  const enroll = async () => {
    if (!selectedStudent || !selectedCourse) return;

    await axios.post(`${API}/enroll`, {
      studentId: selectedStudent,
      courseId: selectedCourse
    });

    fetchStudents();
    fetchCourses();
  };

  const unenroll = async () => {
    if (!selectedStudent || !selectedCourse) return;

    await axios.post(`${API}/unenroll`, {
      studentId: selectedStudent,
      courseId: selectedCourse
    });

    fetchStudents();
    fetchCourses();
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
    fetchStudents();
    fetchCourses();
  }, []);

  // 🎬 Animation configs
  const sectionAnim = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 }
  };

  const itemAnim = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="App">
      <div className="container">

        <motion.h1 initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }}>
          🚀 Full CRUD with Relations
        </motion.h1>

        {/* USER SECTION */}
        <motion.div className="section" variants={sectionAnim} initial="hidden" animate="show">
          <h2>👤 User CRUD</h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
          />
          <button onClick={addUser}>
            {editUserId ? "Update" : "Add"}
          </button>

          <div className="list">
            {users.map((u) => (
              <motion.div
                key={u._id}
                className="list-item"
                variants={itemAnim}
                whileHover={{ scale: 1.05 }}
              >
                <span>{u.name}</span>
                <div>
                  <button onClick={() => editUser(u)}>Edit</button>
                  <button onClick={() => deleteUser(u._id)}>Delete</button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* POSTS */}
        <motion.div className="section" variants={sectionAnim} initial="hidden" animate="show">
          <h2>📝 Posts</h2>

          <select onChange={(e) => setSelectedUser(e.target.value)}>
            <option>Select User</option>
            {users.map(u => (
              <option key={u._id} value={u._id}>{u.name}</option>
            ))}
          </select>

          <input
            placeholder="Post title"
            onChange={(e) => setPostTitle(e.target.value)}
          />

          <button onClick={addPost}>Add Post</button>

          <div className="list">
            {posts.map(p => (
              <motion.div
                key={p._id}
                className="list-item"
                variants={itemAnim}
                whileHover={{ scale: 1.05 }}
              >
                <span>{p.title} → {p.userId?.name}</span>
                <button onClick={() => deletePost(p._id)}>Delete</button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* STUDENTS & COURSES */}
        <motion.div className="section" variants={sectionAnim} initial="hidden" animate="show">
          <h2>🎓 Students & Courses</h2>

          <input placeholder="Student name" onChange={(e)=>setStudentName(e.target.value)} />
          <button onClick={addStudent}>Add</button>

          <input placeholder="Course name" onChange={(e)=>setCourseName(e.target.value)} />
          <button onClick={addCourse}>Add</button>

          <br /><br />

          <select onChange={(e)=>setSelectedStudent(e.target.value)}>
            <option>Select Student</option>
            {students.map(s => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>

          <select onChange={(e)=>setSelectedCourse(e.target.value)}>
            <option>Select Course</option>
            {courses.map(c => (
              <option key={c._id} value={c._id}>{c.title}</option>
            ))}
          </select>

          <button onClick={enroll}>Enroll</button>
          <button onClick={unenroll}>Unenroll</button>

          <h3>Students</h3>
          <div className="list">
            {students.map(s => (
              <motion.div key={s._id} className="list-item" whileHover={{scale:1.05}}>
                <span>{s.name} → {s.courses.map(c=>c.title).join(", ")}</span>
                <button onClick={() => deleteStudent(s._id)}>Delete</button>
              </motion.div>
            ))}
          </div>

          <h3>Courses</h3>
          <div className="list">
            {courses.map(c => (
              <motion.div key={c._id} className="list-item" whileHover={{scale:1.05}}>
                <span>{c.title} → {c.students.map(s=>s.name).join(", ")}</span>
                <button onClick={() => deleteCourse(c._id)}>Delete</button>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default App;