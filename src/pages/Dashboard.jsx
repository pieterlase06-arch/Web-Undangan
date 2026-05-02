import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = ({ setView, invitationData, guestCount }) => {
  return (
    <div className="p-10 max-w-[1200px] mx-auto flex flex-col gap-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="serif text-4xl text-stone-900">Welcome back, Piter</h1>
          <p className="text-stone-500 mt-2 italic">Ready to craft your next masterpiece?</p>
        </div>
        <button 
          onClick={() => setView('catalog')}
          className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          + Create New Invitation
        </button>
      </header>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm flex flex-col gap-4">
          <span className="material-symbols-outlined text-amber-500 text-3xl">favorite</span>
          <p className="text-4xl serif font-bold text-stone-900">1</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Active Design</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm flex flex-col gap-4">
          <span className="material-symbols-outlined text-blue-500 text-3xl">group</span>
          <p className="text-4xl serif font-bold text-stone-900">{guestCount}</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Guests Tracked</p>
        </div>
        <div className="bg-stone-900 p-8 rounded-3xl shadow-2xl flex flex-col gap-4 text-white relative overflow-hidden">
          <span className="material-symbols-outlined text-[#C5A059] text-3xl">auto_awesome</span>
          <p className="text-4xl serif font-bold">12</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Days to Event</p>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 blur-3xl rounded-full"></div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-stone-50 flex justify-between items-center">
            <h2 className="serif text-2xl">Current Design</h2>
            <button onClick={() => setView('editor')} className="text-[#C5A059] font-bold text-[10px] uppercase tracking-widest hover:underline">Edit Canvas</button>
          </div>
          <div className="p-8 flex-1 flex items-center gap-10">
            <div className="w-48 aspect-[4/5] bg-stone-50 rounded-xl border border-stone-100 shadow-inner flex items-center justify-center p-4">
               <div className="w-full h-full bg-white shadow-lg rounded-sm border border-stone-50 flex flex-col items-center justify-center text-[6px] gap-1 p-2 text-center overflow-hidden">
                  <p className="serif font-bold scale-[0.6] opacity-40">{invitationData.partner1} & {invitationData.partner2}</p>
                  <div className="w-4 h-px bg-stone-100" />
                  <p className="opacity-20 scale-[0.5]">{invitationData.venue}</p>
               </div>
            </div>
            <div className="space-y-6">
               <div>
                 <h3 className="serif text-xl font-bold text-stone-800">{invitationData.partner1} & {invitationData.partner2} Wedding</h3>
                 <p className="text-stone-400 text-sm mt-1">Last edited 2 minutes ago</p>
               </div>
               <div className="flex gap-4">
                  <button onClick={() => setView('editor')} className="bg-[#0F172A] text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl hover:bg-stone-800 transition-all">Resume Design</button>
                  <button className="px-6 py-3 border border-stone-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:bg-stone-50">Share Link</button>
               </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4 flex flex-col gap-6">
           <div className="bg-[#C5A059] p-8 rounded-3xl text-white shadow-xl flex flex-col gap-4">
              <h3 className="serif text-xl">Upgrade to Gold</h3>
              <p className="text-white/80 text-sm leading-relaxed">Unlock premium layouts, music integration, and custom domains.</p>
              <button className="bg-white text-[#C5A059] py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest mt-2 hover:bg-[#F8F5F2] transition-all">Go Premium</button>
           </div>
           <div className="bg-stone-50 p-8 rounded-3xl border border-dashed border-stone-200 flex flex-col items-center justify-center text-center gap-2">
              <span className="material-symbols-outlined text-stone-300">help</span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Need Help?</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
