from django.db import models

# # Create your models here.

class AirtimeCs16NotInErs(models.Model):
    Lid = models.AutoField(primary_key=True)
    heure = models.CharField(db_column='HEURE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    sendermsisdn = models.CharField(db_column='SENDERMSISDN', max_length=255, blank=True, null=True)  # Field name made lowercase.
    dates = models.CharField(db_column='DATES', max_length=255, blank=True, null=True)  # Field name made lowercase.
    ersreference = models.CharField(db_column='ERSREFERENCE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    requestamountvalue = models.CharField(db_column='REQUESTAMOUNTVALUE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    receivermsisdn = models.CharField(db_column='RECEIVERMSISDN', max_length=255, blank=True, null=True)  # Field name made lowercase.
    resultcode = models.CharField(db_column='RESULTCODE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    resultstatus = models.CharField(db_column='RESULTSTATUS', max_length=255, blank=True, null=True)  # Field name made lowercase.
    id = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'AIRTIME_CS16_NOT_IN_ERS'

class AirtimeCs16NotInErs2(models.Model):
    Lid = models.AutoField(primary_key=True)
    dateid = models.CharField(db_column='DATEID', max_length=255, blank=True, null=True)  # Field name made lowercase.
    dw_date_key = models.CharField(db_column='DW_DATE_KEY', max_length=255, blank=True, null=True)  # Field name made lowercase.
    heure = models.CharField(db_column='HEURE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    extid = models.CharField(db_column='EXTID', max_length=255, blank=True, null=True)  # Field name made lowercase.
    amount = models.CharField(db_column='AMOUNT', max_length=255, blank=True, null=True)  # Field name made lowercase.
    sendermsisdn = models.CharField(db_column='SENDERMSISDN', max_length=255, blank=True, null=True)  # Field name made lowercase.
    receiver = models.CharField(db_column='RECEIVER', max_length=255, blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(db_column='STATUS', max_length=255, blank=True, null=True)  # Field name made lowercase.
    hostname = models.CharField(db_column='HOSTNAME', max_length=255, blank=True, null=True)  # Field name made lowercase.
    id = models.CharField(max_length=255, blank=True, null=True)
    extid2 = models.CharField(max_length=255, blank=True, null=True)
    id2 = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'AIRTIME_CS16_NOT_IN_ERS_2'



class AirtimeErsNotInCs16(models.Model):
    Lid = models.AutoField(primary_key=True)
    dates = models.CharField(db_column='DATES', max_length=255, blank=True, null=True)  # Field name made lowercase.
    heure = models.CharField(db_column='HEURE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    ersreference = models.CharField(db_column='ERSREFERENCE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    requestamountvalue = models.CharField(db_column='REQUESTAMOUNTVALUE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    receivermsisdn = models.CharField(db_column='RECEIVERMSISDN', max_length=255, blank=True, null=True)  # Field name made lowercase.
    sendermsisdn = models.CharField(db_column='SENDERMSISDN', max_length=255, blank=True, null=True)  # Field name made lowercase.
    resultcode = models.CharField(db_column='RESULTCODE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    resultstatus = models.CharField(db_column='RESULTSTATUS', max_length=255, blank=True, null=True)  # Field name made lowercase.
    id = models.CharField(max_length=255, blank=True, null=True)
    id2 = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'AIRTIME_ERS_NOT_IN_CS16'


class BundleEwpNotInCs16(models.Model):
    Lid = models.AutoField(primary_key=True)
    dateid = models.CharField(db_column='DATEID', max_length=255, blank=True, null=True)  # Field name made lowercase.
    heure = models.CharField(db_column='HEURE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(db_column='STATUS', max_length=255, blank=True, null=True)  # Field name made lowercase.
    txtype = models.CharField(db_column='TXTYPE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    service = models.CharField(db_column='SERVICE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    fid = models.CharField(db_column='FID', max_length=255, blank=True, null=True)  # Field name made lowercase.
    ext_id = models.CharField(db_column='EXT_ID', max_length=255, blank=True, null=True)  # Field name made lowercase.
    amount = models.CharField(db_column='AMOUNT', max_length=255, blank=True, null=True)  # Field name made lowercase.
    msisdn_from = models.CharField(db_column='MSISDN_FROM', max_length=255, blank=True, null=True)  # Field name made lowercase.
    profile_descr_fr = models.CharField(db_column='PROFILE_DESCR_FR', max_length=255, blank=True, null=True)  # Field name made lowercase.
    account_holder_cd_fr = models.CharField(db_column='ACCOUNT_HOLDER_CD_FR', max_length=255, blank=True, null=True)  # Field name made lowercase.
    type_fr = models.CharField(db_column='TYPE_FR', max_length=255, blank=True, null=True)  # Field name made lowercase.
    msisdn_to = models.CharField(db_column='MSISDN_TO', max_length=255, blank=True, null=True)  # Field name made lowercase.
    profile_descr_to = models.CharField(db_column='PROFILE_DESCR_TO', max_length=255, blank=True, null=True)  # Field name made lowercase.
    account_holder_cd_to = models.CharField(db_column='ACCOUNT_HOLDER_CD_TO', max_length=255, blank=True, null=True)  # Field name made lowercase.
    type_to = models.CharField(db_column='TYPE_TO', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'BUNDLE_EWP_NOT_IN_CS16'


class ErsErrorAnalysis(models.Model):
    Lid = models.AutoField(primary_key=True)
    datejour = models.CharField(db_column='DATEJOUR', max_length=255, blank=True, null=True)  # Field name made lowercase.
    transactiontype = models.CharField(db_column='TRANSACTIONTYPE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    resultstatus = models.CharField(db_column='RESULTSTATUS', max_length=255, blank=True, null=True)  # Field name made lowercase.
    total = models.CharField(db_column='TOTAL', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ERS_ERROR_ANALYSIS'


class EwpNotInErs(models.Model):
    Lid = models.AutoField(primary_key=True)
    dates = models.CharField(max_length=255, blank=True, null=True)
    heure = models.CharField(max_length=255, blank=True, null=True)
    fid = models.CharField(max_length=255, blank=True, null=True)
    extid = models.CharField(max_length=255, blank=True, null=True)
    amount = models.CharField(max_length=255, blank=True, null=True)
    msisdn_from = models.CharField(max_length=255, blank=True, null=True)
    msisdn_to = models.CharField(max_length=255, blank=True, null=True)
    finalref = models.CharField(max_length=255, blank=True, null=True)
    finalstatus = models.CharField(max_length=255, blank=True, null=True)
    momodepositfailed = models.CharField(max_length=255, blank=True, null=True)
    momotransactoriginalreference = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'EWP_NOT_IN_ERS'


class InitialErrorPayment(models.Model):
    Lid = models.AutoField(primary_key=True)
    dates = models.CharField(db_column='DATES', max_length=255, blank=True, null=True)  # Field name made lowercase.
    heure = models.CharField(db_column='HEURE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    txtype = models.CharField(db_column='TXTYPE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    fid = models.CharField(db_column='FID', max_length=255, blank=True, null=True)  # Field name made lowercase.
    extid = models.CharField(db_column='EXTID', max_length=255, blank=True, null=True)  # Field name made lowercase.
    amount = models.CharField(db_column='AMOUNT', max_length=255, blank=True, null=True)  # Field name made lowercase.
    sp = models.CharField(db_column='SP', max_length=255, blank=True, null=True)  # Field name made lowercase.
    msisdn_from = models.CharField(db_column='MSISDN_FROM', max_length=255, blank=True, null=True)  # Field name made lowercase.
    msisdn_to = models.CharField(db_column='MSISDN_TO', max_length=255, blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(db_column='STATUS', max_length=255, blank=True, null=True)  # Field name made lowercase.
    refund_ref = models.CharField(db_column='REFUND_REF', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'INITIAL_ERROR_PAYMENT'


class PeerToPeerSdpBalanceTransferReconciliation(models.Model):
    Lid = models.AutoField(primary_key=True)
    dw_date_key = models.IntegerField(blank=True, null=True)
    total_transitionfee = models.BigIntegerField(db_column='Total_TransitionFee', blank=True, null=True)  # Field name made lowercase.
    total_transferamount = models.BigIntegerField(db_column='Total_Transferamount', blank=True, null=True)  # Field name made lowercase.
    total_chargefromprepaid = models.BigIntegerField(db_column='Total_ChargeFromPrepaid', blank=True, null=True)  # Field name made lowercase.
    gap = models.BigIntegerField(db_column='Gap', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Peer_to_Peer_SDP_Balance_Transfer_Reconciliation'


class ResumeAirtimeErsCs16(models.Model):
    Lid = models.AutoField(primary_key=True)
    dateid = models.CharField(db_column='DATEID', max_length=255, blank=True, null=True)  # Field name made lowercase.
    ers_total = models.IntegerField(db_column='ERS_TOTAL', blank=True, null=True)  # Field name made lowercase.
    ers_amount = models.FloatField(db_column='ERS_AMOUNT', blank=True, null=True)  # Field name made lowercase.
    cs16_total = models.IntegerField(db_column='CS16_TOTAL', blank=True, null=True)  # Field name made lowercase.
    cs16_amount = models.FloatField(db_column='CS16_AMOUNT', blank=True, null=True)  # Field name made lowercase.
    gap_total = models.IntegerField(db_column='GAP_TOTAL', blank=True, null=True)  # Field name made lowercase.
    gap_amount = models.FloatField(db_column='GAP_AMOUNT', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'RESUME_AIRTIME_ERS_CS16'


class ResumeAirtimeEwpOcs(models.Model):
    Lid = models.AutoField(primary_key=True)
    dateid = models.CharField(db_column='DATEID', max_length=255, blank=True, null=True)  # Field name made lowercase.
    ewp_total = models.IntegerField(db_column='EWP_TOTAL', blank=True, null=True)  # Field name made lowercase.
    ewp_amount = models.FloatField(db_column='EWP_AMOUNT', blank=True, null=True)  # Field name made lowercase.
    ocs_total = models.IntegerField(db_column='OCS_TOTAL', blank=True, null=True)  # Field name made lowercase.
    ocs_amount = models.FloatField(db_column='OCS_AMOUNT', blank=True, null=True)  # Field name made lowercase.
    gap_total = models.IntegerField(db_column='GAP_TOTAL', blank=True, null=True)  # Field name made lowercase.
    gap_amount = models.FloatField(db_column='GAP_AMOUNT', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'RESUME_AIRTIME_EWP_OCS'


class ResumeBundleErsCs16(models.Model):
    Lid = models.AutoField(primary_key=True)
    dateid = models.CharField(db_column='DATEID', max_length=100, blank=True, null=True)  # Field name made lowercase.
    ers_total = models.IntegerField(db_column='ERS_TOTAL', blank=True, null=True)  # Field name made lowercase.
    ers_amount = models.FloatField(db_column='ERS_AMOUNT', blank=True, null=True)  # Field name made lowercase.
    cs16_total = models.IntegerField(db_column='CS16_TOTAL', blank=True, null=True)  # Field name made lowercase.
    cs16_amount = models.FloatField(db_column='CS16_AMOUNT', blank=True, null=True)  # Field name made lowercase.
    gap_total = models.IntegerField(db_column='GAP_TOTAL', blank=True, null=True)  # Field name made lowercase.
    gap_amount = models.FloatField(db_column='GAP_AMOUNT', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'RESUME_BUNDLE_ERS_CS16'


class ResumeTransactionsEwpErs(models.Model):
    Lid = models.AutoField(primary_key=True)
    dates = models.CharField(max_length=10, blank=True, null=True)
    ewp_total = models.IntegerField(blank=True, null=True)
    ewpamount = models.FloatField(blank=True, null=True)
    ers_total = models.IntegerField(blank=True, null=True)
    ersamount = models.FloatField(blank=True, null=True)
    gap_total = models.IntegerField(blank=True, null=True)
    gapamount = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'RESUME_TRANSACTIONS_EWP_ERS'


class ReconciliationCs17(models.Model):
    Lid = models.AutoField(primary_key=True)
    tbl_dt = models.IntegerField(blank=True, null=True)
    cs_vol = models.BigIntegerField(db_column='CS_VOL', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Reconciliation_CS17_'


class ReconciliationGgsn(models.Model):
    Lid = models.AutoField(primary_key=True)
    tbl_dt = models.IntegerField(blank=True, null=True)
    vol_data_up_to = models.BigIntegerField(db_column='VOL_DATA_UP_TO', blank=True, null=True)  # Field name made lowercase.
    vol_data_down_to = models.BigIntegerField(db_column='VOL_DATA_DOWN_TO', blank=True, null=True)  # Field name made lowercase.
    vol_data_total_to = models.BigIntegerField(db_column='VOL_DATA_TOTAL_TO', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Reconciliation_GGSN'


class TopBalanceReconciliation(models.Model):
    Lid = models.AutoField(primary_key=True)
    dump_date = models.IntegerField(db_column='DUMP_DATE', blank=True, null=True)  # Field name made lowercase.
    msisdn = models.TextField(db_column='MSISDN', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    balance = models.TextField(db_column='BALANCE', blank=True, null=True)  # Field name made lowercase. This field type is a guess.

    class Meta:
        managed = False
        db_table = 'Top_Balance_reconciliation'


class TopConsoVerification(models.Model):
    Lid = models.AutoField(primary_key=True)
    msisdn = models.TextField(db_column='MSISDN', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    conso = models.FloatField(db_column='CONSO', blank=True, null=True)  # Field name made lowercase.
    date = models.IntegerField(db_column='DATE', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Top_Conso_verification'
