# Baghewala AI Digital Twin — Professional Web Prototype

A professional React + FastAPI prototype for the Baghewala heavy-oil Well-to-Surface Digital Twin.

## What works

- Authentication and signup
- Role-based authorization
- English / Telugu / Hindi UI
- Command Center
- Visual Reservoir Digital Twin
- CSS simulation
- SRP simulation
- AI prediction
- AI optimization
- What-if simulation
- Analytics/history
- Administrator user view
- Shared Digital Twin state between modules
- Optional loading of your existing `.pkl` models

> IMPORTANT: The default telemetry is clearly treated as simulation/demo telemetry. It is not a live connection to Oil India or Baghewala field SCADA.

## Demo accounts

- Operator: `operator` / `Operator@123`
- Reservoir Engineer: `engineer` / `Engineer@123`
- Production Engineer: `production` / `Production@123`
- Administrator: `admin` / `Admin@123`

## Run backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

Backend:
http://localhost:8000

API docs:
http://localhost:8000/docs

## Run frontend

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite, normally:
http://localhost:5173

## Optional: use your trained models

Copy these files into:

```text
backend/models/
  production_model.pkl
  energy_model.pkl
  risk_model.pkl
  viscosity_model.pkl
```

The API automatically tries to load them. If they are absent, a deterministic prototype AI calculation is used so the website still works.

## Optional: use your CSV

Copy your well CSV to:

```text
backend/data/well_data.csv
```

The default project also works without it.

## Architecture

React frontend
    |
    v
FastAPI API
    |
    +--> Authentication / Authorization
    |
    +--> Shared Digital Twin
    |       +--> Reservoir state
    |       +--> CSS state
    |       +--> SRP state
    |
    +--> AI prediction
    +--> AI optimization
    +--> What-if
    +--> Analytics

For a production Oil India deployment, replace demo authentication and simulated telemetry with an approved identity provider and authorized SCADA/IoT/API/data platform.
