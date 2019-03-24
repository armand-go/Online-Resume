from django.db import models
from datetime import date

# Create your models here.

class Section(models.Model):
    title = models.CharField(max_length=256, unique=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class Bullet(models.Model):
    section = models.ForeignKey(Section, on_delete=models.CASCADE)

    bulletImage = models.ImageField(default=None)
    title = models.CharField(max_length=256, default='')
    content = models.OneToOneField(Content, on_delete=models.CASCADE)

    subtitle = models.CharField(max_length=256, blank=True, null=True)
    subtitleImage = models.ImageField(blank=True, null=True)
    beginDate = models.DateField(default=date.today, blank=True, null=True)
    endDate = models.DateField(default=date.today, blank=True, null=True)
    current = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Content(models.Model):
    pass

class Text(Content):
    text = models.TextField(default='')

    def __str__(self):
        return self.text

class Bar(Content):
    text = models.CharField(max_length=256, default='')
    percentage = models.IntegerField(null=True)

    def __str__(self):
        return self.text

class Portfolio(Content):
    pass

class Project(models.Model):
    projects = ForeignKey(Portfolio, on_delete=models.SET_NULL)

    name = models.CharField(max_length=256, default='')
    illustration = models.ImageField(blank=True, null=True)
