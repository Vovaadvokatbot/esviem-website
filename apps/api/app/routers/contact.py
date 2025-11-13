from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

router = APIRouter()

class ContactPayload(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    message: str | None = None

@router.post("")
async def create_contact(payload: ContactPayload):
    # TODO: тут можна додати email/Telegram відправку та запис у БД
    return {"status": "ok", "data": payload}
