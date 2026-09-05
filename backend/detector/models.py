from django.db import models

class VoiceScan(models.Model):
    audio = models.FileField(upload_to='audio/')
    prediction = models.CharField(max_length=20)
    confidence = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)