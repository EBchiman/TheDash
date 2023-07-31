
from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db.models import Q
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.views.decorators.csrf import csrf_protect
from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from datetime import datetime
import json



@csrf_protect
def loggin(request):
    if request.user.is_authenticated:
        return redirect('home')  # Rediriger vers la page d'accueil si l'utilisateur est déjà connecté

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
            
        user = User.objects.filter(username=username).first()
        if user:
            auth_user = authenticate(request, username=username, password=password)
            if auth_user is not None:
                login(request, auth_user)
                return redirect('home')  # Rediriger vers la page d'accueil après la connexion
            else:
                messages.error(request, "Mot de passe incorrect")
        else:
            messages.error(request, "L'utilisateur n'existe pas")
    
    return render(request, "TheDash/login.html", {})


@login_required(login_url='login')
def home(request):
    context={
        
    }
    return render(request, "TheDash/home.html" )


def CrAgenda(request):
    context={
        
    }
    return render(request, "TheDash/CrAgenda.html" )

def CrEvents(request):
    context={
        CrQos
    }
    return render(request, "TheDash/CrEvents.html" )

def  CrQos(request):
    context={
      
    }
    return render(request, "TheDash/CrQos.html" )
#------------------------------------------------

def EvdErsQos(request):
    context={
        
    }
    return render(request, "TheDash/EvdErsQos.html" )

def EvdErsLife(request):
    context={
        
    }
    return render(request, "TheDash/EvdErsLife.html" )

def EvdEndOfYearPromo(request):
    context={
        
    }
    return render(request, "TheDash/EvdEOYP.html" )

def EvdSyGeneral(request):
    context={
        
    }
    return render(request, "TheDash/EvdSyGeneral.html" )

def EvdPromoErs(request):
    context={
        
    }
    return render(request, "TheDash/EvdPromoErs.html" )

def EvdPromoVTU(request):
    context={
        
    }
    return render(request, "TheDash/EvdPromoVTU.html" )
#------------------------------------------------

def ReconERSvsIFS(request):
    context={
        
    }
    return render(request, "TheDash/ReconERSvsIFS.html" )


def ReconERSvsIFSdetails(request):
    context={
        
    }
    return render(request, "TheDash/ReconERSvsIFSdetails.html" )


def ReconERSvsOCSAirtime(request):
    context={
        
    }
    return render(request, "TheDash/ReconERSvsOCSAirtime.html" )
def ReconERSvsOCSAirtimeajax(request):
    if request.method == 'POST':
        dateDebut2 = request.POST.get('dateDebut2')
        dateFin2 = request.POST.get('dateFin2')

        if not dateDebut2 or not dateFin2:  # Vérifie si dateDebut2 et day7 ne sont pas fournis
            dateFin2 = datetime.now()  # Date actuelle
            current_date = datetime.now() - datetime.timedelta(days=7)  # 7 jours avant la date actuelle
            dateDebut2 = current_date
        if '/' in dateDebut2:
            dateDebut2 = datetime.strptime(dateDebut2, "%d/%m/%Y").strftime("%Y-%m-%d")
        else:
            dateDebut2 = datetime.strptime(dateDebut2, "%d-%m-%Y").strftime("%Y-%m-%d")

        if '/' in dateFin2:
          dateFin2 = datetime.strptime(dateFin2, "%d/%m/%Y").strftime("%Y-%m-%d")
        else:
           dateFin2 = datetime.strptime(dateFin2, "%d-%m-%Y").strftime("%Y-%m-%d")
        
        sql = """
             select DATEID, ERS_TOTAL, ERS_AMOUNT, CS16_TOTAL, CS16_AMOUNT, GAP_TOTAL, GAP_AMOUNT from RESUME_AIRTIME_ERS_CS16
            where DATEID between %s and %s
            ORDER BY DATEID
        """
        
        with connection.cursor() as cursor:
            cursor.execute(sql, [dateDebut2, dateFin2])
            column = [col[0] for col in cursor.description]
            stats = cursor.fetchall()
            results = []
            for row in stats:
                results.append(dict(zip(column, row)))
            Json_data = json.dumps(results)

        return JsonResponse({'result': Json_data})
    
    return JsonResponse({'error': 'Requête non autorisée'}, status=400)


def ReconERSvsOCSBundle(request):
    context={
        
    }
    return render(request, "TheDash/ReconERSvsOCSBundle.html" )
def ReconERSvsOCSBundleajax(request):
    if request.method == 'POST':
        dateDebut1 = request.POST.get('dateDebut1')
        dateFin1 = request.POST.get('dateFin1')

        if not dateDebut1 or not dateFin1:  # Vérifie si dateDebut1 et day7 ne sont pas fournis
            dateFin1 = datetime.now()  # Date actuelle
            current_date = datetime.now() - datetime.timedelta(days=7)  # 7 jours avant la date actuelle
            dateDebut1 = current_date
        if '/' in dateDebut1:
            dateDebut1 = datetime.strptime(dateDebut1, "%d/%m/%Y").strftime("%Y-%m-%d")
        else:
            dateDebut1 = datetime.strptime(dateDebut1, "%d-%m-%Y").strftime("%Y-%m-%d")

        if '/' in dateFin1:
          dateFin1 = datetime.strptime(dateFin1, "%d/%m/%Y").strftime("%Y-%m-%d")
        else:
           dateFin1 = datetime.strptime(dateFin1, "%d-%m-%Y").strftime("%Y-%m-%d")
        sql = """
            select DATEID, ERS_TOTAL, ERS_AMOUNT, CS16_TOTAL, CS16_AMOUNT, GAP_TOTAL, GAP_AMOUNT
            from RESUME_BUNDLE_ERS_CS16
            where DATEID between %s and %s
            ORDER BY DATEID
        """
        
        with connection.cursor() as cursor:
            cursor.execute(sql, [dateDebut1, dateFin1])
            column = [col[0] for col in cursor.description]
            stats = cursor.fetchall()
            results = []
            for row in stats:
                results.append(dict(zip(column, row)))
            Json_data = json.dumps(results)

        return JsonResponse({'result': Json_data})
    
    return JsonResponse({'error': 'Requête non autorisée'}, status=400)

#------------------------------------------------
def ReconEWPvsOCSAirtime(request):
    context = {}
    return render(request, "TheDash/ReconEWPvsOCSAirtime.html")
def ReconEWPvsOCsRtimeajax(request):
    if request.method == 'POST':
        strt = request.POST.get('strt')
        ennd = request.POST.get('ennd')

        if not strt or not ennd:  # Vérifie si strt et day7 ne sont pas fournis
            ennd = datetime.now()  # Date actuelle
            current_date = datetime.now() - datetime.timedelta(days=7)  # 7 jours avant la date actuelle
            strt = current_date
        if '/' in strt:
            strt = datetime.strptime(strt, "%d/%m/%Y").strftime("%Y-%m-%d")
        else:
            strt = datetime.strptime(strt, "%d-%m-%Y").strftime("%Y-%m-%d")

        if '/' in ennd:
          ennd = datetime.strptime(ennd, "%d/%m/%Y").strftime("%Y-%m-%d")
        else:
           ennd = datetime.strptime(ennd, "%d-%m-%Y").strftime("%Y-%m-%d")
      
        sql="""	select DATEID,EWP_TOTAL,EWP_AMOUNT,OCS_TOTAL,OCS_AMOUNT,GAP_TOTAL,GAP_AMOUNT from RESUME_AIRTIME_EWP_OCS
            where DATEID between %s and %s
            ORDER BY DATEID """
        with connection.cursor()as cursor :
            cursor.execute(sql,[strt,ennd])
            column=[col[0] for col in cursor.description ]
            stats= cursor.fetchall() 
            results =[]
            for row in stats:
                results.append(dict(zip(column, row)))

            Json_data=json.dumps(results)    

        return JsonResponse({'result':Json_data})
    return JsonResponse({'error':'Requête non autorisé'}, status=400)

def ReconEWPvsOCSBundle(request):
    context={
        
    }
    return render(request, "TheDash/ReconEWPvsOCSBundle.html" )

#------------------------------------------------
def ReconEWPvsERS(request):
    context={
        
    }
    return render(request, "TheDash/ReconEWPvsERS.html" )
def ReconEWPvsERSajax(request):
     if request.method == 'POST':
        dateDebut = request.POST.get('dateDebut')
        dateFin = request.POST.get('dateFin')

        if not dateDebut or not dateFin:  # Vérifie si dateDebut2 et day7 ne sont pas fournis
            dateFin = datetime.now()  # Date actuelle
            current_date = datetime.now() - datetime.timedelta(days=7)  # 7 jours avant la date actuelle
            dateDebut = current_date
        if '/' in dateDebut:
            dateDebut = datetime.strptime(dateDebut, "%d/%m/%Y").strftime("%Y-%m-%d")
        else:
            dateDebut = datetime.strptime(dateDebut, "%d-%m-%Y").strftime("%Y-%m-%d")

        if '/' in dateFin:
          dateFin = datetime.strptime(dateFin, "%d/%m/%Y").strftime("%Y-%m-%d")
        else:
           dateFin = datetime.strptime(dateFin, "%d-%m-%Y").strftime("%Y-%m-%d")
        sql="""	
            select dates, ewp_total, ewpamount, ers_total, ersamount, gap_total, gapamount from RESUME_TRANSACTIONS_EWP_ERS
            where DATES between %s and %s
            ORDER BY DATES """
        with connection.cursor()as cursor :
            cursor.execute(sql , [dateDebut,dateFin])
            column=[col[0] for col in cursor.description ]
            stats= cursor.fetchall() 
            results =[]
            for row in stats:
                results.append(dict(zip(column, row)))

            Json_data=json.dumps(results)    

        return JsonResponse({'result':Json_data})
    
     return JsonResponse({'error':'Requête non autorisé'}, status=400)
#---------------------------------------------------------

def CPtopconso(request):
    context={
        
    }
    return render(request, "TheDash/CPtopconso.html" )
def CPtopconsoAjax(request):
   if request.method == 'POST':
        conso1 = request.POST.get('conso1')
        conso7 = request.POST.get('conso7')

        if not conso1 or not conso7:  # Vérifie si conso1 et day7 ne sont pas fournis
            conso7 = datetime.now()  # Date actuelle
            current_date = datetime.now() - datetime.timedelta(days=7)  # 7 jours avant la date actuelle
            conso1 = current_date
        if '/' in conso1:
            conso1 = datetime.strptime(conso1, "%d/%m/%Y").strftime("%Y%m%d")
        else:
            conso1 = datetime.strptime(conso1, "%d-%m-%Y").strftime("%Y%m%d")

        if '/' in conso7:
           conso7 = datetime.strptime(conso7, "%d/%m/%Y").strftime("%Y%m%d")
        else:
            conso7 = datetime.strptime(conso7, "%d-%m-%Y").strftime("%Y%m%d")
        # Effectuez ici vos requêtes SQL pour récupérer les données
        sql = """SELECT transdate,subno,product_name,conso
                 FROM TopConso_x_Profil
                 WHERE transdate BETWEEN %s AND %s
                 ORDER BY transdate""" 
       
        with connection.cursor() as cursor:
            cursor.execute(sql, [conso1, conso7])
            column = [col[0] for col in cursor.description]
            stats = cursor.fetchall()
            results= []
            for row in stats:
                results.append(dict(zip(column, row)))

            jsson=json.dumps(results)    
        return JsonResponse({'result':jsson})
   return JsonResponse({'error':'Requête non autorisé'}),

def CPreconCS17vsGGSN(request):
    context={
        
    }
    return render(request, "TheDash/CPreconCS17vsGGSN.html" )
def CPreconCS17vsGGSNajax(request):
    if request.method == 'POST':
        day1 = request.POST.get('day1')
        day7 = request.POST.get('day7')

        if not day1 or not day7:  # Vérifie si day1 et day7 ne sont pas fournis
            day7 = datetime.now()  # Date actuelle
            current_date = datetime.now() - datetime.timedelta(days=7)  # 7 jours avant la date actuelle
            day1 = current_date

        if '/' in day1:
            day1 = datetime.strptime(day1, "%d/%m/%Y").strftime("%Y%m%d")
        else:
            day1 = datetime.strptime(day1, "%d-%m-%Y").strftime("%Y%m%d")

        if '/' in day7:
            day7 = datetime.strptime(day7, "%d/%m/%Y").strftime("%Y%m%d")
        else:
            day7 = datetime.strptime(day7, "%d-%m-%Y").strftime("%Y%m%d")


        # Effectuez ici vos requêtes SQL pour récupérer les données
        #  requêtes GGSN
        sql1 = """SELECT tbl_dt, VOL_DATA_UP_TO, VOL_DATA_DOWN_TO, VOL_DATA_TOTAL_TO
                 FROM Reconciliation_GGSN
                 WHERE tbl_dt BETWEEN %s AND %s
                 ORDER BY tbl_dt"""
        with connection.cursor() as cursor:
            cursor.execute(sql1, [day1, day7])
            column = [col[0] for col in cursor.description]
            stats = cursor.fetchall()
            results1 = []
            for row in stats:
                results1.append(dict(zip(column, row)))

        #  requête CS
        sql2 = """SELECT tbl_dt, CS_VOL
                 FROM Reconciliation_CS17_
                 WHERE tbl_dt BETWEEN %s AND %s
                 ORDER BY tbl_dt"""
        with connection.cursor() as cursor:
            cursor.execute(sql2, [day1, day7])
            column = [col[0] for col in cursor.description]
            stats = cursor.fetchall()
            results2 = []
            for row in stats:
                results2.append(dict(zip(column, row)))

        json_data = json.dumps({'result1': results1, 'result2': results2})

        return JsonResponse({'result': json_data})

    return JsonResponse({'error': 'Requête non autorisée'}, status=400)

def CPtopbalance(request):
    context={
        
    }
    return render(request, "TheDash/CPtopbalance.html" )
def balanceAjax(request):
    if request.method == 'POST':
        bald1 = request.POST.get('bald1')
        bald7 = request.POST.get('bald7')

        if not bald1 or not bald7:  # Vérifie si day1 et day7 ne sont pas fournis
            bald7 = datetime.now()  # Date actuelle
            current_date = datetime.now() - datetime.timedelta(days=7)  # 7 jours avant la date actuelle
            bald1 = current_date
        if '/' in bald1:
            bald1 = datetime.strptime(bald1, "%d/%m/%Y").strftime("%Y%m%d")
        else:
            bald1 = datetime.strptime(bald1, "%d-%m-%Y").strftime("%Y%m%d")

        if '/' in bald7:
            bald7 = datetime.strptime(bald7, "%d/%m/%Y").strftime("%Y%m%d")
        else:
            bald7 = datetime.strptime(bald7, "%d-%m-%Y").strftime("%Y%m%d")
        reqsql = """WITH BalanceCTE AS (
                    SELECT
                       CAST(CAST(msisdn AS varchar(max)) AS bigint) AS msisdn,
                        CAST(product_name AS varchar(max)) AS product_name,
                        CAST(CAST(balance AS varchar(max)) AS bigint) AS balance,
                        data_day
                    FROM
                        TopBalance_x_Profil
                   
                )
                SELECT
                    t1.data_day,
                     CAST(CAST(t1.msisdn AS varchar(max)) AS bigint) AS msisdn,
                    CAST(t1.product_name AS varchar(max)) AS product_name,
                    CAST(CAST(t1.balance AS varchar(max)) AS bigint) AS balance,
                    (t2.balance - CAST(CAST(t1.balance AS varchar(max)) AS bigint)) AS conso
                FROM
                    TopBalance_x_Profil t1
                LEFT JOIN
                    BalanceCTE t2 ON CAST(CAST(t1.msisdn AS varchar(max)) AS bigint) = t2.msisdn
                WHERE
                    t1.data_day BETWEEN %s AND %s
                GROUP BY
                    t1.data_day,
                    CAST(CAST(t1.msisdn AS varchar(max)) AS bigint),
                    CAST(t1.product_name AS varchar(max)),
                    CAST(CAST(t1.balance AS varchar(max)) AS bigint),
                    t2.balance
                   ORDER BY
                    t1.data_day;
                 """
        with connection.cursor() as cursor:
            cursor.execute(reqsql, [bald1, bald7])
            column = [col[0] for col in cursor.description]
            stats = cursor.fetchall()
            results= []
            for row in stats:
                results.append(dict(zip(column, row)))

            Jxon_data=json.dumps(results)    
            return JsonResponse({'result':Jxon_data})
        
    return JsonResponse({'error':'Requête non autorisé'}),

def CPpeerTOpeer(request):
    context={
        
    }
    return render(request, "TheDash/CPpeerTOpeer.html" )
def CPpeerTOpeerAjax(request):

    if request.method == 'POST':
        dia1 = request.POST.get('dia1')
        dia7 = request.POST.get('dia7')

        if not dia1 or not dia7:  # Vérifie si day1 et day7 ne sont pas fournis
            dia7 = datetime.now()  # Date actuelle
            current_date = datetime.now() - datetime.timedelta(days=7)  # 7 jours avant la date actuelle
            dia1 = current_date
        if '/' in dia1:
            dia1 = datetime.strptime(dia1, "%d/%m/%Y").strftime("%Y%m%d")
        else:
            dia1 = datetime.strptime(dia1, "%d-%m-%Y").strftime("%Y%m%d")

        if '/' in dia7:
            dia7 = datetime.strptime(dia7, "%d/%m/%Y").strftime("%Y%m%d")
        else:
            dia7 = datetime.strptime(dia7, "%d-%m-%Y").strftime("%Y%m%d")
        # Effectuez ici vos requêtes SQL pour récupérer les données
        sql = """SELECT dw_date_key, Total_TransitionFee, Total_Transferamount,Total_ChargeFromPrepaid,Gap
                 FROM Peer_to_Peer_SDP_Balance_Transfer_Reconciliation
                 WHERE dw_date_key BETWEEN %s AND %s
                 ORDER BY dw_date_key""" 
       
        with connection.cursor() as cursor:
            cursor.execute(sql, [dia1, dia7])
            column = [col[0] for col in cursor.description]
            stats = cursor.fetchall()
            results= []
            for row in stats:
                results.append(dict(zip(column, row)))

            jjson_data=json.dumps(results)    
        return JsonResponse({'result':jjson_data})
    
    return JsonResponse({'error':'Requête non autorisé'}), 

def CPbouclage(request):
    context={
        
    }
    return render(request, "TheDash/CPbouclage.html" )
@csrf_exempt
@require_http_methods(['GET'])
def CPbouclageAjax(request):
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

        jxxon_data = json.dumps(results)    
    return JsonResponse({'result': jxxon_data})



def loggout(request):
    logout(request)
    return redirect('login')

