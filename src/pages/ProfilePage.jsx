import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../services/studentService";
import { Loader } from "../components/ui/Loader";
import { Linkedin, Github, Globe, Mail, Circle } from "lucide-react";

const ProfilePage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        // const res = await getStudentById(id);
        // setStudent(res.data);
        const data = await getStudentById(id);
        data.skills = Array.isArray(data.skills)
          ? data.skills
          : data.skills
            ? JSON.parse(data.skills)
            : [];
        data.projects = Array.isArray(data.projects)
          ? data.projects
          : data.projects
            ? JSON.parse(data.projects)
            : [];
        setStudent(data);


      } catch (error) {
        console.error("Error loading student:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <Loader />;
  if (!student)
    return <div className="text-center py-10 text-gray-600">Student not found.</div>;

  const availabilityColors = {
    Available: "text-green-600 bg-green-100",
    Busy: "text-yellow-600 bg-yellow-100",
    "Not Available": "text-red-600 bg-red-100",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3eeff] via-[#f6f9ff] to-[#eef3ff] flex flex-col items-center py-10 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-800 to-blue-900 opacity-10 animate-[gradientMove_8s_ease_infinite]" />

      {/* Profile Header */}
      <div className="w-full max-w-5xl rounded-2xl shadow-lg overflow-hidden relative z-10 backdrop-blur-xl bg-white/80 border border-white/40">
        <div className="relative h-44 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 animate-[gradientShift_6s_ease_infinite]">
          <div className="absolute bottom-0 left-6 transform translate-y-1/2">
            <img
              src={student.picture || "/assets/images/default.png"}
              alt={student.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-2xl"
            />
          </div>
        </div>

        <div className="pt-20 px-6 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
              <p className="text-gray-500 mt-1">
                🎓 Semester {student.semester} | Department ID: {student.department_id}
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${availabilityColors[student.availability] || "bg-gray-100 text-gray-600"
                }`}
            >
              <Circle className="w-3 h-3 fill-current" />
              {student.availability}
            </span>
          </div>

          {/* Bio */}
          <p className="text-gray-700 text-base leading-relaxed mt-4">{student.bio}</p>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            {student.linkedin && (
              <a
                href={student.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-700 hover:underline hover:scale-105 transition"
              >
                <Linkedin size={20} /> LinkedIn
              </a>
            )}
            {student.github && (
              <a
                href={student.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-gray-800 hover:underline hover:scale-105 transition"
              >
                <Github size={20} /> GitHub
              </a>
            )}
            {student.portfolio && (
              <a
                href={student.portfolio}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-500 hover:underline hover:scale-105 transition"
              >
                <Globe size={20} /> Portfolio
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Skills */}
      {student.skills?.length > 0 && (
        <div className="w-full max-w-5xl mt-6 rounded-2xl shadow-md p-6 bg-white/80 backdrop-blur-xl border border-white/40 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">💡 Skills</h2>
          <div className="flex flex-wrap gap-3">
            {student.skills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium hover:scale-105 transition-transform"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {student.projects?.length > 0 && (
        <div className="w-full max-w-5xl mt-6 rounded-2xl shadow-md p-6 bg-white/80 backdrop-blur-xl border border-white/40 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">🚀 Projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {student.projects.map((p, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{p.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{p.description}</p>
                {p.live_link && (
                  <a
                    href={p.live_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm font-medium hover:text-blue-800"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      <div className="w-full max-w-5xl mt-6 text-center">
        <button className="px-8 py-3 bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-full shadow-md hover:shadow-2xl hover:scale-105 transition">
          <Mail className="inline-block w-5 h-5 mr-2" />
          Send Message
        </button>
      </div>

      {/* Footer */}
      <p className="mt-10 text-gray-500 text-sm">
        🔒 Your information is secure and private.
      </p>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes gradientMove {
            0% { transform: translate(0, 0); }
            50% { transform: translate(10px, -10px); }
            100% { transform: translate(0, 0); }
          }
        `}
      </style>
    </div>
  );
};

export default ProfilePage;
