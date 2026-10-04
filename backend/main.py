from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import secrets
import math


# ============================================================
# BAGHEWALA DIGITAL TWIN
# Well-to-Surface CSS + SRP Optimization
# Prototype / Synthetic Telemetry
# ============================================================

app = FastAPI(
    title="Baghewala Digital Twin API",
    version="3.0.0",
    description="Well-to-Surface CSS + SRP Optimization Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# ROLES
# ============================================================

ROLES = [
    "Reservoir Engineer",
    "Production Engineer",
    "Field Operator",
    "AI Analyst",
    "Operations Manager",
    "Administrator",
]


# ============================================================
# DEMO USERS
# ============================================================

USERS = {
    "engineer": {
        "username": "engineer",
        "password": "engineer123",
        "role": "Reservoir Engineer",
        "name": "Reservoir Engineer",
    },
    "production": {
        "username": "production",
        "password": "production123",
        "role": "Production Engineer",
        "name": "Production Engineer",
    },
    "operator": {
        "username": "operator",
        "password": "operator123",
        "role": "Field Operator",
        "name": "Field Operator",
    },
    "analyst": {
        "username": "analyst",
        "password": "analyst123",
        "role": "AI Analyst",
        "name": "AI Analyst",
    },
    "manager": {
        "username": "manager",
        "password": "manager123",
        "role": "Operations Manager",
        "name": "Operations Manager",
    },
    "admin": {
        "username": "admin",
        "password": "admin123",
        "role": "Administrator",
        "name": "Administrator",
    },
}


# ============================================================
# SESSION STORAGE
# ============================================================

SESSIONS = {}


# ============================================================
# DIGITAL TWIN STATE
# ============================================================

digital_twin = {
    "well": "BW-05",
    "field": "Baghewala",
    "temperature": 70.0,
    "pressure": 20.0,
    "viscosity": 630.18,
    "steam_volume": 540.0,
    "soak_time": 28.0,
    "spm": 8.0,
    "stroke_length": 2.6,
    "production": 254.71,
    "energy": 82.77,
    "equipment_risk": 27.01,
    "css_status": "READY",
    "srp_status": "RUNNING",
    "phase": "Monitoring",
    "plan_status": "No pending plan",
    "last_updated": datetime.now().isoformat(),
}


OPERATING_PLANS = []
AUDIT_EVENTS = []


# ============================================================
# REQUEST MODELS
# ============================================================

class LoginRequest(BaseModel):
    username: str
    password: str
    role: str


class SignupRequest(BaseModel):
    username: str
    password: str
    role: str


class CSSRequest(BaseModel):
    well: str = "BW-05"
    steam_volume: float = 540
    soak_time: float = 28


class CSSSoakRequest(BaseModel):
    well: str = "BW-05"
    soak_time: float = 28


class SRPStartRequest(BaseModel):
    well: str = "BW-05"
    spm: float = 8
    stroke_length: float = 2.6


class SRPUpdateRequest(BaseModel):
    well: str = "BW-05"
    spm: float = Field(..., ge=1, le=20)
    stroke_length: float = Field(..., ge=0.5, le=5)


class SimulationRequest(BaseModel):
    temperature: float = 70
    pressure: float = 20
    steam_volume: float = 540
    soak_time: float = 28
    spm: float = 8
    stroke_length: float = 2.6


class PlanRequest(BaseModel):
    title: str = "Operating Plan"
    well: str = "BW-05"
    steam_volume: float = 540
    soak_time: float = 28
    spm: float = 8
    stroke_length: float = 2.6


class PlanActionRequest(BaseModel):
    plan_id: str


# ============================================================
# UTILITY FUNCTIONS
# ============================================================

def now():
    return datetime.now().isoformat(timespec="seconds")


def add_audit(username, role, action, status="SUCCESS"):
    AUDIT_EVENTS.insert(
        0,
        {
            "timestamp": now(),
            "username": username,
            "role": role,
            "action": action,
            "status": status,
        }
    )

    if len(AUDIT_EVENTS) > 100:
        AUDIT_EVENTS.pop()


def get_current_user(authorization: Optional[str]):
    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authentication required"
        )

    token = authorization.replace("Bearer ", "").strip()

    user = SESSIONS.get(token)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired session"
        )

    return user


def require_role(user, allowed_roles):
    if user["role"] not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=f"Role '{user['role']}' is not authorized for this action"
        )


def update_timestamp():
    digital_twin["last_updated"] = now()


def calculate_twin(
    temperature,
    pressure,
    steam_volume,
    soak_time,
    spm,
    stroke_length
):
    # Synthetic prototype equations.
    # These are NOT field-calibrated Oil India equations.

    thermal_effect = max(
        0,
        (temperature - 50) * 0.8
    )

    steam_effect = (
        steam_volume - 400
    ) * 0.045

    soak_effect = (
        soak_time - 18
    ) * 1.1

    pump_effect = (
        spm - 5
    ) * 5.2

    stroke_effect = (
        stroke_length - 2
    ) * 10

    pressure_effect = (
        pressure - 14
    ) * 1.5

    production = (
        170
        + thermal_effect
        + steam_effect
        + soak_effect
        + pump_effect
        + stroke_effect
        + pressure_effect
    )

    production = max(80, min(420, production))

    energy = (
        55
        + steam_volume * 0.045
        + spm * 1.8
        + stroke_length * 3
    )

    risk = (
        8
        + max(0, spm - 7) * 5
        + max(0, stroke_length - 2.7) * 12
        + max(0, pressure - 21) * 3
        + max(0, steam_volume - 650) * 0.04
    )

    risk = max(5, min(95, risk))

    viscosity = (
        900
        - temperature * 3.8
        - steam_volume * 0.15
        - soak_time * 2
    )

    viscosity = max(250, min(900, viscosity))

    return {
        "production": round(production, 2),
        "energy": round(energy, 2),
        "equipment_risk": round(risk, 2),
        "viscosity": round(viscosity, 2),
    }


def twin_response():
    return {
        "success": True,
        "twin": digital_twin
    }


# ============================================================
# ROOT / HEALTH
# ============================================================

@app.get("/")
def root():
    return {
        "application": "BAGHEWALA DIGITAL TWIN",
        "version": "3.0.0",
        "backend": "FastAPI",
        "mode": "Prototype / Synthetic Data",
        "well": "BW-05",
        "status": "ONLINE",
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "service": "Baghewala Digital Twin API",
        "timestamp": now(),
    }


# ============================================================
# AUTHENTICATION
# ============================================================

@app.post("/api/auth/login")
def login(request: LoginRequest):
    user = USERS.get(request.username)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    if user["password"] != request.password:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    if user["role"] != request.role:
        raise HTTPException(
            status_code=401,
            detail="Selected role does not match this account"
        )

    token = secrets.token_urlsafe(32)

    SESSIONS[token] = {
        "username": user["username"],
        "role": user["role"],
        "name": user["name"],
        "login_time": now(),
    }

    add_audit(
        user["username"],
        user["role"],
        "User login"
    )

    return {
        "success": True,
        "message": "Login successful",
        "token": token,
        "user": SESSIONS[token],
    }


@app.post("/api/auth/signup")
def signup(request: SignupRequest):
    if request.username in USERS:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    if request.role not in ROLES:
        raise HTTPException(
            status_code=400,
            detail="Invalid role"
        )

    USERS[request.username] = {
        "username": request.username,
        "password": request.password,
        "role": request.role,
        "name": request.username,
    }

    return {
        "success": True,
        "message": "Account created"
    }


@app.get("/api/auth/me")
def me(authorization: Optional[str] = Header(None)):
    user = get_current_user(authorization)

    return {
        "success": True,
        "user": user
    }


@app.post("/api/auth/logout")
def logout(authorization: Optional[str] = Header(None)):
    if authorization:
        token = authorization.replace(
            "Bearer ", ""
        ).strip()

        user = SESSIONS.pop(token, None)

        if user:
            add_audit(
                user["username"],
                user["role"],
                "User logout"
            )

    return {
        "success": True,
        "message": "Logged out"
    }


# ============================================================
# DIGITAL TWIN
# ============================================================

@app.get("/api/twin/status")
def twin_status(
    authorization: Optional[str] = Header(None)
):
    get_current_user(authorization)
    return twin_response()


@app.get("/api/twin/reservoir")
def reservoir_status(
    authorization: Optional[str] = Header(None)
):
    get_current_user(authorization)

    return {
        "success": True,
        "reservoir": {
            "well": digital_twin["well"],
            "temperature": digital_twin["temperature"],
            "pressure": digital_twin["pressure"],
            "viscosity": digital_twin["viscosity"],
            "phase": digital_twin["phase"],
            "steam_volume": digital_twin["steam_volume"],
            "soak_time": digital_twin["soak_time"],
            "production": digital_twin["production"],
        }
    }


# ============================================================
# CSS
# ============================================================

@app.post("/api/twin/css/start")
def css_start(
    request: CSSRequest,
    authorization: Optional[str] = Header(None)
):
    user = get_current_user(authorization)

    require_role(
        user,
        [
            "Reservoir Engineer",
            "Production Engineer",
            "Field Operator",
            "Operations Manager",
        ]
    )

    result = calculate_twin(
        digital_twin["temperature"],
        digital_twin["pressure"],
        request.steam_volume,
        request.soak_time,
        digital_twin["spm"],
        digital_twin["stroke_length"],
    )

    digital_twin["steam_volume"] = request.steam_volume
    digital_twin["soak_time"] = request.soak_time
    digital_twin["production"] = result["production"]
    digital_twin["energy"] = result["energy"]
    digital_twin["equipment_risk"] = result["equipment_risk"]
    digital_twin["viscosity"] = result["viscosity"]

    digital_twin["css_status"] = "INJECTION"
    digital_twin["phase"] = "Steam Injection"

    update_timestamp()

    add_audit(
        user["username"],
        user["role"],
        "CSS started"
    )

    return twin_response()


@app.post("/api/twin/css/stop")
def css_stop(
    request: CSSRequest,
    authorization: Optional[str] = Header(None)
):
    user = get_current_user(authorization)

    require_role(
        user,
        [
            "Production Engineer",
            "Field Operator",
            "Operations Manager",
            "Reservoir Engineer",
        ]
    )

    digital_twin["css_status"] = "STOPPED"
    digital_twin["phase"] = "Steam Injection Complete"

    update_timestamp()

    add_audit(
        user["username"],
        user["role"],
        "CSS stopped"
    )

    return twin_response()


@app.post("/api/twin/css/soak")
def css_soak(
    request: CSSSoakRequest,
    authorization: Optional[str] = Header(None)
):
    user = get_current_user(authorization)

    require_role(
        user,
        [
            "Reservoir Engineer",
            "Production Engineer",
            "Field Operator",
            "Operations Manager",
        ]
    )

    digital_twin["soak_time"] = request.soak_time
    digital_twin["css_status"] = "SOAKING"
    digital_twin["phase"] = "Thermal Soak"

    update_timestamp()

    add_audit(
        user["username"],
        user["role"],
        f"CSS soak started: {request.soak_time} hr"
    )

    return twin_response()


# ============================================================
# SRP
# ============================================================

@app.post("/api/twin/srp/start")
def srp_start(
    request: SRPStartRequest,
    authorization: Optional[str] = Header(None)
):
    user = get_current_user(authorization)

    require_role(
        user,
        [
            "Production Engineer",
            "Field Operator",
            "Operations Manager",
        ]
    )

    digital_twin["spm"] = request.spm
    digital_twin["stroke_length"] = request.stroke_length
    digital_twin["srp_status"] = "RUNNING"

    result = calculate_twin(
        digital_twin["temperature"],
        digital_twin["pressure"],
        digital_twin["steam_volume"],
        digital_twin["soak_time"],
        request.spm,
        request.stroke_length,
    )

    digital_twin["production"] = result["production"]
    digital_twin["energy"] = result["energy"]
    digital_twin["equipment_risk"] = result["equipment_risk"]
    digital_twin["viscosity"] = result["viscosity"]

    digital_twin["phase"] = "Production"

    update_timestamp()

    add_audit(
        user["username"],
        user["role"],
        "SRP started"
    )

    return twin_response()


@app.post("/api/twin/srp/update")
def srp_update(
    request: SRPUpdateRequest,
    authorization: Optional[str] = Header(None)
):
    user = get_current_user(authorization)

    require_role(
        user,
        [
            "Production Engineer",
            "Field Operator",
            "Operations Manager",
        ]
    )

    digital_twin["spm"] = request.spm
    digital_twin["stroke_length"] = request.stroke_length

    result = calculate_twin(
        digital_twin["temperature"],
        digital_twin["pressure"],
        digital_twin["steam_volume"],
        digital_twin["soak_time"],
        request.spm,
        request.stroke_length,
    )

    digital_twin["production"] = result["production"]
    digital_twin["energy"] = result["energy"]
    digital_twin["equipment_risk"] = result["equipment_risk"]
    digital_twin["viscosity"] = result["viscosity"]

    update_timestamp()

    add_audit(
        user["username"],
        user["role"],
        f"SRP updated: {request.spm} SPM / {request.stroke_length} m"
    )

    return twin_response()


# ============================================================
# AI
# ============================================================

@app.get("/api/ai/status")
def ai_status(
    authorization: Optional[str] = Header(None)
):
    get_current_user(authorization)

    return {
        "success": True,
        "ai": {
            "status": "ACTIVE",
            "model": "Random Forest Ensemble",
            "production_model": "ACTIVE",
            "energy_model": "ACTIVE",
            "risk_model": "ACTIVE",
            "viscosity_model": "ACTIVE",
            "data_mode": "Synthetic Telemetry",
        }
    }


@app.post("/api/ai/simulate")
def ai_simulate(
    request: SimulationRequest,
    authorization: Optional[str] = Header(None)
):
    user = get_current_user(authorization)

    require_role(
        user,
        [
            "Reservoir Engineer",
            "Production Engineer",
            "AI Analyst",
            "Operations Manager",
        ]
    )

    result = calculate_twin(
        request.temperature,
        request.pressure,
        request.steam_volume,
        request.soak_time,
        request.spm,
        request.stroke_length,
    )

    add_audit(
        user["username"],
        user["role"],
        "AI what-if simulation"
    )

    return {
        "success": True,
        "result": result,
        "inputs": request.model_dump(),
    }


# ============================================================
# OPERATING PLANS
# ============================================================

@app.get("/api/plans")
def get_plans(
    authorization: Optional[str] = Header(None)
):
    get_current_user(authorization)

    return {
        "success": True,
        "plans": OPERATING_PLANS
    }


@app.post("/api/plans")
def create_plan(
    request: PlanRequest,
    authorization: Optional[str] = Header(None)
):
    user = get_current_user(authorization)

    require_role(
        user,
        [
            "Reservoir Engineer",
            "Production Engineer",
            "AI Analyst",
        ]
    )

    plan_id = f"PLAN-{len(OPERATING_PLANS) + 1:03d}"

    plan = {
        "id": plan_id,
        "title": request.title,
        "well": request.well,
        "steam_volume": request.steam_volume,
        "soak_time": request.soak_time,
        "spm": request.spm,
        "stroke_length": request.stroke_length,
        "created_by": user["username"],
        "created_role": user["role"],
        "created_at": now(),
        "status": "PENDING_APPROVAL",
    }

    OPERATING_PLANS.insert(0, plan)

    digital_twin["plan_status"] = (
        f"{plan_id} pending approval"
    )

    add_audit(
        user["username"],
        user["role"],
        f"Operating plan created: {plan_id}"
    )

    return {
        "success": True,
        "message": "Operating plan created",
        "plan": plan
    }


@app.post("/api/plans/approve")
def approve_plan(
    request: PlanActionRequest,
    authorization: Optional[str] = Header(None)
):
    user = get_current_user(authorization)

    require_role(
        user,
        ["Operations Manager"]
    )

    plan = next(
        (
            p for p in OPERATING_PLANS
            if p["id"] == request.plan_id
        ),
        None
    )

    if not plan:
        raise HTTPException(
            status_code=404,
            detail="Operating plan not found"
        )

    if plan["status"] != "PENDING_APPROVAL":
        raise HTTPException(
            status_code=400,
            detail="Plan is not pending approval"
        )

    plan["status"] = "APPROVED"
    plan["approved_by"] = user["username"]
    plan["approved_at"] = now()

    digital_twin["plan_status"] = (
        f"{plan['id']} approved - awaiting field execution"
    )

    add_audit(
        user["username"],
        user["role"],
        f"Operating plan approved: {plan['id']}"
    )

    return {
        "success": True,
        "message": "Operating plan approved",
        "plan": plan
    }


@app.post("/api/plans/execute")
def execute_plan(
    request: PlanActionRequest,
    authorization: Optional[str] = Header(None)
):
    user = get_current_user(authorization)

    require_role(
        user,
        ["Field Operator"]
    )

    plan = next(
        (
            p for p in OPERATING_PLANS
            if p["id"] == request.plan_id
        ),
        None
    )

    if not plan:
        raise HTTPException(
            status_code=404,
            detail="Operating plan not found"
        )

    if plan["status"] != "APPROVED":
        raise HTTPException(
            status_code=400,
            detail="Only approved plans can be executed"
        )

    digital_twin["steam_volume"] = plan["steam_volume"]
    digital_twin["soak_time"] = plan["soak_time"]
    digital_twin["spm"] = plan["spm"]
    digital_twin["stroke_length"] = plan["stroke_length"]

    result = calculate_twin(
        digital_twin["temperature"],
        digital_twin["pressure"],
        plan["steam_volume"],
        plan["soak_time"],
        plan["spm"],
        plan["stroke_length"],
    )

    digital_twin["production"] = result["production"]
    digital_twin["energy"] = result["energy"]
    digital_twin["equipment_risk"] = result["equipment_risk"]
    digital_twin["viscosity"] = result["viscosity"]

    digital_twin["css_status"] = "ACTIVE"
    digital_twin["srp_status"] = "RUNNING"
    digital_twin["phase"] = "Operating Plan Executed"

    plan["status"] = "EXECUTED"
    plan["executed_by"] = user["username"]
    plan["executed_at"] = now()

    digital_twin["plan_status"] = (
        f"{plan['id']} executed"
    )

    update_timestamp()

    add_audit(
        user["username"],
        user["role"],
        f"Operating plan executed: {plan['id']}"
    )

    return {
        "success": True,
        "message": "Operating plan executed",
        "plan": plan,
        "twin": digital_twin,
    }


# ============================================================
# AUDIT
# ============================================================

@app.get("/api/audit")
def audit(
    authorization: Optional[str] = Header(None)
):
    user = get_current_user(authorization)

    require_role(
        user,
        [
            "Operations Manager",
            "Administrator",
        ]
    )

    return {
        "success": True,
        "events": AUDIT_EVENTS
    }


# ============================================================
# USERS / ROLES
# ============================================================

@app.get("/api/roles")
def roles(
    authorization: Optional[str] = Header(None)
):
    user = get_current_user(authorization)

    require_role(
        user,
        ["Administrator"]
    )

    return {
        "success": True,
        "roles": ROLES,
        "users": [
            {
                "username": value["username"],
                "role": value["role"],
                "name": value["name"],
            }
            for value in USERS.values()
        ]
    }


# ============================================================
# STARTUP MESSAGE
# ============================================================

@app.on_event("startup")
def startup():
    print()
    print("=" * 65)
    print("BAGHEWALA DIGITAL TWIN")
    print("Well-to-Surface CSS + SRP Optimization")
    print("=" * 65)
    print("Backend: FastAPI")
    print("Mode: Prototype / Synthetic Data")
    print("Well: BW-05")
    print("=" * 65)
    print()
    print("Demo accounts:")
    print()
    print("Reservoir Engineer : engineer / engineer123")
    print("Production Engineer: production / production123")
    print("Field Operator     : operator / operator123")
    print("AI Analyst         : analyst / analyst123")
    print("Operations Manager  : manager / manager123")
    print("Administrator       : admin / admin123")
    print()
    print("=" * 65)