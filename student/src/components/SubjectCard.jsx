import React from 'react';

const SubjectCard = ({ subject }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h3 className="text-lg font-semibold">{subject.name}</h3>
      <p className="text-gray-600">Teacher: {subject.teacher}</p>
      <a href="#" className="text-blue-500 mt-2 inline-block">View Details</a>
    </div>
  );
};

export default SubjectCard;
