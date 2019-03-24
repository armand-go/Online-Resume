from django.db import models

# Create your models here.

class Section(models.Model):
    title = models.CharField(max_length=256)

class Bullet(models.Model):
    section = ForeignKey(Section, on_delete=models.CASCADE)

    bulletImage = models.ImageField(default=None)
    title = models.CharField(max_length=256, default='')
    content = models.TextField(max_length=1500, default='')

    subtitle = models.CharField(max_length=256)
    subtitleImage = models.ImageField()
    beginDate = models.DateField(default=date.today)
    endDate = models.DateField(default=date.today)
    current = models.BooleanField(default=False)
