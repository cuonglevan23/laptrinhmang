import React, { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";
import { useAuth } from "../context/AuthContext";
import { v4 as uuid } from "uuid";

// icons
import { MdVideoCall as NewCallIcon } from "react-icons/md";
import { MdAddBox as JoinCallIcon } from "react-icons/md";
import { BsCalendarDate as CalenderIcon } from "react-icons/bs";
import { MdScreenShare as ScreenShareIcon } from "react-icons/md";
import { Link } from "react-router-dom";
import JoinMeetingModal from "./JoinMeetingModal";
const roomId = uuid();

const Home = () => {
  const { user } = useAuth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const joinMeeting = (meetingLink) => {
    // Implement the logic to join the meeting with the provided link
    console.log("Joining meeting with link:", meetingLink);
    // Add your logic to handle joining the meeting
  };
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="bg-darkBlue1 min-h-screen text-slate-400">
      <div className="flex h-full md:gap-2 flex-col md:flex-row">
        <div className="p-3 w-auto h-auto items-center">
          <div className="flex gap-2 md:gap-6 mb-3 md:mb-6">
            <Link to={`/room/${roomId}`} className="block w-full">
              <HomeCard
                title="New Meeting"
                desc="Create a new meeting"
                icon={<NewCallIcon />}
                iconBgColor="lightYellows"
                bgColor="bg-yellow"
                route={`/room/`}
              />
            </Link>
            <div onClick={openModal} className="cursor-pointer w-full">
              <HomeCard
                title="Join Meeting"
                desc="via invitation link"
                icon={<JoinCallIcon />}
                bgColor="bg-blue"
              />
            </div>
          </div>
          <div className="flex gap-2 md:gap-6">
            <Link to="/schedule">
              {" "}
              <HomeCard
                title="Schedule"
                desc="schedule your meeting"
                icon={<CalenderIcon size={20} />}
                bgColor="bg-blue"
              />
            </Link>
            <Link to="uploadfile">
              {" "}
              <HomeCard
                title="UpLoad File"
                desc="show your work"
                icon={<ScreenShareIcon size={22} />}
                bgColor="bg-blue"
              />
            </Link>
          </div>
        </div>
        <div className="flex-grow md:h-screen md:border-l-2 border-lightGray p-3 md:p-4">
          <div className="relative md:h-52 w-full bg-slate-500 rounded md:rounded-2xl p-3 mb-4">
            <div className="md:absolute bottom-2 left-2 md:bottom-6 md:left-6">
              <p className="md:text-7xl text-4xl text-white">
                {`${
                  date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
                }:${
                  date.getMinutes() < 10
                    ? `0${date.getMinutes()}`
                    : date.getMinutes()
                }`}
              </p>
              <p className="text-slate-300 font-thin my-1">
                {`${days[date.getDay()]},${date.getDate()} ${
                  months[date.getMonth()]
                } ${date.getFullYear()}`}
              </p>
            </div>
          </div>

          <div className="relative md:h-52 w-full bg-lightGray rounded md:rounded-3xl p-3 mb-4">
            <h1 className="text-2xl font-bold mb-2">Lịch Họp</h1>
            <div className="bottom-12 left-2 md:bottom-16 md:left-6">
              <p className="text-white mb-2">10.00 - 11.30</p>
              <p className="text-slate-300 font-thin">
                {`${days[date.getDay()]},${date.getDate()} ${
                  months[date.getMonth()]
                } ${date.getFullYear()}`}
              </p>
            </div>
            <div className="absolute flex bottom-6 left-6">
              <div className="relative group h-9 w-9 rounded-full overflow-hidden aspect-square">
                <img
                  className="h-full w-full rounded-full aspect-square object-cover"
                  src={user?.photoURL}
                  alt={user?.displayname}
                />
              </div>
              <div className="relative group h-9 w-9 rounded-full overflow-hidden aspect-square ml-2">
                <img
                  className="h-full w-full rounded-full aspect-square object-cover"
                  src="/images/luffy.jpeg"
                  alt={user?.displayname}
                />
              </div>
              <div className="relative group h-9 w-9 rounded-full overflow-hidden aspect-square ml-2">
                <img
                  className="h-full w-full rounded-full aspect-square object-cover"
                  src="/images/dep.jpg"
                  alt={user?.displayname}
                />
              </div>
              <div className="relative flex items-center ml-2">
                <div className="relative group h-9 w-9 rounded-full overflow-hidden aspect-square">
                  <img
                    className="h-full w-full rounded-full aspect-square object-cover"
                    src="/images/6.jpeg"
                    alt={user?.displayname}
                  />
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.01)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <p className="text-white font-bold">+6</p>
                </div>
              </div>
            </div>
            {/* Nút Start */}
            <button className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded absolute bottom-4 right-4">
              Start
            </button>
          </div>

          <div className="relative md:h-52 w-full bg-lightGray rounded md:rounded-3xl p-3 ">
            <h1 className="text-2xl font-bold mb-2">Lịch Học Lớp 21AD</h1>
            <div className="bottom-12 left-2 md:bottom-16 md:left-6">
              <p className="text-white mb-2">21.00 - 23.30</p>
              <p className="text-slate-300 font-thin">
                {`${days[date.getDay()]},${date.getDate()} ${
                  months[date.getMonth()]
                } ${date.getFullYear()}`}
              </p>
            </div>
            <div className="absolute flex bottom-6 left-6">
              <div className="relative group h-9 w-9 rounded-full overflow-hidden aspect-square">
                <img
                  className="h-full w-full rounded-full aspect-square object-cover"
                  src={user?.photoURL}
                  alt={user?.displayname}
                />
              </div>
              <div className="relative group h-9 w-9 rounded-full overflow-hidden aspect-square ml-2">
                <img
                  className="h-full w-full rounded-full aspect-square object-cover"
                  src="/images/3.webp"
                  alt={user?.displayname}
                />
              </div>
              <div className="relative group h-9 w-9 rounded-full overflow-hidden aspect-square ml-2">
                <img
                  className="h-full w-full rounded-full aspect-square object-cover"
                  src="/images/4.webp"
                  alt={user?.displayname}
                />
              </div>
              <div className="relative flex items-center ml-2">
                <div className="relative group h-9 w-9 rounded-full overflow-hidden aspect-square">
                  <img
                    className="h-full w-full rounded-full aspect-square object-cover"
                    src="/images/5.jpeg"
                    alt={user?.displayname}
                  />
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.01)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <p className="text-white font-bold">+12</p>
                </div>
              </div>
            </div>
            {/* Nút Start */}
            <button className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded absolute bottom-4 right-4">
              Start
            </button>
          </div>




        </div>
        
      </div>


      {isModalOpen && (
        <JoinMeetingModal closeModal={closeModal} joinMeeting={joinMeeting} />
      )}
    </div>
  );
};

export default Home;
