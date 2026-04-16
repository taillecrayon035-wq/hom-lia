"use client";
import { useState } from "react";
import { today } from "../data/mockData";
import BottomNav from "../components/BottomNav";
import LecturesTab from "../components/tabs/LecturesTab";
import HomelieTab from "../components/tabs/HomelieTab";

export default function App() {
  const [activeTab, setActiveTab] = useState("lectures");
  const [date, setDate] = useState("2026-04-19");

  return (
    <div className="h-screen flex flex-col max-w-xl mx-auto overflow-hidden">
      <div className="flex-1 overflow-hidden pb-16">
        {activeTab === "lectures" ? (
          <LecturesTab date={date} onDateChange={setDate} />
        ) : (
          <HomelieTab date={date} />
        )}
      </div>
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}
