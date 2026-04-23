/* CSS */
const styles = `
:root{
--bg:#f4f7fb;
--card:#ffffff;
--accent:#2563eb;
--muted:#6b7280;
--success:#10b981
}
*{
box-sizing:border-box
}
html,body,#root{
height:100%
}
body{
margin:0;
font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
background:var(--bg);
color:#111
}
.app{
display:flex;
min-height:100vh
}
.sidebar{
width:260px;
background:linear-gradient(180deg,#0f172a,#0b1220);
color:#fff;
padding:20px;
display:flex;
flex-direction:column
}
.logo{
font-weight:700;
font-size:20px;
margin-bottom:10pxrgba(230, 247, 248, 1)rgba(166, 212, 215, 1)rgba(117, 159, 161, 1)rgba(94, 158, 161, 1)rgba(128, 198, 202, 1)
}
.nav{
margin-top:20px;
display:flex;
flex-direction:column;
gap:8px
}
.nav button{
background:transparent;
border:none;
color:#cbd5e1;
padding:10px 12px;
border-radius:8px;
text-align:left;
cursor:pointer
}
.nav button.active{
background:rgba(255,255,255,0.06);
color:#fff
}
.content{
flex:1;
padding:24px
}
.header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:16px
}
.search{
display:flex;
align-items:center;
gap:8px
}
.search input{
padding:8px 12px;border-radius:8px;
border:1px solid #e6eef8;
background:#fff;
min-width:240px
}
rgba(2, 6, 23, 0.5)rgba(2, 6, 23, 0.5)rgba(2, 6, 23, 0.5)rgba(2, 6, 23, 0.5)rgba(2, 6, 23, 0.5)rgba(2, 6, 23, 0.5)rgba(2, 6, 23, 0.5)
.card{
background:var(--card);
border-radius:12px;
padding:16px;box-shadow:0 6px 18px rgba(16,24,40,0.06)
}
.grid{
display:grid;
grid-template-columns:repeat(3,1fr);
gap:16px;margin-bottom:16px
}
.patients-list{
margin-top:12px
}
.table{
width:100%;
border-collapse:collapse
}
.table th, .table td{
padding:10px;
border-bottom:1px solid #eef2f7;
text-align:left
}
.table th{
font-size:13px;
color:var(--muted)
}
.actions button{
margin-right:8px
}
.btn{
padding:8px 12px;
border-radius:8px;
border:none;
background:var(--accent);
color:#fff;
cursor:pointer
}
.btn.secondary{
background:#eef2f7;
color:#111
}
.form-row{
display:flex;
gap:12px
}
.input{
padding:8px;
border-radius:8px;
border:1px solid #e6eef8;background:#fff
}
.small{
font-size:12px;
color:var(--muted)
}
.modal-backdrop{
position:fixed;
inset:0;
background:rgba(2,6,23,0.5);
display:flex;
align-items:center;
justify-content:center
}
.modal{
width:820px;
background:var(--card);
padding:18px;
border-radius:12px
}
.footer{
margin-top:12px;
font-size:12px;
color:var(--muted)
}
.kpi{
display:flex;
flex-direction:column;
gap:6px
}
.kpi .num{
font-size:22px;
font-weight:700
}
.chart-placeholder{
height:120px;
border-radius:8px;
background:linear-gradient(90deg,#eef2ff,#fff);
display:flex;
align-items:center;
justify-content:center;
color:var(--muted)
}
.card-large{
padding:20px
}
.list-compact{
display:flex;
flex-direction:column;
gap:10px
}
.item-pill{
display:flex;
justify-content:space-between;
align-items:center;
padding:10px;
border-radius:10px;
background:#fbfdff;
border:1px solid #eef6ff
}
.badge{
padding:6px 8px;
border-radius:8px;
font-size:12px
}
.badge.green{
background:rgba(16,185,129,0.12);
color:var(--success)
}
.badge.red{
background:rgba(239,68,68,0.08);
color:#ef4444
}
.actions .btn{
padding:6px 8px
}
.search-filters{
display:flex;
gap:8px;
align-items:center
}

/* Responsive */
@media (max-width: 980px){
.grid{
grid-template-columns:repeat(2,1fr)
}
.sidebar{
display:none
}}
@media (max-width: 640px){
.grid{
grid-template-columns:1fr
}}
`;

/* JS (Logic & Data) */
import React, {useState, useEffect} from 'react';

// === Mock Data ===
const samplePatients = [
  {id:'P1001',name:'Rohit Sharma',age:29,gender:'M',phone:'9876543210',lastVisit:'2025-11-10',condition:'Fever'},
  {id:'P1002',name:'Anita Verma',age:34,gender:'F',phone:'9123456780',lastVisit:'2025-10-20',condition:'Diabetes'},
  {id:'P1003',name:'Vikram Singh',age:42,gender:'M',phone:'9988776655',lastVisit:'2025-09-01',condition:'Hypertension'},
  {id:'P1004',name:'Pooja Patel',age:24,gender:'F',phone:'9012345678',lastVisit:'2025-11-12',condition:'Pregnancy'},
  {id:'P1005',name:'Sunil Joshi',age:55,gender:'M',phone:'9001122334',lastVisit:'2025-08-04',condition:'Cardiac'},
  {id:'P1006',name:'Meena Kumari',age:63,gender:'F',phone:'8899776655',lastVisit:'2025-10-28',condition:'Arthritis'},
  {id:'P1007',name:'Aman Chauhan',age:18,gender:'M',phone:'7711223344',lastVisit:'2025-11-01',condition:'Accident'},
  {id:'P1008',name:'Kriti Rao',age:27,gender:'F',phone:'7665544332',lastVisit:'2025-11-15',condition:'Fever'},
  {id:'P1009',name:'Ramesh Gupta',age:46,gender:'M',phone:'7554433221',lastVisit:'2025-10-05',condition:'Diabetes'},
  {id:'P1010',name:'Sonal Bhat',age:32,gender:'F',phone:'7443322110',lastVisit:'2025-09-18',condition:'Thyroid'},
];

// create extra mock patients to bulk lines and simulate large data
for(let i=11;i<=60;i++){
  const id = 'P1'+(100+i);
  samplePatients.push({id, name:`Patient ${i}`, age:20+(i%50), gender: i%2? 'M':'F', phone:`7000000${i}`, lastVisit:`2025-0${(i%12)+1}-0${(i%28)+1}`, condition:['General','Fever','Diabetes','Cardiac'][i%4]});
}

const sampleDoctors = [
  {id:'D2001',name:'Dr. Asha Kapoor',speciality:'General Physician',slots:6,phone:'9988001122'},
  {id:'D2002',name:'Dr. Mohan Iyer',speciality:'Cardiologist',slots:4,phone:'9988001133'},
  {id:'D2003',name:'Dr. Leena Sharma',speciality:'Gynecologist',slots:5,phone:'9988001144'},
  {id:'D2004',name:'Dr. Ravi Gupta',speciality:'Orthopedics',slots:7,phone:'9988001155'},
];

const sampleAppointments = [
  {id:'A3001',patientId:'P1001',doctorId:'D2001',date:'2025-11-17',time:'10:00',status:'Scheduled'},
  {id:'A3002',patientId:'P1004',doctorId:'D2003',date:'2025-11-18',time:'11:30',status:'Scheduled'},
  {id:'A3003',patientId:'P1002',doctorId:'D2002',date:'2025-11-19',time:'09:00',status:'Completed'},
];

// === Utilities ===
const uid = (prefix='ID')=> prefix+Math.random().toString(36).slice(2,9).toUpperCase();

// === Main Component ===
export default function App(){
  const [patients,setPatients] = useState(samplePatients);
  const [doctors,setDoctors] = useState(sampleDoctors);
  const [appointments,setAppointments] = useState(sampleAppointments);
  const [query,setQuery] = useState('');
  const [active,setActive] = useState('dashboard');
  const [showModal,setShowModal] = useState(false);
  const [modalType,setModalType] = useState('');
  const [formData,setFormData] = useState({});
  const [selectedPatient,setSelectedPatient] = useState(null);

  useEffect(()=>{
    // attach styles dynamically once
    const el = document.createElement('style'); el.innerHTML = styles; document.head.appendChild(el);
    return ()=>{document.head.removeChild(el)};
  },[]);

  // Search filter applied to patients
  const filtered = patients.filter(p => (
    p.name.toLowerCase().includes(query.toLowerCase()) || p.id.toLowerCase().includes(query.toLowerCase()) || p.phone.includes(query)
  ));

  // === Handlers ===
  function addPatient(data){
    const newP = {...data, id: uid('P')};
    setPatients(prev=>[newP,...prev]);
    setShowModal(false);
  }
  function editPatient(id,data){
    setPatients(prev=>prev.map(p=>p.id===id?{...p,...data}:p));
    setShowModal(false);
  }
  function removePatient(id){
    if(!confirm('Delete patient '+id+'?')) return;
    setPatients(prev=>prev.filter(p=>p.id!==id));
  }
  function bookAppointment(apt){
    const newA = {...apt,id:uid('A'),status:'Scheduled'};
    setAppointments(prev=>[newA,...prev]);
    setShowModal(false);
  }

  // prepare dashboard KPIs
  const totalPatients = patients.length;
  const todaysAppointments = appointments.filter(a=>a.date === (new Date().toISOString().slice(0,10))).length;
  const totalDoctors = doctors.length;

  // Modal small form render
  function PatientForm({initial, onSave, onCancel}){
    const [local, setLocal] = useState(initial || {name:'',age:'',gender:'F',phone:'',lastVisit:'',condition:''});
    return (
      <div>
        <div style={{display:'flex',gap:12}}>
          <input className="input" placeholder="Name" value={local.name} onChange={e=>setLocal({...local,name:e.target.value})} />
          <input className="input" placeholder="Age" value={local.age} onChange={e=>setLocal({...local,age:e.target.value})} />
        </div>
        <div style={{display:'flex',gap:12,marginTop:10}}>
          <select className="input" value={local.gender} onChange={e=>setLocal({...local,gender:e.target.value})}>
            <option>F</option>
            <option>M</option>
            <option>Other</option>
          </select>
          <input className="input" placeholder="Phone" value={local.phone} onChange={e=>setLocal({...local,phone:e.target.value})} />
          <input className="input" placeholder="Last Visit (YYYY-MM-DD)" value={local.lastVisit} onChange={e=>setLocal({...local,lastVisit:e.target.value})} />
        </div>
        <div style={{marginTop:10}}>
          <input className="input" placeholder="Condition" value={local.condition} onChange={e=>setLocal({...local,condition:e.target.value})} />
        </div>
        <div style={{display:'flex',justifyContent:'flex-end',gap:10,marginTop:12}}>
          <button className="btn secondary" onClick={onCancel}>Cancel</button>
          <button className="btn" onClick={()=>onSave(local)}>Save</button>
        </div>
      </div>
    )
  }

  // === JSX ===
  return (
    <div className="app">
      {/* HTML (Sidebar JSX) */}
      <aside className="sidebar">
        <div className="logo">MediCare </div>
        <div className="small">Hospital Management Portal</div>
        <div className="nav">
          <button className={active==='dashboard'? 'active':''} onClick={()=>setActive('dashboard')}>Dashboard</button>
          <button className={active==='patients'? 'active':''} onClick={()=>setActive('patients')}>Patients</button>
          <button className={active==='appointments'? 'active':''} onClick={()=>setActive('appointments')}>Appointments</button>
          <button className={active==='doctors'? 'active':''} onClick={()=>setActive('doctors')}>Doctors</button>
          <button className={active==='inventory'? 'active':''} onClick={()=>setActive('inventory')}>Inventory</button>
          <button className={active==='reports'? 'active':''} onClick={()=>setActive('reports')}>Reports</button>
          <button className={active==='settings'? 'active':''} onClick={()=>setActive('settings')}>Settings</button>
        </div>
        <div style={{flex:1}} />
        <div className="small">Logged in as <strong>Admin</strong></div>
      </aside>

      <main className="content">
        <div className="header">
          <div>
            <h2 style={{margin:0}}>{active.charAt(0).toUpperCase()+active.slice(1)}</h2>
            <div className="small">Welcome back — manage patients, appointments and doctors</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div className="search">
              <input placeholder="Search patients by name, id or phone" value={query} onChange={e=>setQuery(e.target.value)} />
            </div>
            <button className="btn" onClick={()=>{setModalType('quick-add'); setShowModal(true)}}>Quick Add Patient</button>
          </div>
        </div>

        {/* content area */}
        {active==='dashboard' && (
          <div>
            <div className="grid">
              <div className="card kpi">
                <div className="small">Total Patients</div>
                <div className="num">{totalPatients}</div>
                <div className="small">Active records in system</div>
              </div>

              <div className="card kpi">
                <div className="small">Today's Appointments</div>
                <div className="num">{todaysAppointments}</div>
                <div className="small">Appointments scheduled for today</div>
              </div>

              <div className="card kpi">
                <div className="small">Total Doctors</div>
                <div className="num">{totalDoctors}</div>
                <div className="small">Active medical staff</div>
              </div>
            </div>

            <div className="grid">
              <div className="card card-large">
                <h3 style={{marginTop:0}}>Recent Patients</h3>
                <div className="patients-list">
                  <table className="table">
                    <thead><tr><th>Patient</th><th>Age</th><th>Last Visit</th><th>Condition</th><th></th></tr></thead>
                    <tbody>
                      {patients.slice(0,8).map(p=> (
                        <tr key={p.id}>
                          <td>{p.name} <div className="small">{p.id}</div></td>
                          <td>{p.age}</td>
                          <td>{p.lastVisit}</td>
                          <td>{p.condition}</td>
                          <td className="actions"><button className="btn secondary" onClick={()=>{setSelectedPatient(p); setModalType('view-patient'); setShowModal(true)}}>View</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card card-large">
                <h3 style={{marginTop:0}}>Appointments</h3>
                <div className="list-compact">
                  {appointments.slice(0,6).map(a=>{
                    const pat = patients.find(p=>p.id===a.patientId) || {name:'Unknown'};
                    const doc = doctors.find(d=>d.id===a.doctorId) || {name:'Unknown'};
                    return (
                      <div className="item-pill" key={a.id}>
                        <div>
                          <div style={{fontWeight:700}}>{pat.name} <span className="small">({a.date} {a.time})</span></div>
                          <div className="small">Doctor: {doc.name} • {a.status}</div>
                        </div>
                        <div style={{display:'flex',gap:8}}>
                          <button className="btn secondary" onClick={()=>{setSelectedPatient(pat); setModalType('view-patient'); setShowModal(true)}}>Details</button>
                          <button className="btn" onClick={()=>{setAppointments(prev=>prev.map(x=>x.id===a.id?{...x,status:'Completed'}:x))}}>Mark Done</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="card card-large">
                <h3 style={{marginTop:0}}>Staff</h3>
                <div className="small">Doctors and specialists</div>
                <div style={{marginTop:10}}>
                  {doctors.map(d=> (
                    <div key={d.id} className="item-pill" style={{marginBottom:8}}>
                      <div>
                        <div style={{fontWeight:700}}>{d.name}</div>
                        <div className="small">{d.speciality} • Slots: {d.slots}</div>
                      </div>
                      <div style={{display:'flex',gap:8}}>
                        <button className="btn secondary" onClick={()=>{setModalType('view-doctor'); setSelectedPatient(d); setShowModal(true)}}>View</button>
                        <button className="btn" onClick={()=>{alert('Contact:'+d.phone)}}>Contact</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card" style={{marginTop:12}}>
              <h3 style={{marginTop:0}}>Activity Log</h3>
              <div className="small">A simplified activity timeline showing recent actions</div>
              <ul style={{marginTop:12}}>
                <li className="small">New patient <strong>{patients[0].name}</strong> added • 2 hours ago</li>
                <li className="small">Appointment <strong>{appointments[0].id}</strong> scheduled • 1 day ago</li>
                <li className="small">Doctor <strong>{doctors[0].name}</strong> updated profile • 3 days ago</li>
              </ul>
            </div>
          </div>
        )}

        {active==='patients' && (
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <h3 style={{margin:0}}>Patients</h3>
              <div style={{display:'flex',gap:8}}>
                <button className="btn" onClick={()=>{setModalType('add-patient'); setShowModal(true)}}>Add Patient</button>
                <button className="btn secondary" onClick={()=>{alert('Exported '+filtered.length+' records')}}>Export</button>
              </div>
            </div>

            <div className="card">
              <table className="table">
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Age</th><th>Phone</th><th>Last Visit</th><th>Condition</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.map(p=> (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>{p.age}</td>
                      <td>{p.phone}</td>
                      <td>{p.lastVisit}</td>
                      <td>{p.condition}</td>
                      <td className="actions">
                        <button className="btn secondary" onClick={()=>{setSelectedPatient(p); setModalType('view-patient'); setShowModal(true)}}>View</button>
                        <button className="btn" onClick={()=>{setSelectedPatient(p); setModalType('edit-patient'); setShowModal(true)}}>Edit</button>
                        <button className="btn" onClick={()=>removePatient(p.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {active==='appointments' && (
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h3>Appointments</h3>
              <div style={{display:'flex',gap:8}}>
                <button className="btn" onClick={()=>{setModalType('book-appointment'); setShowModal(true)}}>Book Appointment</button>
                <button className="btn secondary" onClick={()=>alert('Filtered')}>Filters</button>
              </div>
            </div>
            <div style={{marginTop:12}}>
              <div className="card">
                <table className="table">
                  <thead><tr><th>ID</th><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {appointments.map(a=>{
                      const p = patients.find(x=>x.id===a.patientId) || {name:'Unknown'};
                      const d = doctors.find(x=>x.id===a.doctorId) || {name:'Unknown'};
                      return (
                        <tr key={a.id}>
                          <td>{a.id}</td>
                          <td>{p.name}</td>
                          <td>{d.name}</td>
                          <td>{a.date}</td>
                          <td>{a.time}</td>
                          <td><span className={"badge "+(a.status==='Completed'? 'green':'red')}>{a.status}</span></td>
                          <td className="actions">
                            <button className="btn secondary" onClick={()=>{setSelectedPatient(p); setModalType('view-patient'); setShowModal(true)}}>View Patient</button>
                            <button className="btn" onClick={()=>setAppointments(prev=>prev.map(x=>x.id===a.id?{...x,status:'Cancelled'}:x))}>Cancel</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {active==='doctors' && (
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h3>Doctors</h3>
              <div style={{display:'flex',gap:8}}>
                <button className="btn" onClick={()=>{const newD = {id:uid('D'),name:'Dr. New',speciality:'General',slots:5,phone:'7000000000'}; setDoctors(prev=>[newD,...prev])}}>Add Doctor</button>
                <button className="btn secondary">Schedule</button>
              </div>
            </div>
            <div style={{marginTop:12}}>
              <div className="card">
                <table className="table">
                  <thead><tr><th>ID</th><th>Name</th><th>Speciality</th><th>Seats</th><th>Phone</th><th>Actions</th></tr></thead>
                  <tbody>
                    {doctors.map(d=> (
                      <tr key={d.id}>
                        <td>{d.id}</td>
                        <td>{d.name}</td>
                        <td>{d.speciality}</td>
                        <td>{d.slots}</td>
                        <td>{d.phone}</td>
                        <td className="actions">
                          <button className="btn secondary" onClick={()=>{alert('View '+d.name)}}>View</button>
                          <button className="btn" onClick={()=>setDoctors(prev=>prev.map(x=>x.id===d.id?{...x,slots:x.slots+1}:x))}>Increase Slot</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {active==='inventory' && (
          <div>
            <h3>Inventory</h3>
            <div className="card">
              <div className="small">Manage supplies, medicines and consumables</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>
                <div className="card">
                  <h4 style={{marginTop:0}}>Medicines</h4>
                  <div className="small">Stock level and reorder alerts</div>
                  <ul style={{marginTop:10}}>
                    <li className="small">Paracetamol - 120 units</li>
                    <li className="small">Insulin - 20 units</li>
                    <li className="small">Aspirin - 80 units</li>
                  </ul>
                </div>
                <div className="card">
                  <h4 style={{marginTop:0}}>Equipment</h4>
                  <div className="small">Maintenance logs</div>
                  <ul style={{marginTop:10}}>
                    <li className="small">X-Ray Machine - Last serviced 2025-07-10</li>
                    <li className="small">ECG - Last serviced 2025-05-12</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {active==='reports' && (
          <div>
            <h3>Reports</h3>
            <div className="card">
              <div className="small">Generate reports for patients, appointments, revenue and staff</div>
              <div style={{display:'flex',gap:8,marginTop:12}}>
                <button className="btn" onClick={()=>alert('Generating patient report...')}>Patient Report</button>
                <button className="btn" onClick={()=>alert('Generating appointments report...')}>Appointments</button>
                <button className="btn secondary" onClick={()=>alert('Export revenue CSV')}>Revenue</button>
              </div>
            </div>
          </div>
        )}

        {active==='settings' && (
          <div>
            <h3>Settings</h3>
            <div className="card">
              <div className="small">Theme</div>
              <div style={{display:'flex',gap:8,marginTop:8}}>
                <button className="btn secondary">Light</button>
                <button className="btn">Dark</button>
              </div>
              <div className="footer">light and dark mode for better vision </div>
            </div>
          </div>
        )}

        {/* Modals */}
        {showModal && (
          <div className="modal-backdrop" onClick={(e)=>{if(e.target.className && e.target.className.includes('modal-backdrop')) setShowModal(false)}}>
            <div className="modal card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h4 style={{margin:0}}>{modalType.replace('-',' ').toUpperCase()}</h4>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn secondary" onClick={()=>setShowModal(false)}>Close</button>
                </div>
              </div>

              <div style={{marginTop:12}}>
                {modalType==='add-patient' && (
                  <PatientForm onSave={(d)=>addPatient(d)} onCancel={()=>setShowModal(false)} />
                )}

                {modalType==='edit-patient' && selectedPatient && (
                  <PatientForm initial={selectedPatient} onSave={(d)=>editPatient(selectedPatient.id,d)} onCancel={()=>setShowModal(false)} />
                )}

                {modalType==='view-patient' && selectedPatient && (
                  <div>
                    <h3 style={{marginTop:0}}>{selectedPatient.name || selectedPatient.id}</h3>
                    <div className="small">ID: {selectedPatient.id}</div>
                    <div style={{marginTop:8}}>
                      <div className="small">Age: {selectedPatient.age || '—'}</div>
                      <div className="small">Phone: {selectedPatient.phone || '—'}</div>
                      <div className="small">Last Visit: {selectedPatient.lastVisit || '—'}</div>
                      <div className="small">Condition: {selectedPatient.condition || '—'}</div>
                    </div>
                    <div style={{display:'flex',gap:8,marginTop:12}}>
                      <button className="btn" onClick={()=>{setModalType('book-for-patient'); setShowModal(true)}}>Book Appointment</button>
                      <button className="btn secondary" onClick={()=>{setModalType('edit-patient'); setShowModal(true)}}>Edit</button>
                    </div>
                  </div>
                )}

                {modalType==='book-appointment' && (
                  <div>
                    <AppointmentForm patients={patients} doctors={doctors} onSave={(a)=>bookAppointment(a)} onCancel={()=>setShowModal(false)} />
                  </div>
                )}

                {modalType==='book-for-patient' && selectedPatient && (
                  <div>
                    <AppointmentForm patients={[selectedPatient]} doctors={doctors} onSave={(a)=>bookAppointment(a)} onCancel={()=>setShowModal(false)} />
                  </div>
                )}

                {modalType==='view-doctor' && selectedPatient && (
                  <div>
                    <h3 style={{marginTop:0}}>{selectedPatient.name}</h3>
                    <div className="small">Speciality: {selectedPatient.speciality}</div>
                    <div className="small">Phone: {selectedPatient.phone}</div>
                    <div style={{marginTop:12}}>
                      <button className="btn" onClick={()=>alert('Scheduling for '+selectedPatient.name)}>Schedule</button>
                    </div>
                  </div>
                )}

                {modalType==='quick-add' && (
                  <div>
                    <PatientForm onSave={(d)=>addPatient(d)} onCancel={()=>setShowModal(false)} />
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

// === Appointment Form Component (placed after default export for readability) ===
function AppointmentForm({patients, doctors, onSave, onCancel}){
  const [local, setLocal] = useState({patientId:patients[0]?.id || '', doctorId:doctors[0]?.id || '', date:new Date().toISOString().slice(0,10), time:'10:00'});
  useEffect(()=>{ if(!local.patientId && patients[0]) setLocal(prev=>({...prev,patientId:patients[0].id})) },[patients]);
  return (
    <div>
      <div style={{display:'flex',gap:8}}>
        <select className="input" value={local.patientId} onChange={e=>setLocal({...local,patientId:e.target.value})}>
          {patients.map(p=> <option key={p.id} value={p.id}>{p.name} ({p.id})</option>)}
        </select>
        <select className="input" value={local.doctorId} onChange={e=>setLocal({...local,doctorId:e.target.value})}>
          {doctors.map(d=> <option key={d.id} value={d.id}>{d.name} - {d.speciality}</option>)}
        </select>
      </div>
      <div style={{display:'flex',gap:8,marginTop:10}}>
        <input className="input" type="date" value={local.date} onChange={e=>setLocal({...local,date:e.target.value})} />
        <input className="input" type="time" value={local.time} onChange={e=>setLocal({...local,time:e.target.value})} />
      </div>
      <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:12}}>
        <button className="btn secondary" onClick={onCancel}>Cancel</button>
        <button className="btn" onClick={()=>onSave(local)}>Book</button>
      </div>
    </div>
  )
}

