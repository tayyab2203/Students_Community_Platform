import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAppContext } from "../App";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const followersData = [
  {
    id: 1,
    name: "Abeedah Rana",
    semester: "7th semester",
    skills: ["UI/UX Design", "HTML & CSS", "Prototyping"],
    followed: false,
  },
  {
    id: 2,
    name: "Shayyan Siddique",
    semester: "7th semester",
    skills: ["Frontend Development", "React", "JavaScript"],
    followed: true,
  },
  {
    id: 3,
    name: "Sehrish Faisal",
    semester: "7th semester",
    skills: ["Frontend Development", "Vue.js", "CSS"],
    followed: false,
  },
  {
    id: 4,
    name: "Laiba Rehman",
    semester: "7th semester",
    skills: ["Artificial Intelligence", "Machine Learning", "Python"],
    followed: true,
  },
  {
    id: 5,
    name: "Muhammad Kamil",
    semester: "7th semester",
    skills: ["Backend Development", "MERN Stack", "Laravel"],
    followed: false,
  },
  {
    id: 6,
    name: "Tayyab Sajjad",
    semester: "7th semester",
    skills: ["Backend Development", "Node.js", "Express"],
    followed: true,
  },
];

const followingData = [
  {
    id: 1,
    name: "Abeedah Rana",
    semester: "7th semester",
    skills: ["UI/UX Design", "HTML & CSS", "Prototyping"],
    followed: true,
  },
  {
    id: 2,
    name: "Shayyan Siddique",
    semester: "7th semester",
    skills: ["Frontend Development", "React", "JavaScript"],
    followed: true,
  },
  {
    id: 3,
    name: "Sehrish Faisal",
    semester: "7th semester",
    skills: ["Frontend Development", "Vue.js", "CSS"],
    followed: true,
  },
];

const FollowersPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students } = useAppContext();
  const [followers, setFollowers] = useState(followersData);
  const [activeTab, setActiveTab] = useState("followers");

  const student = students.find((s) => s.id === parseInt(id));

  const handleFollowToggle = (followerId) => {
    setFollowers((prev) =>
      prev.map((f) =>
        f.id === followerId ? { ...f, followed: !f.followed } : f
      )
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  const currentData = activeTab === "followers" ? followers : followingData;

  if (!student) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-gray-600 text-lg px-4">
          Student not found 😢
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navbar />

      <div className="flex-1 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 lg:pb-16 px-3 sm:px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              {student.name}'s {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base lg:text-lg">
              Connect and collaborate with like-minded students from BZU.
            </p>
          </div>

          {/* Tabs Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row border-b border-gray-200/50">
              <button
                onClick={() => setActiveTab("followers")}
                className={`px-4 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-300 whitespace-nowrap flex-1 sm:flex-none rounded-t-lg ${
                  activeTab === "followers"
                    ? "border-b-2 border-blue-600 text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 shadow-inner"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/50"
                }`}
              >
                Followers ({followers.length})
              </button>
              <button
                onClick={() => setActiveTab("following")}
                className={`px-4 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-300 whitespace-nowrap flex-1 sm:flex-none mt-2 sm:mt-0 rounded-t-lg ${
                  activeTab === "following"
                    ? "border-b-2 border-blue-600 text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 shadow-inner"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/50"
                }`}
              >
                Following ({student.following || 0})
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {currentData.map((follower, index) => (
              <div
                key={follower.id}
                className="group bg-white/80 backdrop-blur-sm shadow-md rounded-xl p-4 sm:p-6 border border-white/20 hover:shadow-xl hover:border-blue-200/50 transition-all duration-300 overflow-hidden hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-3 sm:mb-4 w-full">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <span className="text-white font-bold text-sm sm:text-base">
                        {follower.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                        {follower.name}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        {follower.semester}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6 w-full">
                    {follower.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-xs bg-gradient-to-r from-blue-50 to-blue-100 px-2.5 sm:px-3 py-1 rounded-full border border-blue-200/50 text-blue-700 font-medium truncate max-w-[120px] sm:max-w-none hover:bg-blue-200/50 transition-all duration-200 cursor-default"
                        title={skill}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto w-full">
                    <button
                      onClick={() => handleFollowToggle(follower.id)}
                      className={`w-full sm:flex-1 ${
                        follower.followed
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 hover:border-gray-400"
                          : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg"
                      } px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm`}
                    >
                      {follower.followed ? "Unfollow" : "Follow"}
                    </button>
                    <button className="w-full sm:w-auto bg-white/80 backdrop-blur-sm border border-gray-300 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 font-semibold transition-all duration-300 text-sm shadow-sm hover:shadow-md">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {currentData.length === 0 && (
            <div className="text-center py-16 sm:py-20 px-3 col-span-full mb-8 sm:mb-12">
              <div className="text-gray-400 text-5xl sm:text-7xl mb-6 animate-bounce">👥</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                No {activeTab} yet
              </h3>
              <p className="text-gray-500 text-base sm:text-lg max-w-md mx-auto">
                Start connecting with students to build your network!
              </p>
            </div>
          )}

          {/* Back Button Section - Moved to Bottom */}
          <div className="text-center pt-6 sm:pt-8 pb-4 sm:pb-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-200 text-blue-600 hover:text-blue-700 transition-all duration-300 text-sm sm:text-base font-semibold"
            >
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
              <span>Back to Profile</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FollowersPage;