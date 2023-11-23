# from django.conf import settings
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
from django.shortcuts import redirect,render
import stripe

def paypal(request):
    return render(request, 'paypal.html') 
# class StripApiView(APIView):
#     def post(self,request):
#         try:
#             checkout_session = stripe.checkout.Session.create(
#                 line_items=[
#                     {
#                         'price': 'price_1OFP5GHTOkeScdk39u5WpNhM',
#                         'quantity': 1,
#                     },
#                 ],
#                 mode='payment',
#                 success_url=settings.SITE_URL + '?success=true&session_id={CHECKOUT_SESSION_ID}',
#                 cancel_url=settings.SITE_URL + '?canceled=true',
#             )
#             return redirect(checkout_session.url, code=303)
#         except:
#             return Response({'ffd':'ffdf'}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)

        