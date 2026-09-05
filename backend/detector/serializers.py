from rest_framework import serializers
from .models import VoiceScan

class VoiceScanSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceScan
        fields = "__all__"