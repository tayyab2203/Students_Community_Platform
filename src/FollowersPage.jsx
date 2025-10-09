import React, { useState } from "react";

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

export default function FollowersPage() {
  const [followers, setFollowers] = useState(followersData);
  const [activeTab, setActiveTab] = useState("followers");

  const handleFollowToggle = (id) => {
    setFollowers((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, followed: !f.followed } : f
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
           
      {/* Header */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Abeedah Rana&apos;s Followers
        </h2>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("followers")}
            className={`px-4 py-2 font-medium ${
              activeTab === "followers"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Followers (6)
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className={`px-4 py-2 font-medium ${
              activeTab === "following"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
           
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {followers.map((follower) => (
            <div
              key={follower.id}
              className="bg-white shadow-sm rounded-lg p-5 border hover:shadow-md transition"
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-gray-400 text-xl">👤</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {follower.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {follower.semester}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {follower.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-sm bg-gray-100 px-3 py-1 rounded-full border text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => handleFollowToggle(follower.id)}
                    className={`${
                      follower.followed
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        : "bg-blue-700 text-white hover:bg-blue-800"
                    } px-4 py-1.5 rounded-md font-medium transition`}
                  >
                    {follower.followed ? "Unfollow" : "Follow"}
                  </button>
                  <button className="border px-4 py-1.5 rounded-md text-gray-700 hover:bg-gray-100">
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

