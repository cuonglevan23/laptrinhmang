import React, { useState } from "react";

const JoinMeetingModal = ({ closeModal, joinMeeting }) => {
  const [meetingLink, setMeetingLink] = useState("");

  const handleJoinMeeting = () => {
    // Perform any validation on meetingLink if needed
    // Call the joinMeeting function with the meeting link
    joinMeeting(meetingLink);
    // Close the modal
    closeModal();
    // Redirect to the external meeting link
    window.location.href = meetingLink;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black bg-opacity-75 fixed inset-0"></div>
      <div className="bg-white p-8 rounded shadow-lg z-10">
        <span className="text-3xl font-bold cursor-pointer absolute top-4 right-4" onClick={closeModal}>
          &times;
        </span>
        <input
          type="text"
          placeholder="Enter meeting link"
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-4"
        />
        <button
          onClick={handleJoinMeeting}
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
};

export default JoinMeetingModal;
