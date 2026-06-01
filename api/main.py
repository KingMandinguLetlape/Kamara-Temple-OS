"""KAMARA TEMPLE OS - FastAPI Backend
Serves ORA System, Asset Registry, and Valuation Engine
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import json

app = FastAPI(
    title="Kamara Temple OS - ORA System API",
    description="Digital Asset Registry + Blockchain Integration",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Asset(BaseModel):
    id: str
    name: str
    asset_type: str
    value: float
    volume: int
    nft_ready: bool = True

class Valuation(BaseModel):
    asset_id: str
    score: int
    potential_index: int
    security_score: int
    valuation: float

class Inquiry(BaseModel):
    asset_id: str
    buyer_name: str
    offer_price: float

class InquiryResponse(BaseModel):
    inquiry_id: str
    status: str
    asset_id: str

# Data storage (in-memory for demo)
assets_db = {}
valuations_db = {}
inquiries_db = {}

# Initialize with sample assets
def init_assets():
    for i in range(1, 6):
        asset_id = f"ORA-{str(i).zfill(3)}"
        assets_db[asset_id] = {
            "id": asset_id,
            "name": f"Digital Asset {i}",
            "asset_type": "DIGITAL_ARTIFACT",
            "value": 1000 + (i * 500),
            "volume": i * 500,
            "nft_ready": True,
            "created": datetime.now().isoformat()
        }
        
        # Generate valuation
        score = min(100, (i * 20) % 100)
        valuations_db[asset_id] = {
            "asset_id": asset_id,
            "score": score,
            "potential_index": int(score * 0.9),
            "security_score": (i * 17) % 100,
            "valuation": assets_db[asset_id]["value"]
        }

init_assets()

# Routes

@app.get("/")
async def root():
    """System status endpoint"""
    return {
        "status": "ACTIVE",
        "system": "Kamara Temple OS",
        "layer": "ORA Digital Economy",
        "assets_count": len(assets_db),
        "seal": "Gamada Amada Dagama Kamara Mandingu Yahweh Kazama"
    }

@app.get("/assets")
async def list_assets() -> List[dict]:
    """Get all assets"""
    return list(assets_db.values())

@app.get("/assets/{asset_id}")
async def get_asset(asset_id: str) -> dict:
    """Get specific asset"""
    if asset_id not in assets_db:
        raise HTTPException(status_code=404, detail=f"Asset not found: {asset_id}")
    return assets_db[asset_id]

@app.get("/valuation/{asset_id}")
async def get_valuation(asset_id: str) -> dict:
    """Get asset valuation"""
    if asset_id not in valuations_db:
        raise HTTPException(status_code=404, detail=f"Valuation not found: {asset_id}")
    return valuations_db[asset_id]

@app.post("/inquiry")
async def create_inquiry(inquiry: Inquiry) -> dict:
    """Submit buyer inquiry for asset"""
    if inquiry.asset_id not in assets_db:
        raise HTTPException(status_code=404, detail=f"Asset not found: {inquiry.asset_id}")
    
    inquiry_id = f"INQ-{len(inquiries_db) + 1}"
    inquiries_db[inquiry_id] = {
        "id": inquiry_id,
        "asset_id": inquiry.asset_id,
        "buyer_name": inquiry.buyer_name,
        "offer_price": inquiry.offer_price,
        "status": "PENDING",
        "created": datetime.now().isoformat()
    }
    
    return {
        "inquiry_id": inquiry_id,
        "status": "CREATED",
        "asset_id": inquiry.asset_id
    }

@app.get("/inquiry/{inquiry_id}")
async def get_inquiry(inquiry_id: str) -> dict:
    """Get inquiry details"""
    if inquiry_id not in inquiries_db:
        raise HTTPException(status_code=404, detail=f"Inquiry not found: {inquiry_id}")
    return inquiries_db[inquiry_id]

@app.get("/inquiries")
async def list_inquiries() -> List[dict]:
    """List all inquiries"""
    return list(inquiries_db.values())

@app.post("/emissary/{emissary_name}/analyze/{asset_id}")
async def emissary_analysis(emissary_name: str, asset_id: str) -> dict:
    """Get emissary analysis of asset"""
    if asset_id not in assets_db:
        raise HTTPException(status_code=404, detail=f"Asset not found: {asset_id}")
    
    if emissary_name not in ["Kamata", "Amata", "Ntala", "Mandingus"]:
        raise HTTPException(status_code=404, detail=f"Emissary not found: {emissary_name}")
    
    valuation = valuations_db[asset_id]
    asset = assets_db[asset_id]
    
    # Simple verdict logic
    if emissary_name == "Kamata":
        verdict = "STRONG HOLD" if valuation["potential_index"] > 75 else "WATCH"
    elif emissary_name == "Amata":
        verdict = "APPROVED" if valuation["security_score"] > 80 else "REVIEW"
    elif emissary_name == "Ntala":
        verdict = "ARCHIVE" if asset["volume"] > 1000 else "STORE"
    else:  # Mandingus
        verdict = "EXECUTE" if valuation["score"] > 80 else "QUEUE"
    
    return {
        "emissary": emissary_name,
        "asset_id": asset_id,
        "valuation": valuation,
        "verdict": verdict,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/nft/{asset_id}/metadata")
async def get_nft_metadata(asset_id: str) -> dict:
    """Get ERC721 metadata for asset"""
    if asset_id not in assets_db:
        raise HTTPException(status_code=404, detail=f"Asset not found: {asset_id}")
    
    asset = assets_db[asset_id]
    return {
        "name": asset["name"],
        "description": f"Sacred Digital Asset: {asset_id}",
        "image": f"ipfs://QmXXXXXXXXXXXXXXXXXXXXXX/{asset_id}",
        "attributes": [
            {"trait_type": "Asset Type", "value": asset["asset_type"]},
            {"trait_type": "Value", "value": asset["value"]},
            {"trait_type": "Volume", "value": asset["volume"]}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
