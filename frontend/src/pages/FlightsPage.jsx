import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Filter, SortAsc, Clock, Plane, Info, Search } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import toast from 'react-hot-toast';

const FlightCard = ({ flight, onBook }) => (
  <div className="bg-white border border-gray-100 rounded-[28px] shadow-sm p-5 space-y-4 hover:border-primary/40 transition-all group">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform overflow-hidden">
          {flight.logo ? <img src={flight.logo} className="w-8 h-8 object-contain" alt={flight.airline} /> : <Plane size={24} className="text-secondary rotate-45" />}
        </div>
        <div>
          <h4 className="font-bold text-lg text-gray-900">{flight.airline}</h4>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase font-semibold">{flight.flightNumber}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold text-secondary">${flight.price}</p>
        <p className="text-[10px] text-gray-400 font-medium">per person</p>
      </div>
    </div>
    <div className="flex justify-between items-center bg-surface rounded-2xl p-4 border border-gray-100">
      <div className="text-center"><p className="text-lg font-bold text-gray-900">{flight.departureTime}</p><p className="text-xs text-gray-500">{flight.source}</p></div>
      <div className="flex-1 flex flex-col items-center px-4 relative">
        <div className="w-full h-[1px] bg-gray-200 relative">
          <div className="absolute top-1/2 left-0 w-2 h-2 -translate-y-1/2 rounded-full bg-gray-200"></div>
          <div className="absolute top-1/2 right-0 w-2 h-2 -translate-y-1/2 rounded-full bg-secondary shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          <Plane size={14} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400" />
        </div>
        <p className="text-[10px] text-gray-400 mt-2 font-medium flex items-center"><Clock size={10} className="mr-1" /> {flight.duration}</p>
      </div>
      <div className="text-center"><p className="text-lg font-bold text-gray-900">{flight.arrivalTime}</p><p className="text-xs text-gray-500">{flight.destination}</p></div>
    </div>
    <div className="flex gap-3 pt-2">
      <button onClick={() => onBook(flight)} className="flex-1 bg-primary hover:bg-primary-deep text-white rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 py-2.5 text-sm"><span>Book Now</span></button>
      <button className="p-2.5 rounded-xl border border-gray-100 hover:bg-surface transition-colors"><Info size={18} className="text-gray-400" /></button>
    </div>
  </div>
);

const FlightsPage = () => {
  const location = useLocation();
  const searchParams = location.state || {};
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleBook = (flight) => navigate('/booking-flow', { state: { flight, searchParams } });

  React.useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams({ from: searchParams.from || '', to: searchParams.to || '', type: searchParams.type || 'Domestic' }).toString();
        const response = await fetch(`http://localhost:5000/api/flights/search?${query}`);
        const result = await response.json();
        if (result.success) {
          if (result.categoryMismatch) {
            toast.error(result.message);
          }
          const formattedFlights = result.data.map(f => {
            const depDate = new Date(f.departureTime);
            const arrDate = new Date(f.arrivalTime);
            
            const depTime = isNaN(depDate.getTime()) ? f.departureTime : depDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            const arrTime = isNaN(arrDate.getTime()) ? f.arrivalTime : arrDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            
            let duration = f.duration;
            if (!duration && !isNaN(depDate.getTime()) && !isNaN(arrDate.getTime())) {
              const diff = arrDate - depDate;
              duration = `${Math.round(diff / (1000 * 60 * 60))}h ${Math.round((diff % (1000 * 60 * 60)) / (1000 * 60))}m`;
            }

            return {
              id: f._id, airline: f.airline, flightNumber: f.flightNumber, source: f.source, destination: f.destination,
              departureTime: depTime,
              arrivalTime: arrTime,
              duration: duration || 'N/A',
              price: f.price, logo: f.logo, category: f.category || f.type || 'Domestic'
            };
          });
          setFlights(formattedFlights);
        }
      } catch (error) { console.error('Error fetching flights:', error); }
      finally { setLoading(false); }
    };
    fetchFlights();
  }, [searchParams]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="bg-white border border-gray-100 rounded-[28px] shadow-sm p-4 flex items-center justify-between border-gray-200">
          <div className="flex items-center space-x-3">
             <div className="bg-surface p-2 rounded-lg ring-1 ring-gray-200"><Search size={18} className="text-secondary" /></div>
             <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{searchParams.type || 'Domestic'} • {searchParams.passengers || 1} Pax</p>
                <p className="font-bold text-sm text-gray-900 tracking-tight">{searchParams.from || 'Chennai'} → {searchParams.to || 'Bangalore'}</p>
             </div>
          </div>
          <button className="text-xs bg-surface text-secondary px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all font-bold">Edit</button>
        </div>
        <div className="flex justify-between items-center py-2 px-1">
          <div className="flex items-center space-x-2">
             <Filter size={16} className="text-gray-400" />
             <p className="text-xs font-bold text-gray-500">Filters:</p>
             <div className="flex gap-2 overflow-x-auto no-scrollbar ml-2">
                {['Price', 'Time', 'Airline'].map(f => (
                  <button key={f} className="text-[10px] bg-surface border border-gray-100 px-3 py-1 rounded-full whitespace-nowrap hover:bg-gray-100 transition-all uppercase tracking-widest font-bold text-gray-600">{f}</button>
                ))}
             </div>
          </div>
          <button className="flex items-center text-[10px] bg-surface border border-gray-100 px-3 py-1 rounded-full uppercase tracking-widest font-bold hover:bg-gray-100 transition-all text-gray-600"><SortAsc size={14} className="mr-1" /> Sort</button>
        </div>
        <div className="space-y-4 pb-10">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-secondary rounded-full animate-spin"></div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Searching for flights...</p>
             </div>
          ) : (
            <>
              {flights.map((flight, i) => (
                <div key={flight.id} className="animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                  <FlightCard flight={flight} onBook={handleBook} />
                </div>
              ))}
              {flights.length === 0 && (
                <div className="text-center py-20 space-y-4 bg-white border border-gray-100 rounded-[28px] shadow-sm">
                  <div className="bg-surface w-16 h-16 rounded-full flex items-center justify-center mx-auto"><Plane size={32} className="text-primary/40 rotate-45" /></div>
                  <h4 className="text-xl font-bold text-gray-500">No flights found</h4>
                  <p className="text-sm text-gray-400">Try adjusting your filters or search keywords.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default FlightsPage;
