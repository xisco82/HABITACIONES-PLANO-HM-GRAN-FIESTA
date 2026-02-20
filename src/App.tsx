import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Plus, 
  Trash2, 
  Info, 
  Hotel,
  Accessibility,
  Waves,
  Sun,
  ArrowUp,
  ArrowDown,
  Layers
} from 'lucide-react';
import { RoomData, Observation } from './types';
import { getFloorData } from './data';

// --- Components ---

interface RoomCardProps {
  room: RoomData;
  onClick: () => void;
  observations: Observation[];
  orientation: 'top' | 'left' | 'right';
}

const RoomCard: React.FC<RoomCardProps> = ({ 
  room, 
  onClick, 
  observations,
  orientation
}) => {
  const isService = room.type === 'SERVICE';
  const hasObservations = observations.length > 0;
  
  if (isService) {
    return (
      <div className="w-full h-24 flex items-center justify-center border border-slate-800 bg-white text-slate-800 text-xs font-bold tracking-wider my-0.5 print:border-slate-800">
        {room.label}
      </div>
    );
  }

  // Layout classes based on orientation
  const containerClasses = {
    top: "flex-col h-32 w-24",
    left: "flex-row h-20 w-48",
    right: "flex-row-reverse h-20 w-48"
  };

  const balconyClasses = {
    top: "h-8 w-full border-b border-slate-300 bg-blue-100",
    left: "w-12 h-full border-r border-slate-300 bg-blue-100",
    right: "w-12 h-full border-l border-slate-300 bg-blue-100"
  };

  const doorClasses = {
    top: "absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-8 h-2 bg-blue-600",
    left: "absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-8 bg-blue-600",
    right: "absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-8 bg-blue-600"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative flex bg-white border border-slate-800 transition-colors my-0.5 group overflow-visible
        ${containerClasses[orientation]}
        ${hasObservations ? 'bg-amber-50' : ''}
      `}
    >
      {/* Balcony/Window Area */}
      <div className={`${balconyClasses[orientation]} flex-shrink-0`} />

      {/* Main Room Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-1 relative w-full overflow-hidden">
        <span className="text-lg font-bold text-slate-900 font-mono leading-none">
          {room.number}
        </span>
        
        {/* Observations Text - Small and compact */}
        {hasObservations && (
          <div className="w-full mt-1 text-[9px] leading-tight text-amber-900 font-medium text-center overflow-hidden px-1">
            {observations.map((obs) => (
              <span key={obs.id} className="block truncate">
                {obs.text}
              </span>
            ))}
          </div>
        )}

        {/* Accessibility Icon */}
        {room.isAccessible && (
          <div className="absolute bottom-1 right-1">
            <Accessibility className="w-3 h-3 text-slate-900" />
          </div>
        )}
      </div>

      {/* Door Indicator */}
      <div className={`${doorClasses[orientation]}`} />
    </motion.button>
  );
};

const FloorSelector = ({ current, onChange }: { current: number, onChange: (f: number) => void }) => (
  <div className="flex flex-col items-center gap-2 mb-6">
    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
      <Layers className="w-3 h-3" /> Seleccionar Planta
    </span>
    <div className="flex gap-2 overflow-x-auto pb-2 max-w-full justify-center px-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(floor => (
        <button
          key={floor}
          onClick={() => onChange(floor)}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all flex-shrink-0
            ${current === floor 
              ? 'bg-blue-600 text-white shadow-lg scale-110 ring-2 ring-blue-200' 
              : 'bg-white text-slate-600 hover:bg-blue-50 border border-slate-200'}
          `}
        >
          {floor}
        </button>
      ))}
    </div>
  </div>
);

import { getAllIssues } from './issues';

const Modal = ({ 
  isOpen, 
  onClose, 
  room, 
  observations, 
  onAddObservation, 
  onDeleteObservation 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  room: RoomData | null; 
  observations: Observation[]; 
  onAddObservation: (text: string) => void; 
  onDeleteObservation: (id: string) => void; 
}) => {
  const [newObs, setNewObs] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const allIssues = useMemo(() => getAllIssues(), []);

  // Reset state when modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      setNewObs('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewObs(value);

    if (value.trim().length > 0) {
      const filtered = allIssues.filter(issue => 
        issue.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onAddObservation(suggestion);
    setNewObs('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  if (!isOpen || !room) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newObs.trim()) {
      onAddObservation(newObs);
      setNewObs('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-md h-fit max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  Habitación {room.number}
                  {room.isAccessible && <Accessibility className="w-5 h-5 text-blue-500" />}
                </h2>
                <p className="text-sm text-slate-500 font-medium">{room.type}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Room Details Info Box */}
            <div className="px-4 pt-4">
              <div className="bg-blue-50 rounded-lg p-3 grid grid-cols-3 gap-2 text-xs border border-blue-100">
                <div className="flex flex-col">
                  <span className="text-blue-400 font-bold uppercase tracking-wider text-[10px]">Cabezal</span>
                  <span className="font-semibold text-slate-700">{room.headboard || '-'}</span>
                </div>
                <div className="flex flex-col border-l border-blue-200 pl-2">
                  <span className="text-blue-400 font-bold uppercase tracking-wider text-[10px]">TV</span>
                  <span className="font-semibold text-slate-700">{room.tv || '-'}</span>
                </div>
                <div className="flex flex-col border-l border-blue-200 pl-2">
                  <span className="text-blue-400 font-bold uppercase tracking-wider text-[10px]">Cofre</span>
                  <span className="font-semibold text-slate-700">{room.safe || '-'}</span>
                </div>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
              {observations.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p>No hay observaciones registradas.</p>
                </div>
              ) : (
                observations.map((obs) => (
                  <div key={obs.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm group relative">
                    <p className="text-slate-700 text-sm pr-6 font-medium">{obs.text}</p>
                    <span className="text-[10px] text-slate-400 mt-2 block">
                      {new Date(obs.timestamp).toLocaleString()}
                    </span>
                    <button
                      onClick={() => onDeleteObservation(obs.id)}
                      className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Input Area with Predictive Text */}
            <div className="p-4 border-t border-slate-100 bg-white relative">
              
              {/* Suggestions Popup */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-20"
                  >
                    <div className="bg-slate-50 px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      Sugerencias
                    </div>
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors border-b border-slate-50 last:border-0"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit}>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Añadir Observación
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newObs}
                    onChange={handleInputChange}
                    placeholder="Escriba para buscar problemas..."
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!newObs.trim()}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [observations, setObservations] = useState<Record<string, Observation[]>>({});
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);

  const { topRooms, leftRooms, rightRooms } = useMemo(() => getFloorData(currentFloor), [currentFloor]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('hotel-observations');
    if (saved) {
      try {
        setObservations(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load observations', e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('hotel-observations', JSON.stringify(observations));
  }, [observations]);

  const handleAddObservation = (text: string) => {
    if (!selectedRoom) return;
    
    const newObs: Observation = {
      id: crypto.randomUUID(),
      roomId: selectedRoom.id,
      text,
      timestamp: Date.now(),
    };

    setObservations(prev => ({
      ...prev,
      [selectedRoom.id]: [newObs, ...(prev[selectedRoom.id] || [])]
    }));
  };

  const handleDeleteObservation = (id: string) => {
    if (!selectedRoom) return;

    setObservations(prev => ({
      ...prev,
      [selectedRoom.id]: prev[selectedRoom.id].filter(obs => obs.id !== id)
    }));
  };

  const getRoomObs = (id: string) => observations[id] || [];

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 flex flex-col items-center">
      <header className="mb-6 text-center max-w-2xl">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-xl shadow-sm mb-4">
          <Hotel className="w-6 h-6 text-blue-600 mr-2" />
          <h1 className="text-xl font-bold text-slate-800">HM Gran Fiesta</h1>
        </div>
        <p className="text-slate-500 text-sm">
          Gestor de observaciones de habitaciones. Seleccione una planta y haga clic en una habitación.
        </p>
      </header>

      <FloorSelector current={currentFloor} onChange={setCurrentFloor} />

      {/* Floor Plan Container */}
      <motion.div 
        key={currentFloor}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 max-w-4xl w-full relative overflow-hidden"
      >
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-cyan-400" />
        
        {/* Compass / Orientation Labels */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest text-slate-400 uppercase flex flex-col items-center">
          <span>Sea / South</span>
          <Waves className="w-4 h-4 mt-1 text-blue-300" />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest text-slate-400 uppercase flex flex-col items-center">
          <Sun className="w-4 h-4 mb-1 text-amber-300" />
          <span>North / Street</span>
        </div>

        <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          Arenal
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          Palma
        </div>

        {/* Floor Indicator Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-bold text-slate-50 opacity-[0.03] pointer-events-none select-none">
          {currentFloor}
        </div>

        {/* Main Grid Layout */}
        <div className="flex flex-col items-center gap-0 py-12">
          
          {/* Top Rooms */}
          <div className="flex gap-1 mb-8">
            {topRooms.map(room => (
              <div key={room.id}>
                <RoomCard 
                  room={room} 
                  onClick={() => setSelectedRoom(room)}
                  observations={getRoomObs(room.id)}
                  orientation="top"
                />
              </div>
            ))}
          </div>

          {/* Main Corridor Columns */}
          <div className="flex gap-24 relative">
            {/* Left Column */}
            <div className="flex flex-col gap-0">
              {leftRooms.map(room => (
                <RoomCard 
                  key={room.id}
                  room={room} 
                  onClick={() => setSelectedRoom(room)}
                  observations={getRoomObs(room.id)}
                  orientation="left"
                />
              ))}
            </div>

            {/* Central Corridor Space */}
            {/* Removed dashed line to match clean look of image */}
            <div className="w-0" />

            {/* Right Column */}
            <div className="flex flex-col gap-0">
              {rightRooms.map(room => (
                <RoomCard 
                  key={room.id}
                  room={room} 
                  onClick={() => setSelectedRoom(room)}
                  observations={getRoomObs(room.id)}
                  orientation="right"
                />
              ))}
            </div>
          </div>

        </div>

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap justify-between items-end text-xs text-slate-500">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-50 border border-amber-200 rounded-sm" />
              <span>Con observaciones</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white border border-slate-200 rounded-sm" />
              <span>Sin observaciones</span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="font-bold mb-1">Habs. Minusválidos:</p>
            <p>125/126/225</p>
            <p>226/326/426</p>
            <p>526/626/726</p>
            <p>826/926</p>
          </div>
        </div>
      </motion.div>

      <Modal 
        isOpen={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
        room={selectedRoom}
        observations={selectedRoom ? getRoomObs(selectedRoom.id) : []}
        onAddObservation={handleAddObservation}
        onDeleteObservation={handleDeleteObservation}
      />
    </div>
  );
}
