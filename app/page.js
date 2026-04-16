"use client";
import { useState } from "react";
import BottomNav from "../components/BottomNav";
import LecturesTab from "../components/tabs/LecturesTab";
import MessagesTab from "../components/tabs/MessagesTab";
import CommunauteTab from "../components/tabs/CommunauteTab";
import PrieresTab from "../components/tabs/PrieresTab";
import ProfilTab from "../components/tabs/ProfilTab";

export default function App() {
  const [activeTab, setActiveTab] = useState("lectures");

  const tabs = {
    lectures: <LecturesTab />,
    messages: <MessagesTab />,
    communaute: <CommunauteTab />,
    prieres: <PrieresTab />,
    profil: <ProfilTab />,
  };

  return (
    <div className="h-screen flex flex-col max-w-xl mx-auto overflow-hidden">
      <div className="flex-1 overflow-hidden pb-14">
        {tabs[activeTab]}
      </div>
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}
