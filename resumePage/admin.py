from django.contrib import admin
from .models import (Introduction, Section, Bullet,
                    Text, Project, ProgressBar,
                    Bars, Portfolio, Contact)

# Register your models here.
admin.site.register(Introduction)
admin.site.register(Section)
admin.site.register(Bullet)
admin.site.register(Text)
admin.site.register(Project)
admin.site.register(Bars)
admin.site.register(ProgressBar)
admin.site.register(Portfolio)
admin.site.register(Contact)
