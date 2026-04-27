import React, { useState } from 'react';
import { Ticket, Calendar, Download, XCircle, MapPin, Plane, CheckCircle2, History, Edit2, X, User as UserIcon } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import toast from 'react-hot-toast';

const EditModal = ({ booking, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    passengerName: booking.passenger,
    gender: booking.gender || 'Male',
    dob: booking.dob || '',
    contactNumber: booking.contactNumber || '',
    email: booking.email || '',
    seatNumber: booking.seat || '',
    seatType: booking.seatType || 'Window',
    travelDate: booking.rawDate || '',
    travelTime: booking.time || '',
    seatClass: booking.class,
    passengerCount: booking.passengerCount || 1,
    baggage: booking.baggage || '15kg',
    extraBaggage: booking.extraBaggage || false,
    mealPreference: booking.mealPreference || 'Standard'
  });
  const [loading, setLoading] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [availableFlights, setAvailableFlights] = useState([]);

  React.useEffect(() => {
    const fetchSeats = async () => {
      if (!booking.flightId) return;
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/bookings/flight/${booking.flightId}/seats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) setBookedSeats(data.data);
      } catch (e) {
        console.error('Error fetching seats', e);
      }
    };
    
    const fetchFlights = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/flights/search?from=${booking.source}&to=${booking.destination}`);
        const data = await res.json();
        if(data.success) setAvailableFlights(data.data);
      } catch(e) {}
    };

    if (isOpen) {
      fetchSeats();
      fetchFlights();
    }
  }, [booking.flightId, booking.source, booking.destination, isOpen]);

  if (!isOpen) return null;

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setFormData({...formData, travelDate: newDate});
    
    // Check if flights exist on this date
    const flightsOnDate = availableFlights.filter(f => new Date(f.departureTime).toISOString().split('T')[0] === newDate);
    
    if (flightsOnDate.length === 0 && availableFlights.length > 0) {
       const availableDates = [...new Set(availableFlights.map(f => new Date(f.departureTime).toISOString().split('T')[0]))];
       toast.error(`No flights available on this date.`);
       setTimeout(() => toast(`Available dates: ${availableDates.join(', ')}`, { icon: 'ℹ️' }), 500);
    } else if (flightsOnDate.length > 0) {
       const times = flightsOnDate.map(f => new Date(f.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}));
       toast.success(`Flights available at: ${times.join(', ')}`);
       if(flightsOnDate.length === 1) {
          setFormData(prev => ({...prev, travelTime: times[0], travelDate: newDate}));
       }
    }
  };

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat) && seat !== booking.seat) {
      toast.error('Seat already booked.');
      return;
    }
    setFormData({...formData, seatNumber: seat});
  };

  const renderSeatGrid = () => {
    let rowStart, rowEnd, cols;

    if (formData.seatClass === 'First Class') {
      rowStart = 1; rowEnd = 4; cols = ['A','B','C','D'];
    } else if (formData.seatClass === 'Business') {
      rowStart = 5; rowEnd = 14; cols = ['A','B','C','D','E','F'];
    } else {
      rowStart = 15; rowEnd = 30; cols = ['A','B','C','D','E','F'];
    }

    const gridCells = [];
    for (let r = rowStart; r <= rowEnd; r++) {
      cols.forEach(c => gridCells.push(`${r}${c}`));
    }

    return (
      <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm mt-2">
        <div className={`grid gap-2 justify-center ${cols.length === 4 ? 'grid-cols-4' : 'grid-cols-6'}`}>
          {gridCells.map(seat => {
            const isBooked = bookedSeats.includes(seat) && seat !== booking.seat;
            const isSelected = formData.seatNumber === seat;
            
            let btnClass = "aspect-square rounded-lg border flex items-center justify-center transition-all shadow-sm w-10 h-10 ";
            if (isBooked) {
              btnClass += "bg-red-50 border-red-100 text-red-400 cursor-not-allowed opacity-60";
            } else if (isSelected) {
              btnClass += "bg-primary border-primary text-white scale-110 shadow-primary/20";
            } else {
              btnClass += "bg-surface border-gray-200 hover:bg-green-50 hover:border-green-200 hover:text-green-600 text-gray-500 cursor-pointer";
            }

            return (
              <button 
                type="button"
                key={seat}
                onClick={() => handleSeatClick(seat)}
                disabled={isBooked}
                className={btnClass}
              >
                <span className="text-[10px] font-bold">{seat}</span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-50">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-surface border border-gray-200 rounded-sm"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-50 border border-red-100 rounded-sm"></div>
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Booked</span>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/bookings/${booking._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Booking Updated Successfully');
        onUpdate(data.data);
        onClose();
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch (error) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="bg-primary p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Edit Booking</h3>
            <p className="text-[10px] uppercase tracking-widest opacity-70 font-bold mt-1">Ref ID: {booking.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Passenger Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-secondary uppercase tracking-[0.2em] border-b border-gray-100 pb-2">1. Passenger Details</h4>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="text" className="w-full bg-surface border border-gray-100 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-primary/20 outline-none" value={formData.passengerName} onChange={(e) => setFormData({...formData, passengerName: e.target.value})} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                <select className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-primary/20 outline-none appearance-none" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Date of Birth</label>
                <input type="date" className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-primary/20 outline-none" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Contact Number</label>
                <input type="tel" className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-primary/20 outline-none" value={formData.contactNumber} onChange={(e) => setFormData({...formData, contactNumber: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                <input type="email" className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-primary/20 outline-none" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>
          </div>

          {/* Section 2: Seat Selection */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-secondary uppercase tracking-[0.2em] border-b border-gray-100 pb-2">2. Seat Selection</h4>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Seat Class</label>
              <select className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-primary/20 outline-none appearance-none" value={formData.seatClass} onChange={(e) => setFormData({...formData, seatClass: e.target.value, seatNumber: ''})}>
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>

            <div className="pt-2">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Choose your Seat</label>
               {renderSeatGrid()}
            </div>
          </div>

          {/* Section 3: Travel Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-secondary uppercase tracking-[0.2em] border-b border-gray-100 pb-2">3. Travel Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Travel Date</label>
                <input type="date" className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-primary/20 outline-none" value={formData.travelDate} onChange={handleDateChange} required />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Travel Time</label>
                <input type="time" className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-primary/20 outline-none" value={formData.travelTime} onChange={(e) => setFormData({...formData, travelTime: e.target.value})} required />
              </div>
            </div>
            <div className="space-y-1.5 mt-4">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Passengers</label>
              <input type="number" min="1" className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-primary/20 outline-none" value={formData.passengerCount} onChange={(e) => setFormData({...formData, passengerCount: e.target.value})} required />
            </div>
          </div>

          {/* Section 4: Baggage */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-secondary uppercase tracking-[0.2em] border-b border-gray-100 pb-2">4. Baggage</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Weight Allowance</label>
                <select className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-primary/20 outline-none appearance-none" value={formData.baggage} onChange={(e) => setFormData({...formData, baggage: e.target.value})}>
                  <option value="15kg">15kg Standard</option>
                  <option value="20kg">20kg Premium</option>
                  <option value="25kg">25kg Elite</option>
                </select>
              </div>
              <div className="flex items-center mt-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20" checked={formData.extraBaggage} onChange={(e) => setFormData({...formData, extraBaggage: e.target.checked})} />
                  <span className="text-sm font-bold text-gray-700">Add Extra Baggage (+5kg)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 sticky bottom-0 bg-white shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] py-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-deep text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <><span>Update Booking</span></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BookingCard = ({ booking, onEdit, onCancel }) => {
  const handleDownload = () => toast.success('Downloading ticket...');
  const handleCancelClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/bookings/${booking._id}/cancel`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        onCancel(); // Trigger re-fetch
      } else {
        toast.error(data.message || 'Failed to cancel booking');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  const isEditable = booking.status === 'Confirmed';

  let statusBg = 'bg-green-50 text-green-600';
  if (booking.status === 'Cancelled') statusBg = 'bg-red-50 text-red-500';
  if (booking.status === 'pending_cancellation') statusBg = 'bg-orange-50 text-orange-500';

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden group">
      <div className={`py-1.5 px-4 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-between ${statusBg}`}>
        <span className="flex items-center"><CheckCircle2 size={12} className="mr-1.5" /> {booking.status === 'pending_cancellation' ? 'Pending Cancellation' : booking.status}</span>
        <span>ID: {booking.id}</span>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
             <div className="bg-surface p-2 rounded-lg border border-gray-100"><Plane size={18} className="text-secondary rotate-45" /></div>
             <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{booking.airline}</p>
                <p className="font-bold text-lg text-gray-900">{booking.source} → {booking.destination}</p>
             </div>
          </div>
          <div className="text-right">
             <p className="text-sm font-bold text-gray-700">{booking.date}</p>
             <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{booking.class}</p>
          </div>
        </div>
        <div className="flex divide-x divide-gray-100 py-3 border-y border-gray-50">
           <div className="flex-1 pr-4"><p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Passenger</p><p className="text-sm font-medium text-gray-800">{booking.passenger}</p></div>
           <div className="flex-1 px-4 text-center"><p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Seat</p><p className="text-sm font-medium text-gray-800">{booking.seat}</p></div>
           <div className="flex-1 pl-4 text-right"><p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Gate</p><p className="text-sm font-medium text-gray-800">{booking.gate}</p></div>
        </div>
        <div className="flex gap-3 pt-1">
          <button disabled={!isEditable} onClick={() => onEdit(booking)} className="flex-1 bg-surface hover:bg-gray-100 text-secondary py-2.5 rounded-xl text-xs font-bold transition-all border border-gray-100 flex items-center justify-center space-x-2 disabled:opacity-30 disabled:cursor-not-allowed">
            <Edit2 size={14} /><span>Edit</span>
          </button>
          <button onClick={handleDownload} className="px-4 bg-surface hover:bg-gray-50 text-primary py-2.5 rounded-xl text-xs font-bold transition-all border border-gray-100 flex items-center justify-center">
            <Download size={14} />
          </button>
          <button disabled={!isEditable} onClick={handleCancelClick} className="px-4 bg-red-50 hover:bg-red-100 text-red-500 border border-red-200 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed">
            <XCircle size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingBooking, setEditingBooking] = useState(null);

  const formatBooking = (b) => ({
    _id: b._id,
    id: b._id.substring(b._id.length - 8).toUpperCase(), 
    flightId: b.flight?._id,
    airline: b.flight?.airline || 'N/A', 
    source: b.flight?.source || 'N/A', 
    destination: b.flight?.destination || 'N/A',
    date: new Date(b.passengerDetails?.travelDate || b.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
    rawDate: b.passengerDetails?.travelDate ? new Date(b.passengerDetails.travelDate).toISOString().split('T')[0] : (b.flight?.departureTime ? new Date(b.flight.departureTime).toISOString().split('T')[0] : new Date(b.createdAt).toISOString().split('T')[0]),
    time: b.passengerDetails?.travelTime || (b.flight?.departureTime ? new Date(b.flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A'),
    passenger: b.passengerDetails?.fullName || b.passengerDetails?.name || 'Passenger',
    passengerCount: b.passengerDetails?.passengerCount || 1,
    gender: b.passengerDetails?.gender || 'Male',
    dob: b.passengerDetails?.dob || '',
    contactNumber: b.passengerDetails?.contactNumber || b.passengerDetails?.mobile || '',
    email: b.passengerDetails?.email || '',
    seat: b.seatNumber, 
    seatType: b.passengerDetails?.seatType || 'Window',
    baggage: b.passengerDetails?.baggagePreference || '15kg',
    extraBaggage: b.passengerDetails?.extraBaggage || false,
    mealPreference: b.passengerDetails?.mealPreference || 'Standard',
    gate: 'TBA', 
    status: b.bookingStatus, 
    class: b.passengerDetails?.seatClass || b.flight?.category || 'Economy'
  });

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/bookings/my-bookings', { headers: { 'Authorization': `Bearer ${token}` } });
      const result = await response.json();
      if (result.success) {
        setBookings(result.data.map(formatBooking));
      }
    } catch (error) { console.error('Error fetching bookings:', error); }
    finally { setLoading(false); }
  };

  React.useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdate = (updatedRaw) => {
    const updatedFormatted = formatBooking(updatedRaw);
    setBookings(prev => prev.map(b => b._id === updatedFormatted._id ? updatedFormatted : b));
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between ml-2">
           <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">My Bookings</h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Found {bookings.length} reservations</p>
           </div>
           <div className="bg-surface p-2 rounded-xl border border-gray-100"><History size={20} className="text-secondary" /></div>
        </div>
        <div className="space-y-6 pb-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
               <div className="w-12 h-12 border-4 border-gray-100 border-t-primary rounded-full animate-spin"></div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Loading your trips...</p>
            </div>
          ) : (
            <>
              {bookings.map((booking, idx) => (
                <div key={booking._id} className="animate-in fade-in slide-in-from-bottom-6 duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                  <BookingCard booking={booking} onEdit={setEditingBooking} onCancel={fetchBookings} />
                </div>
              ))}
              {bookings.length === 0 && (
                <div className="text-center py-20 space-y-6 bg-white border border-gray-100 rounded-2xl shadow-sm px-8">
                  <div className="bg-surface w-24 h-24 rounded-full flex items-center justify-center mx-auto ring-2 ring-gray-100 animate-pulse">
                    <Ticket size={48} className="text-secondary/30 -rotate-12" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-gray-800">No bookings yet</h4>
                    <p className="text-sm text-gray-400 max-w-[200px] mx-auto leading-relaxed">Your future journeys will appear here once you book them.</p>
                  </div>
                  <button onClick={() => window.location.href='/user-dashboard'} className="bg-primary hover:bg-primary-deep text-white px-10 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20 active:scale-95">Find Flights</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {editingBooking && (
        <EditModal 
          booking={editingBooking} 
          isOpen={!!editingBooking} 
          onClose={() => setEditingBooking(null)} 
          onUpdate={handleUpdate}
        />
      )}
    </MainLayout>
  );
};

export default BookingsPage;
