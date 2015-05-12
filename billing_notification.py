import datetime
import mysql.connector
import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def sendEmail(receiver):
	# email config
	fromaddr = 'cloudvm2015@gmail.com'
	username = 'cloudvm2015@gmail.com'
	password = '2015cloudvm'

	# the message
	msg = MIMEMultipart('alternative')
	msg['Subject'] = 'CloudVM Billing'
	msg['From'] = fromaddr
	msg['To'] = receiver

	html = """\
	<html>
		<head></head>
		<body>
		<p>Dear customer """ + customer['name']
	html += """, <br>
		<b>Thank you for using CloudVM. We hope you are satisfied with our services. </b><br>
		Here is your bill details for using our services. <br>
	"""
	total = 0
	for instance in instances:
		print instance['name'], instance['price']
		html += "Instance " + instance['name'] + " will cost you Rp. " + str(instance['price']) + "<br>"
		total += int(instance['price'])
	html += "<b>TOTAL: Rp. " + str(total) + "</b><br> The bill will be charged to your credit card <i>" + customer['cc'] + "</i><br>"
	html += """For more information about your instances or if you want to stop from using the service, <br>
	you can login with your account at <a href="http://cloudvm.ddns.net">cloudvm.ddns.net</a>"""
	html += """\
		</p>
		</body>
	</html>
	"""
	part1 = MIMEText(html, 'html')
	msg.attach(part1)
	# send the email
	server = smtplib.SMTP('smtp.gmail.com:587')
	server.ehlo()
	server.starttls()
	server.login(username,password)
	print 'sending email to ' + receiver
	server.sendmail(fromaddr, receiver, msg.as_string())
	server.quit()

if __name__ == '__main__':
	# database connector setup
	cnx = mysql.connector.connect(user='root', password='root', host='127.0.0.1', database='cloudvm')
	cursor = cnx.cursor()
	query = ("SELECT * FROM notification_email")

	cursor.execute(query)
	rows = cursor.fetchall()
	customer = {}
	instances = []
	for row in rows:
		instance = { 'name' : row[4], 'price' : row[5]}
		if customer == {}:
			customer = { 'name' : row[1], 'email': row[2], 'cc': row[3]}
			instances.append(instance)
		elif customer['name'] == row[1]:
			instances.append(instance)
		else:
			sendEmail(customer['email'])
			customer = { 'name' : row[1], 'email': row[2], 'cc': row[3]}
			instances = []
			instances.append(instance)
	sendEmail(customer['email'])

	cursor.close()
	cnx.close()