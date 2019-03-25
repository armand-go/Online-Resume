from django.db import models
from datetime import date

# Create your models here.

class Section(models.Model):
    title = models.CharField(max_length=256, unique=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class Bullet(models.Model):
    section = models.ForeignKey(Section, related_name='bullet' on_delete=models.CASCADE)

    bulletImage = models.ImageField(default=None, blank=True)
    title = models.CharField(max_length=256, default='')
    content = models.OneToOneField(Content, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Content(models.Model):
    subtitle = models.CharField(max_length=256, default=None,, blank=True)
    subtitleImg = models.ImageField(default=None, blank=True)

class Text(Content):
    text = models.TextField(default='')

    def __str__(self):
        return self.text

class Bars(Content):
    def __str__(self):
        return self.progress_bar.all()

class ProgressBar(models.Model):
    bar = models.ForeignKey(Bar, related_name='progress_bar' on_delete=models.CASCADE)

    text = models.CharField(max_length=256, default='')
    percentage = models.IntegerField(null=True)

    def __str__(self):
        return self.text

class Portfolio(Content):
    def __str__(self):
        return self.project.all()

class Project(models.Model):
    portfolio = models.ForeignKey(Portfolio, related_name='project' on_delete=models.SET_NULL)

    name = models.CharField(max_length=256, default='')
    illustration = models.ImageField(blank=True, null=True)

    def __str__(self):
        return self.name
