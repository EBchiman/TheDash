# tasks.py

from celery import shared_task , Celery
from django.core.mail import EmailMessage
import csv
from django.db import connection
app = Celery('TheDash')
import json

@app.task
def envoyer_emails():
    sql = """SELECT da_id, balance_ouverture,
             balance_fermeture, reception, consommation  
             FROM BouclageAD
             ORDER BY da_id""" 
   
    with connection.cursor() as cursor:
        cursor.execute(sql)
        column = [col[0] for col in cursor.description]
        stats = cursor.fetchall()
        results = []
        for row in stats:
            results.append(dict(zip(column, row)))

    gap_equals_0 = [row for row in results if row['balance_ouverture'] + row['reception'] - row['consommation'] - row['balance_fermeture'] == 0]
    gap_not_equals_0 = [row for row in results if row['balance_ouverture'] + row['reception'] - row['consommation'] - row['balance_fermeture'] != 0]

    # Enregistrer les données filtrées dans des fichiers CSV
    with open('gap_equals_0.csv', 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=column)
        writer.writeheader()
        writer.writerows(gap_equals_0)

    with open('gap_not_equals_0.csv', 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=column)
        writer.writeheader()
        writer.writerows(gap_not_equals_0)

    # Envoi de l'e-mail avec les fichiers en pièces jointes
    # subject = 'Données GAP égal à 0 et différent de 0'
    # message = 'Veuillez trouver ci-joint les fichiers contenant les données GAP égal à 0 et différent de 0.'
    # from_email = 'mtestMTN@gmail.com'
    # recipient_list = ['mtestMTN@gmail.com']

    # email = EmailMessage(subject, message, from_email, recipient_list)
    # email.attach_file('gap_equals_0.csv')
    # email.attach_file('gap_not_equals_0.csv')
    # email.send()
    print('hi')

    # return 'E-mails envoyés avec succès.'
envoyer_emails()