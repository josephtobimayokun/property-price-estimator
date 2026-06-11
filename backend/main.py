import torch
import torch.nn as nn
import pandas as pd
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Property price estimator")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

FEATURE_COLUMNS = [
    'bedrooms', 'bathrooms', 'toilets', 'parking_space',
    'title_Block of Flats', 'title_Detached Bungalow',
    'title_Detached Duplex', 'title_Semi Detached Bungalow',
    'title_Semi Detached Duplex', 'title_Terraced Bungalow',
    'title_Terraced Duplexes',
    'town_Aba', 'town_Abeokuta North', 'town_Abeokuta South',
    'town_Abraka', 'town_Ado-Ekiti', 'town_Ado-Odo/Ota',
    'town_Afijio', 'town_Agbara', 'town_Agbara-Igbesa',
    'town_Agege', 'town_Ajah', 'town_Akinyele', 'town_Akure',
    'town_Alimosho', 'town_Amuwo Odofin', 'town_Aniocha South',
    'town_Apapa', 'town_Apo', 'town_Arepo', 'town_Asaba',
    'town_Asokoro District', 'town_Ayobo', 'town_Badagry',
    'town_Bwari', 'town_Calabar', 'town_Central Business District',
    'town_Chikun', 'town_Dakibiyu', 'town_Dakwo', 'town_Danja',
    'town_Dape', 'town_Dei-Dei', 'town_Dekina', 'town_Diplomatic Zones',
    'town_Duboyi', 'town_Durumi', 'town_Dutse', 'town_Ede South',
    'town_Egbe', 'town_Egbeda', 'town_Egor', 'town_Ejigbo',
    'town_Eket', 'town_Eko Atlantic City', 'town_Eleme',
    'town_Enugu', 'town_Epe', 'town_Ethiope West', 'town_Ewekoro',
    'town_Gaduwa', 'town_Galadimawa', 'town_Garki', 'town_Gbagada',
    'town_Gudu', 'town_Guzamala', 'town_Guzape District',
    'town_Gwagwalada', 'town_Gwarinpa', 'town_Ibadan',
    'town_Ibadan North', 'town_Ibadan North-East',
    'town_Ibadan North-West', 'town_Ibadan South-West',
    'town_Ibafo', 'town_Ibarapa North', 'town_Ibeju',
    'town_Ibeju Lekki', 'town_Idimu', 'town_Ido',
    'town_Idu Industrial', 'town_Ifako-Ijaiye', 'town_Ifo',
    'town_Ijaiye', 'town_Ijebu Ode', 'town_Ijede', 'town_Ijesha',
    'town_Ijoko', 'town_Ikeja', 'town_Ikorodu', 'town_Ikot Ekpene',
    'town_Ikotun', 'town_Ikoyi', 'town_Ikpoba Okha', 'town_Ikwerre',
    'town_Ilorin East', 'town_Ilorin South', 'town_Ilorin West',
    'town_Ilupeju', 'town_Imota', 'town_Ipaja', 'town_Isheri',
    'town_Isheri North', 'town_Isolo', 'town_Jabi', 'town_Jahi',
    'town_Jikwoyi', 'town_Jos North', 'town_Jos South',
    'town_KM 46', 'town_Kabusa', 'town_Kado', 'town_Kaduna North',
    'town_Kaduna South', 'town_Kafe', 'town_Kagini', 'town_Kano',
    'town_Karmo', 'town_Karsana', 'town_Karshi', 'town_Karu',
    'town_Katampe', 'town_Kaura', 'town_Keffi', 'town_Ketu',
    'town_Kosofe', 'town_Kubwa', 'town_Kuje', 'town_Kukwaba',
    'town_Kurudu', 'town_Kusada', 'town_Kyami', 'town_Lagos Island',
    'town_Lekki', 'town_Life Camp', 'town_Lokogoma District',
    'town_Lokoja', 'town_Lugbe District', 'town_Mabushi',
    'town_Magboro', 'town_Magodo', 'town_Maitama District',
    'town_Mararaba', 'town_Maryland', 'town_Mbora (Nbora)',
    'town_Mowe Ofada', 'town_Mowe Town', 'town_Mpape',
    'town_Mushin', 'town_Nassarawa', 'town_Nasarawa',
    'town_Nyanya', 'town_Obafemi Owode', 'town_Obio-Akpor',
    'town_Ogijo', 'town_Ogudu', 'town_Ohaji/Egbema', 'town_Ojo',
    'town_Ojodu', 'town_Ojota', 'town_Oke-Aro', 'town_Oke-Odo',
    'town_Okene', 'town_Okpe', 'town_Oluyole', 'town_Oredo',
    'town_Orile', 'town_Orozo', 'town_Oshodi', 'town_Osogbo',
    'town_Ovia North-East', 'town_Owerri Municipal',
    'town_Owerri North', 'town_Owerri West', 'town_Oyigbo',
    'town_Oyo West', 'town_Paikoro', 'town_Port Harcourt',
    'town_Sagamu', 'town_Sango Ota', 'town_Shomolu', 'town_Simawa',
    'town_Surulere', 'town_Udu', 'town_Ughelli North',
    'town_Ughelli South', 'town_Uhunmwonde', 'town_Umuahia',
    'town_Utako', 'town_Uvwie', 'town_Uyo',
    'town_Victoria Island (VI)', 'town_Warri', 'town_Wumba',
    'town_Wuse', 'town_Wuse 2', 'town_Wuye', 'town_Yaba',
    'town_Yenagoa', 'town_Yewa South',
    'state_Abia', 'state_Abuja', 'state_Akwa Ibom',
    'state_Anambara', 'state_Bayelsa', 'state_Borno',
    'state_Cross River', 'state_Delta', 'state_Edo', 'state_Ekiti',
    'state_Enugu', 'state_Imo', 'state_Kaduna', 'state_Kano',
    'state_Katsina', 'state_Kogi', 'state_Kwara', 'state_Lagos',
    'state_Nasarawa', 'state_Niger', 'state_Ogun', 'state_Osun',
    'state_Oyo', 'state_Plateau', 'state_Rivers',
]

INPUT_DIM = len(FEATURE_COLUMNS)


class HousePriceMLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.LazyLinear(256),
            nn.ReLU(),
            nn.LazyLinear(1),
        )

    def forward(self, x):
        return self.net(x)


model = HousePriceMLP()
dummy = torch.zeros(1, INPUT_DIM)
model(dummy)
model.load_state_dict(torch.load("house_price.param"))
model.eval()


class HouseInput(BaseModel):
    bedrooms: int
    bathrooms: int
    toilets: int
    parking: int
    title: str
    state: str
    town: str


@app.post("/predict")
def predict(data: HouseInput):
    print("Hit predict")
    df = pd.DataFrame([{
        "bedrooms":      data.bedrooms,
        "bathrooms":     data.bathrooms,
        "toilets":       data.toilets,
        "parking":       data.parking,
        "title":         data.title,
        "state":         data.state,
        "town":          data.town,
    }])

    df_encoded = pd.get_dummies(df, columns=["title", "state", "town"])
    df_encoded = df_encoded.reindex(columns=FEATURE_COLUMNS, fill_value=0)

    tensor = torch.tensor(
        df_encoded.values.astype(float), dtype=torch.float32
    )

    with torch.no_grad():
        log_price = model(tensor).item()
        price = float(np.exp(log_price))

    return {
        "estimated_price": round(price),
    	"low_price": round(price / 1.46),
	"high_price": round(price * 1.46),
    }


@app.get("/")
def root():
    return {"status": "NaijaEstimate API is running"}
