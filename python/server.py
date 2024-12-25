from fastapi import FastAPI
from fastapi.responses import ORJSONResponse, StreamingResponse
from fastapi.requests import Request
from src.PandasManifold import fold_data
from requests import get
import io

app = FastAPI()

@app.get("/", response_class=ORJSONResponse)
async def root():
    return ORJSONResponse({"status": "Python HXL/Pandas Server up..."})

@app.post("/manifold")
async def manifold(req: Request):
    data = await req.json()
    
    f_csv = None
    
    try:
        tag_arr = data["tags"].split(",")
        csv = get(data["file"]).text
        f_csv = fold_data(csv, tag_arr)
    except Exception as e:
        print(e)
    
    return StreamingResponse(io.StringIO(f_csv), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=folded.csv"})