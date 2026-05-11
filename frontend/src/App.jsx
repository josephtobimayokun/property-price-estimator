import React from 'react';
import { useState } from 'react';
import './App.css'

const properties = ['Block of Flats', 'Detached Bungalow', 'Detached Duplex', 'Semi Detached Bungalow', 'Semi Detached Duplex', 'Terraced Bungalow', 'Terraced Duplexes']

const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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

  const handleEstimate = async () => {
    setLoading(true);

    try {
      // TODO: Replace with your actual model API endpoint
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

  const [form, setForm] = useState({
    bedrooms: 3, bathrooms: 2, toilets: 2, parking: 1,
    title: "Detached Duplex", town: "Lekki", state: "Lagos"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  return (
    <>
      <div className='app'>
        <div className='name_container'>
          <p className='name'>REAL ESTATE PRICE ESTIMATOR. POWERED BY ML</p>
          <p className='property'>Property<br /><span className='sub_property'>Price Estimator</span></p>
          <p className='description'>Instant valuation for Nigerian real estate trained on <br />24,000+ listings across 25 states.</p>
        </div>

        <div className='property_wrapper'>
            <div className='field_tag'>Property type</div>
            <select className='property_type' value = {form.title} onChange = {(e)=> set('title', e.target.value)}>
              {properties.map((property, index) => (
                <option
                  key = {index}
                  value = {property}
                >{property}</option>
              ))}
            </select>
        </div>

        <div className='property_wrapper'>
            <div className='field_tag'>Bedrooms</div>
            <select className='property_type' value = {form.bedrooms} onChange={(e) => set('bedrooms', e.target.value)}>
              {values.map((bedroom, index) => (
                <option
                  key = {index}
                  value = {bedroom}
                >{bedroom}</option>
              ))}
            </select>
        </div>

        <div className='property_wrapper'>
            <div className='field_tag'>Bathrooms</div>
            <select className='property_type' value={form.bathrooms} onChange={(e)=> set('bathrooms', e.target.value)}>
              {values.map((bathroom, index) => (
                <option
                  key = {index}
                  value = {bathroom}
                >{bathroom}</option>
              ))}
            </select>
        </div>

        <div className='property_wrapper'>
            <div className='field_tag'>Toilets</div>
            <select className='property_type' value={form.toilets} onChange={(e)=> set('toilets', e.target.value)}>
              {values.map((toilet, index) => (
                <option
                  key = {index}
                  value = {toilet}
                >{toilet}</option>
              ))}
            </select>
        </div>

        <div className='property_wrapper'>
            <div className='field_tag'>Parking</div>
            <select className='property_type' value = {form.parking} onChange={(e)=> set('parking', e.target.value)}>
              {values.map((parking, index) => (
                <option
                  key = {index}
                  value = {parking}
                >{parking}</option>
              ))}
            </select>
        </div>

        <div className='property_wrapper'>
            <div className='field_tag'>State</div>
            <select className='property_type' value = {form.state} onChange={(e)=> set('state', e.target.value)}>
              {STATES.map((state, index) => (
                <option
                  key = {index}
                  value = {state}
                >{state}</option>
              ))}
            </select>
        </div>

        <div className='property_wrapper'>
            <div className='field_tag'>Town / Area</div>
            <select className='property_type' value = {form.town} onChange={(e)=> set('town', e.target.value)}>
              {TOWNS.map((town, index) => (
                <option
                  key = {index}
                  value = {town}
                >{town}</option>
              ))}
            </select>
        </div>

        {result && (
          <>
          <div className='resultHeader'>
              <div className='resultEyebrow'>ESTIMATED MARKET VALUE</div>
              <div className='resultPrice'>₦{result.estimated_price}</div>
              <div className='resultLocation'>
                {form.title} · {form.town}, {form.state}
              </div>
            </div>
          </>
        )}

        <div>
          <button className='estimate' disabled = {loading} onClick={handleEstimate}>ESTIMATE</button>
        </div>
      </div>
    </>
  )
}

export default App;
