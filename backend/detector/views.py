from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import VoiceScan
from .ml import detect_voice

@api_view(['POST'])
def upload_audio(request):
    file = request.FILES.get('audio')

    if file is None:
        return Response({"error": "No audio file uploaded"}, status=400)

    prediction, confidence = detect_voice(file.name)

    scan = VoiceScan.objects.create(
        audio=file,
        prediction=prediction,
        confidence=confidence
    )

    return Response({
        "id": scan.id,
        "prediction": prediction,
        "confidence": confidence
    })