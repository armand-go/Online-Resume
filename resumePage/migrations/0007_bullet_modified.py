# Generated by Django 2.1.7 on 2019-03-31 05:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resumePage', '0006_auto_20190331_0251'),
    ]

    operations = [
        migrations.AddField(
            model_name='bullet',
            name='modified',
            field=models.BooleanField(default=False),
        ),
    ]
