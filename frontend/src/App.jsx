import react from "react";
import { useState } from "react";
import './App.css';
import Active from '../src/pages/active_dot';

const properties = ['Block of Flats', 'Detached Bungalow', 'Detached Duplex', 'Semi Detached Bungalow', 'Semi Detached Duplex', 'Terraced Bungalow', 'Terraced Duplexes']

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const STATES = [
  "Abia","Abuja","Akwa Ibom","Anambara","Bayelsa","Borno","Cross River",
  "Delta","Edo","Ekiti","Enugu","Imo","Kaduna","Kano","Katsina","Kogi",
  "Kwara","Lagos","Nasarawa","Niger","Ogun","Osun","Oyo","Plateau","Rivers"
];

const TOWNS = [
  "Aba","Abeokuta North","Abeokuta South","Abraka","Ado-Ekiti","Ado-Odo/Ota",
  "Afijio","Agbara","Agbara-Igbesa","Agege","Ajah","Akinyele","Akure",
  "Alimosho","Amuwo Odofin","Aniocha South","Apapa","Apo","Arepo","Asaba",
  "Asokoro District","Ayobo","Badagry","Bwari","Calabar","Central Business District",
  "Chikun","Dakibiyu","Dakwo","Danja","Dape","Dei-Dei","Dekina","Diplomatic Zones",
  "Duboyi","Durumi","Dutse","Ede South","Egbe","Egbeda","Egor","Ejigbo","Eket",
  "Eko Atlantic City","Eleme","Enugu","Epe","Ethiope West","Ewekoro","Gaduwa",
  "Galadimawa","Garki","Gbagada","Gudu","Guzamala","Guzape District","Gwagwalada",
  "Gwarinpa","Ibadan","Ibadan North","Ibadan North-East","Ibadan North-West",
  "Ibadan South-West","Ibafo","Ibarapa North","Ibeju","Ibeju Lekki","Idimu","Ido",
  "Idu Industrial","Ifako-Ijaiye","Ifo","Ijaiye","Ijebu Ode","Ijede","Ijesha",
  "Ijoko","Ikeja","Ikorodu","Ikot Ekpene","Ikotun","Ikoyi","Ikpoba Okha","Ikwerre",
  "Ilorin East","Ilorin South","Ilorin West","Ilupeju","Imota","Ipaja","Isheri",
  "Isheri North","Isolo","Jabi","Jahi","Jikwoyi","Jos North","Jos South","KM 46",
  "Kabusa","Kado","Kaduna North","Kaduna South","Kafe","Kagini","Kano","Karmo",
  "Karsana","Karshi","Karu","Katampe","Kaura","Keffi","Ketu","Kosofe","Kubwa",
  "Kuje","Kukwaba","Kurudu","Kusada","Kyami","Lagos Island","Lekki","Life Camp",
  "Lokogoma District","Lokoja","Lugbe District","Mabushi","Magboro","Magodo",
  "Maitama District","Mararaba","Maryland","Mbora (Nbora)","Mowe Ofada","Mowe Town",
  "Mpape","Mushin","Nasarawa","Nassarawa","Nyanya","Obafemi Owode","Obio-Akpor",
  "Ogijo","Ogudu","Ohaji/Egbema","Ojo","Ojodu","Ojota","Oke-Aro","Oke-Odo","Okene",
  "Okpe","Oluyole","Oredo","Orile","Orozo","Oshodi","Osogbo","Ovia North-East",
  "Owerri Municipal","Owerri North","Owerri West","Oyigbo","Oyo West","Paikoro",
  "Port Harcourt","Sagamu","Sango Ota","Shomolu","Simawa","Surulere","Udu",
  "Ughelli North","Ughelli South","Uhunmwonde","Umuahia","Utako","Uvwie","Uyo",
  "Victoria Island (VI)","Warri","Wumba","Wuse","Wuse 2","Wuye","Yaba",
  "Yenagoa","Yewa South"
];

const App = () => {

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    bedrooms: 3, bathrooms: 2, toilets: 2, parking: 1,
    title: "Detached Duplex", town: "Lekki", state: "Lagos"
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://property-price-estimator-99f3.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      console.log(data)
      // Expected response shape: { price: number, low: number, high: number }
      setResult(data);
      setTimeout(() => {
        //setRevealed(true);
        //resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 80);
    } catch (e) {
      setError(e.message || "Estimation failed. Check your API.");
    } finally {
      setLoading(false);
    }
};

  return (
    <>
      <div className="app_container">
        <div className = "app_name">
          <div className="active_dot">
            <Active />
            <span>Joseph Tobi Mayokun ML V 1.0</span>
          </div>
        </div>
      </div>

      <div className="description">Microlink Smart Value</div>
      <div className="details">Precision real estate price evaluation for Nigerian Property Market.</div>
      <hr />

      <div className="options_canvas">

        <div>


          <div style={{marginTop: '20px'}}>
            <div style = {{fontSize: '0.75rem', fontWeight: '550', marginBottom: '10px'}}>Property type</div>
              <select value = {form.title} className = "options" onChange = {(e)=> set('title', e.target.value)}>{properties.map((property, index) => (
                <option key = {index}>{property}</option>
              ))}</select>
          </div>

          <div style={{display: 'flex', gap: '20px'}}>

            <div style={{marginTop: '20px'}}>
              <div style = {{fontSize: '0.75rem', fontWeight: '550', marginBottom: '10px'}}>Bedrooms</div>
              <select value = {form.bedrooms} className = "options" onChange = {(e)=> set('bedrooms', e.target.value)}>{values.map((bedroom, index) => (
                <option key = {index}>{bedroom}</option>
              ))}</select>
            </div>

            <div style={{marginTop: '20px'}}>
              <div style = {{fontSize: '0.75rem', fontWeight: '550', marginBottom: '10px'}}>Bathrooms</div>
                <select value = {form.bathroooms} className = "options" onChange = {(e)=> set('bathrooms', e.target.value)}>{values.map((bathroom, index) => (
                  <option key = {index}>{bathroom}</option>
               ))}</select>
            </div>
        </div>


        </div>

        <div>

          <div style={{display: 'flex', gap: '20px'}}>
            <div style={{marginTop: '20px'}}>
              <div style = {{fontSize: '0.75rem', fontWeight: '550', marginBottom: '10px'}}>Toilet</div>
              <select value = {form.toilets} className = "options" onChange = {(e)=> set('toilets', e.target.value)}>{values.map((toilet, index) => (
                <option key = {index}>{toilet}</option>
              ))}</select>
            </div>

            <div style={{marginTop: '20px'}}>
              <div style = {{fontSize: '0.75rem', fontWeight: '550', marginBottom: '10px'}}>Parking</div>
                <select value = {form.parking} className = "options" onChange = {(e)=> set('parking', e.target.value)}>{values.map((parking, index) => (
                  <option key = {index}>{parking}</option>
                ))}</select>
            </div>

          </div>

          <div style={{marginTop: '20px'}}>
            <div style = {{fontSize: '0.75rem', fontWeight: '550', marginBottom: '10px'}}>State</div>
            <select value = {form.state} className = "options" onChange = {(e)=> set('state', e.target.value)}>{STATES.map((state, index) => (
              <option key = {index}>{state}</option>
            ))}</select>
          </div>

        </div>

      </div>

      <div style={{marginTop: '20px'}}>
            <div style = {{fontSize: '0.75rem', fontWeight: '550', marginBottom: '10px'}}>Town</div>
            <select value = {form.town} className = "options" onChange = {(e)=> set('town', e.target.value)}>{TOWNS.map((town, index) => (
              <option key = {index}>{town}</option>
            ))}</select>
      </div>

      {error && (
        <div className = 'error'>{error}</div>
      )}

      {result && (
          <>
          <div className='resultHeader'>
              <div className='resultEyebrow'>ESTIMATED MARKET VALUE</div>
              <div className='resultPrice'>₦ {(result.estimated_price).toLocaleString()}</div>
              <div className='resultLocation'>
                {form.title} · {form.town}, {form.state}
              </div>
              <div className="price_details">
                <span>This property is estimated at ₦ {(result.estimated_price).toLocaleString()} roughly in line with similar {form.title} in {form.town}, {form.state}.</span>
              </div>
              
              <div style={{display: 'flex', marginTop: '20px', justifyContent: 'space-between', textAlign: 'center'}}>

                <div style = {{display: 'flex', flexDirection: 'column',}}>
                  <span style = {{fontSize: '0.6rem', fontWeight: '550', marginBottom: '10px', color: 'gray'}}>Low</span>
                  <span style = {{fontSize: '0.8rem', fontWeight: '700'}}>₦ {(result.low_price).toLocaleString()}</span>
                </div>

                <div style = {{display: 'flex', flexDirection: 'column',}}>
                  <span style = {{fontSize: '0.6rem', fontWeight: '550', marginBottom: '10px', color: 'gray'}}>Best</span>
                  <span style = {{fontSize: '0.8rem', fontWeight: '700'}}>₦ {(result.estimated_price).toLocaleString()}</span>
                </div>

                <div style = {{display: 'flex', flexDirection: 'column',}}>
                  <span style = {{fontSize: '0.6rem', fontWeight: '550', marginBottom: '10px', color: 'gray'}}>High</span>
                  <span style = {{fontSize: '0.8rem', fontWeight: '700'}}>₦ {(result.high_price).toLocaleString()}</span>
                </div>

              </div>
            </div>
          </>
        )}

      <button onClick = {handleSubmit} disabled = {loading}>{loading ? 'Loading...' : 'Estimate'}</button>
    </>
  )
}

export default App;