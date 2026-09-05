import random

def detect_voice(file_path):
    confidence = round(random.uniform(85, 99), 2)

    if confidence > 92:
        prediction = "Deepfake"
    else:
        prediction = "Real"

    return prediction, confidence