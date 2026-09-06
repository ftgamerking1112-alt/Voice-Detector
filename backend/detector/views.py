from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import VoiceScan
from .ml import detect_voice

@api_view(['GET'])
def api_root(request):
    return Response({
        "status": "online",
        "service": "Voice Detector API",
        "endpoints": {
            "upload_audio": "/api/upload/",
            "admin": "/admin/",
            "media": "/media/"
        }
    })

@api_view(['POST'])
def upload_audio(request):
    file = request.FILES.get('audio')

    if file is None:
        return Response({"error": "No audio file uploaded"}, status=400)

    scan = VoiceScan.objects.create(audio=file, prediction="", confidence=0)
    prediction, confidence = detect_voice(scan.audio.path)
    scan.prediction = prediction
    scan.confidence = confidence
    scan.save()

    return Response({
        "id": scan.id,
        "prediction": prediction,
        "confidence": confidence
    })

