"use client";
import { useState } from "react";
import BottomNav from "../components/BottomNav";
import LecturesTab from "../components/tabs/LecturesTab";
import HomelieTab from "../components/tabs/HomelieTab";
import QuizzTab from "../components/tabs/QuizzTab";

export default function App() {
  const [activeTab, setActiveTab] = useState("lectures");
  const [date, setDate] = useState("2026-05-18");

  return (
    <div className="h-screen flex flex-col max-w-xl mx-auto overflow-hidden">
      <div className="flex-1 overflow-hidden pb-16">
        {activeTab === "lectures" && (
          <LecturesTab date={date} onDateChange={setDate} />
        )}
        {activeTab === "homelie" && <HomelieTab date={date} />}
        {activeTab === "quizz" && <QuizzTab date={date} />}
      </div>
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}
