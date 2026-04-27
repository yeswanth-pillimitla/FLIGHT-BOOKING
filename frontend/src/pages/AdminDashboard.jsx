import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Users, FileText, DollarSign, ShieldAlert, Plus, Plane, XCircle, Settings, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ usersCount: 0, bookingsCount: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cancellations, setCancellations] = useState([]);
  const [flights, setFlights] = useState([]);
  
  const [newFlight, setNewFlight] = useState({
    airline: '', flightNumber: '', source: '', destination: '', departureTime: '', arrivalTime: '', price: '', category: 'Domestic'
  });

  useEffect(() => { if (user && user.role !== 'admin') navigate('/'); }, [user, navigate]);

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!token) return;
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [usersRes, bookingsRes, revenueRes, cancelRes, flightsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/all-users', config),
          axios.get('http://localhost:5000/api/admin/all-bookings', config),
          axios.get('http://localhost:5000/api/admin/revenue', config),
          axios.get('http://localhost:5000/api/admin/cancellations', config),
          axios.get('http://localhost:5000/api/flights') // Public or admin route
        ]);
        setStats({ usersCount: usersRes.data.count, bookingsCount: bookingsRes.data.count, revenue: revenueRes.data.data });
        setCancellations(cancelRes.data.data || []);
        setFlights(flightsRes.data.data || []);
      } catch (err) { toast.error('Failed to load admin terminal data'); }
      finally { setLoading(false); }
    };
    fetchAdminData();
  }, [token, activeTab]);

  const handleAddFlight = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('http://localhost:5000/api/admin/flights', newFlight, config);
      toast.success('Flight added successfully');
      setNewFlight({ airline: '', flightNumber: '', source: '', destination: '', departureTime: '', arrivalTime: '', price: '', category: 'Domestic' });
      setActiveTab('dashboard'); // trigger re-fetch
    } catch (err) { toast.error('Failed to add flight'); }
  };

  const handleApproveCancel = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`http://localhost:5000/api/admin/cancellations/${id}/approve`, {}, config);
      toast.success('Cancellation approved & refund processed');
      setCancellations(cancellations.filter(c => c._id !== id));
    } catch (err) { toast.error('Failed to approve cancellation'); }
  };

  const handleUpdateFlightStatus = async (id, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`http://localhost:5000/api/admin/flights/${id}/status`, { status }, config);
      toast.success(`Flight status updated to ${status}`);
      setFlights(flights.map(f => f._id === id ? { ...f, status } : f));
    } catch (err) { toast.error('Failed to update flight status'); }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  if (!user || user.role !== 'admin') {
    return <div className="min-h-screen bg-white flex items-center justify-center text-red-500 font-bold">UNAUTHORIZED ACCESS</div>;
  }

  return (
    <div className="min-h-screen bg-surface text-dark p-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-[32px] border border-gray-100 shadow-xl mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-surface p-3 rounded-xl border border-gray-100"><ShieldAlert className="text-primary" /></div>
          <div>
            <h1 className="text-2xl font-black text-dark tracking-tight uppercase">Admin Terminal</h1>
            <p className="text-[10px] text-secondary uppercase tracking-[0.3em] font-black">System Override Active</p>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-2xl transition-all border border-red-100 shadow-sm font-black uppercase tracking-widest text-[10px]">
          <LogOut size={18} /><span>Terminate Session</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-primary font-black uppercase tracking-[0.3em] animate-pulse text-xs">Loading Terminal Data...</div>
      ) : (
        <div className="space-y-8">
          <div className="flex space-x-4 border-b border-gray-200 pb-4">
            <button onClick={() => setActiveTab('dashboard')} className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400 hover:bg-surface'}`}>Dashboard</button>
            <button onClick={() => setActiveTab('flights')} className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${activeTab === 'flights' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400 hover:bg-surface'}`}>Manage Flights</button>
            <button onClick={() => setActiveTab('cancellations')} className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${activeTab === 'cancellations' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400 hover:bg-surface'}`}>
              <span>Cancellations</span>
              {cancellations.length > 0 && <span className="bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px]">{cancellations.length}</span>}
            </button>
          </div>

          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-xl relative overflow-hidden group hover:border-green-300 transition-colors">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50/50 rounded-full blur-2xl group-hover:bg-green-100/50 transition-all" />
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Revenue</h2>
                  <DollarSign className="text-green-600" />
                </div>
                <p className="text-4xl font-black text-dark tracking-tight">${stats.revenue.toLocaleString()}</p>
              </div>
              <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-xl relative overflow-hidden group hover:border-primary/30 transition-colors">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-surface rounded-full blur-2xl group-hover:bg-gray-100 transition-all" />
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Bookings</h2>
                  <FileText className="text-secondary" />
                </div>
                <p className="text-4xl font-black text-dark tracking-tight">{stats.bookingsCount}</p>
              </div>
              <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-xl relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-surface rounded-full blur-2xl group-hover:bg-gray-100 transition-all" />
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Users</h2>
                  <Users className="text-primary" />
                </div>
                <p className="text-4xl font-black text-dark tracking-tight">{stats.usersCount}</p>
              </div>
            </div>
          )}

          {activeTab === 'flights' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-xl">
                <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center"><Plus className="mr-2 text-primary" size={20} /> Add New Flight</h3>
                <form onSubmit={handleAddFlight} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Airline Name" className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20" value={newFlight.airline} onChange={(e) => setNewFlight({...newFlight, airline: e.target.value})} required />
                    <input type="text" placeholder="Flight Number" className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20" value={newFlight.flightNumber} onChange={(e) => setNewFlight({...newFlight, flightNumber: e.target.value})} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Origin" className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20" value={newFlight.source} onChange={(e) => setNewFlight({...newFlight, source: e.target.value})} required />
                    <input type="text" placeholder="Destination" className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20" value={newFlight.destination} onChange={(e) => setNewFlight({...newFlight, destination: e.target.value})} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Departure</label>
                      <input type="datetime-local" className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20" value={newFlight.departureTime} onChange={(e) => setNewFlight({...newFlight, departureTime: e.target.value})} required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Arrival</label>
                      <input type="datetime-local" className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20" value={newFlight.arrivalTime} onChange={(e) => setNewFlight({...newFlight, arrivalTime: e.target.value})} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" placeholder="Price ($)" className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20" value={newFlight.price} onChange={(e) => setNewFlight({...newFlight, price: e.target.value})} required />
                    <select className="w-full bg-surface border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20" value={newFlight.category} onChange={(e) => setNewFlight({...newFlight, category: e.target.value})}>
                      <option value="Domestic">Domestic</option>
                      <option value="International">International</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-primary hover:bg-primary-deep text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all mt-4">Create Flight</button>
                </form>
              </div>

              <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-xl max-h-[600px] overflow-y-auto">
                <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center"><Plane className="mr-2 text-secondary" size={20} /> Flight Status Management</h3>
                <div className="space-y-4">
                  {flights.map(f => (
                    <div key={f._id} className="bg-surface p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm">{f.airline} <span className="text-secondary">{f.flightNumber}</span></p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{f.source} → {f.destination}</p>
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md mt-2 inline-block ${f.status === 'active' ? 'bg-green-100 text-green-600' : f.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                          {f.status || 'active'}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {(!f.status || f.status === 'active') && (
                          <>
                            <button onClick={() => handleUpdateFlightStatus(f._id, 'maintenance')} className="text-[8px] font-black uppercase tracking-widest bg-orange-50 hover:bg-orange-100 text-orange-600 px-3 py-2 rounded-lg transition-colors border border-orange-200">Maintenance</button>
                            <button onClick={() => handleUpdateFlightStatus(f._id, 'cancelled')} className="text-[8px] font-black uppercase tracking-widest bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg transition-colors border border-red-200">Cancel Flight</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  {flights.length === 0 && <p className="text-xs font-bold text-gray-400 text-center py-8">No flights found in database.</p>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cancellations' && (
            <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-xl animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center"><XCircle className="mr-2 text-red-500" size={20} /> Pending Cancellation Requests</h3>
              {cancellations.length === 0 ? (
                <div className="text-center py-10">
                  <CheckCircle2 size={40} className="mx-auto text-green-500 mb-4 opacity-50" />
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No pending requests</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cancellations.map(c => (
                    <div key={c._id} className="bg-surface p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm">{c.passengerDetails?.fullName || c.user?.name} <span className="text-secondary">Ref: {c._id.substring(c._id.length - 8).toUpperCase()}</span></p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Flight: {c.flight?.airline} {c.flight?.flightNumber} | Seat: {c.seatNumber}</p>
                        <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mt-1">Refund Amount: ${c.totalAmount}</p>
                      </div>
                      <button onClick={() => handleApproveCancel(c._id)} className="bg-primary hover:bg-primary-deep text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20">
                        Approve & Refund
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
