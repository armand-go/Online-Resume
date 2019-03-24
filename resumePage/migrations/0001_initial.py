# Generated by Django 2.1.5 on 2019-03-24 07:07

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bullet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bulletImage', models.ImageField(default=None, upload_to='')),
                ('title', models.CharField(default='', max_length=256)),
                ('content', models.TextField(default='', max_length=1500)),
                ('subtitle', models.CharField(max_length=256)),
                ('subtitleImage', models.ImageField(default=None, upload_to='')),
                ('beginDate', models.DateField(default=datetime.date.today)),
                ('endDate', models.DateField(default=datetime.date.today)),
                ('current', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
            ],
        ),
        migrations.AddField(
            model_name='bullet',
            name='section',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='resumePage.Section'),
        ),
    ]
