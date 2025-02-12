from pydantic import BaseModel

class PersonalizedAdvice(BaseModel):
    improvement: str
    tip: str
    example: str

class ResponseModel(BaseModel):
    corrected_sentence: str
    personalized_advice: PersonalizedAdvice
    
class InputModel(BaseModel):
    text_input: str