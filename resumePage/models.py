from django.db import models

from datetime import date
from PIL import Image


# Create your models here.
class Introduction(models.Model):
    name = models.CharField(max_length=256, default='')
    surname = models.CharField(max_length=256, default='')
    profession = models.CharField(max_length=256, default='')
    introduction = models.TextField(default='')

    profile_pic = models.ImageField(upload_to='resumePage/img/profilePic/', default=None, null=True, blank=True)

    def __str__(self):
        return self.name + ' ' + self.surname


class Section(models.Model):
    title = models.CharField(max_length=256, unique=True, default='')
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order']


class Bullet(models.Model):
    section = models.ForeignKey(Section, related_name='bullets', on_delete=models.CASCADE)

    title = models.CharField(max_length=256, default='')
    bulletImage = models.FileField(upload_to='resumePage/svg/bullet', default='resumePage/svg/bullet/circle-solid.svg')
    modified = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    related_content = models.CharField(max_length=256, default='', blank=True)

    def get_related_content(self):
        if hasattr(self, 'text_content'):
            return self.text_content.__class__.__name__
        elif hasattr(self, 'bars_content'):
            return self.bars_content.__class__.__name__
        elif hasattr(self, 'portfolio_content'):
            return self.portfolio_content.__class__.__name__

    def save(self, *args, **kwargs):
        if(self.bulletImage.name != 'resumePage/svg/bullet/circle-solid.svg'):
            self.modified = True;
        super(Bullet, self).save(*args, **kwargs)


    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order']


class Content(models.Model):
    bullet = models.OneToOneField(Bullet, related_name='%(class)s_content',
                                on_delete=models.CASCADE, default=None, blank=True)

    class Meta:
        abstract = True


class Text(Content):
    description = models.TextField(default='')
    subtitle = models.CharField(max_length=256, default=None, blank=True)
    subtitleImg = models.FileField(upload_to='resumePage/svg/content', default=None, blank=True)

    def __str__(self):
        return self.description

    def save(self, *args, **kwargs):
        self.bullet.related_content = "text_content"
        self.bullet.save()
        super(Text, self).save(*args, **kwargs)


class Bars(Content):
    def save(self, *args, **kwargs):
        self.bullet.related_content = "bars_content"
        self.bullet.save()
        super(Bars, self).save(*args, **kwargs)

class ProgressBar(models.Model):
    bar = models.ForeignKey(Bars, related_name='progress_bars', on_delete=models.CASCADE, default=None)

    text = models.CharField(max_length=256, default='')
    percentage = models.IntegerField()

    def __str__(self):
        return self.text


class Portfolio(Content):
    def __str__(self):
        return self.bullet.title

    def save(self, *args, **kwargs):
        self.bullet.related_content = "portfolio_content"
        self.bullet.save()
        super(Portfolio, self).save(*args, **kwargs)


class Project(models.Model):
    portfolio = models.ForeignKey(Portfolio, related_name='projects', on_delete=models.SET_NULL, null=True)

    name = models.CharField(max_length=256, default='')
    illustration = models.ImageField(upload_to='resumePage/img/projects',blank=True, null=True)

    def __str__(self):
        return self.name
