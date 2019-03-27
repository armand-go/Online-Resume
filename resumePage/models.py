from django.db import models

from datetime import date
from PIL import Image


# Create your models here.

class Introduction(models.Model):
    name = models.CharField(max_length=256, default='')
    surname = models.CharField(max_length=256, default='')
    profession = models.CharField(max_length=256, default='')
    introduction = models.TextField(default='')

    profile_pic = models.ImageField(upload_to='resumePage/img/', default=None, null=True, blank=True)

    def __str__(self):
        return self.name + ' ' + self.surname


class Section(models.Model):
    title = models.CharField(max_length=256, unique=True, default='')
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Bullet(models.Model):
    section = models.ForeignKey(Section, related_name='bullet', on_delete=models.CASCADE)

    title = models.CharField(max_length=256, default='')
    bulletImage = models.ImageField(default=None, blank=True)

    def __str__(self):
        return self.title


class Content(models.Model):
    bullet = models.OneToOneField(Bullet, on_delete=models.CASCADE)

    subtitle = models.CharField(max_length=256, default=None, blank=True)
    subtitleImg = models.ImageField(default=None, blank=True)


class Text(Content):
    description = models.TextField(default='')

    def __str__(self):
        return self.description


class Bars(Content):
    pass


class ProgressBar(models.Model):
    bar = models.ForeignKey(Bars, related_name='progress_bar', on_delete=models.CASCADE)

    text = models.CharField(max_length=256, default='')
    percentage = models.IntegerField(null=True)

    def __str__(self):
        return self.text


class Portfolio(Content):
    def __str__(self):
        return self.project.all()


class Project(models.Model):
    portfolio = models.ForeignKey(Portfolio, related_name='project', on_delete=models.SET_NULL, null=True)

    name = models.CharField(max_length=256, default='')
    illustration = models.ImageField(blank=True, null=True)

    def __str__(self):
        return self.name
