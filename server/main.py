import logging
import os
from pathlib import Path
import uvicorn

from fastapi import FastAPI
from fastapi.logger import logger
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from starlette.requests import Request
from starlette.responses import Response

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

dirname = Path(__file__).resolve().parent


origins = [
    "http://localhost:3001",
]

app = FastAPI()


# https://github.com/tiangolo/fastapi/issues/775#issuecomment-592946834
async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as exc:
        logger.exception(exc)
        return Response("Internal server error", status_code=500)


# TODO: Serve the React app using fastapi
app.middleware("http")(catch_exceptions_middleware)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#app.mount(
#    "/site",
#    StaticFiles(directory=dirname / ".." / "web-app" / "build", html=True),
#    name="site",
#)


class GetPingResBody(BaseModel):
    message: str


@app.get("/ping", response_model=GetPingResBody)
async def ping():
    return GetPingResBody(message="PONG")


def use_route_names_as_operation_ids(app: FastAPI) -> None:
    """
    Simplify operation IDs so that generated API clients have simpler function
    names.

    Should be called only after all routes have been added.
    """
    for route in app.routes:
        if isinstance(route, APIRoute):
            route.operation_id = route.name  # in this case, 'read_items'


use_route_names_as_operation_ids(app)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)
