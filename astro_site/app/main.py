from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

# Подключаем статику (CSS/JS) и шаблоны (HTML)
app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")

# Пока заглушка — потом поменяешь на свой Telegram
TELEGRAM_URL = "https://t.me/your_username_or_bot"


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request": request, "telegram_url": TELEGRAM_URL},
    )


@app.get("/health")
async def health():
    return {"status": "ok"}
