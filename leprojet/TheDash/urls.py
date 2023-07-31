from django.urls import path
from . import views

# app_name='TheDash'
urlpatterns = [
     path('', views.home,name='home'),

     path('login/', views.loggin,name='login'),

     path('loggout/', views.loggout,name='loggout'),
    
     path('CrAgenda/', views.CrAgenda,name='CrAgenda'),
     path('CrEvents/', views.CrEvents,name='CrEvents'),
     path('CrQos/', views.CrQos,name='CrQos'),
    
     path('EvdEndOfYearPromo/',views.EvdEndOfYearPromo,name='EvdEndOfYearPromo'),
     path('EvdErsLife/', views.EvdErsLife,name='EvdErsLife'),
     path('EvdErsQos/', views.EvdErsQos,name='EvdErsQos'),
     path('EvdPromoErs/', views.EvdPromoErs,name='EvdPromoErs'),
     path('EvdPromoVTU/', views.EvdPromoVTU,name='EvdPromoVTU'),
     path('EvdSyGeneral/', views.EvdSyGeneral,name='EvdSyGeneral'),
    
     path('ReconERSvsIFS/', views.ReconERSvsIFS,name='ReconERSvsIFS'),
     
     
     path('ReconERSvsOCSAirtime/', views.ReconERSvsOCSAirtime,name='ReconERSvsOCSAirtime'),
      path('ReconERSvsOCSAirtimeajax/', views.ReconERSvsOCSAirtimeajax,name='ReconERSvsOCSAirtimeajax'),
     
     path('ReconERSvsOCSBundle/', views.ReconERSvsOCSBundle,name='ReconERSvsOCSBundle'),
     path('ReconERSvsOCSBundleajax/', views.ReconERSvsOCSBundleajax,name='ReconERSvsOCSBundleajax'),
    
    
    
     path('ReconEWPvsOCSAirtime/', views.ReconEWPvsOCSAirtime,name='ReconEWPvsOCSAirtime'),
     path('ReconEWPvsOCsRtimeajax/', views.ReconEWPvsOCsRtimeajax,name='ReconEWPvsOCsRtimeajax'),
     path('ReconEWPvsOCSBundle/', views.ReconEWPvsOCSBundle,name='ReconEWPvsOCSBundle'),
     
     
     path('ReconEWPvsERS/', views.ReconEWPvsERS,name='ReconEWPvsERS'),
     path('ReconEWPvsERSajax/', views.ReconEWPvsERSajax,name='ReconEWPvsERSajax'),
     

     path('CPtopconso/', views.CPtopconso,name='CPtopconso'),
    path('CPtopconsoAjax/', views.CPtopconsoAjax,name='CPtopconsoAjax'),
     
     path('CPreconCS17vsGGSN/', views.CPreconCS17vsGGSN,name='CPreconCS17vsGGSN'),
      path('CPreconCS17vsGGSNajax/', views.CPreconCS17vsGGSNajax,name='CPreconCS17vsGGSNajax'),

     path('CPtopbalance/', views.CPtopbalance,name='CPtopbalance'),
     path('balanceAjax/', views.balanceAjax,name='balanceAjax'),

     path('CPbouclage/', views.CPbouclage,name='CPbouclage'),
    path('CPbouclageAjax/', views.CPbouclageAjax,name='CPbouclageAjax'),

     path('CPpeerTOpeer/', views.CPpeerTOpeer,name='CPpeerTOpeer'),
      path('CPpeerTOpeerAjax/', views.CPpeerTOpeerAjax,name='CPpeerTOpeerAjax')
  ]
